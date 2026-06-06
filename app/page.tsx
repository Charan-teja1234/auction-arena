'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuctionStore } from '../store/useAuctionStore';
import { Trophy, Users, Zap, Shield, Play, Settings, Coins, Hourglass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock database for the landing page auto-playing visual simulator
const SIMULATOR_PLAYERS = [
  { name: "Virat Kohli", role: "Batsman", rating: 96, price: 2.0, maxPrice: 16.5, team: "RCB Kings", icon: "👑", color: "from-red-500 to-rose-700" },
  { name: "Jasprit Bumrah", role: "Bowler", rating: 98, price: 2.0, maxPrice: 18.25, team: "Mumbai Titans", icon: "🥎", color: "from-blue-500 to-indigo-600" },
  { name: "Heinrich Klaasen", role: "Wicketkeeper", rating: 94, price: 2.0, maxPrice: 14.5, team: "Sunrisers", icon: "🧤", color: "from-orange-500 to-red-600" }
];

export default function LandingPage() {
  const router = useRouter();
  
  // Zustand Store
  const { name, teamName } = useAuctionStore();

  // Local Onboarding Form states
  const [roomCode, setRoomCode] = useState('');

  // Custom Room Settings
  const [maxTeams, setMaxTeams] = useState(6);
  const [startingBudget, setStartingBudget] = useState(100);
  const [timerDuration, setTimerDuration] = useState(15);
  const [poolSize, setPoolSize] = useState(15);

  // Configuration Panel view states
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  // AUTO-PLAYING HERO BIDDING SIMULATOR STATE
  const [simIndex, setSimIndex] = useState(0);
  const [simPrice, setSimPrice] = useState(2.0);
  const [simBidder, setSimBidder] = useState('Opening Bid');
  const [simStatus, setSimStatus] = useState<'BIDDING' | 'SOLD'>('BIDDING');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const active = SIMULATOR_PLAYERS[simIndex];

    const runSimulation = () => {
      if (simStatus === 'BIDDING') {
        if (simPrice < active.maxPrice) {
          // Increment bid
          timer = setTimeout(() => {
            const minInc = simPrice < 5 ? 0.50 : 1.0;
            const nextPrice = parseFloat((simPrice + minInc).toFixed(2));
            setSimPrice(nextPrice);
            setSimBidder(
              simBidder === 'Opening Bid' ? 'Mumbai Titans' :
              simBidder === 'Mumbai Titans' ? 'RCB Kings' :
              simBidder === 'RCB Kings' ? 'Chennai Super Kings' : 'Mumbai Titans'
            );
          }, 1500);
        } else {
          // Trigger sold animation
          setSimStatus('SOLD');
          setSimBidder(active.team);
          timer = setTimeout(() => {
            // Move to next player after 3 seconds of SOLD state
            setSimIndex((prev) => (prev + 1) % SIMULATOR_PLAYERS.length);
            setSimStatus('BIDDING');
            setSimBidder('Opening Bid');
          }, 3500);
        }
      }
    };

    runSimulation();
    return () => clearTimeout(timer);
  }, [simPrice, simIndex, simStatus]);

  // Reset price when sim index changes
  useEffect(() => {
    setSimPrice(SIMULATOR_PLAYERS[simIndex].price);
  }, [simIndex]);

  const handleActionClick = () => {
    setShowConfigPanel(true);
  };

  const handleLaunchArena = (e: React.FormEvent) => {
    e.preventDefault();
    executeAction();
  };

  const executeAction = () => {
    const generatedCode = `IPL-${Math.floor(1000 + Math.random() * 9000)}`;
    // Append settings to query params
    const settingsQuery = `?maxTeams=${maxTeams}&budget=${startingBudget}&timer=${timerDuration}&pool=${poolSize}`;
    router.push(`/room/${generatedCode}${settingsQuery}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-background overflow-hidden relative font-sans">
      
      {/* Premium sports grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(226,177,60,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-45 z-0" />

      {/* Glow shapes */}
      <div className="absolute top-[-20%] left-[-20%] w-[65%] h-[65%] rounded-full bg-primary/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/4 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-border/40 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2.5 select-none">
          <div className="bg-primary p-2 rounded-xl text-background font-black flex items-center justify-center shadow-lg shadow-primary/20">
            <Trophy className="w-5.5 h-5.5" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            IPL AUCTION <span className="text-primary text-glow-gold">ARENA</span>
          </span>
        </div>
        <div className="flex items-center gap-4 select-none">
          {name && (
            <div className="hidden sm:flex items-center gap-2.5 bg-card/70 px-4 py-2 rounded-full border border-border">
              <span className="h-2 w-2 rounded-full bg-cricket-green animate-pulse" />
              <span className="text-xs font-black text-zinc-300">
                {name} <span className="text-zinc-500">({teamName})</span>
              </span>
            </div>
          )}
          <button
            onClick={() => router.push('/room/IPL-ARENA')}
            className="flex items-center gap-1.5 bg-secondary/80 hover:bg-secondary text-white border border-border/80 px-4.5 py-2.5 rounded-xl text-xs font-black transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
          >
            <Zap className="w-4 h-4 text-primary" />
            Arena Match
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 min-h-0">
        
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-7 text-center lg:text-left select-none">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-wider text-primary">Esports Cricket Auction Simulator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white max-w-2xl mx-auto lg:mx-0">
            Build Your Dream IPL Team. <span className="text-primary text-glow-gold">Outbid Everyone.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Draft premier cricketers in a real-time multiplayer bidding war. Outsmart friends or strategic bot managers, optimize your 100 Crore salary budget, and qualify for championship roster grading.
          </p>

          {/* Configuration Settings Panel Drawer (Responsive Layout) */}
          <div className="max-w-md mx-auto lg:mx-0 p-5 rounded-2xl bg-card/75 border border-border/80 shadow-2xl relative">
            
            <AnimatePresence mode="wait">
              {!showConfigPanel ? (
                /* Landing triggers */
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button
                      onClick={handleActionClick}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-background font-black py-4 rounded-xl transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-primary/25 cursor-pointer text-sm"
                    >
                      <Play className="w-4.5 h-4.5 fill-current" />
                      Host Private Room
                    </button>
                    
                    <button
                      onClick={() => router.push('/room/IPL-ARENA')}
                      className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-white border border-border/85 font-bold py-4 rounded-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm"
                    >
                      <Users className="w-4.5 h-4.5 text-primary" />
                      Public Matchmaking
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center py-1.5">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
                    <span className="relative bg-[#0b0f19] px-3.5 text-[10px] text-zinc-500 font-extrabold tracking-widest uppercase">Or Join with Code</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      placeholder="ENTER ROOM CODE (e.g. IPL-9428)"
                      maxLength={10}
                      className="flex-1 bg-background border border-border rounded-xl px-4 text-center font-bold tracking-widest text-white uppercase focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs"
                    />
                    <button
                      onClick={() => {
                        const code = roomCode.trim().toUpperCase();
                        if (!code) {
                          alert("Please enter a room code!");
                          return;
                        }
                        router.push(`/room/${code}`);
                      }}
                      className="bg-secondary hover:bg-secondary/80 border border-border text-white px-5 rounded-xl text-xs font-black cursor-pointer"
                    >
                      Join
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Configurator Settings Panel */
                <motion.form
                  onSubmit={handleLaunchArena}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-2.5 mb-1 select-none">
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Room Rule Configuration
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowConfigPanel(false)}
                      className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest cursor-pointer"
                    >
                      Back
                    </button>
                  </div>

                  {/* Private Host Rule sliders */}
                  <div className="grid grid-cols-2 gap-3.5 bg-background/55 p-3.5 rounded-xl border border-border/80 text-[10px] font-sans">
                    <div className="space-y-1.5">
                      <span className="text-zinc-500 font-bold flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-primary" /> Purse Budget</span>
                      <select
                        value={startingBudget}
                        onChange={(e) => setStartingBudget(parseInt(e.target.value))}
                        className="bg-card border border-border rounded-lg p-1.5 text-xs text-white w-full focus:outline-none"
                      >
                        <option value={80}>80 Crores</option>
                        <option value={100}>100 Crores</option>
                        <option value={120}>120 Crores</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-zinc-500 font-bold flex items-center gap-1"><Users className="w-3.5 h-3.5 text-primary" /> Max Teams</span>
                      <select
                        value={maxTeams}
                        onChange={(e) => setMaxTeams(parseInt(e.target.value))}
                        className="bg-card border border-border rounded-lg p-1.5 text-xs text-white w-full focus:outline-none"
                      >
                        <option value={4}>4 Teams</option>
                        <option value={6}>6 Teams</option>
                        <option value={8}>8 Teams</option>
                        <option value={10}>10 Teams</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 mt-1.5">
                      <span className="text-zinc-500 font-bold flex items-center gap-1"><Hourglass className="w-3.5 h-3.5 text-primary" /> Bid Timer</span>
                      <select
                        value={timerDuration}
                        onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                        className="bg-card border border-border rounded-lg p-1.5 text-xs text-white w-full focus:outline-none"
                      >
                        <option value={10}>10 Seconds</option>
                        <option value={15}>15 Seconds</option>
                        <option value={20}>20 Seconds</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 mt-1.5">
                      <span className="text-zinc-500 font-bold flex items-center gap-1"><Settings className="w-3.5 h-3.5 text-primary" /> Roster Pool</span>
                      <select
                        value={poolSize}
                        onChange={(e) => setPoolSize(parseInt(e.target.value))}
                        className="bg-card border border-border rounded-lg p-1.5 text-xs text-white w-full focus:outline-none"
                      >
                        <option value={10}>10 Cricketers</option>
                        <option value={15}>15 Cricketers</option>
                        <option value={20}>20 Cricketers</option>
                        <option value={25}>25 Cricketers</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-background font-black py-3.5 rounded-xl text-xs shadow-lg shadow-primary/10 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    Launch Private Arena 🚀
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Right Preview Column (TV Sports Broadcast Auto-Playing Simulator) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-sm relative glass-panel rounded-3xl p-5 shadow-2xl border-primary/20 flex flex-col gap-5.5 overflow-hidden bg-card/65">
            {/* Top flashing broadcast indicator */}
            <div className="flex items-center justify-between border-b border-border/50 pb-3 select-none">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                LOBBY SIMULATOR DEMO
              </div>
              <div className="bg-primary/10 text-primary border border-primary/25 px-2.5 py-0.5 rounded text-[9px] font-black uppercase">
                100 Cr Purse
              </div>
            </div>

            {/* Auto-playing active player card details */}
            <div className="bg-gradient-to-b from-[#111625] to-[#151f33] border border-border rounded-2xl p-4.5 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-2.5 right-2.5 bg-zinc-800 text-primary border border-zinc-700 text-xs font-black h-8 w-8 rounded-lg flex items-center justify-center">
                {SIMULATOR_PLAYERS[simIndex].rating}
              </div>
              <div className="flex gap-3.5 items-center">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-tr ${SIMULATOR_PLAYERS[simIndex].color} flex items-center justify-center text-3xl select-none shrink-0 shadow-inner`}>
                  {SIMULATOR_PLAYERS[simIndex].icon}
                </div>
                <div className="truncate">
                  <h3 className="font-extrabold text-white text-base truncate leading-none">
                    {SIMULATOR_PLAYERS[simIndex].name}
                  </h3>
                  <div className="flex gap-2 mt-2 select-none">
                    <span className="bg-zinc-800 text-[9px] text-zinc-300 font-extrabold px-2 py-0.5 rounded uppercase">{SIMULATOR_PLAYERS[simIndex].role}</span>
                    <span className="bg-primary/20 text-[9px] text-primary font-extrabold px-2 py-0.5 rounded uppercase">Indian</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Price / Status dashboard */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-background/70 p-3.5 rounded-xl border border-border relative">
                <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Current Bid</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={simPrice}
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-black text-primary text-glow-gold select-all"
                  >
                    {simPrice.toFixed(2)} Cr
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-2 text-xs justify-center bg-secondary/40 py-2 rounded-xl text-zinc-400 select-none">
                <span className={`h-2 w-2 rounded-full ${simStatus === 'SOLD' ? 'bg-emerald-500' : 'bg-primary animate-ping'}`} />
                Status: <span className="text-white font-extrabold">{simStatus === 'SOLD' ? `Sold to ${simBidder}` : `Bidding (${simBidder})`}</span>
              </div>
            </div>

            {/* Scrolling commentary ticker */}
            <div className="bg-background/80 rounded-xl p-3 border border-border text-center text-xs font-semibold text-primary/80 select-none min-h-[42px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={simPrice + simStatus}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                >
                  {simStatus === 'SOLD' ? (
                    `🔨 "SOLD! ${SIMULATOR_PLAYERS[simIndex].name} to ${simBidder} for ${simPrice.toFixed(2)} Crore!"`
                  ) : (
                    `🎤 "${simBidder} bids ${simPrice.toFixed(2)} Crore. Looking for counter bids!"`
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </main>

      {/* Stats counter strip */}
      <section className="w-full border-t border-border bg-card/25 backdrop-blur-sm z-10 py-6 select-none">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black text-white">4,800+</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Arenas</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black text-primary text-glow-gold">100 Cr</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Purses Configured</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black text-white">6 STRATEGIES</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Competitive Bots</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black text-white">100% GUEST</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Instant Drafts</p>
          </div>
        </div>
      </section>

      {/* Steps timeline section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 border-t border-border/40 z-10 select-none">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">How To Dominate The Auction</h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">Four simple steps to enter the arena, bid against friends, and construct a championship roster.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <Zap className="w-5 h-5" />, title: "1. Select Identity", desc: "Pick your emblem, enter your manager name, and setup your guest profile instantly." },
            { icon: <Shield className="w-5 h-5" />, title: "2. Invite Friends or bots", desc: "Instantly copy share links for friends or populate vacant slots with advanced bots." },
            { icon: <Trophy className="w-5 h-5" />, title: "3. Duel Real-Time", desc: "Outbid opponents using quick actions. Bid increments adapt and timers extend dynamically." },
            { icon: <Settings className="w-5 h-5" />, title: "4. Roster Checking", desc: "Follow squad caps (max overseas, wicketkeeper requisites) to qualify for grading." }
          ].map((step, idx) => (
            <div key={idx} className="bg-card border border-border/80 p-5 rounded-2xl space-y-3.5 hover:border-primary/45 transition-colors group">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="font-extrabold text-white text-base leading-tight">{step.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-[10px] text-zinc-600 border-t border-border/40 mt-auto select-none">
        &copy; {new Date().getFullYear()} IPL Auction Arena. Created for ultimate cricket fans. No real money involved.
      </footer>
    </div>
  );
}
