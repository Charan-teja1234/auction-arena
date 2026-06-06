'use client';

import React, { useState, useEffect, use, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuctionStore } from '../../../store/useAuctionStore';
import { TeamState } from '../../../lib/room-manager';
import AvatarPicker from '../../../components/AvatarPicker';
import { PRESETS_AVATARS } from '../../../lib/players';
import PlayerCard from '../../../components/PlayerCard';
import TeamList from '../../../components/TeamList';
import BiddingControls from '../../../components/BiddingControls';
import ChatPanel from '../../../components/ChatPanel';
import TeamSummary from '../../../components/TeamSummary';
import { 
  Trophy, Users, Share2, Copy, Play, ArrowLeft, 
  UserPlus, ShieldAlert, Wifi, Check, MessageSquare, Mic, MicOff, ListCollapse, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageParams {
  roomId: string;
}

function RoomPageContent({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spectateParam = searchParams.get('spectate');
  
  // Resolve params promise
  const resolvedParams = use(params);
  const { roomId } = resolvedParams;

  // Zustand Store
  const {
    playerId,
    name,
    teamName,
    avatarId,
    room,
    socketConnected,
    bidError,
    floatingReactions,
    setIdentity,
    initSocket,
    disconnectSocket,
    startAuction,
    placeBid,
    sendChat,
    addBot,
    fillBots,
    leaveRoom,
    clearBidError
  } = useAuctionStore();

  const bidScrollRef = useRef<HTMLDivElement>(null);

  // Right Hub Toggle: Standings vs Live Chat
  const [activeRightTab, setActiveRightTab] = useState<'standings' | 'chat'>('standings');

  // Local Onboarding Form states
  const [managerName, setManagerName] = useState('');
  const [franchiseName, setFranchiseName] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState('av1');
  const [isSpectateMode, setIsSpectateMode] = useState(spectateParam === 'true');
  const [isOnboarding, setIsOnboarding] = useState(true);

  // Taken emblems in the room
  const takenAvatarIds = room?.participants
    .filter(p => !p.isSpectator && p.id !== playerId)
    .map(p => p.avatarId) || [];

  const isAlreadyParticipant = room?.participants.some(p => p.id === playerId) || false;

  // Link copy check
  const [copiedLink, setCopiedLink] = useState(false);

  // Custom Toasts/Notifications System for when players leave/disconnect
  interface UIBlockNotification {
    id: string;
    message: string;
    teamName: string;
    avatarId: string;
    timestamp: number;
  }
  const [notifications, setNotifications] = useState<UIBlockNotification[]>([]);
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);

  // Load identity values
  useEffect(() => {
    if (name) {
      setManagerName(name);
    } else {
      setIsOnboarding(true);
    }
    if (teamName) setFranchiseName(teamName);
    if (avatarId) setSelectedAvatarId(avatarId);
  }, [name, teamName, avatarId]);

  // Bypass onboarding if they are already in the participants list
  useEffect(() => {
    if (room && isAlreadyParticipant) {
      setIsOnboarding(false);
    }
  }, [room, isAlreadyParticipant]);

  // Automatically select the first available avatar if the current one is taken
  useEffect(() => {
    if (!isSpectateMode && takenAvatarIds.includes(selectedAvatarId)) {
      const firstAvailable = PRESETS_AVATARS.find(a => !takenAvatarIds.includes(a.id));
      if (firstAvailable) {
        setSelectedAvatarId(firstAvailable.id);
      }
    }
  }, [takenAvatarIds, isSpectateMode, selectedAvatarId]);

  // Handle Socket mounting
  useEffect(() => {
    if (roomId) {
      initSocket(roomId);
    }
    return () => {
      disconnectSocket();
    };
  }, [roomId]);

  // Auto-scroll bid logs on the left
  useEffect(() => {
    if (bidScrollRef.current) {
      bidScrollRef.current.scrollTop = bidScrollRef.current.scrollHeight;
    }
  }, [room?.bidHistory]);

  const prevParticipantsRef = useRef<TeamState[] | null>(null);

  // Detect when other participants leave/disconnect
  useEffect(() => {
    if (!room?.participants) return;

    if (isOnboarding) {
      prevParticipantsRef.current = room.participants;
      return;
    }

    const prevList = prevParticipantsRef.current;
    if (prevList) {
      const disconnectedOrLeft = prevList.filter(prevP => {
        // Skip ourselves
        if (prevP.id === playerId) return false;

        const currP = room.participants.find(p => p.id === prevP.id);
        
        // Scenario 1: Participant removed completely (e.g. during lobby phase)
        if (!currP) return true;

        // Scenario 2: Participant was connected and is now disconnected (offline during active phase)
        const wasConnected = prevP.connected !== false;
        const isConnectedNow = currP.connected !== false;
        return wasConnected && !isConnectedNow;
      });

      disconnectedOrLeft.forEach(p => {
        const id = Math.random().toString(36).substr(2, 9);
        const isSpectatorText = p.isSpectator ? ' (Spectator)' : '';
        const nameText = p.name;
        const teamText = p.isSpectator ? '' : ` [${p.teamName}]`;
        const message = `${nameText}${teamText}${isSpectatorText} left the bidding arena.`;

        const newNotification: UIBlockNotification = {
          id,
          message,
          teamName: p.teamName,
          avatarId: p.avatarId,
          timestamp: Date.now()
        };

        setNotifications(prev => [...prev, newNotification]);

        // Auto remove toast after 5 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
      });
    }

    prevParticipantsRef.current = room.participants;
  }, [room?.participants, isOnboarding, playerId]);

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managerName.trim() || (!isSpectateMode && !franchiseName.trim())) return;

    if (!isSpectateMode) {
      // Validate duplicate franchise team name locally before submitting
      const isTeamNameTaken = room?.participants.some(p => 
        !p.isSpectator && 
        p.id !== playerId && 
        p.teamName.trim().toLowerCase() === franchiseName.trim().toLowerCase()
      );
      if (isTeamNameTaken) {
        alert("This franchise team name is already taken in this room. Please choose a different name.");
        return;
      }

      // Validate duplicate franchise emblem locally before submitting
      const isAvatarTaken = room?.participants.some(p => 
        !p.isSpectator && 
        p.id !== playerId && 
        p.avatarId === selectedAvatarId
      );
      if (isAvatarTaken) {
        alert("This franchise emblem is already taken in this room. Please choose a different emblem.");
        return;
      }
    }

    const finalPlayerId = playerId || `guest_${Math.random().toString(36).substr(2, 9)}`;
    setIdentity({
      id: finalPlayerId,
      name: managerName.trim(),
      teamName: isSpectateMode ? 'Spectator' : franchiseName.trim(),
      avatarId: isSpectateMode ? 'spectator' : selectedAvatarId,
      isSpectator: isSpectateMode
    });

    setIsOnboarding(false);
  };

  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleReplay = () => {
    leaveRoom();
    router.push('/');
  };

  const handleLeaveWithConfirm = () => {
    setIsConfirmLeaveOpen(true);
  };

  // Helper to find team name for highest bidder
  const getBidderName = (id: string | null) => {
    if (!id || !room) return '';
    const p = room.participants.find((x) => x.id === id);
    return p ? p.teamName : 'AI Franchise';
  };

  // Generate Auctioneer commentary text dynamically
  const getCommentarySpeech = () => {
    if (!room) return '';
    const activePlayer = room.playerPool[room.activePlayerIndex];
    if (!activePlayer) return "Welcome to the IPL Auction Arena podium.";

    const highestBidderName = getBidderName(room.highestBidderId);

    switch (room.status) {
      case 'LOBBY':
        return `Draft pool ready: ${room.playerPool.length} elite cricketers.`;
      case 'REVEAL':
        return `Podium reveal: ${activePlayer.name} (Base Price: ${activePlayer.basePrice.toFixed(2)} Cr).`;
      case 'BIDDING':
        if (room.currentBid === 0) {
          return `Opening bid is ${activePlayer.basePrice.toFixed(2)} Cr for ${activePlayer.name}.`;
        }
        if (room.timer > 10) {
          return `${room.currentBid.toFixed(2)} Cr bid by ${highestBidderName}.`;
        } else if (room.timer > 5) {
          return `${highestBidderName} leads at ${room.currentBid.toFixed(2)} Cr.`;
        } else if (room.timer === 4 || room.timer === 5) {
          return `At ${room.currentBid.toFixed(2)} Crore by ${highestBidderName}... once!`;
        } else if (room.timer === 2 || room.timer === 3) {
          return `Going at ${room.currentBid.toFixed(2)} Crore to ${highestBidderName}... twice!`;
        } else {
          return `Fair warning! Selling ${activePlayer.name} at ${room.currentBid.toFixed(2)} Crore...`;
        }
      case 'SOLD':
        return `🔨 SOLD! ${activePlayer.name} goes to ${highestBidderName} for ${room.currentBid.toFixed(2)} Cr!`;
      case 'UNSOLD':
        return `🔨 Cricketer ${activePlayer.name} goes UNSOLD.`;
      case 'COMPLETED':
        return "The auction has ended! Check final standings.";
      default:
        return "Bidding is underway.";
    }
  };

  // Text-to-Speech (TTS) voice synthesis states, refs, and controls
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const lastSpokenRef = useRef('');
  const speechTimeoutRef = useRef<any>(null);
  const commentaryText = getCommentarySpeech();

  // TTS Toggle action
  const toggleTts = () => {
    setIsTtsEnabled(prev => {
      const next = !prev;
      if (next) {
        // Clear last spoken cache so it plays the current commentary immediately
        lastSpokenRef.current = '';
      }
      return next;
    });
  };

  // Ensure voices are fetched properly when changed in browser
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const handleVoicesChanged = () => {
      window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  // Web Speech API Synthesis Trigger Effect (with debouncing for fast bidding)
  useEffect(() => {
    if (!isTtsEnabled) {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
        speechTimeoutRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (!commentaryText || commentaryText === lastSpokenRef.current) return;
    lastSpokenRef.current = commentaryText;

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Clear any pending speech timeouts to reset the debounce timer
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }

      // Check if this commentary update is a critical event (SOLD, UNSOLD, countdown warnings)
      const isCritical = 
        room?.status === 'SOLD' || 
        room?.status === 'UNSOLD' || 
        room?.status === 'REVEAL' || 
        room?.status === 'COMPLETED' || 
        (room?.timer !== undefined && room.timer <= 5);

      // 50ms browser safety delay for critical updates, 250ms debouncing for rapid bidding updates
      const delay = isCritical ? 50 : 250;

      speechTimeoutRef.current = setTimeout(() => {
        if (!isTtsEnabled) return;

        // Cancel any ongoing speaking to keep audio commentary synchronized
        window.speechSynthesis.cancel();

        // Clean emojis and format text for text-to-speech engine
        const cleanText = commentaryText.replace(/[🔨💰]/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        const voices = window.speechSynthesis.getVoices();
        // Try to find a nice English voice
        const englishVoice = voices.find(v => v.lang.startsWith('en'));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
        utterance.rate = 1.05; // Slightly faster for realistic fast-paced auction rhythm
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
      }, delay);
    }
  }, [commentaryText, isTtsEnabled, room?.status, room?.timer]);

  // Cleanup synthesis on unmount
  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Onboarding Setup view
  if (isOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] right-[-15%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Arena Registration</h3>
            <p className="text-xs text-zinc-500 mt-1">
              You are joining Room <span className="text-primary font-bold">{roomId}</span>. Setup your manager details.
            </p>
          </div>

          <form onSubmit={handleOnboardingSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-1">Manager Display Name</label>
              <input
                type="text"
                required
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="e.g. Charan Teja"
                maxLength={15}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm font-medium"
              />
            </div>

            <div className="flex items-center gap-2 py-1 select-none">
              <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSpectateMode}
                  onChange={(e) => setIsSpectateMode(e.target.checked)}
                  className="rounded border-border text-primary bg-background focus:ring-primary h-4 w-4"
                />
                Spectate Mode (Watch only, no bidding)
              </label>
            </div>

            {!isSpectateMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-semibold text-zinc-400 mb-1">Franchise Team Name</label>
                <input
                  type="text"
                  required={!isSpectateMode}
                  value={franchiseName}
                  onChange={(e) => setFranchiseName(e.target.value)}
                  placeholder="e.g. Hyderabad Hounds"
                  maxLength={20}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm font-medium"
                />
              </motion.div>
            )}

            {!isSpectateMode && (
              <AvatarPicker selectedId={selectedAvatarId} onSelect={setSelectedAvatarId} takenAvatarIds={takenAvatarIds} />
            )}

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex-1 bg-secondary text-white font-bold py-3 rounded-xl border border-border text-sm flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Home
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-background font-black py-3 rounded-xl text-sm shadow-lg shadow-primary/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Enter Room
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Socket Connection Loader
  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-zinc-400 gap-3 font-sans">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-bold animate-pulse">Connecting to Arena {roomId}...</span>
      </div>
    );
  }

  const activePlayer = room.playerPool[room.activePlayerIndex];
  const isBiddingActive = room.status === 'BIDDING' || room.status === 'REVEAL' || room.status === 'SOLD' || room.status === 'UNSOLD';
  const myTeam = room.participants.find((p) => p.id === playerId);
  const isHost = room.participants.length > 0 && room.participants[0].id === playerId;
  const nonSpectatorCount = room.participants.filter((p) => !p.isSpectator).length;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden font-sans">
      
      {/* Floating Emoji Reactions Layer */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {floatingReactions.map((reaction) => (
            <motion.div
              key={reaction.id}
              initial={{ y: '100vh', opacity: 0, scale: 0.6 }}
              animate={{ y: '-10vh', opacity: [0, 1, 1, 0], scale: [0.6, 1.3, 1.3, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              style={{ left: `${reaction.x}%` }}
              className="absolute text-5xl select-none"
            >
              {reaction.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Connection warning bar if socket drops */}
      {!socketConnected && (
        <div className="bg-red-600 text-white text-xs font-black text-center py-2 z-50 flex items-center justify-center gap-2 select-none">
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          CONNECTION LOST! ATTEMPTING TO RECONNECT...
        </div>
      )}

      {/* Header bar */}
      <header className="w-full bg-card/60 border-b border-border/60 py-3 px-4 md:px-6 flex items-center justify-between backdrop-blur-md z-35 select-none shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLeaveWithConfirm}
            className="p-2 bg-secondary hover:bg-zinc-800 border border-border/80 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Leave room"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-wider leading-none">MULTIPLAYER STAGE</span>
            <span className="text-sm md:text-base font-extrabold text-white leading-none mt-1">
              Room <span className="text-primary font-black text-glow-gold">{roomId}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-2 bg-background border border-border px-3.5 py-1.5 rounded-full text-xs font-semibold">
            {socketConnected ? (
              <Wifi className="w-3.5 h-3.5 text-cricket-green shrink-0" />
            ) : (
              <Wifi className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            )}
            <span className="text-zinc-300">
              Franchises: <span className="text-primary font-black">{nonSpectatorCount}</span> / {room.settings.maxTeams}
            </span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 bg-secondary hover:bg-zinc-800 border border-border text-white text-[10px] md:text-xs font-bold px-3 md:px-4 py-2 rounded-xl transition-all animate-pulse"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedLink ? 'Copied Invite' : 'Copy Invite Link'}
          </button>

          <button
            onClick={handleLeaveWithConfirm}
            className="flex items-center gap-1.5 bg-red-950/30 hover:bg-red-950/50 border border-red-900/40 hover:border-red-900/60 text-red-400 text-[10px] md:text-xs font-bold px-3 md:px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm hover:text-red-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            Leave Room
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col gap-4 min-h-0 z-30 justify-start select-none">
        
        {room.status === 'LOBBY' ? (
          /* Lobby view */
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-h-0">
            {/* Host Rules and Bot controls */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Rules description card */}
              <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Arena Rules & Configuration
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-background/40 border border-border/80 p-3 rounded-xl">
                    <span className="text-zinc-500 font-bold block mb-1">Franchise Purse</span>
                    <span className="text-primary font-extrabold text-sm">{room.settings.budget} Crore</span>
                  </div>
                  <div className="bg-background/40 border border-border/80 p-3 rounded-xl">
                    <span className="text-zinc-500 font-bold block mb-1">Timer Limit</span>
                    <span className="text-zinc-200 font-extrabold text-sm">{room.settings.timerDuration} Seconds</span>
                  </div>
                  <div className="bg-background/40 border border-border/80 p-3 rounded-xl">
                    <span className="text-zinc-500 font-bold block mb-1">Squad Pool</span>
                    <span className="text-zinc-200 font-extrabold text-sm">{room.settings.poolSize} Players</span>
                  </div>
                  <div className="bg-background/40 border border-border/80 p-3 rounded-xl">
                    <span className="text-zinc-500 font-bold block mb-1">Overseas Cap</span>
                    <span className="text-purple-400 font-extrabold text-sm">Max 6 Squad</span>
                  </div>
                </div>

                {/* Host Control Actions */}
                {isHost ? (
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      onClick={fillBots}
                      className="bg-secondary hover:bg-secondary/80 border border-border text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-1.5"
                    >
                      <UserPlus className="w-4 h-4 text-primary" /> Fill Remaining With Bots
                    </button>
                    
                    <div className="flex gap-1">
                      {['MI_NITA', 'RCB_BOLD', 'CSK_THALA'].map((p) => {
                        const label = p === 'MI_NITA' ? '+ Nita (MI)' : p === 'RCB_BOLD' ? '+ Bold (RCB)' : '+ Thala (CSK)';
                        return (
                          <button
                            key={p}
                            onClick={() => addBot(p)}
                            className="bg-background hover:bg-zinc-800 border border-border text-zinc-300 text-[10px] font-bold px-3 py-2 rounded-xl cursor-pointer"
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={startAuction}
                      className="bg-primary hover:bg-primary/95 text-background font-black text-xs px-6 py-2.5 rounded-xl flex items-center gap-1.5 ml-auto cursor-pointer shadow-lg shadow-primary/10"
                    >
                      <Play className="w-4 h-4 fill-current" /> Start Auction Arena
                    </button>
                  </div>
                ) : (
                  <div className="bg-secondary/40 border border-border/40 px-4 py-3 rounded-xl text-xs text-zinc-400 font-semibold italic text-center">
                    Only the Room Host ({room.participants[0]?.name}) can configure rules or trigger the auction start.
                  </div>
                )}
              </div>

              {/* Connected Managers leaderboard */}
              <div className="flex-1 min-h-[300px]">
                <TeamList room={room} myPlayerId={playerId} />
              </div>
            </div>

            {/* Lobby Chat */}
            <div className="lg:col-span-4 h-full">
              <ChatPanel room={room} myPlayerId={playerId} onSendChat={sendChat} />
            </div>
          </div>
        ) : (
          /* Active Auction dashboard - Horizontal top action bar, 3 columns below (Standings/Chat toggleable) */
          <div className="flex-1 flex flex-col gap-4.5 min-h-0">
            
            {/* 1. HORIZONTAL ACTION BOARD (ALWAYS ON TOP) */}
            {activePlayer && isBiddingActive && (
              <div className="w-full bg-card border border-border/80 p-4 md:p-6 rounded-3xl flex flex-col lg:flex-row items-center gap-4 lg:gap-6 justify-between shrink-0 shadow-xl select-none min-h-[96px]">
                
                {/* Responsive wrapper to keep Section A & B grouped on mobile/tablet */}
                <div className="flex flex-col md:flex-row lg:contents gap-4 md:gap-6 w-full lg:w-auto">
                  
                  {/* A. Active Player Profile & Countdown timer */}
                  <div className="flex items-center gap-5 border-b md:border-b-0 md:border-r border-border/40 pb-4 md:pb-0 md:pr-6 shrink-0 w-full md:w-auto justify-between md:justify-start">
                    <div className="flex flex-col">
                      <h3 className="font-black text-white text-base md:text-lg leading-tight truncate max-w-[180px]">
                        {activePlayer.name}
                      </h3>
                      <span className="text-xs text-zinc-500 font-extrabold uppercase mt-1 block">
                        {activePlayer.role} • Rated {activePlayer.rating}
                      </span>
                    </div>

                    {/* Timer Box */}
                    <div className="flex items-center gap-2 bg-background border border-border/80 px-3.5 py-2 rounded-2xl shrink-0 shadow-inner">
                      {room.status === 'BIDDING' && (
                        <span className={`h-2.5 w-2.5 rounded-full ${room.timer <= 5 ? 'bg-red-500 animate-ping' : 'bg-primary'}`} />
                      )}
                      <span className={`text-sm font-black tabular-nums tracking-wide ${
                        room.timer <= 5 && room.status === 'BIDDING' ? 'text-red-500 animate-pulse' : 'text-zinc-200'
                      }`}>
                        {room.timer}s
                      </span>
                    </div>
                  </div>

                  {/* B. Live Pricing & Bid Leader details & Commentary ticker */}
                  <div className="flex-1 flex items-center justify-between md:justify-around gap-6 border-b md:border-b-0 md:border-r border-border/40 pb-4 md:pb-0 md:px-6 min-w-0 w-full md:w-auto">
                    <div className="flex items-center gap-8 shrink-0">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Price</span>
                        <span className="text-xl md:text-2xl font-black text-primary text-glow-gold leading-none mt-1">
                          {room.currentBid === 0 ? 'Base' : `${room.currentBid.toFixed(2)} Cr`}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Leader</span>
                        <span className="text-xs md:text-sm font-black text-white leading-none mt-1 block truncate max-w-[140px]">
                          {room.highestBidderId ? getBidderName(room.highestBidderId) : 'None'}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Commentary voice/mic ticker */}
                    <button
                      onClick={toggleTts}
                      title={isTtsEnabled ? "Mute live voice commentary" : "Unmute live voice commentary"}
                      className={`hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 max-w-[320px] min-w-0 select-none cursor-pointer outline-none text-left ${
                        isTtsEnabled
                          ? 'bg-primary/15 border-primary/45 shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:bg-primary/20 hover:scale-[1.02]'
                          : 'bg-zinc-950/20 border-border/40 hover:border-zinc-700 hover:bg-zinc-900/20 hover:scale-[1.02]'
                      }`}
                    >
                      <div className="relative flex items-center justify-center shrink-0">
                        {isTtsEnabled ? (
                          <>
                            {/* Double pulsing ring wave */}
                            <span className="absolute inline-flex h-full w-full rounded-full bg-primary/30 animate-ping" />
                            <span className="absolute inline-flex h-5 w-5 rounded-full bg-primary/20 animate-pulse" />
                            <Mic className="w-4 h-4 text-primary relative z-10 shrink-0" />
                          </>
                        ) : (
                          <MicOff className="w-4 h-4 text-zinc-500 shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 leading-none">
                          {isTtsEnabled ? 'Live Audio ON' : 'Audio Muted'}
                        </span>
                        <span className={`text-xs font-semibold italic truncate w-full mt-0.5 transition-colors ${
                          isTtsEnabled ? 'text-zinc-200' : 'text-zinc-400'
                        }`}>
                          "{commentaryText || 'Click to play audio commentary'}"
                        </span>
                      </div>
                    </button>
                  </div>

                </div>

                {/* C. Horizontal Increments and Bid Paddles */}
                <div className="flex items-center justify-center lg:justify-end shrink-0 w-full lg:w-auto mt-2 md:mt-0">
                  <BiddingControls
                    room={room}
                    myPlayerId={playerId}
                    onBid={placeBid}
                    bidError={bidError}
                    clearError={clearBidError}
                  />
                </div>

              </div>
            )}

            {/* 2. THREE-COLUMN MIDDLE GRID CONTAINER */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5.5 items-stretch min-h-0">
              
              {/* COLUMN 1: Bid Log Ticker (Col span 3 - Left side) */}
              <div className="lg:col-span-3 glass-panel rounded-2xl p-3.5 bg-card/65 border border-border/80 flex flex-col h-[260px] lg:h-[440px] min-h-0 select-none order-2 lg:order-1">
                <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider mb-2.5 block border-b border-border/30 pb-2 flex items-center gap-1.5">
                  <ListCollapse className="w-3.5 h-3.5 text-primary" /> Live Bid Activity
                </span>
                
                <div
                  ref={bidScrollRef}
                  className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs font-semibold"
                >
                  {room.bidHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-600 gap-1 text-center py-10">
                      <span className="text-xl">⏳</span>
                      <span>Waiting for paddles...</span>
                    </div>
                  ) : (
                    room.bidHistory.map((bid, index) => {
                      const isLatest = index === room.bidHistory.length - 1;
                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                            isLatest
                              ? 'bg-primary/10 border-primary/45 text-white shadow-sm glow-gold'
                              : 'bg-background/40 border-border/40 text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-[9px] bg-zinc-800 text-zinc-400 h-4.5 w-4.5 rounded-full flex items-center justify-center font-extrabold shrink-0">
                              {index + 1}
                            </span>
                            <span className="truncate">{bid.bidderName}</span>
                          </div>
                          <span className={`font-black shrink-0 ${isLatest ? 'text-primary' : 'text-zinc-300'}`}>
                            {bid.amount.toFixed(2)} Cr
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* COLUMN 2: Player details Card (Col span 4 - Center) */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center h-auto py-4 lg:py-0 lg:h-[440px] min-h-0 order-1 lg:order-2">
                {activePlayer && (
                  <PlayerCard player={activePlayer} status={room.status} />
                )}
              </div>
 
              {/* COLUMN 3: Toggleable Standings & Live Chat (Col span 5 - Right side, select toggle) */}
              <div className="lg:col-span-5 flex flex-col h-[380px] lg:h-[440px] min-h-0 order-3 lg:order-3">
                <div className="glass-panel rounded-2xl border border-border/80 flex flex-col h-full bg-card/65 overflow-hidden shadow-xl">
                  
                  {/* Toggle Header Switch */}
                  <div className="flex bg-secondary/35 border-b border-border/50 select-none shrink-0">
                    <button
                      onClick={() => setActiveRightTab('standings')}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeRightTab === 'standings'
                          ? 'text-primary border-primary bg-background/25'
                          : 'text-zinc-400 border-transparent hover:text-zinc-200'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" /> Standings
                    </button>
                    <button
                      onClick={() => setActiveRightTab('chat')}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        activeRightTab === 'chat'
                          ? 'text-primary border-primary bg-background/25'
                          : 'text-zinc-400 border-transparent hover:text-zinc-200'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Live Chat
                    </button>
                  </div>
 
                  {/* Toggle Panel content */}
                  <div className="flex-1 p-3.5 overflow-hidden flex flex-col min-h-0">
                    {activeRightTab === 'standings' ? (
                      <TeamList room={room} myPlayerId={playerId} />
                    ) : (
                      <div className="flex-1 flex flex-col min-h-0 -m-3.5">
                        <ChatPanel room={room} myPlayerId={playerId} onSendChat={sendChat} />
                      </div>
                    )}
                  </div>
 
                </div>
              </div>
 
            </div>

          </div>
        )}

      </div>

      {/* Completed Overlay Dialog */}
      {room.status === 'COMPLETED' && (
        <TeamSummary room={room} myPlayerId={playerId} onReplay={handleReplay} />
      )}

      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none w-80 max-w-[calc(100vw-2rem)] select-none">
        <AnimatePresence>
          {notifications.map((notif) => {
            const avatar = PRESETS_AVATARS.find(a => a.id === notif.avatarId);
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9, transition: { duration: 0.2 } }}
                className="pointer-events-auto w-full bg-card/90 backdrop-blur-md border border-red-500/30 shadow-lg shadow-red-950/20 rounded-2xl p-4 flex items-start gap-3 relative overflow-hidden"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                
                {/* Avatar / Icon */}
                <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${avatar ? avatar.color : 'from-zinc-700 to-zinc-800'} flex items-center justify-center shrink-0 shadow`}>
                  <LogOut className="h-5 w-5 text-white animate-pulse" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pr-4">
                  <span className="text-xs font-black text-red-400 block uppercase tracking-wider mb-0.5">
                    Manager Left
                  </span>
                  <p className="text-xs font-semibold text-zinc-200 leading-snug">
                    {notif.message}
                  </p>
                </div>

                {/* Dismiss button */}
                <button
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-extrabold hover:bg-zinc-800/40 h-5 w-5 rounded-full flex items-center justify-center shrink-0 cursor-pointer"
                >
                  ×
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Custom Leave Room Confirmation Dialog */}
      <AnimatePresence>
        {isConfirmLeaveOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmLeaveOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-card border border-border rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center z-10 pointer-events-auto"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
              
              <div className="h-12 w-12 rounded-full bg-red-950/30 flex items-center justify-center mb-4 border border-red-900/40 text-red-500">
                <LogOut className="h-5 w-5 animate-pulse" />
              </div>
              
              <h3 className="text-base font-black text-white">Leave Bidding Room</h3>
              <p className="text-xs text-zinc-400 mt-2 mb-6 max-w-[240px]">
                Are you sure you want to leave the bidding room? Any active bids will remain, and you'll need to re-register to re-enter.
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsConfirmLeaveOpen(false)}
                  className="flex-1 bg-secondary hover:bg-zinc-800 border border-border text-zinc-300 font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsConfirmLeaveOpen(false);
                    handleReplay();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black py-2.5 rounded-xl text-xs cursor-pointer transition-colors shadow-lg shadow-red-600/10"
                >
                  Leave Arena
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function RoomPage({ params }: { params: Promise<PageParams> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-zinc-400 gap-3">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-bold animate-pulse">Loading Room...</span>
      </div>
    }>
      <RoomPageContent params={params} />
    </Suspense>
  );
}
