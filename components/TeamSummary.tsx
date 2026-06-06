import React from 'react';
import { RoomState, TeamState } from '../lib/room-manager';
import { Player } from '../lib/players';
import { Trophy, Share2, Award, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamSummaryProps {
  room: RoomState;
  myPlayerId: string | null;
  onReplay: () => void;
}

export default function TeamSummary({ room, myPlayerId, onReplay }: TeamSummaryProps) {
  const myTeam = room.participants.find((p) => p.id === myPlayerId);
  const isSpectator = myTeam?.isSpectator ?? true;

  // Gather stats for all teams to compute ranks and awards
  const competingTeams = room.participants.filter((p) => !p.isSpectator);

  // Helper: Find highest purchase in the auction
  let maxPurchaseAmount = 0;
  let maxPurchaseBidderId = '';
  let maxPurchasePlayerName = '';

  room.participants.forEach((t) => {
    t.roster.forEach((player) => {
      // Find the bid in history
      const bid = room.bidHistory.find((b) => b.bidderId === t.id && b.amount >= player.basePrice);
      if (bid && bid.amount > maxPurchaseAmount) {
        maxPurchaseAmount = bid.amount;
        maxPurchaseBidderId = t.id;
        maxPurchasePlayerName = player.name;
      }
    });
  });

  const getTeamRosterStats = (team: TeamState) => {
    const totalPlayers = team.roster.length;
    const ratingSum = team.roster.reduce((sum, p) => sum + p.rating, 0);
    const avgRating = totalPlayers > 0 ? Math.round(ratingSum / totalPlayers) : 0;
    
    const spent = room.settings.budget - team.purse;
    const overseas = team.roster.filter((p) => p.nationality === 'Overseas').length;
    const batsmen = team.roster.filter((p) => p.role === 'Batsman').length;
    const bowlers = team.roster.filter((p) => p.role === 'Bowler').length;
    const allRounders = team.roster.filter((p) => p.role === 'All-Rounder').length;
    const keepers = team.roster.filter((p) => p.role === 'Wicketkeeper').length;

    // Roster completeness checks
    const hasMinXI = totalPlayers >= 11;
    const hasBalancedCore = batsmen >= 3 && bowlers >= 3 && allRounders >= 2 && keepers >= 1;

    // Achievements calculation
    const achievements: { title: string; desc: string; icon: string }[] = [];

    if (team.roster.some((p) => p.rating >= 88 && p.basePrice <= 1.5)) {
      achievements.push({ title: "Moneyball Master", desc: "Drafted high-rated talent under budget", icon: "💰" });
    }
    if (team.id === maxPurchaseBidderId) {
      achievements.push({ title: "Bank Breaker", desc: `Bought ${maxPurchasePlayerName} for record ${maxPurchaseAmount.toFixed(2)} Cr`, icon: "🔨" });
    }
    if (team.roster.some((p) => p.name === 'Jasprit Bumrah' || p.name === 'Pat Cummins')) {
      achievements.push({ title: "Golden Arm", desc: "Secured world-class pace spearhead", icon: "🔥" });
    }
    if (overseas >= 5) {
      achievements.push({ title: "Global Force", desc: "Loaded squad with top international talent", icon: "✈️" });
    }
    if (hasBalancedCore && hasMinXI) {
      achievements.push({ title: "Franchise Core", desc: "Constructed standard balanced playing roster", icon: "🛡️" });
    }

    // Final Power score (penalised heavily if squad size < 11)
    let powerScore = avgRating;
    if (totalPlayers < 11) {
      powerScore = Math.max(0, avgRating - (11 - totalPlayers) * 8);
    } else if (hasBalancedCore) {
      powerScore += 3; // Chemistry bonus
    }

    return {
      avgRating,
      spent,
      overseas,
      batsmen,
      bowlers,
      allRounders,
      keepers,
      hasMinXI,
      hasBalancedCore,
      achievements,
      powerScore
    };
  };

  // Pre-calculate stats for leaderboard
  const teamStandings = competingTeams.map((team) => {
    const stats = getTeamRosterStats(team);
    return {
      team,
      ...stats
    };
  }).sort((a, b) => b.powerScore - a.powerScore);

  const myStats = myTeam ? getTeamRosterStats(myTeam) : null;
  const myRankIndex = teamStandings.findIndex((s) => s.team.id === myPlayerId);
  const myRank = myRankIndex !== -1 ? myRankIndex + 1 : null;

  const handleShare = () => {
    if (!myTeam || !myStats) return;
    const shareText = `🏏 IPL Auction Arena Summary:\n🏆 Roster: ${myTeam.teamName}\n🔥 Power Score: ${myStats.powerScore}/100\n👥 Squad Count: ${myTeam.roster.length}/15\n💰 Spent: ${myStats.spent.toFixed(2)} Cr\nPlay now: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'IPL Auction Arena - Squad Summary',
        text: shareText,
        url: window.location.origin
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Squad Summary copied to clipboard! Share it with friends.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl bg-card border border-border rounded-3xl p-6 md:p-8 shadow-2xl relative my-8"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />

        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-primary/10 rounded-full border border-primary/20 text-primary mb-3">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-white">Auction Grand Finale</h2>
          <p className="text-sm text-zinc-500 mt-1">Standings and ratings evaluated by team quality, budget, and balance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Leaderboard list */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block border-b border-border/30 pb-2">
              Final Franchise Leaderboard
            </span>

            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {teamStandings.map((entry, index) => {
                const isMyRank = entry.team.id === myPlayerId;
                return (
                  <div
                    key={entry.team.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isMyRank
                        ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                        : 'border-border/80 bg-background/30'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`text-lg font-black h-8 w-8 rounded-full flex items-center justify-center border ${
                        index === 0 ? 'bg-primary border-primary text-background text-glow-gold' :
                        index === 1 ? 'bg-zinc-300 border-zinc-300 text-background' :
                        index === 2 ? 'bg-amber-700 border-amber-700 text-white' :
                        'bg-zinc-800 border-border text-zinc-400'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-sm">{entry.team.teamName}</h4>
                          {entry.team.isAI && (
                            <span className="text-[9px] bg-zinc-800 border border-border text-zinc-400 px-1 rounded">AI</span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-500">Avg Rating: {entry.avgRating} • Squad: {entry.team.roster.length}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-primary flex items-center gap-1.5 justify-end">
                        <Sparkles className="w-4 h-4 text-primary shrink-0" />
                        {entry.powerScore} <span className="text-[10px] text-zinc-500">PTS</span>
                      </div>
                      {!entry.hasMinXI && (
                        <span className="text-[9px] text-red-500 font-extrabold flex items-center gap-1 mt-0.5 justify-end">
                          <AlertCircle className="w-3 h-3" /> Incomplete Squad
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Personal Squad grading & awards */}
          <div className="lg:col-span-5 space-y-6">
            {!isSpectator && myTeam && myStats ? (
              <>
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block border-b border-border/30 pb-2">
                  Your Franchise Scorecard
                </span>

                <div className="bg-background/40 border border-border p-5 rounded-2xl flex flex-col gap-4">
                  {/* Big Power score circle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white">{myTeam.teamName}</h3>
                      <span className="text-xs text-zinc-500">Rank: #{myRank} of {competingTeams.length}</span>
                    </div>
                    <div className="h-16 w-16 bg-primary/10 border border-primary rounded-2xl flex flex-col items-center justify-center text-primary glow-gold shrink-0">
                      <span className="text-xs font-bold text-zinc-500 leading-none">SCORE</span>
                      <span className="text-xl font-black leading-none mt-1">{myStats.powerScore}</span>
                    </div>
                  </div>

                  {/* Summary of roster breakdown */}
                  <div className="grid grid-cols-2 gap-3.5 text-xs text-zinc-400 bg-card/60 p-3.5 rounded-xl border border-border/50">
                    <div>Batsmen: <span className="text-white font-extrabold">{myStats.batsmen}</span></div>
                    <div>Bowlers: <span className="text-white font-extrabold">{myStats.bowlers}</span></div>
                    <div>All-Rounders: <span className="text-white font-extrabold">{myStats.allRounders}</span></div>
                    <div>Keepers: <span className="text-white font-extrabold">{myStats.keepers}</span></div>
                    <div className="col-span-2 border-t border-border/30 pt-2 flex justify-between mt-1 text-[11px]">
                      <span>Spent: <span className="text-primary font-black">{myStats.spent.toFixed(2)} Cr</span></span>
                      <span>Overseas: <span className="text-purple-400 font-black">{myStats.overseas}/6</span></span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-zinc-500 block">
                      Unlocked Achievements ({myStats.achievements.length})
                    </span>

                    {myStats.achievements.length === 0 ? (
                      <div className="text-xs text-zinc-500 italic py-2 text-center">
                        No special milestones achieved this season.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {myStats.achievements.map((ach, idx) => (
                          <div key={idx} className="bg-secondary/40 border border-border/60 rounded-xl p-2.5 flex items-center gap-3">
                            <span className="text-2xl shrink-0">{ach.icon}</span>
                            <div>
                              <span className="text-xs font-extrabold text-zinc-200 block">{ach.title}</span>
                              <span className="text-[10px] text-zinc-500 leading-none">{ach.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sharing and actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-white font-bold py-3.5 border border-border rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-primary" />
                    Share Team Card
                  </button>
                  <button
                    onClick={onReplay}
                    className="flex-1 bg-primary hover:bg-primary/95 text-background font-black py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Play Again
                  </button>
                </div>
              </>
            ) : (
              /* Spectator summary cards */
              <div className="bg-background/40 border border-border p-6 rounded-2xl text-center space-y-4">
                <span className="text-3xl">👁️</span>
                <h3 className="font-extrabold text-white text-base">Spectator Overview</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  You joined this room as a spectator. The auction has concluded. You can review the franchise standings on the left or create your own room to join the action!
                </p>
                <button
                  onClick={onReplay}
                  className="w-full bg-primary hover:bg-primary/95 text-background font-black py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Host New Auction
                </button>
              </div>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
