import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { RoomState, TeamState } from '../lib/room-manager';

export interface FloatingReaction {
  id: string;
  emoji: string;
  x: number; // Percentage offset
}

interface AuctionStore {
  // Guest identity
  playerId: string | null;
  name: string;
  teamName: string;
  avatarId: string;
  isSpectator: boolean;

  // Real-time room state
  room: RoomState | null;
  socket: Socket | null;
  socketConnected: boolean;
  bidError: string | null;

  // Floating reactions UI
  floatingReactions: FloatingReaction[];

  // Actions
  setIdentity: (identity: { id: string; name: string; teamName: string; avatarId: string; isSpectator?: boolean }) => void;
  initSocket: (roomId: string) => void;
  disconnectSocket: () => void;
  
  // Socket Emitters
  startAuction: () => void;
  placeBid: (customAmount?: number) => void;
  sendChat: (message: string, type?: 'text' | 'reaction') => void;
  addBot: (personality: string) => void;
  fillBots: () => void;
  leaveRoom: () => void;
  clearBidError: () => void;
}

export const useAuctionStore = create<AuctionStore>((set, get) => {
  // Load initial guest session if in browser
  let initialPlayerId = null;
  let initialName = '';
  let initialTeamName = '';
  let initialAvatarId = 'av1';
  let initialIsSpectator = false;

  if (typeof window !== 'undefined') {
    initialPlayerId = localStorage.getItem('ipl_player_id') || `guest_${Math.random().toString(36).substr(2, 9)}`;
    initialName = localStorage.getItem('ipl_player_name') || '';
    initialTeamName = localStorage.getItem('ipl_player_team_name') || '';
    initialAvatarId = localStorage.getItem('ipl_player_avatar') || 'av1';
    
    // Save generated id back to localStorage
    if (!localStorage.getItem('ipl_player_id')) {
      localStorage.setItem('ipl_player_id', initialPlayerId);
    }
  }

  return {
    playerId: initialPlayerId,
    name: initialName,
    teamName: initialTeamName,
    avatarId: initialAvatarId,
    isSpectator: initialIsSpectator,
    room: null,
    socket: null,
    socketConnected: false,
    bidError: null,
    floatingReactions: [],

    setIdentity: (identity) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('ipl_player_id', identity.id);
        localStorage.setItem('ipl_player_name', identity.name);
        localStorage.setItem('ipl_player_team_name', identity.teamName);
        localStorage.setItem('ipl_player_avatar', identity.avatarId);

        // Store guest session in secure cookies for persistent cross-session identification
        document.cookie = `ipl_player_id=${identity.id}; path=/; max-age=31536000; SameSite=Strict; Secure`;
        document.cookie = `ipl_player_name=${encodeURIComponent(identity.name)}; path=/; max-age=31536000; SameSite=Strict; Secure`;
        document.cookie = `ipl_player_team_name=${encodeURIComponent(identity.teamName)}; path=/; max-age=31536000; SameSite=Strict; Secure`;
        document.cookie = `ipl_player_avatar=${identity.avatarId}; path=/; max-age=31536000; SameSite=Strict; Secure`;
      }
      set({
        playerId: identity.id,
        name: identity.name,
        teamName: identity.teamName,
        avatarId: identity.avatarId,
        isSpectator: !!identity.isSpectator
      });

      // Emit join-room if socket is already connected
      const { socket, room } = get();
      if (socket && room) {
        socket.emit('join-room', {
          roomId: room.id,
          playerId: identity.id,
          name: identity.name,
          teamName: identity.teamName,
          avatarId: identity.avatarId,
          isSpectator: !!identity.isSpectator
        });
      }
    },

    initSocket: (roomId) => {
      const state = get();
      if (state.socket) {
        state.socket.disconnect();
      }

      // Establish socket.io connection pointing to the configured server or the window origin (unified host/port)
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
      const socket = io(socketUrl);

      socket.on('connect', () => {
        set({ socketConnected: true });

        // Only auto-join on reconnect (if room state is already loaded in the store)
        const { playerId, name, teamName, avatarId, isSpectator, room } = get();
        if (room && playerId && name && (isSpectator || teamName)) {
          let settings = undefined;
          if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const maxTeams = urlParams.get('maxTeams');
            const budget = urlParams.get('budget');
            const timer = urlParams.get('timer');
            const pool = urlParams.get('pool');
            if (maxTeams || budget || timer || pool) {
              settings = {
                maxTeams: maxTeams ? parseInt(maxTeams, 10) : undefined,
                budget: budget ? parseInt(budget, 10) : undefined,
                timerDuration: timer ? parseInt(timer, 10) : undefined,
                poolSize: pool ? parseInt(pool, 10) : undefined,
              };
            }
          }

          socket.emit('join-room', {
            roomId,
            playerId,
            name,
            teamName,
            avatarId,
            isSpectator,
            settings
          });
        } else {
          // Join socket channel to preview taken options before submitting onboarding
          socket.emit('preview-room', { roomId });
        }
      });

      socket.on('disconnect', () => {
        set({ socketConnected: false });
      });

      socket.on('room-update', (updatedRoom: RoomState) => {
        set({ room: updatedRoom });
      });

      socket.on('join-error', ({ message }) => {
        // Clear local client identity details because join was rejected
        set({
          name: '',
          teamName: '',
        });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('ipl_player_name');
          localStorage.removeItem('ipl_player_team_name');
          document.cookie = "ipl_player_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie = "ipl_player_team_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        alert(message);
      });

      socket.on('bid-success', ({ bidderId, amount }) => {
        set({ bidError: null });
        // Let the client know bid was accepted
      });

      socket.on('bid-error', ({ message }) => {
        set({ bidError: message });
        // Auto clear error after 3 seconds
        setTimeout(() => {
          const currentError = get().bidError;
          if (currentError === message) {
            set({ bidError: null });
          }
        }, 3000);
      });

      socket.on('reaction-received', ({ emoji }) => {
        const id = Math.random().toString(36).substr(2, 9);
        const x = 15 + Math.random() * 70; // Random horizontal placement on screen
        
        set((prev) => ({
          floatingReactions: [...prev.floatingReactions, { id, emoji, x }]
        }));

        // Remove reaction after 2.5 seconds (fade-out decay)
        setTimeout(() => {
          set((prev) => ({
            floatingReactions: prev.floatingReactions.filter((r) => r.id !== id)
          }));
        }, 2500);
      });

      set({ socket, bidError: null });
    },

    disconnectSocket: () => {
      const { socket, room, playerId } = get();
      if (socket) {
        if (room && playerId) {
          socket.emit('leave-room', { roomId: room.id, playerId });
        }
        socket.disconnect();
      }
      set({ socket: null, socketConnected: false, room: null });
    },

    startAuction: () => {
      const { socket, room } = get();
      if (socket && room) {
        socket.emit('start-auction', { roomId: room.id });
      }
    },

    placeBid: (customAmount) => {
      const { socket, room, playerId } = get();
      if (socket && room && playerId) {
        socket.emit('place-bid', {
          roomId: room.id,
          bidderId: playerId,
          customAmount
        });
      }
    },

    sendChat: (message, type = 'text') => {
      const { socket, room, playerId, name } = get();
      if (socket && room && playerId) {
        socket.emit('chat-message', {
          roomId: room.id,
          senderId: playerId,
          senderName: name,
          message,
          type
        });
      }
    },

    addBot: (personality) => {
      const { socket, room } = get();
      if (socket && room) {
        socket.emit('add-bot', { roomId: room.id, personality });
      }
    },

    fillBots: () => {
      const { socket, room } = get();
      if (socket && room) {
        socket.emit('fill-bots', { roomId: room.id });
      }
    },

    leaveRoom: () => {
      get().disconnectSocket();
    },

    clearBidError: () => {
      set({ bidError: null });
    }
  };
});
