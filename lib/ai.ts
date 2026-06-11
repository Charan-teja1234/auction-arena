import { Player } from './players';

export interface RosterAnalysis {
  totalPlayers: number;
  overseasCount: number;
  wicketkeeperCount: number;
  batsmenCount: number;
  bowlersCount: number;
  allRoundersCount: number;
}

export function analyzeRoster(roster: Player[]): RosterAnalysis {
  return roster.reduce(
    (acc, p) => {
      acc.totalPlayers++;
      if (p.nationality === 'Overseas') acc.overseasCount++;
      if (p.role === 'Wicketkeeper') acc.wicketkeeperCount++;
      else if (p.role === 'Batsman') acc.batsmenCount++;
      else if (p.role === 'Bowler') acc.bowlersCount++;
      else if (p.role === 'All-Rounder') acc.allRoundersCount++;
      return acc;
    },
    {
      totalPlayers: 0,
      overseasCount: 0,
      wicketkeeperCount: 0,
      batsmenCount: 0,
      bowlersCount: 0,
      allRoundersCount: 0,
    }
  );
}

// Calculate the minimum increment based on current bid
export function getMinIncrement(currentBid: number): number {
  if (currentBid < 1.0) return 0.05; // +5L
  if (currentBid < 2.0) return 0.10; // +10L
  if (currentBid < 5.0) return 0.20; // +20L
  return 0.50; // +50L
}

export interface AITeam {
  id: string;
  name: string;
  teamName: string;
  avatarId: string;
  purse: number;
  roster: Player[];
  aiPersonality: 'MI_NITA' | 'RCB_BOLD' | 'CSK_THALA' | 'SRH_KAVYA' | 'KKR_SRK' | 'PBKS_PREITY';
}

export function evaluatePlayerForAI(
  player: Player,
  aiTeam: AITeam,
  currentBid: number,
  settings: { budget: number; maxOverseas: number }
): { shouldBid: boolean; maxLimit: number } {
  const roster = analyzeRoster(aiTeam.roster);

  // 1. Roster Rules Checks
  // Overseas cap
  if (player.nationality === 'Overseas' && roster.overseasCount >= settings.maxOverseas) {
    return { shouldBid: false, maxLimit: 0 };
  }
  
  // Hard minimum squad constraints
  const minPrice = 0.75; // standard base price for bot safety
  const remainingSlots = 15 - roster.totalPlayers; // Target 15 players for a complete squad
  const reserveForOtherSlots = Math.max(0, remainingSlots - 1) * minPrice;
  
  // Never bid so much that we can't afford a full 15-player squad (minimum 0.75Cr per empty slot)
  const maxAffordableBid = aiTeam.purse - reserveForOtherSlots;
  if (currentBid + getMinIncrement(currentBid) > maxAffordableBid) {
    return { shouldBid: false, maxLimit: 0 };
  }

  // 2. Personality-based evaluations
  let interestMultiplier = 1.0;

  // Roster needs adjustment
  if (player.role === 'Wicketkeeper' && roster.wicketkeeperCount === 0) {
    interestMultiplier += 0.4; // High need
  }
  if (player.role === 'Bowler' && roster.bowlersCount < 4) {
    interestMultiplier += 0.2;
  }
  if (player.role === 'Batsman' && roster.batsmenCount < 4) {
    interestMultiplier += 0.2;
  }

  let personalityMultiplier = 1.0;
  
  switch (aiTeam.aiPersonality) {
    case 'MI_NITA': // Balanced, targets high ratings, loves all-rounders
      personalityMultiplier = 1.3;
      if (player.role === 'All-Rounder') interestMultiplier += 0.3;
      if (player.rating >= 90) interestMultiplier += 0.2;
      break;

    case 'RCB_BOLD': // Aggressive, chases star batsmen, goes high
      if (player.role === 'Batsman' && player.popularity >= 8) {
        personalityMultiplier = 2.4;
        interestMultiplier += 0.4;
      } else if (player.rating >= 92) {
        personalityMultiplier = 1.9;
      } else {
        personalityMultiplier = 1.0; // conservative on others
      }
      break;

    case 'CSK_THALA': // Values experience (age > 30) and value buys
      personalityMultiplier = 1.2;
      if (player.age >= 30) interestMultiplier += 0.35;
      if (player.rating >= 85 && player.rating <= 91) interestMultiplier += 0.15;
      break;

    case 'SRH_KAVYA': // Loves power-hitters, overseas stars
      personalityMultiplier = 1.5;
      if (player.nationality === 'Overseas') interestMultiplier += 0.4;
      if (player.role === 'Batsman' && player.rating >= 88) interestMultiplier += 0.2;
      break;

    case 'KKR_SRK': // All-rounders & spin, budget conscious, bids late
      personalityMultiplier = 1.35;
      if (player.role === 'All-Rounder' || player.bowlingStyle.includes('spin') || player.bowlingStyle.includes('break')) {
        interestMultiplier += 0.3;
      }
      break;

    case 'PBKS_PREITY': // Wildcard, bids on young talents, random triggers
      if (player.age <= 26) {
        personalityMultiplier = 1.8;
        interestMultiplier += 0.3;
      } else {
        personalityMultiplier = 1.4;
      }
      // Random variance
      interestMultiplier += (Math.random() * 0.3 - 0.15);
      break;
  }

  // Calculate the AI's max limit for this player
  // Standard valuation: basePrice * interestMultiplier * personalityMultiplier
  let maxLimit = player.basePrice * interestMultiplier * personalityMultiplier;

  // Cap max limit by current available purse & safety boundaries
  maxLimit = Math.min(maxLimit, maxAffordableBid);

  // If the player is a superstar, bots can stretch their limits if they have the budget
  if (player.rating >= 93 && aiTeam.purse > settings.budget * 0.4) {
    maxLimit = Math.max(maxLimit, player.basePrice * 2.2);
  }

  // Round limit to nearest Lakhs
  maxLimit = Math.round(maxLimit * 100) / 100;

  // We should bid if the next bid is less than or equal to our calculated max limit
  const nextBid = currentBid === 0 ? player.basePrice : currentBid + getMinIncrement(currentBid);
  const shouldBid = nextBid <= maxLimit;

  return { shouldBid, maxLimit };
}
