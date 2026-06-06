import React from 'react';

// Modern, realistic Cricket Bat and Ball SVG
export const BatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17.5 3.5l3 3" />
    <path d="M16 5l3 3" />
    <path d="M18.5 6.5L6.8 18.2c-.6.6-1.5.6-2.1 0l-1-1c-.6-.6-.6-1.5 0-2.1L15.5 3.5" />
    <circle cx="6" cy="6" r="2" fill="currentColor" stroke="none" />
  </svg>
);

// Modern, realistic Cricket Ball with Seam SVG
export const BallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 2.5v19" strokeWidth="2.5" />
    <path d="M9.5 5.5a8 8 0 0 0 0 13" strokeDasharray="1.5 1.5" />
    <path d="M14.5 5.5a8 8 0 0 1 0 13" strokeDasharray="1.5 1.5" />
  </svg>
);

// Modern Wicketkeeping Gloves SVG
export const GloveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5.5 21V9a2.5 2.5 0 0 1 5 0v3M10.5 12V8a2.5 2.5 0 0 1 5 0v4M15.5 12V9a2.5 2.5 0 0 1 5 0v12" />
    <path d="M2.5 14c0-2.5 3-4 3-4s0 3 2 4" />
    <path d="M2.5 15.5v3.5a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-3.5H2.5z" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

// Modern All-Rounder (Crossed Bat & Ball) SVG
export const AllRounderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4.5 19.5l15-15" />
    <path d="M3.5 20.5l1.5-1.5" />
    <path d="M17.5 4.5l2 2" />
    <path d="M6 18l11.5-11.5c.4-.4 1-.4 1.4 0l.7.7c.4.4.4 1 0 1.4L8 19.8" />
    <circle cx="16.5" cy="16.5" r="3.5" strokeWidth="2" />
    <path d="M16.5 13a3.5 3.5 0 0 0 0 7" strokeDasharray="1 1" />
  </svg>
);

import { 
  Cat, Bird, Flame, Shield, Sun, 
  Crown, Zap, Wind, Sword, Swords, Trophy 
} from 'lucide-react';

interface EmblemProps extends React.SVGProps<SVGSVGElement> {
  avatarId: string;
}

// Modern, high-end vector franchise emblems using realistic icons
export const FranchiseEmblem = ({ avatarId, ...props }: EmblemProps) => {
  const getIcon = () => {
    const iconProps = { className: props.className };
    switch (avatarId) {
      case 'av1': // CSK Lion
        return <Cat {...iconProps} />;
      case 'av2': // MI Eagle
        return <Bird {...iconProps} />;
      case 'av3': // RCB Tiger (Flame symbol for boldness)
        return <Flame {...iconProps} />;
      case 'av4': // KKR Knight (Shield of the Knight)
        return <Shield {...iconProps} />;
      case 'av5': // SRH Sun
        return <Sun {...iconProps} />;
      case 'av6': // RR Crown
        return <Crown {...iconProps} />;
      case 'av7': // DC Tiger (Lightning bolt for speed/power)
        return <Zap {...iconProps} />;
      case 'av8': // LSG Wings (Wind symbol for flight)
        return <Wind {...iconProps} />;
      case 'av9': // GT Titan (Sword of the Titan)
        return <Sword {...iconProps} />;
      case 'av10': // PBKS King (Crossed swords for battle)
        return <Swords {...iconProps} />;
      default:
        return <Trophy {...iconProps} />;
    }
  };

  return getIcon();
};
