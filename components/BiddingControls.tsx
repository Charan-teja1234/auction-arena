import React, { useState, useEffect } from 'react';
import { RoomState } from '../lib/room-manager';
import { getMinIncrement } from '../lib/ai';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface BiddingControlsProps {
  room: RoomState;
  myPlayerId: string | null;
  onBid: (amount?: number) => void;
  bidError: string | null;
  clearError: () => void;
}

export default function BiddingControls({ room, myPlayerId, onBid, bidError, clearError }: BiddingControlsProps) {
  const [customBid, setCustomBid] = useState('');
  
  const activePlayer = room.playerPool[room.activePlayerIndex];
  const myTeam = room.participants.find((p) => p.id === myPlayerId);
  const isSpectator = myTeam?.isSpectator ?? true;
  
  const isBiddingActive = room.status === 'BIDDING';
  const isHighestBidder = room.highestBidderId === myPlayerId;

  // Clear custom bid on active player change
  useEffect(() => {
    setCustomBid('');
    clearError();
  }, [room.activePlayerIndex]);

  if (!activePlayer || !isBiddingActive) return null;

  // Calculate next valid bid values
  const minIncrement = getMinIncrement(room.currentBid);
  const openingBid = activePlayer.basePrice;
  const nextMinBid = room.currentBid === 0 ? openingBid : room.currentBid + minIncrement;

  // Option bid values
  const opt10L = room.currentBid === 0 ? openingBid : room.currentBid + 0.10;
  const opt20L = room.currentBid === 0 ? openingBid + 0.20 : room.currentBid + 0.20;
  const opt50L = room.currentBid === 0 ? openingBid + 0.50 : room.currentBid + 0.50;
  const opt1Cr = room.currentBid === 0 ? openingBid + 1.00 : room.currentBid + 1.00;

  const handleCustomBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(customBid);
    if (isNaN(amount)) return;
    onBid(amount);
  };

  // Validations for display messages
  const checkBiddingDisabled = () => {
    if (isSpectator) return { disabled: true, reason: 'Spectating Only' };
    if (isHighestBidder) return { disabled: true, reason: 'Highest Bidder', type: 'success' };
    if (!myTeam) return { disabled: true, reason: 'Session Missing' };
    
    if (myTeam.purse < nextMinBid) {
      return { disabled: true, reason: 'Purse Low' };
    }

    const overseasCount = myTeam.roster.filter((p) => p.nationality === 'Overseas').length;
    if (activePlayer.nationality === 'Overseas' && overseasCount >= room.settings.maxOverseas) {
      return { disabled: true, reason: 'Overseas Cap' };
    }

    const remainingSlotsNeeded = 11 - myTeam.roster.length;
    if (remainingSlotsNeeded > 1) {
      const reserveFundsNeeded = (remainingSlotsNeeded - 1) * 0.75;
      if (myTeam.purse - nextMinBid < reserveFundsNeeded) {
        return { disabled: true, reason: `Need ${reserveFundsNeeded.toFixed(2)} Cr Reserve` };
      }
    }

    return { disabled: false, reason: '' };
  };

  const validation = checkBiddingDisabled();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-transparent p-0 border-none select-none w-full md:w-auto">
      
      {/* Alert & warning badges */}
      {(validation.reason || bidError) && (
        <div className="flex gap-2.5 shrink-0">
          {validation.reason && (
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black ${
              validation.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/35 text-amber-400'
            }`}>
              {validation.type !== 'success' && <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
              <span>{validation.reason}</span>
            </div>
          )}

          {bidError && (
            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/35 px-3 py-2 rounded-xl text-xs font-black text-red-400">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{bidError}</span>
            </div>
          )}
        </div>
      )}

      {/* Increments Paddles Row */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
        {room.currentBid === 0 ? (
          <button
            onClick={() => onBid(openingBid)}
            disabled={validation.disabled}
            className="bg-primary hover:bg-primary/95 text-background font-black px-6 py-3.5 rounded-xl text-sm cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none w-full md:w-auto"
          >
            🚀 PLACE BASE: {openingBid.toFixed(2)} Cr
          </button>
        ) : (
          <div className="flex gap-2 shrink-0">
            {[
              { amount: opt10L, label: '+10L' },
              { amount: opt20L, label: '+20L' },
              { amount: opt50L, label: '+50L' },
              { amount: opt1Cr, label: '+1C' }
            ].map((opt, idx) => {
              const exceedsPurse = myTeam && myTeam.purse < opt.amount;
              return (
                <button
                  key={idx}
                  onClick={() => onBid(opt.amount)}
                  disabled={validation.disabled || exceedsPurse}
                  className="bg-secondary hover:bg-zinc-800 hover:border-primary/50 text-white font-extrabold px-4.5 py-2.5 border border-border/80 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-xs min-w-[56px]"
                >
                  <span className="text-zinc-500 text-[9px] font-bold uppercase leading-none mb-0.5">{opt.label}</span>
                  <span className="text-primary font-black leading-none">{opt.amount.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Custom Paddle (Inline) */}
        {!isSpectator && room.currentBid > 0 && (
          <form onSubmit={handleCustomBidSubmit} className="flex items-center gap-1.5 shrink-0">
            <div className="relative">
              <input
                type="number"
                step="0.05"
                min={nextMinBid}
                value={customBid}
                onChange={(e) => setCustomBid(e.target.value)}
                placeholder={`Min ${nextMinBid.toFixed(2)}`}
                disabled={validation.disabled}
                className="bg-background border border-border rounded-xl pl-3 pr-7 py-2.5 text-xs text-white font-bold w-28 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <span className="absolute right-2 top-3 text-zinc-500 text-[9px] font-bold">Cr</span>
            </div>
            <button
              type="submit"
              disabled={validation.disabled || !customBid || parseFloat(customBid) < nextMinBid}
              className="bg-primary hover:bg-primary/95 text-background font-black px-4.5 py-2.5 rounded-xl text-xs shadow-sm transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              Bid
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
