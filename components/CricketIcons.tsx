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

interface EmblemProps extends React.SVGProps<SVGSVGElement> {
  avatarId: string;
}

// Modern, high-end vector franchise emblems with original team acronyms
export const FranchiseEmblem = ({ avatarId, ...props }: EmblemProps) => {
  const getEmblemContent = () => {
    // Shared shield path for a clean, cohesive sports crest layout
    const shieldPath = "M12 2L3 5v8c0 4.5 3.5 8.5 9 10 5.5-1.5 9-5.5 9-10V5l-9-3z";
    
    // Configs for text layout per team
    const textConfigs = {
      av1: { text: "CSK", size: "8.5", y: "15" },
      av2: { text: "MI", size: "10", y: "15.5" },
      av3: { text: "RCB", size: "8.5", y: "15" },
      av4: { text: "KKR", size: "8.5", y: "15" },
      av5: { text: "SRH", size: "8.5", y: "15" },
      av6: { text: "RR", size: "10", y: "15.5" },
      av7: { text: "DC", size: "10", y: "15.5" },
      av8: { text: "LSG", size: "8.5", y: "15" },
      av9: { text: "GT", size: "10", y: "15.5" },
      av10: { text: "PBKS", size: "7.5", y: "15" }
    };

    const config = textConfigs[avatarId as keyof typeof textConfigs] || { text: "IPL", size: "8.5", y: "15" };

    return (
      <>
        {/* Shield background filled with solid dark slate to block gradients */}
        <path
          d={shieldPath}
          fill="#0c0f18" 
          stroke="currentColor" 
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        
        {/* Stylized sports team acronym text */}
        <text
          x="12"
          y={config.y}
          fill="currentColor" 
          stroke="none"
          fontSize={config.size}
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          className="select-none font-black"
        >
          {config.text}
        </text>
      </>
    );
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {getEmblemContent()}
    </svg>
  );
};
