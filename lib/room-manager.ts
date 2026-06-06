import { Player, PLAYER_POOL, PRESETS_AVATARS } from './players';
import { evaluatePlayerForAI, getMinIncrement, AITeam } from './ai';

export interface BidHistory {
  bidderId: string;
  bidderName: string;
  amount: number; // In Crores
  timestamp: number;
}

export interface TeamState {
  id: string;
  name: string;
  teamName: string;
  avatarId: string;
  purse: number; // In Crores
  roster: Player[];
  isAI: boolean;
  aiPersonality?: 'MI_NITA' | 'RCB_BOLD' | 'CSK_THALA' | 'SRH_KAVYA' | 'KKR_SRK' | 'PBKS_PREITY';
  isSpectator: boolean;
  connected?: boolean;
}

export interface ChatMessage {
  senderId: string;
  senderName: string;
  message: string;
  timestamp: number;
  type: 'text' | 'system' | 'reaction';
}

export interface RoomState {
  id: string;
  status: 'LOBBY' | 'REVEAL' | 'BIDDING' | 'SOLD' | 'UNSOLD' | 'COMPLETED';
  settings: {
    maxTeams: number;
    budget: number; // in Crores, default 100
    timerDuration: number; // in seconds, default 15
    maxOverseas: number; // default 6
    poolSize: number; // default 15
  };
  participants: TeamState[];
  currentBid: number; // In Crores (0 if no bids)
  highestBidderId: string | null;
  activePlayerIndex: number;
  playerPool: Player[];
  timer: number;
  bidHistory: BidHistory[];
  chat: ChatMessage[];
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export class RoomManager {
  private rooms: Map<string, RoomState> = new Map();

  createRoom(roomId: string, maxTeams: number = 6, budget: number = 100, timerDuration: number = 15, poolSize: number = PLAYER_POOL.length): RoomState {
    // Shuffle and pick players (use all players for the room)
    const selectedPool = shuffleArray(PLAYER_POOL);
    const actualPoolSize = PLAYER_POOL.length;
    
    const newRoom: RoomState = {
      id: roomId,
      status: 'LOBBY',
      settings: {
        maxTeams,
        budget,
        timerDuration,
        maxOverseas: 6,
        poolSize: actualPoolSize
      },
      participants: [],
      currentBid: 0,
      highestBidderId: null,
      activePlayerIndex: 0,
      playerPool: selectedPool,
      timer: 0,
      bidHistory: [],
      chat: [
        {
          senderId: 'system',
          senderName: 'Auctioneer',
          message: `Auction Room ${roomId} created. Waiting for managers to join...`,
          timestamp: Date.now(),
          type: 'system'
        }
      ]
    };

    this.rooms.set(roomId, newRoom);
    return newRoom;
  }

  getRoom(roomId: string): RoomState | undefined {
    return this.rooms.get(roomId);
  }

  deleteRoom(roomId: string): void {
    this.rooms.delete(roomId);
  }

  joinRoom(roomId: string, participant: { id: string; name: string; teamName: string; avatarId: string; isSpectator: boolean }): RoomState | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    // Remove existing if reconnecting
    room.participants = room.participants.filter(p => p.id !== participant.id);

    if (!participant.isSpectator) {
      // Check for duplicate avatarId (emblem)
      const isAvatarTaken = room.participants.some(p => !p.isSpectator && p.avatarId === participant.avatarId);
      if (isAvatarTaken) {
        throw new Error("This franchise emblem is already taken by another manager in this room.");
      }

      // Check for duplicate teamName
      const isTeamNameTaken = room.participants.some(p => 
        !p.isSpectator && 
        p.teamName.trim().toLowerCase() === participant.teamName.trim().toLowerCase()
      );
      if (isTeamNameTaken) {
        throw new Error("This franchise team name is already taken by another manager in this room.");
      }
    }


    if (participant.isSpectator) {
      room.participants.push({
        id: participant.id,
        name: participant.name,
        teamName: 'Spectator',
        avatarId: participant.avatarId,
        purse: 0,
        roster: [],
        isAI: false,
        isSpectator: true,
        connected: true
      });
      
      room.chat.push({
        senderId: 'system',
        senderName: 'Auctioneer',
        message: `${participant.name} joined as a Spectator.`,
        timestamp: Date.now(),
        type: 'system'
      });
    } else {
      // Check limit
      const nonSpectatorCount = room.participants.filter(p => !p.isSpectator).length;
      if (nonSpectatorCount >= room.settings.maxTeams) {
        // Force spectator if full
        room.participants.push({
          id: participant.id,
          name: participant.name,
          teamName: 'Spectator',
          avatarId: participant.avatarId,
          purse: 0,
          roster: [],
          isAI: false,
          isSpectator: true,
          connected: true
        });
        
        room.chat.push({
          senderId: 'system',
          senderName: 'Auctioneer',
          message: `${participant.name} joined as a Spectator (Room is Full).`,
          timestamp: Date.now(),
          type: 'system'
        });
      } else {
        room.participants.push({
          id: participant.id,
          name: participant.name,
          teamName: participant.teamName,
          avatarId: participant.avatarId,
          purse: room.settings.budget,
          roster: [],
          isAI: false,
          isSpectator: false,
          connected: true
        });

        room.chat.push({
          senderId: 'system',
          senderName: 'Auctioneer',
          message: `${participant.name} (${participant.teamName}) has entered the Arena!`,
          timestamp: Date.now(),
          type: 'system'
        });
      }
    }

    return room;
  }

