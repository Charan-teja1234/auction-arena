import React, { useState } from 'react';
import { RoomState, TeamState } from '../lib/room-manager';
import { PRESETS_AVATARS, Player } from '../lib/players';
import { ChevronDown, ChevronUp, Users, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FranchiseEmblem, BatIcon, BallIcon, GloveIcon, AllRounderIcon } from './CricketIcons';

interface TeamListProps {
  room: RoomState;
  myPlayerId: string | null;
}

export default function TeamList({ room, myPlayerId }: TeamListProps) {
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTeamId(expandedTeamId === id ? null : id);
  };

  const getAvatarInfo = (avatarId: string) => {
    return PRESETS_AVATARS.find((a) => a.id === avatarId) || PRESETS_AVATARS[0];
  };

  const activeTeams = room.participants.filter((p) => !p.isSpectator);
  const spectators = room.participants.filter((p) => p.isSpectator);

  const renderRoleSection = (title: string, icon: React.ReactNode, players: Player[], colorClass: string, bgClass: string) => {
    if (players.length === 0) return null;
    return (
      <div className="space-y-1.5 font-sans">
        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${colorClass}`}>
          <span className="shrink-0">{icon}</span>
          <span>{title} ({players.length})</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {players.map((player) => (
            <div
              key={player.id}
              className={`p-2 rounded-xl border flex items-center justify-between transition-all ${bgClass}`}
            >
              <div className="truncate pr-1">
                <span className="font-bold text-zinc-100 text-[11px] block truncate">
                  {player.name}
                </span>
                <span className="text-[9px] text-zinc-500 font-semibold block">
                  {player.nationality === 'Overseas' ? '✈️ Overseas' : '🇮🇳 Indian'}
                </span>
              </div>
              <span className="text-[10px] font-black bg-background/50 px-1.5 py-0.5 rounded text-primary border border-border/40 shrink-0">
                {player.rating}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-3.5 h-full min-h-0 bg-transparent font-sans">
      {/* Franchise Standings */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0 select-none">
        {activeTeams.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-600 text-center py-10">
            <Users className="w-8 h-8 opacity-40 mb-2" />
            <span className="text-xs font-semibold">No active managers in the lobby.</span>
          </div>
        ) : (
          activeTeams.map((team) => {
            const avatar = getAvatarInfo(team.avatarId);
            const isMe = team.id === myPlayerId;
            const isExpanded = expandedTeamId === team.id;
            const isLowPurse = team.purse < 10.0;
            
            const overseasCount = team.roster.filter((p) => p.nationality === 'Overseas').length;
            const keeperCount = team.roster.filter((p) => p.role === 'Wicketkeeper').length;

            const batsmen = team.roster.filter((p) => p.role === 'Batsman');
            const wicketkeepers = team.roster.filter((p) => p.role === 'Wicketkeeper');
            const allRounders = team.roster.filter((p) => p.role === 'All-Rounder');
            const bowlers = team.roster.filter((p) => p.role === 'Bowler');

            return (
              <div
                key={team.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isMe
                    ? 'border-primary/55 bg-primary/5 shadow-md shadow-primary/2'
                    : 'border-border/60 bg-card/40 hover:bg-card/75'
                }`}
              >
                {/* Header Summary bar */}
                <div
                  onClick={() => toggleExpand(team.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    {/* Modern Vector Franchise Emblem */}
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${avatar.color} flex items-center justify-center shadow-md shrink-0`}>
                      <FranchiseEmblem avatarId={team.avatarId} className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-black tracking-tight ${isMe ? 'text-primary' : 'text-white'}`}>
                          {team.teamName}
                        </span>
                        {isMe && (
                          <span className="bg-primary/20 text-primary text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                            YOU
                          </span>
                        )}
                        {team.isAI && (
                          <span className="bg-zinc-800 text-zinc-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-border/80 uppercase">
                            BOT
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500 font-semibold block mt-0.5">
                        Manager: {team.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Purse and counters */}
                    <div className="text-right">
                      <span className={`text-sm font-black tracking-wide block ${
                        isLowPurse ? 'text-red-500 animate-pulse' : 'text-primary'
                      }`}>
                        {team.purse.toFixed(2)} Cr
                      </span>
                      <div className="flex gap-2 text-[10px] text-zinc-500 font-extrabold mt-0.5">
                        <span title="Squad size">👥 {team.roster.length}</span>
                        <span title="Overseas players" className={overseasCount >= 6 ? 'text-purple-400 font-black' : ''}>
                          ✈️ {overseasCount}
                        </span>
                        <span title="Wicketkeepers" className={keeperCount > 0 ? 'text-emerald-400 font-black' : ''}>
                          🧤 {keeperCount}
                        </span>
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                </div>

                {/* Categorized Squad Details expanded view */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-border/40 bg-background/55"
                    >
                      <div className="p-4.5 space-y-4">
                        {team.roster.length === 0 ? (
                          <div className="text-center py-4 text-zinc-600 font-bold italic text-xs">
                            Roster is empty. Bids placed will land here.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Role based divisions with modern vector icons */}
                            {renderRoleSection("Batsmen", <BatIcon className="h-3.5 w-3.5" />, batsmen, "text-amber-400", "bg-amber-500/5 border-amber-500/15 hover:border-amber-500/25")}
                            {renderRoleSection("Wicketkeepers", <GloveIcon className="h-3.5 w-3.5" />, wicketkeepers, "text-sky-400", "bg-sky-500/5 border-sky-500/15 hover:border-sky-500/25")}
                            {renderRoleSection("All-Rounders", <AllRounderIcon className="h-3.5 w-3.5" />, allRounders, "text-purple-400", "bg-purple-500/5 border-purple-500/15 hover:border-purple-500/25")}
                            {renderRoleSection("Bowlers", <BallIcon className="h-3.5 w-3.5" />, bowlers, "text-emerald-400", "bg-emerald-500/5 border-emerald-500/15 hover:border-emerald-500/25")}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Spectators Footer */}
      {spectators.length > 0 && (
        <div className="glass-panel rounded-2xl p-3 border border-border bg-card/40 flex items-center gap-2 shrink-0 select-none">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-zinc-500" /> Spectators ({spectators.length}):
          </span>
          <div className="flex gap-1.5 overflow-x-auto text-xs text-zinc-300 font-semibold">
            {spectators.map((s) => (
              <span key={s.id} className="bg-background px-2.5 py-1 rounded-full border border-border">
                👁️ {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
