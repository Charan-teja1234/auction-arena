import React from 'react';
import { PRESETS_AVATARS } from '../lib/players';
import { FranchiseEmblem } from './CricketIcons';

interface AvatarPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
  takenAvatarIds?: string[];
}

export default function AvatarPicker({ selectedId, onSelect, takenAvatarIds = [] }: AvatarPickerProps) {
  return (
    <div className="space-y-3 font-sans">
      <label className="block text-sm font-semibold text-zinc-400">Select Franchise Emblem</label>
      <div className="grid grid-cols-5 gap-3">
        {PRESETS_AVATARS.map((avatar) => {
          const isSelected = avatar.id === selectedId;
          const isTaken = takenAvatarIds.includes(avatar.id);
          return (
            <button
              key={avatar.id}
              type="button"
              disabled={isTaken}
              onClick={() => onSelect(avatar.id)}
              className={`relative flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-br ${
                avatar.color
              } transition-all duration-300 transform active:scale-95 ${
                isSelected
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-lg shadow-primary/20 cursor-pointer'
                  : isTaken
                  ? 'opacity-25 cursor-not-allowed grayscale'
                  : 'opacity-75 hover:opacity-100 hover:scale-105 cursor-pointer'
              }`}
              title={isTaken ? `${avatar.name} (Taken)` : avatar.name}
            >
              {/* Franchise Emblem Logo Vector */}
              <FranchiseEmblem avatarId={avatar.id} className="h-8 w-8 text-white select-none pointer-events-none" />
              {isSelected && (
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background ring-1 ring-background">
                  ✓
                </span>
              )}
              {isTaken && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white ring-1 ring-background" title="Taken">
                  ✕
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="text-center select-none">
        <span className="text-xs text-primary/70 font-semibold uppercase tracking-wider">
          Style: {PRESETS_AVATARS.find((a) => a.id === selectedId)?.name}
        </span>
      </div>
    </div>
  );
}
