import React, { useEffect } from 'react';
import { RoomState } from '../lib/room-manager';
import { getMinIncrement } from '../lib/ai';
import { AlertTriangle } from 'lucide-react';

interface BiddingControlsProps {
  room: RoomState;
  myPlayerId: string | null;
  onBid: (amount?: number) => void;
  bidError: string | null;
  clearError: () => void;
}

export default function BiddingControls({ room, myPlayerId, onBid, bidError, clearError }: BiddingControlsProps) {
  const activePlayer = room.playerPool[room.activePlayerIndex];
  const myTeam = room.participants.find((p) => p.id === myPlayerId);
  const isSpectator = myTeam?.isSpectator ?? true;
  
  const isBiddingActive = room.status === 'BIDDING';
  const isHighestBidder = room.highestBidderId === myPlayerId;

  // Clear errors on active player change
  useEffect(() => {
    clearError();
  }, [room.activePlayerIndex]);

  if (!activePlayer || !isBiddingActive) return null;

  // Calculate next valid bid values
  const minIncrement = getMinIncrement(room.currentBid);
  const openingBid = activePlayer.basePrice;
  const nextMinBid = Math.round((room.currentBid === 0 ? openingBid : room.currentBid + minIncrement) * 100) / 100;

  // Validations for display messages
  const checkBiddingDisabled = () => {
    if (isSpectator) return { disabled: true, reason: 'Spectating Only' };
    if (!myTeam) return { disabled: true, reason: 'Session Missing' };
    
    if (myTeam.purse < nextMinBid) {
      return { disabled: false, reason: 'Purse Low' };
    }

    const overseasCount = myTeam.roster.filter((p) => p.nationality === 'Overseas').length;
    if (activePlayer.nationality === 'Overseas' && overseasCount >= room.settings.maxOverseas) {
      return { disabled: false, reason: 'Overseas Cap' };
    }

    const remainingSlotsNeeded = 11 - myTeam.roster.length;
    if (remainingSlotsNeeded > 1) {
      const reserveFundsNeeded = (remainingSlotsNeeded - 1) * 0.75;
      if (myTeam.purse - nextMinBid < reserveFundsNeeded) {
        return { disabled: false, reason: `Need ${reserveFundsNeeded.toFixed(2)} Cr Reserve` };
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
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black bg-amber-500/10 border-amber-500/35 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
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

      {/* Single Bid Paddle */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
        <button
          onClick={() => onBid()}
          disabled={validation.disabled}
          className="bg-primary hover:bg-primary/95 text-background font-black px-6 py-3.5 rounded-xl text-sm cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none w-full md:w-auto flex items-center justify-center gap-2"
        >
          {room.currentBid === 0 ? (
            <span>🚀 PLACE BASE: {nextMinBid.toFixed(2)} Cr</span>
          ) : (
            <>
              <span>🚀 PLACE BID: {nextMinBid.toFixed(2)} Cr</span>
              <span className="bg-background/20 text-background text-[10px] font-black px-2 py-0.5 rounded-md">
                +{minIncrement.toFixed(2)} Cr
              </span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