  leaveRoom(roomId: string, participantId: string): RoomState | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const participant = room.participants.find(p => p.id === participantId);
    if (participant) {
      room.chat.push({
        senderId: 'system',
        senderName: 'Auctioneer',
        message: `${participant.name} left the room.`,
        timestamp: Date.now(),
        type: 'system'
      });
      
      participant.connected = false;
      
      // If the game hasn't started, remove them. If it has started, we keep them so they can reconnect.
      if (room.status === 'LOBBY') {
        room.participants = room.participants.filter(p => p.id !== participantId);
      }
    }

    // If no human participants are left in lobby or active room, delete it after a timeout (managed externally or check)
    return room;
  }

  addBot(roomId: string, aiPersonality: 'MI_NITA' | 'RCB_BOLD' | 'CSK_THALA' | 'SRH_KAVYA' | 'KKR_SRK' | 'PBKS_PREITY'): RoomState | null {
    const room = this.rooms.get(roomId);
    if (!room || room.status !== 'LOBBY') return null;

    const nonSpectatorCount = room.participants.filter(p => !p.isSpectator).length;
    if (nonSpectatorCount >= room.settings.maxTeams) return null;

    const botNames = {
      MI_NITA: { name: "Nita Bot", teamName: "Mumbai Indians (AI)" },
      RCB_BOLD: { name: "RCB Bot", teamName: "Royal Challengers (AI)" },
      CSK_THALA: { name: "Thala Bot", teamName: "Chennai Super Kings (AI)" },
      SRH_KAVYA: { name: "Kavya Bot", teamName: "Sunrisers (AI)" },
      KKR_SRK: { name: "SRK Bot", teamName: "Kolkata Knight Riders (AI)" },
      PBKS_PREITY: { name: "Preity Bot", teamName: "Punjab Kings (AI)" }
    };

    const avatarIds = {
      MI_NITA: "av2",
      RCB_BOLD: "av3",
      CSK_THALA: "av1",
      SRH_KAVYA: "av5",
      KKR_SRK: "av4",
      PBKS_PREITY: "av10"
    };

    const botInfo = botNames[aiPersonality];
    const botAvatarId = avatarIds[aiPersonality];

    // Check if bot's emblem or team name is already taken
    const isAvatarTaken = room.participants.some(p => !p.isSpectator && p.avatarId === botAvatarId);
    const isTeamNameTaken = room.participants.some(p => 
      !p.isSpectator && 
      p.teamName.trim().toLowerCase() === botInfo.teamName.trim().toLowerCase()
    );

    if (isAvatarTaken || isTeamNameTaken) {
      return null;
    }

    const botId = `bot_${aiPersonality}_${Math.random().toString(36).substr(2, 5)}`;

    const botState: TeamState = {
      id: botId,
      name: botInfo.name,
      teamName: botInfo.teamName,
      avatarId: avatarIds[aiPersonality],
      purse: room.settings.budget,
      roster: [],
      isAI: true,
      aiPersonality,
      isSpectator: false,
      connected: true
    };

    room.participants.push(botState);
    room.chat.push({
      senderId: 'system',
      senderName: 'Auctioneer',
      message: `${botState.name} joined as a franchise owner.`,
      timestamp: Date.now(),
      type: 'system'
    });

    return room;
  }

  fillWithBots(roomId: string): RoomState | null {
    const room = this.rooms.get(roomId);
    if (!room || room.status !== 'LOBBY') return null;

    const personalities: ('MI_NITA' | 'RCB_BOLD' | 'CSK_THALA' | 'SRH_KAVYA' | 'KKR_SRK' | 'PBKS_PREITY')[] = [
      'MI_NITA', 'RCB_BOLD', 'CSK_THALA', 'SRH_KAVYA', 'KKR_SRK', 'PBKS_PREITY'
    ];

    let currentTeams = room.participants.filter(p => !p.isSpectator);
    let attempts = 0;
    while (currentTeams.length < room.settings.maxTeams && attempts < personalities.length) {
      const p = personalities[attempts];
      // Check if this personality is already added
      const exists = currentTeams.some(team => team.aiPersonality === p);
      if (!exists) {
        this.addBot(roomId, p);
      }
      currentTeams = room.participants.filter(p => !p.isSpectator);
      attempts++;
    }

    return room;
  }

  startAuction(roomId: string): RoomState | null {
    const room = this.rooms.get(roomId);
    if (!room || room.status !== 'LOBBY') return null;

    // Must have at least 2 teams to bid
    const teamCount = room.participants.filter(p => !p.isSpectator).length;
    if (teamCount < 2) {
      // Auto fill with bots to make it competitive
      this.fillWithBots(roomId);
    }

    room.status = 'REVEAL';
    room.activePlayerIndex = 0;
    room.timer = 4; // 4 seconds reveal animation
    room.currentBid = 0;
    room.highestBidderId = null;
    room.bidHistory = [];

    room.chat.push({
      senderId: 'system',
      senderName: 'Auctioneer',
      message: `The auction has officially started! Let's head to the podium...`,
      timestamp: Date.now(),
      type: 'system'
    });

    return room;
  }

  placeBid(roomId: string, bidderId: string, customAmount?: number): { success: boolean; room: RoomState | null; message?: string } {
    const room = this.rooms.get(roomId);
    if (!room || room.status !== 'BIDDING') {
      return { success: false, room: null, message: "Auction is not open for bidding." };
    }

    const bidder = room.participants.find(p => p.id === bidderId);
    if (!bidder || bidder.isSpectator) {
      return { success: false, room, message: "Invalid bidder or you are a spectator." };
    }

    const player = room.playerPool[room.activePlayerIndex];
    if (!player) {
      return { success: false, room, message: "No active player." };
    }

    const minIncrement = getMinIncrement(room.currentBid);
    let nextBid = room.currentBid === 0 ? player.basePrice : room.currentBid + minIncrement;

    if (customAmount !== undefined) {
      if (customAmount < nextBid) {
        return { success: false, room, message: `Bid must be at least ${nextBid.toFixed(2)} Cr.` };
      }
      nextBid = customAmount;
    }

    // Round to 2 decimal places to avoid float bugs
    nextBid = Math.round(nextBid * 100) / 100;

    // Check budget limit
    if (bidder.purse < nextBid) {
      return { success: false, room, message: "Insufficient budget!" };
    }

    // Avoid self-bidding
    if (room.highestBidderId === bidderId) {
      return { success: false, room, message: "You are already the highest bidder!" };
    }

    // Validate roster rules (e.g. overseas count)
    const overseasCount = bidder.roster.filter(p => p.nationality === 'Overseas').length;
    if (player.nationality === 'Overseas' && overseasCount >= room.settings.maxOverseas) {
      return { success: false, room, message: "Overseas limit reached for this team!" };
    }

    // Safety checks: Make sure they have enough budget left for other players to fill squad (minimum 15 players target, or at least 11 players)
    // If they have e.g. 5 empty slots, they need to save 5 * 0.75Cr = 3.75Cr
    const remainingSlotsNeeded = 11 - bidder.roster.length;
    if (remainingSlotsNeeded > 1) {
      const reserveFundsNeeded = (remainingSlotsNeeded - 1) * 0.75;
      if (bidder.purse - nextBid < reserveFundsNeeded) {
        return { success: false, room, message: `Insufficient funds to reserve for minimum playing XI (${reserveFundsNeeded.toFixed(2)} Cr required for empty slots).` };
      }
    }

    // Apply bid
    room.currentBid = nextBid;
    room.highestBidderId = bidderId;
    
    const bidItem: BidHistory = {
      bidderId,
      bidderName: bidder.teamName,
      amount: nextBid,
      timestamp: Date.now()
    };
    room.bidHistory.push(bidItem);

    // Anti-sniping timer extension
    if (room.timer < 5) {
      room.timer = 5;
    }

    // System comment
    room.chat.push({
      senderId: 'system',
      senderName: 'Auctioneer',
      message: `Bid of ${nextBid.toFixed(2)} Cr by ${bidder.teamName}.`,
      timestamp: Date.now(),
      type: 'system'
    });

    return { success: true, room };
  }

  handleChat(roomId: string, senderId: string, senderName: string, message: string, type: 'text' | 'reaction'): RoomState | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    room.chat.push({
      senderId,
      senderName,
      message,
      timestamp: Date.now(),
      type
    });

    // Limit chat size
    if (room.chat.length > 50) {
      room.chat = room.chat.slice(room.chat.length - 50);
    }

    return room;
  }

  tickRoom(roomId: string): RoomState | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    if (room.status === 'LOBBY' || room.status === 'COMPLETED') {
      return room;
    }

    if (room.status === 'REVEAL') {
      room.timer -= 1;
      if (room.timer <= 0) {
        room.status = 'BIDDING';
        room.timer = room.settings.timerDuration;
        room.currentBid = 0;
        room.highestBidderId = null;
        room.bidHistory = [];
        
        const player = room.playerPool[room.activePlayerIndex];
        room.chat.push({
          senderId: 'system',
          senderName: 'Auctioneer',
          message: `Bidding is open for ${player.name} at base price ${player.basePrice.toFixed(2)} Cr.`,
          timestamp: Date.now(),
          type: 'system'
        });
      }
      return room;
    }

    if (room.status === 'BIDDING') {
      // Process AI bidding thoughts on every tick (run-time)
      const player = room.playerPool[room.activePlayerIndex];
      const aiTeams = room.participants.filter(p => p.isAI && !p.isSpectator) as AITeam[];
      
      // Let one AI make a bid per tick, to avoid instant flooding and mimic speed
      let bidPlacedThisTick = false;
      const shuffiedAIs = shuffleArray(aiTeams);

      for (const ai of shuffiedAIs) {
        if (room.highestBidderId === ai.id) continue; // Already high bidder

        const evalResult = evaluatePlayerForAI(player, ai, room.currentBid, room.settings);
        if (evalResult.shouldBid) {
          // Add some reaction delay - 60% chance to bid this second
          if (Math.random() < 0.65) {
            this.placeBid(roomId, ai.id);
            bidPlacedThisTick = true;
            break; // Stop and broadcast this bid
          }
        }
      }

      if (!bidPlacedThisTick) {
        room.timer -= 1;
      }

      if (room.timer <= 0) {
        // Sold or Unsold
        if (room.highestBidderId) {
          const winner = room.participants.find(p => p.id === room.highestBidderId);
          if (winner) {
            // Deduct purse and add player to roster
            winner.purse = Math.round((winner.purse - room.currentBid) * 100) / 100;
            winner.roster.push(player);
            
            room.status = 'SOLD';
            room.timer = 4; // 4 seconds sold animation/commentary
            
            room.chat.push({
              senderId: 'system',
              senderName: 'Auctioneer',
              message: `🔨 SOLD! ${player.name} goes to ${winner.teamName} for ${room.currentBid.toFixed(2)} Cr!`,
              timestamp: Date.now(),
              type: 'system'
            });
          } else {
            // Fallback
            room.status = 'UNSOLD';
            room.timer = 4;
          }
        } else {
          room.status = 'UNSOLD';
          room.timer = 4;
          
          room.chat.push({
            senderId: 'system',
            senderName: 'Auctioneer',
            message: `🔨 Player ${player.name} goes UNSOLD.`,
            timestamp: Date.now(),
            type: 'system'
          });
        }
      }
      return room;
    }

    if (room.status === 'SOLD' || room.status === 'UNSOLD') {
      room.timer -= 1;
      if (room.timer <= 0) {
        // Go to next player
        room.activePlayerIndex += 1;
        if (room.activePlayerIndex >= room.playerPool.length) {
          room.status = 'COMPLETED';
          room.timer = 0;
          
          room.chat.push({
            senderId: 'system',
            senderName: 'Auctioneer',
            message: `The auction is complete! Calculating franchise ratings and achievements...`,
            timestamp: Date.now(),
            type: 'system'
          });
        } else {
          room.status = 'REVEAL';
          room.timer = 4;
          room.currentBid = 0;
          room.highestBidderId = null;
          room.bidHistory = [];
        }
      }
      return room;
    }

    return room;
  }
}
