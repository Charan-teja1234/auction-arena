import React, { useEffect, useRef } from 'react';
import { RoomState } from '../lib/room-manager';
import { Mic, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuctioneerPanelProps {
  room: RoomState;
}

export default function AuctioneerPanel({ room }: AuctioneerPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll bid history to the bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [room.bidHistory, room.chat]);

  const activePlayer = room.playerPool[room.activePlayerIndex];

  // Helper to find the team name of highest bidder
  const getBidderName = (id: string | null) => {
    if (!id) return '';
    const p = room.participants.find((x) => x.id === id);
    return p ? p.teamName : 'AI Franchise';
  };

  // Generate dynamic commentator speech based on room states and timer values
  const getCommentarySpeech = () => {
    if (!activePlayer) return "Welcome to the IPL Auction podium.";

    const highestBidderName = getBidderName(room.highestBidderId);

    switch (room.status) {
      case 'LOBBY':
        return `Welcome, managers! Prepare your strategies. We have a pool of ${room.playerPool.length} elite cricketers ready for the draft.`;
        
      case 'REVEAL':
        return `Coming up next onto the podium... it's the ${activePlayer.nationality} ${activePlayer.role}, ${activePlayer.name}! Base price is set at ${activePlayer.basePrice.toFixed(2)} Crore. Prepare your paddles!`;
        
      case 'BIDDING':
        if (room.currentBid === 0) {
          return `Opening bid is ${activePlayer.basePrice.toFixed(2)} Crore for ${activePlayer.name}. Do I see a paddle?`;
        }
        
        // Dynamic countdown speech
        if (room.timer > 10) {
          return `We have ${room.currentBid.toFixed(2)} Cr from ${highestBidderName}. Looking for another bid!`;
        } else if (room.timer > 6) {
          return `${highestBidderName} leads the bid at ${room.currentBid.toFixed(2)} Crore. Any more bids?`;
        } else if (room.timer === 4 || room.timer === 5) {
          return `At ${room.currentBid.toFixed(2)} Crore by ${highestBidderName}... once!`;
        } else if (room.timer === 2 || room.timer === 3) {
          return `Going at ${room.currentBid.toFixed(2)} Crore to ${highestBidderName}... twice!`;
        } else {
          return `Fair warning! Selling ${activePlayer.name} at ${room.currentBid.toFixed(2)} Crore...`;
        }
        
      case 'SOLD':
        return `🔨 SOLD! ${activePlayer.name} goes to ${highestBidderName} for a winning bid of ${room.currentBid.toFixed(2)} Crore! What a fantastic draft!`;
        
      case 'UNSOLD':
        return `🔨 No bids placed. ${activePlayer.name} goes UNSOLD. We will move on to the next set.`;
        
      case 'COMPLETED':
        return "That concludes the IPL Auction Arena! Roster counts are full. Excellent bidding strategies from all managers.";
        
      default:
        return "Bidding is underway.";
    }
  };

  const systemLogs = room.chat.filter((msg) => msg.type === 'system');

  return (
    <div className="w-full flex flex-col gap-4 h-[450px] lg:h-full">
      {/* Live Auctioneer Podium Speech */}
      <div className="glass-panel rounded-2xl p-5 border border-primary/20 flex flex-col gap-3 shrink-0 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
        
        <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-wider">
          <div className="bg-primary/20 p-1.5 rounded-lg flex items-center justify-center">
            <Mic className="w-4 h-4 text-primary" />
          </div>
          AUCTIONEER SPEECH
          {room.status === 'BIDDING' && (
            <span className="ml-auto h-2 w-2 rounded-full bg-red-500 animate-ping" />
          )}
        </div>

        <div className="min-h-[75px] flex items-center">
          <p className="text-zinc-200 text-sm font-semibold leading-relaxed italic">
            "{getCommentarySpeech()}"
          </p>
        </div>
      </div>

      {/* Bid Log Ticker */}
      <div className="glass-panel rounded-2xl p-4 flex-1 flex flex-col min-h-0 bg-card/65 border border-border/80 relative">
        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-2.5 block border-b border-border/30 pb-2">
          Real-time Bid Activity
        </span>

        {/* Scrollable logs */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs font-semibold"
        >
          {room.bidHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-600 gap-1 text-center py-10">
              <span className="text-2xl">⏳</span>
              <span>Waiting for the first paddle...</span>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {room.bidHistory.map((bid, index) => {
                const isLatest = index === room.bidHistory.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={isLatest ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isLatest
                        ? 'bg-primary/10 border-primary/40 text-white shadow-sm glow-gold'
                        : 'bg-background/40 border-border/40 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 h-5 w-5 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span>{bid.bidderName}</span>
                    </div>
                    <span className={`font-black tracking-wide ${isLatest ? 'text-primary' : 'text-zinc-300'}`}>
                      {bid.amount.toFixed(2)} Cr
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Bottom indicator if history is long */}
        {room.bidHistory.length > 5 && (
          <div className="absolute bottom-2 right-6 bg-secondary/85 text-zinc-400 p-1.5 rounded-full border border-border pointer-events-none opacity-80 animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
