'use client';

import React, { useState, useEffect, use, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuctionStore } from '../../../store/useAuctionStore';
import AvatarPicker from '../../../components/AvatarPicker';
import { PRESETS_AVATARS } from '../../../lib/players';
import PlayerCard from '../../../components/PlayerCard';
import TeamList from '../../../components/TeamList';
import BiddingControls from '../../../components/BiddingControls';
import ChatPanel from '../../../components/ChatPanel';
import TeamSummary from '../../../components/TeamSummary';
import { 
  Trophy, Users, Share2, Copy, Play, ArrowLeft, 
  UserPlus, ShieldAlert, Wifi, Check, MessageSquare, Mic, ListCollapse
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
      <header className="w-full bg-card/60 border-b border-border/60 py-3 px-6 flex items-center justify-between backdrop-blur-md z-35 select-none shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReplay}
            className="p-2 bg-secondary hover:bg-zinc-800 border border-border/80 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Leave room"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider leading-none">MULTIPLAYER STAGE</span>
            <span className="text-base font-extrabold text-white leading-none mt-1">
              Room <span className="text-primary font-black text-glow-gold">{roomId}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
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
            className="flex items-center gap-1.5 bg-secondary hover:bg-zinc-800 border border-border text-white text-xs font-bold px-4 py-2 rounded-xl transition-all animate-pulse"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedLink ? 'Copied Invite' : 'Copy Invite Link'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 min-h-0 z-30 justify-start select-none">
        
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
              <div className="w-full bg-card border border-border/80 p-3.5 rounded-2xl flex flex-col lg:flex-row items-center gap-4 justify-between shrink-0 shadow-lg select-none">
                
                {/* A. Active Player Profile & Countdown timer */}
                <div className="flex items-center gap-3.5 border-b lg:border-b-0 lg:border-r border-border/40 pb-3.5 lg:pb-0 lg:pr-4 shrink-0">
                  <div className="flex flex-col">
                    <h3 className="font-extrabold text-white text-sm leading-none truncate max-w-[140px]">
                      {activePlayer.name}
                    </h3>
                    <span className="text-[9px] text-zinc-500 font-black uppercase mt-1 block">
                      {activePlayer.role} • Rated {activePlayer.rating}
                    </span>
                  </div>

                  {/* Timer Box */}
                  <div className="flex items-center gap-1.5 bg-background border border-border/80 px-2.5 py-1.5 rounded-xl shrink-0">
                    {room.status === 'BIDDING' && (
                      <span className={`h-2 w-2 rounded-full ${room.timer <= 5 ? 'bg-red-500 animate-ping' : 'bg-primary'}`} />
                    )}
                    <span className={`text-[11px] font-black tabular-nums tracking-wide ${
                      room.timer <= 5 && room.status === 'BIDDING' ? 'text-red-500 animate-pulse' : 'text-zinc-200'
                    }`}>
                      {room.timer}s
                    </span>
                  </div>
                </div>

                {/* B. Live Pricing & Bid Leader details & Commentary ticker */}
                <div className="flex-1 flex items-center justify-around gap-4 border-b lg:border-b-0 lg:border-r border-border/40 pb-3.5 lg:pb-0 lg:px-4 min-w-0">
                  <div className="flex items-center gap-5.5 shrink-0">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Price</span>
                      <span className="text-base font-black text-primary text-glow-gold leading-none mt-1">
                        {room.currentBid === 0 ? 'Base' : `${room.currentBid.toFixed(2)} Cr`}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Leader</span>
                      <span className="text-[11px] font-black text-white leading-none mt-1 block truncate max-w-[95px]">
                        {room.highestBidderId ? getBidderName(room.highestBidderId) : 'None'}
                      </span>
                    </div>
                  </div>

                  {/* Commentary ticker bubble */}
                  <div className="hidden xl:flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 max-w-[200px] min-w-0 select-none">
                    <Mic className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
                    <span className="text-zinc-300 text-[10px] font-semibold italic truncate">
                      "{getCommentarySpeech()}"
                    </span>
                  </div>
                </div>

                {/* C. Horizontal Increments and Bid Paddles */}
                <div className="flex items-center justify-end shrink-0 w-full lg:w-auto">
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
              <div className="lg:col-span-3 glass-panel rounded-2xl p-3.5 bg-card/65 border border-border/80 flex flex-col h-[440px] min-h-0 select-none">
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
              <div className="lg:col-span-4 flex flex-col justify-center items-center h-[440px] min-h-0">
                {activePlayer && (
                  <PlayerCard player={activePlayer} status={room.status} />
                )}
              </div>

              {/* COLUMN 3: Toggleable Standings & Live Chat (Col span 5 - Right side, select toggle) */}
              <div className="lg:col-span-5 flex flex-col h-[440px] min-h-0">
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
