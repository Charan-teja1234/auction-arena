import React from 'react';
import { Player } from '../lib/players';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { BatIcon, BallIcon, GloveIcon, AllRounderIcon } from './CricketIcons';

interface PlayerCardProps {
  player: Player;
  status: 'REVEAL' | 'BIDDING' | 'SOLD' | 'UNSOLD' | 'COMPLETED';
}

export default function PlayerCard({ player, status }: PlayerCardProps) {
  const isSuperstar = player.rating >= 93;
  const isOverseas = player.nationality === 'Overseas';

  // Card themes
  const borderClass = isSuperstar
    ? 'border border-primary/60 glow-gold'
    : isOverseas
    ? 'border border-purple-500/40 shadow-purple-500/5 shadow-md'
    : 'border border-blue-500/20';

  const glowBackground = isSuperstar
    ? 'bg-gradient-to-b from-[#141612] to-[#0c0f18]'
    : 'bg-gradient-to-b from-[#0c0f18] to-[#101524]';

  return (
    <motion.div
      key={player.id}
      initial={{ y: 10, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -10, opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`w-full max-w-xs rounded-2xl p-4.5 relative overflow-hidden flex flex-col gap-3.5 ${borderClass} ${glowBackground} shadow-lg`}
    >
      {/* Top Header Row */}
      <div className="flex justify-between items-center z-10 font-sans">
        <span className={`text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full ${
          isOverseas 
            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/10' 
            : 'bg-blue-500/20 text-blue-300 border border-blue-500/10'
        }`}>
          {player.nationality}
        </span>
        
        {/* Rating badge */}
        <div className="h-9 w-9 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center font-black text-sm text-primary text-glow-gold">
          {player.rating}
        </div>
      </div>

      {/* Player Icon and Name */}
      <div className="flex items-center gap-3 z-10 font-sans">
        <div className={`h-13 w-13 rounded-xl bg-gradient-to-tr ${
          player.role === 'Batsman' ? 'from-orange-500 to-amber-500 text-white' :
          player.role === 'Bowler' ? 'from-emerald-500 to-teal-500 text-white' :
          player.role === 'Wicketkeeper' ? 'from-sky-500 to-blue-500 text-white' :
          'from-purple-500 to-indigo-500 text-white'
        } flex items-center justify-center shadow-inner select-none shrink-0`}>
          {/* Vector-based modern, realistic role icons */}
          {player.role === 'Batsman' && <BatIcon className="h-6 w-6" />}
          {player.role === 'Bowler' && <BallIcon className="h-6 w-6" />}
          {player.role === 'Wicketkeeper' && <GloveIcon className="h-6 w-6" />}
          {player.role === 'All-Rounder' && <AllRounderIcon className="h-6 w-6" />}
        </div>
        
        <div className="truncate">
          <h2 className="text-base font-black tracking-tight text-white truncate leading-tight">
            {player.name}
          </h2>
          <span className="text-[10px] text-zinc-500 font-extrabold uppercase mt-0.5 block">
            {player.role}
          </span>
        </div>
      </div>

      {/* Stats Table */}
      <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-border/30 pt-3 text-zinc-400 font-sans">
        <div>Style: <span className="text-zinc-200 font-bold block truncate">{player.battingStyle}</span></div>
        <div>Bowl: <span className="text-zinc-200 font-bold block truncate">{player.bowlingStyle}</span></div>
        <div>Age: <span className="text-zinc-200 font-bold block">{player.age} yrs</span></div>
        <div>Previous: <span className="text-zinc-200 font-bold block">{player.previousTeam}</span></div>
      </div>

      {/* Recent Form */}
      <div className="flex flex-col gap-1 font-sans">
        <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Form</span>
        <div className="flex gap-1 overflow-x-auto pb-0.5">
          {player.recentForm.slice(0, 4).map((stat, idx) => (
            <span
              key={idx}
              className="bg-secondary/60 px-2 py-1 rounded text-[10px] font-bold text-zinc-300 border border-border/50 shrink-0"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* Base Price badge */}
      <div className="bg-background/80 rounded-xl p-2.5 border border-border/80 flex items-center justify-between text-xs font-sans">
        <span className="font-bold text-zinc-500 uppercase text-[10px]">Base Price</span>
        <span className="font-black text-primary">{player.basePrice.toFixed(2)} Cr</span>
      </div>
    </motion.div>
  );
}
