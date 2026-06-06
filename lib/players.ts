export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicketkeeper';
  nationality: 'Indian' | 'Overseas';
  rating: number; // 70 to 99
  popularity: number; // 1 to 10 (influences bot bidding wars)
  basePrice: number; // In Crores, e.g. 2.0 or 0.5
  battingStyle: string;
  bowlingStyle: string;
  recentForm: string[]; // Recent scores or bowling figures
  previousTeam: string;
  age: number;
}

export const PLAYER_POOL: Player[] = [
  {
    "id": "p1",
    "name": "Virat Kohli",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 96,
    "popularity": 10,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "113*",
      "47",
      "51",
      "92",
      "42"
    ],
    "previousTeam": "RCB",
    "age": 37
  },
  {
    "id": "p2",
    "name": "Rohit Sharma",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 93,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "68",
      "49",
      "105*",
      "36",
      "4"
    ],
    "previousTeam": "MI",
    "age": 39
  },
  {
    "id": "p3",
    "name": "Travis Head",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 94,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "89",
      "0",
      "133",
      "58",
      "63"
    ],
    "previousTeam": "SRH",
    "age": 32
  },
  {
    "id": "p4",
    "name": "Yashasvi Jaiswal",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "104*",
      "24",
      "67",
      "53",
      "35"
    ],
    "previousTeam": "RR",
    "age": 24
  },
  {
    "id": "p5",
    "name": "Suryakumar Yadav",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 95,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "102*",
      "56",
      "78",
      "14",
      "31"
    ],
    "previousTeam": "MI",
    "age": 35
  },
  {
    "id": "p6",
    "name": "Shubman Gill",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "104",
      "16",
      "35",
      "72",
      "8"
    ],
    "previousTeam": "GT",
    "age": 26
  },
  {
    "id": "p7",
    "name": "Ruturaj Gaikwad",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "98",
      "62",
      "108*",
      "32",
      "46"
    ],
    "previousTeam": "CSK",
    "age": 29
  },
  {
    "id": "p8",
    "name": "Rinku Singh",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "26*",
      "16*",
      "53*",
      "9",
      "33*"
    ],
    "previousTeam": "KKR",
    "age": 28
  },
  {
    "id": "p9",
    "name": "Faf du Plessis",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 87,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "64",
      "55",
      "3",
      "44",
      "71"
    ],
    "previousTeam": "RCB",
    "age": 41
  },
  {
    "id": "p10",
    "name": "MS Dhoni",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 88,
    "popularity": 10,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "28*",
      "37*",
      "9*",
      "1*",
      "20"
    ],
    "previousTeam": "CSK",
    "age": 44
  },
  {
    "id": "p11",
    "name": "Heinrich Klaasen",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 94,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "42",
      "67*",
      "10",
      "81",
      "56"
    ],
    "previousTeam": "SRH",
    "age": 34
  },
  {
    "id": "p12",
    "name": "Rishabh Pant",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "88*",
      "44",
      "15",
      "53",
      "27"
    ],
    "previousTeam": "DC",
    "age": 28
  },
  {
    "id": "p13",
    "name": "Sanju Samson",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "71*",
      "68",
      "18",
      "86",
      "41"
    ],
    "previousTeam": "RR",
    "age": 31
  },
  {
    "id": "p14",
    "name": "Jos Buttler",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 93,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "107*",
      "100*",
      "8",
      "34",
      "15"
    ],
    "previousTeam": "RR",
    "age": 35
  },
  {
    "id": "p15",
    "name": "Nicholas Pooran",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "75*",
      "61",
      "12",
      "48",
      "36"
    ],
    "previousTeam": "LSG",
    "age": 30
  },
  {
    "id": "p16",
    "name": "Quinton de Kock",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 87,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "54",
      "6",
      "10",
      "81",
      "19"
    ],
    "previousTeam": "LSG",
    "age": 33
  },
  {
    "id": "p17",
    "name": "Hardik Pandya",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "recentForm": [
      "39 & 3/31",
      "46 & 1/26",
      "10 & 0/41",
      "2 & 2/22"
    ],
    "previousTeam": "MI",
    "age": 32
  },
  {
    "id": "p18",
    "name": "Ravindra Jadeja",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "43* & 1/22",
      "15 & 3/18",
      "7 & 2/25",
      "31* & 0/30"
    ],
    "previousTeam": "CSK",
    "age": 37
  },
  {
    "id": "p19",
    "name": "Glenn Maxwell",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "28 & 0/28",
      "4 & 2/15",
      "0 & 0/34",
      "32 & 1/20"
    ],
    "previousTeam": "RCB",
    "age": 37
  },
  {
    "id": "p20",
    "name": "Andre Russell",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 93,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "41* & 2/25",
      "27 & 1/19",
      "24* & 3/18",
      "9 & 0/30"
    ],
    "previousTeam": "KKR",
    "age": 38
  },
  {
    "id": "p21",
    "name": "Sunil Narine",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 94,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "81 & 1/22",
      "26 & 2/18",
      "109 & 0/32",
      "6 & 1/24"
    ],
    "previousTeam": "KKR",
    "age": 38
  },
  {
    "id": "p22",
    "name": "Axar Patel",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "66 & 1/24",
      "15 & 2/19",
      "0 & 1/28",
      "29 & 0/15"
    ],
    "previousTeam": "DC",
    "age": 32
  },
  {
    "id": "p23",
    "name": "Liam Livingstone",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 86,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak/offbreak",
    "recentForm": [
      "21 & 0/18",
      "40 & 1/12",
      "53* & 0/28",
      "15 & 2/10"
    ],
    "previousTeam": "PBKS",
    "age": 32
  },
  {
    "id": "p24",
    "name": "Rachin Ravindra",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 85,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "61 & 0/20",
      "0 & 1/18",
      "21 & 0/15",
      "37 & 0/8"
    ],
    "previousTeam": "CSK",
    "age": 26
  },
  {
    "id": "p25",
    "name": "Jasprit Bumrah",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 98,
    "popularity": 10,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "3/21",
      "2/17",
      "5/21",
      "0/18",
      "3/15"
    ],
    "previousTeam": "MI",
    "age": 32
  },
  {
    "id": "p26",
    "name": "Pat Cummins",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 94,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "3/43",
      "1/28",
      "2/35",
      "1/20",
      "2/29"
    ],
    "previousTeam": "SRH",
    "age": 33
  },
  {
    "id": "p27",
    "name": "Mitchell Starc",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "3/34",
      "2/14",
      "1/28",
      "0/45",
      "3/20"
    ],
    "previousTeam": "KKR",
    "age": 36
  },
  {
    "id": "p28",
    "name": "Rashid Khan",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 95,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "2/24",
      "1/18",
      "0/22",
      "3/20",
      "2/31"
    ],
    "previousTeam": "GT",
    "age": 27
  },
  {
    "id": "p29",
    "name": "Yuzvendra Chahal",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 88,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "3/31",
      "1/28",
      "2/19",
      "0/40",
      "1/25"
    ],
    "previousTeam": "RR",
    "age": 35
  },
  {
    "id": "p30",
    "name": "Kuldeep Yadav",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 90,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm wrist spin",
    "recentForm": [
      "2/22",
      "3/20",
      "4/19",
      "1/28",
      "2/35"
    ],
    "previousTeam": "DC",
    "age": 31
  },
  {
    "id": "p31",
    "name": "Mohammed Shami",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "3/18",
      "2/25",
      "4/22",
      "1/31",
      "2/20"
    ],
    "previousTeam": "GT",
    "age": 35
  },
  {
    "id": "p32",
    "name": "Trent Boult",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast-medium",
    "recentForm": [
      "3/22",
      "0/35",
      "1/24",
      "2/18",
      "1/29"
    ],
    "previousTeam": "RR",
    "age": 36
  },
  {
    "id": "p33",
    "name": "Kagiso Rabada",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "1/26",
      "2/32",
      "3/18",
      "2/40",
      "0/22"
    ],
    "previousTeam": "PBKS",
    "age": 31
  },
  {
    "id": "p34",
    "name": "Arshdeep Singh",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 88,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium-fast",
    "recentForm": [
      "4/29",
      "2/30",
      "1/24",
      "3/31",
      "0/42"
    ],
    "previousTeam": "PBKS",
    "age": 27
  },
  {
    "id": "p35",
    "name": "Matheesha Pathirana",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast (slingshot)",
    "recentForm": [
      "4/28",
      "2/15",
      "1/22",
      "3/21",
      "2/35"
    ],
    "previousTeam": "CSK",
    "age": 23
  },
  {
    "id": "p36",
    "name": "Mayank Yadav",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast (155+ kmh)",
    "recentForm": [
      "3/14",
      "3/20",
      "1/41",
      "0/13",
      "1/25"
    ],
    "previousTeam": "LSG",
    "age": 23
  },
  {
    "id": "p37",
    "name": "Sandeep Sharma",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium-fast",
    "recentForm": [
      "5/18",
      "2/22",
      "1/25",
      "2/32",
      "0/26"
    ],
    "previousTeam": "RR",
    "age": 33
  },
  {
    "id": "p38",
    "name": "T Natarajan",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium (yorker)",
    "recentForm": [
      "4/19",
      "2/32",
      "1/28",
      "3/24",
      "2/41"
    ],
    "previousTeam": "SRH",
    "age": 35
  },
  {
    "id": "p39",
    "name": "Harshal Patel",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 85,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium-fast (dipper)",
    "recentForm": [
      "3/15",
      "2/38",
      "3/24",
      "1/40",
      "3/21"
    ],
    "previousTeam": "PBKS",
    "age": 35
  },
  {
    "id": "p40",
    "name": "Mohit Sharma",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 82,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium-fast",
    "recentForm": [
      "1/28",
      "2/32",
      "0/40",
      "3/18",
      "1/36"
    ],
    "previousTeam": "GT",
    "age": 37
  },
  {
    "id": "p41",
    "name": "Cameron Green",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 9,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "recentForm": [
      "46 & 2/32",
      "103* & 1/28",
      "21 & 3/18",
      "54 & 0/30"
    ],
    "previousTeam": "RCB",
    "age": 27
  },
  {
    "id": "p42",
    "name": "Prashant Veer",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 85,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "48* & 2/15",
      "12 & 3/20",
      "35 & 1/18",
      "51 & 2/22"
    ],
    "previousTeam": "UP",
    "age": 20
  },
  {
    "id": "p43",
    "name": "Kartik Sharma",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "74*",
      "32",
      "58",
      "12",
      "91*"
    ],
    "previousTeam": "Rajasthan",
    "age": 19
  },
  {
    "id": "p44",
    "name": "Jake Fraser-McGurk",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 88,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "84",
      "12",
      "50",
      "21",
      "102*"
    ],
    "previousTeam": "DC",
    "age": 24
  },
  {
    "id": "p45",
    "name": "Jonny Bairstow",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 86,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "108*",
      "8",
      "42",
      "29",
      "15"
    ],
    "previousTeam": "PBKS",
    "age": 37
  },
  {
    "id": "p46",
    "name": "Daryl Mitchell",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 87,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "34 & 1/24",
      "63* & 0/15",
      "11 & 1/19",
      "52 & 0/28"
    ],
    "previousTeam": "CSK",
    "age": 35
  },
  {
    "id": "p47",
    "name": "Devon Conway",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "62",
      "45",
      "87*",
      "31",
      "9"
    ],
    "previousTeam": "CSK",
    "age": 35
  },
  {
    "id": "p48",
    "name": "Alzarri Joseph",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 82,
    "popularity": 6,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "1/38",
      "2/25",
      "0/42",
      "3/30",
      "1/28"
    ],
    "previousTeam": "RCB",
    "age": 29
  },
  {
    "id": "p49",
    "name": "Gus Atkinson",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 6,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "2/29",
      "1/31",
      "3/24",
      "0/40",
      "2/18"
    ],
    "previousTeam": "KKR",
    "age": 28
  },
  {
    "id": "p50",
    "name": "Deepak Hooda",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "18 & 0/15",
      "41 & 1/22",
      "10 & 0/12",
      "29 & 1/18"
    ],
    "previousTeam": "LSG",
    "age": 31
  },
  {
    "id": "p51",
    "name": "Karn Sharma",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "2/28",
      "0/32",
      "1/20",
      "3/25",
      "1/41"
    ],
    "previousTeam": "RCB",
    "age": 38
  },
  {
    "id": "p52",
    "name": "Josh Inglis",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 87,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "55",
      "38",
      "110",
      "14",
      "62*"
    ],
    "previousTeam": "Australia",
    "age": 31
  },
  {
    "id": "p53",
    "name": "Auqib Nabi Dar",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium-fast",
    "recentForm": [
      "3/18",
      "1/22",
      "2/25",
      "4/31",
      "0/15"
    ],
    "previousTeam": "J&K",
    "age": 29
  },
  {
    "id": "p54",
    "name": "Ravi Bishnoi",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "2/18",
      "3/22",
      "1/25",
      "2/30",
      "0/21"
    ],
    "previousTeam": "LSG",
    "age": 25
  },
  {
    "id": "p55",
    "name": "Venkatesh Iyer",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 85,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "52* & 0/10",
      "26 & 1/15",
      "42 & 0/20",
      "70* & 1/18"
    ],
    "previousTeam": "KKR",
    "age": 31
  },
  {
    "id": "p56",
    "name": "Wanindu Hasaranga",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "15 & 3/19",
      "28 & 2/22",
      "0 & 4/15",
      "31* & 1/25"
    ],
    "previousTeam": "SRH",
    "age": 28
  },
  {
    "id": "p57",
    "name": "Anrich Nortje",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 88,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "2/35",
      "3/21",
      "0/45",
      "1/28",
      "4/19"
    ],
    "previousTeam": "DC",
    "age": 32
  },
  {
    "id": "p58",
    "name": "Pathum Nissanka",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "47",
      "63",
      "8",
      "54*",
      "32"
    ],
    "previousTeam": "Sri Lanka",
    "age": 28
  },
  {
    "id": "p59",
    "name": "David Miller",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 88,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "44*",
      "55*",
      "4",
      "32",
      "67*"
    ],
    "previousTeam": "GT",
    "age": 36
  },
  {
    "id": "p60",
    "name": "Ben Duckett",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "35",
      "71",
      "12",
      "58",
      "42"
    ],
    "previousTeam": "England",
    "age": 31
  },
  {
    "id": "p61",
    "name": "Nehal Wadhera",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 78,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "40 & 2/37",
      "9 & 1/25"
    ],
    "previousTeam": "SRH",
    "age": 35
  },
  {
    "id": "p62",
    "name": "Romario Shepherd",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "3/30",
      "2/16",
      "2/40"
    ],
    "previousTeam": "GT",
    "age": 25
  },
  {
    "id": "p63",
    "name": "Varun Aaron",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 7,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "21 & 0/22",
      "39 & 2/39"
    ],
    "previousTeam": "CSK",
    "age": 18
  },
  {
    "id": "p64",
    "name": "Pawan Suyal",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "75",
      "87*",
      "36",
      "3",
      "14"
    ],
    "previousTeam": "LSG",
    "age": 29
  },
  {
    "id": "p65",
    "name": "Brandon King",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "36",
      "53*",
      "13",
      "13",
      "15"
    ],
    "previousTeam": "RR",
    "age": 25
  },
  {
    "id": "p66",
    "name": "David Willey",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "76",
      "26*",
      "40",
      "32",
      "74"
    ],
    "previousTeam": "PBKS",
    "age": 34
  },
  {
    "id": "p67",
    "name": "Blessing Muzarabani",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "0/15",
      "0/24",
      "2/22"
    ],
    "previousTeam": "LSG",
    "age": 24
  },
  {
    "id": "p68",
    "name": "Kyle Jamieson",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 86,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "20",
      "41*",
      "65",
      "18",
      "55"
    ],
    "previousTeam": "LSG",
    "age": 25
  },
  {
    "id": "p69",
    "name": "Ishant Sharma",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 7,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "27 & 0/16",
      "30 & 1/29"
    ],
    "previousTeam": "RR",
    "age": 21
  },
  {
    "id": "p70",
    "name": "Jhye Richardson",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 77,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "0/33",
      "2/42",
      "2/26"
    ],
    "previousTeam": "MI",
    "age": 34
  },
  {
    "id": "p71",
    "name": "Mehidy Hasan Miraz",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 75,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "3/25",
      "2/34",
      "0/25"
    ],
    "previousTeam": "KKR",
    "age": 35
  },
  {
    "id": "p72",
    "name": "Donovan Ferreira",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "34 & 2/29",
      "24 & 1/19"
    ],
    "previousTeam": "LSG",
    "age": 22
  },
  {
    "id": "p73",
    "name": "Sai Sudharsan",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "3/20",
      "0/37",
      "0/43"
    ],
    "previousTeam": "PBKS",
    "age": 32
  },
  {
    "id": "p74",
    "name": "Johnson Charles",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "39",
      "66*",
      "53",
      "38",
      "75"
    ],
    "previousTeam": "LSG",
    "age": 27
  },
  {
    "id": "p75",
    "name": "Charith Asalanka",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "45",
      "74*",
      "14",
      "47",
      "31"
    ],
    "previousTeam": "MI",
    "age": 24
  },
  {
    "id": "p76",
    "name": "Kyle Mayers",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "22 & 0/24",
      "13 & 1/20"
    ],
    "previousTeam": "SRH",
    "age": 31
  },
  {
    "id": "p77",
    "name": "Phil Salt",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "5",
      "66*",
      "63",
      "21",
      "5"
    ],
    "previousTeam": "KKR",
    "age": 33
  },
  {
    "id": "p78",
    "name": "Mitchell Santner",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "1/39",
      "2/15",
      "0/39"
    ],
    "previousTeam": "GT",
    "age": 27
  },
  {
    "id": "p79",
    "name": "Harry Brook",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 75,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "0/43",
      "0/40",
      "3/38"
    ],
    "previousTeam": "KKR",
    "age": 36
  },
  {
    "id": "p80",
    "name": "Tristan Stubbs",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "2",
      "14*",
      "78",
      "27",
      "21"
    ],
    "previousTeam": "CSK",
    "age": 24
  },
  {
    "id": "p81",
    "name": "Chris Woakes",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "57",
      "44*",
      "65",
      "33",
      "95"
    ],
    "previousTeam": "MI",
    "age": 21
  },
  {
    "id": "p82",
    "name": "Mitchell Marsh",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 85,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "15 & 2/18",
      "16 & 1/17"
    ],
    "previousTeam": "SRH",
    "age": 33
  },
  {
    "id": "p83",
    "name": "Sumit Kumar",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 5,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "0/20",
      "0/38",
      "3/31"
    ],
    "previousTeam": "SRH",
    "age": 32
  },
  {
    "id": "p84",
    "name": "Maheesh Theekshana",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 82,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "72",
      "7*",
      "28",
      "5",
      "53"
    ],
    "previousTeam": "LSG",
    "age": 29
  },
  {
    "id": "p85",
    "name": "Marcus Stoinis",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 85,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "2/17",
      "0/33",
      "1/26"
    ],
    "previousTeam": "CSK",
    "age": 29
  },
  {
    "id": "p86",
    "name": "Shivalik Sharma",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "0/17",
      "1/28",
      "1/31"
    ],
    "previousTeam": "RR",
    "age": 31
  },
  {
    "id": "p87",
    "name": "Matthew Wade",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 75,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "22 & 0/38",
      "40 & 2/34"
    ],
    "previousTeam": "RR",
    "age": 20
  },
  {
    "id": "p88",
    "name": "Vaibhav Suryavanshi",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "3/18",
      "1/44",
      "2/23"
    ],
    "previousTeam": "KKR",
    "age": 18
  },
  {
    "id": "p89",
    "name": "Harshit Rana",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "83",
      "3*",
      "13",
      "29",
      "45"
    ],
    "previousTeam": "CSK",
    "age": 28
  },
  {
    "id": "p90",
    "name": "Piyush Chawla",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 4,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "0/20",
      "1/23",
      "2/37"
    ],
    "previousTeam": "GT",
    "age": 21
  },
  {
    "id": "p91",
    "name": "Glenn Phillips",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "70",
      "63*",
      "2",
      "10",
      "28"
    ],
    "previousTeam": "RCB",
    "age": 24
  },
  {
    "id": "p92",
    "name": "Finn Allen",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "45",
      "16*",
      "21",
      "16",
      "89"
    ],
    "previousTeam": "PBKS",
    "age": 31
  },
  {
    "id": "p93",
    "name": "Qais Ahmad",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 81,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "4 & 1/17",
      "40 & 2/34"
    ],
    "previousTeam": "DC",
    "age": 31
  },
  {
    "id": "p94",
    "name": "Rehan Ahmed",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 77,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "74",
      "53*",
      "50",
      "30",
      "41"
    ],
    "previousTeam": "SRH",
    "age": 30
  },
  {
    "id": "p95",
    "name": "Tabraiz Shamsi",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 78,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "0/17",
      "1/29",
      "3/21"
    ],
    "previousTeam": "PBKS",
    "age": 34
  },
  {
    "id": "p96",
    "name": "Mayank Dagar",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "16 & 0/29",
      "25 & 2/27"
    ],
    "previousTeam": "SRH",
    "age": 35
  },
  {
    "id": "p97",
    "name": "Ishan Kishan",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "34 & 2/20",
      "15 & 2/27"
    ],
    "previousTeam": "MI",
    "age": 20
  },
  {
    "id": "p98",
    "name": "Chris Jordan",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "1/41",
      "1/35",
      "1/34"
    ],
    "previousTeam": "GT",
    "age": 18
  },
  {
    "id": "p99",
    "name": "Ramandeep Singh",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 77,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "77",
      "4*",
      "44",
      "48",
      "75"
    ],
    "previousTeam": "CSK",
    "age": 19
  },
  {
    "id": "p100",
    "name": "Swastik Chikara",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 5,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "25 & 2/38",
      "21 & 1/37"
    ],
    "previousTeam": "SRH",
    "age": 35
  },
  {
    "id": "p101",
    "name": "Mohammed Siraj",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 6,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "44 & 1/33",
      "47 & 1/34"
    ],
    "previousTeam": "SRH",
    "age": 25
  },
  {
    "id": "p102",
    "name": "Olly Stone",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 85,
    "popularity": 6,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "38 & 0/16",
      "39 & 2/32"
    ],
    "previousTeam": "RR",
    "age": 21
  },
  {
    "id": "p103",
    "name": "Manish Pandey",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "2/29",
      "2/27",
      "2/16"
    ],
    "previousTeam": "RR",
    "age": 31
  },
  {
    "id": "p104",
    "name": "Manav Suthar",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 85,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "0/32",
      "1/25",
      "3/25"
    ],
    "previousTeam": "DC",
    "age": 23
  },
  {
    "id": "p105",
    "name": "Pravin Dubey",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 8,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "41 & 1/24",
      "3 & 0/32"
    ],
    "previousTeam": "GT",
    "age": 19
  },
  {
    "id": "p106",
    "name": "Mukul Choudhary",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "19",
      "12*",
      "79",
      "17",
      "21"
    ],
    "previousTeam": "CSK",
    "age": 26
  },
  {
    "id": "p107",
    "name": "Rahul Tewatia",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "61",
      "51*",
      "51",
      "14",
      "46"
    ],
    "previousTeam": "RR",
    "age": 24
  },
  {
    "id": "p108",
    "name": "Ashutosh Sharma",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 5,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "42 & 0/30",
      "6 & 1/32"
    ],
    "previousTeam": "LSG",
    "age": 19
  },
  {
    "id": "p109",
    "name": "Karun Nair",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 90,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "75",
      "42*",
      "20",
      "45",
      "3"
    ],
    "previousTeam": "SRH",
    "age": 35
  },
  {
    "id": "p110",
    "name": "Nuwan Thushara",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 88,
    "popularity": 4,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "67",
      "13*",
      "55",
      "29",
      "49"
    ],
    "previousTeam": "KKR",
    "age": 26
  },
  {
    "id": "p111",
    "name": "Sean Abbott",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 78,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "1/17",
      "1/28",
      "0/29"
    ],
    "previousTeam": "CSK",
    "age": 24
  },
  {
    "id": "p112",
    "name": "Shamar Joseph",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 8,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "58",
      "4*",
      "16",
      "40",
      "8"
    ],
    "previousTeam": "PBKS",
    "age": 21
  },
  {
    "id": "p113",
    "name": "Deepak Chahar",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 88,
    "popularity": 5,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "21",
      "31*",
      "59",
      "20",
      "58"
    ],
    "previousTeam": "SRH",
    "age": 34
  },
  {
    "id": "p114",
    "name": "Jaydev Unadkat",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "10 & 0/34",
      "47 & 1/15"
    ],
    "previousTeam": "CSK",
    "age": 23
  },
  {
    "id": "p115",
    "name": "Ricky Bhui",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "0/40",
      "2/16",
      "0/42"
    ],
    "previousTeam": "RR",
    "age": 30
  },
  {
    "id": "p116",
    "name": "Ben Stokes",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 75,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "86",
      "73*",
      "71",
      "18",
      "39"
    ],
    "previousTeam": "GT",
    "age": 18
  },
  {
    "id": "p117",
    "name": "Tilak Varma",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "0/22",
      "1/20",
      "1/29"
    ],
    "previousTeam": "SRH",
    "age": 22
  },
  {
    "id": "p118",
    "name": "Naman Tiwari",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "12 & 2/29",
      "14 & 0/15"
    ],
    "previousTeam": "RCB",
    "age": 27
  },
  {
    "id": "p119",
    "name": "Nathan Ellis",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "38 & 2/36",
      "48 & 2/39"
    ],
    "previousTeam": "DC",
    "age": 26
  },
  {
    "id": "p120",
    "name": "Pawan Negi",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 78,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "3/40",
      "2/43",
      "3/40"
    ],
    "previousTeam": "SRH",
    "age": 19
  },
  {
    "id": "p121",
    "name": "Daniel Worrall",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 76,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "28 & 0/28",
      "23 & 2/34"
    ],
    "previousTeam": "PBKS",
    "age": 34
  },
  {
    "id": "p122",
    "name": "Sarfaraz Khan",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "5",
      "68*",
      "2",
      "38",
      "29"
    ],
    "previousTeam": "CSK",
    "age": 22
  },
  {
    "id": "p123",
    "name": "Shahrukh Khan",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "16",
      "38*",
      "7",
      "19",
      "41"
    ],
    "previousTeam": "RCB",
    "age": 23
  },
  {
    "id": "p124",
    "name": "Dewald Brevis",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 81,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "83",
      "75*",
      "48",
      "23",
      "77"
    ],
    "previousTeam": "SRH",
    "age": 31
  },
  {
    "id": "p125",
    "name": "Marco Jansen",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "0/42",
      "1/33",
      "2/30"
    ],
    "previousTeam": "MI",
    "age": 31
  },
  {
    "id": "p126",
    "name": "Ashton Agar",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "1 & 1/27",
      "39 & 0/36"
    ],
    "previousTeam": "CSK",
    "age": 27
  },
  {
    "id": "p127",
    "name": "Harry Brook",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 87,
    "popularity": 6,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "3/26",
      "1/43",
      "1/34"
    ],
    "previousTeam": "DC",
    "age": 20
  },
  {
    "id": "p128",
    "name": "Dushmantha Chameera",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 86,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "31 & 2/22",
      "19 & 1/23"
    ],
    "previousTeam": "SRH",
    "age": 30
  },
  {
    "id": "p129",
    "name": "Atharva Taide",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "1/44",
      "0/32",
      "2/23"
    ],
    "previousTeam": "RR",
    "age": 33
  },
  {
    "id": "p130",
    "name": "Dilshan Madushanka",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "59",
      "72*",
      "62",
      "35",
      "34"
    ],
    "previousTeam": "DC",
    "age": 33
  },
  {
    "id": "p131",
    "name": "Vijay Shankar",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 82,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "5 & 0/38",
      "4 & 0/28"
    ],
    "previousTeam": "MI",
    "age": 36
  },
  {
    "id": "p132",
    "name": "Himanshu Sharma",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "54",
      "94*",
      "15",
      "7",
      "13"
    ],
    "previousTeam": "GT",
    "age": 36
  },
  {
    "id": "p133",
    "name": "Kumar Kushagra",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "27",
      "51*",
      "42",
      "48",
      "91"
    ],
    "previousTeam": "MI",
    "age": 19
  },
  {
    "id": "p134",
    "name": "Vishnu Vinod",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "48",
      "89*",
      "47",
      "12",
      "33"
    ],
    "previousTeam": "LSG",
    "age": 22
  },
  {
    "id": "p135",
    "name": "Joshua Little",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 76,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "16",
      "44*",
      "36",
      "4",
      "47"
    ],
    "previousTeam": "LSG",
    "age": 19
  },
  {
    "id": "p136",
    "name": "Shimron Hetmyer",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 87,
    "popularity": 6,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "20 & 0/17",
      "44 & 0/23"
    ],
    "previousTeam": "PBKS",
    "age": 27
  },
  {
    "id": "p137",
    "name": "Luke Wood",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 4,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "3",
      "24*",
      "44",
      "10",
      "21"
    ],
    "previousTeam": "MI",
    "age": 23
  },
  {
    "id": "p138",
    "name": "Ripal Patel",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "44",
      "80*",
      "45",
      "35",
      "31"
    ],
    "previousTeam": "DC",
    "age": 34
  },
  {
    "id": "p139",
    "name": "Will Young",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "26 & 1/32",
      "19 & 0/19"
    ],
    "previousTeam": "MI",
    "age": 36
  },
  {
    "id": "p140",
    "name": "Daniel Sams",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 86,
    "popularity": 4,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "47",
      "59*",
      "2",
      "6",
      "13"
    ],
    "previousTeam": "MI",
    "age": 22
  },
  {
    "id": "p141",
    "name": "Sadeera Samarawickrama",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 4,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "3/24",
      "3/29",
      "1/41"
    ],
    "previousTeam": "RCB",
    "age": 29
  },
  {
    "id": "p142",
    "name": "Akash Madhwal",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "84",
      "33*",
      "11",
      "44",
      "51"
    ],
    "previousTeam": "DC",
    "age": 22
  },
  {
    "id": "p143",
    "name": "Richard Ngarava",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 77,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "6",
      "26*",
      "68",
      "17",
      "31"
    ],
    "previousTeam": "CSK",
    "age": 20
  },
  {
    "id": "p144",
    "name": "Nitish Rana",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "1/33",
      "2/34",
      "1/44"
    ],
    "previousTeam": "GT",
    "age": 26
  },
  {
    "id": "p145",
    "name": "Sameer Rizvi",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "43 & 2/25",
      "3 & 0/36"
    ],
    "previousTeam": "PBKS",
    "age": 19
  },
  {
    "id": "p146",
    "name": "Rajat Patidar",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 6,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "0/21",
      "0/30",
      "3/39"
    ],
    "previousTeam": "LSG",
    "age": 19
  },
  {
    "id": "p147",
    "name": "Anshul Kamboj",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "2/33",
      "3/31",
      "0/36"
    ],
    "previousTeam": "PBKS",
    "age": 26
  },
  {
    "id": "p148",
    "name": "Chetan Sakariya",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "2/30",
      "1/32",
      "1/35"
    ],
    "previousTeam": "LSG",
    "age": 35
  },
  {
    "id": "p149",
    "name": "Noor Ahmad",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "12",
      "64*",
      "61",
      "19",
      "2"
    ],
    "previousTeam": "MI",
    "age": 30
  },
  {
    "id": "p150",
    "name": "Anukul Roy",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "2/29",
      "1/34",
      "1/17"
    ],
    "previousTeam": "DC",
    "age": 19
  },
  {
    "id": "p151",
    "name": "Mohammad Nabi",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 8,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "2/32",
      "3/19",
      "3/30"
    ],
    "previousTeam": "CSK",
    "age": 20
  },
  {
    "id": "p152",
    "name": "Joe Root",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "4 & 1/37",
      "11 & 0/18"
    ],
    "previousTeam": "SRH",
    "age": 31
  },
  {
    "id": "p153",
    "name": "Riley Meredith",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "53",
      "35*",
      "12",
      "41",
      "58"
    ],
    "previousTeam": "KKR",
    "age": 24
  },
  {
    "id": "p154",
    "name": "Tim David",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "33",
      "30*",
      "67",
      "21",
      "83"
    ],
    "previousTeam": "PBKS",
    "age": 32
  },
  {
    "id": "p155",
    "name": "Kumar Kartikeya",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "31",
      "61*",
      "31",
      "44",
      "60"
    ],
    "previousTeam": "KKR",
    "age": 30
  },
  {
    "id": "p156",
    "name": "Avesh Khan",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "34 & 2/31",
      "20 & 0/39"
    ],
    "previousTeam": "DC",
    "age": 36
  },
  {
    "id": "p157",
    "name": "Shivam Dube",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 77,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "2 & 1/33",
      "32 & 0/17"
    ],
    "previousTeam": "RCB",
    "age": 28
  },
  {
    "id": "p158",
    "name": "Shoriful Islam",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 86,
    "popularity": 4,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "1",
      "44*",
      "76",
      "36",
      "87"
    ],
    "previousTeam": "KKR",
    "age": 23
  },
  {
    "id": "p159",
    "name": "Krunal Pandya",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "1/39",
      "0/41",
      "0/26"
    ],
    "previousTeam": "LSG",
    "age": 21
  },
  {
    "id": "p160",
    "name": "Khaleel Ahmed",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "3/42",
      "1/39",
      "0/16"
    ],
    "previousTeam": "KKR",
    "age": 29
  },
  {
    "id": "p161",
    "name": "Adil Rashid",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 89,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "3/22",
      "0/16",
      "0/25"
    ],
    "previousTeam": "RCB",
    "age": 32
  },
  {
    "id": "p162",
    "name": "Mukesh Choudhary",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 8,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "4",
      "27*",
      "45",
      "44",
      "94"
    ],
    "previousTeam": "PBKS",
    "age": 18
  },
  {
    "id": "p163",
    "name": "Sandeep Warrier",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "0/44",
      "0/36",
      "0/41"
    ],
    "previousTeam": "DC",
    "age": 34
  },
  {
    "id": "p164",
    "name": "Mustafizur Rahman",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "23",
      "10*",
      "41",
      "20",
      "67"
    ],
    "previousTeam": "MI",
    "age": 28
  },
  {
    "id": "p165",
    "name": "KL Rahul",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 88,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "8",
      "99*",
      "41",
      "36",
      "32"
    ],
    "previousTeam": "KKR",
    "age": 20
  },
  {
    "id": "p166",
    "name": "Azmatullah Omarzai",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "14 & 1/37",
      "1 & 1/37"
    ],
    "previousTeam": "DC",
    "age": 28
  },
  {
    "id": "p167",
    "name": "Yash Dayal",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 5,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "14",
      "78*",
      "15",
      "0",
      "97"
    ],
    "previousTeam": "PBKS",
    "age": 18
  },
  {
    "id": "p168",
    "name": "Evin Lewis",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 82,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "22",
      "37*",
      "73",
      "0",
      "77"
    ],
    "previousTeam": "RCB",
    "age": 24
  },
  {
    "id": "p169",
    "name": "Lance Morris",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "3/24",
      "0/34",
      "1/39"
    ],
    "previousTeam": "RR",
    "age": 31
  },
  {
    "id": "p170",
    "name": "Priyank Panchal",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "56",
      "96*",
      "8",
      "9",
      "21"
    ],
    "previousTeam": "SRH",
    "age": 18
  },
  {
    "id": "p171",
    "name": "Rasikh Salam",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 77,
    "popularity": 6,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "39",
      "98*",
      "10",
      "5",
      "49"
    ],
    "previousTeam": "KKR",
    "age": 21
  },
  {
    "id": "p172",
    "name": "Mujeeb Ur Rahman",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 82,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "8",
      "35*",
      "8",
      "4",
      "27"
    ],
    "previousTeam": "SRH",
    "age": 33
  },
  {
    "id": "p173",
    "name": "Robin Minz",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "1/31",
      "1/44",
      "1/44"
    ],
    "previousTeam": "PBKS",
    "age": 27
  },
  {
    "id": "p174",
    "name": "Vishnu Vinod",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 85,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "2/44",
      "3/16",
      "1/15"
    ],
    "previousTeam": "MI",
    "age": 18
  },
  {
    "id": "p175",
    "name": "Sam Curran",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "4",
      "42*",
      "62",
      "23",
      "90"
    ],
    "previousTeam": "LSG",
    "age": 19
  },
  {
    "id": "p176",
    "name": "Akash Deep",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "66",
      "44*",
      "29",
      "9",
      "58"
    ],
    "previousTeam": "PBKS",
    "age": 29
  },
  {
    "id": "p177",
    "name": "Saurav Chauhan",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "49 & 0/32",
      "27 & 2/24"
    ],
    "previousTeam": "CSK",
    "age": 25
  },
  {
    "id": "p178",
    "name": "Dawid Malan",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "72",
      "36*",
      "48",
      "45",
      "90"
    ],
    "previousTeam": "KKR",
    "age": 24
  },
  {
    "id": "p179",
    "name": "Prabhsimran Singh",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "77",
      "90*",
      "65",
      "46",
      "50"
    ],
    "previousTeam": "CSK",
    "age": 30
  },
  {
    "id": "p180",
    "name": "Lorcan Tucker",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 88,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "46 & 2/23",
      "17 & 2/29"
    ],
    "previousTeam": "CSK",
    "age": 23
  },
  {
    "id": "p181",
    "name": "Nishant Sindhu",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "83",
      "47*",
      "67",
      "23",
      "88"
    ],
    "previousTeam": "SRH",
    "age": 20
  },
  {
    "id": "p182",
    "name": "Devdutt Padikkal",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 88,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "53",
      "63*",
      "19",
      "31",
      "76"
    ],
    "previousTeam": "DC",
    "age": 25
  },
  {
    "id": "p183",
    "name": "Nitish Kumar Reddy",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "92",
      "96*",
      "70",
      "5",
      "20"
    ],
    "previousTeam": "MI",
    "age": 24
  },
  {
    "id": "p184",
    "name": "Naveen-ul-Haq",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 7,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "1/29",
      "1/25",
      "3/16"
    ],
    "previousTeam": "MI",
    "age": 21
  },
  {
    "id": "p185",
    "name": "Adam Milne",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "0 & 1/16",
      "2 & 0/32"
    ],
    "previousTeam": "DC",
    "age": 29
  },
  {
    "id": "p186",
    "name": "Atharva Taide",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "1/37",
      "0/35",
      "0/41"
    ],
    "previousTeam": "CSK",
    "age": 31
  },
  {
    "id": "p187",
    "name": "Yannic Cariah",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 79,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "10 & 0/23",
      "10 & 2/22"
    ],
    "previousTeam": "SRH",
    "age": 25
  },
  {
    "id": "p188",
    "name": "Taskin Ahmed",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 86,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "3",
      "46*",
      "0",
      "32",
      "69"
    ],
    "previousTeam": "SRH",
    "age": 36
  },
  {
    "id": "p189",
    "name": "Abhishek Sharma",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "9",
      "15*",
      "30",
      "34",
      "79"
    ],
    "previousTeam": "SRH",
    "age": 24
  },
  {
    "id": "p190",
    "name": "Spencer Johnson",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 81,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "24 & 2/24",
      "33 & 1/30"
    ],
    "previousTeam": "CSK",
    "age": 26
  },
  {
    "id": "p191",
    "name": "Ajay Mandal",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 77,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "26 & 2/16",
      "9 & 2/22"
    ],
    "previousTeam": "RCB",
    "age": 19
  },
  {
    "id": "p192",
    "name": "KC Cariappa",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "22 & 2/17",
      "29 & 1/16"
    ],
    "previousTeam": "PBKS",
    "age": 25
  },
  {
    "id": "p193",
    "name": "Ayush Badoni",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "9",
      "29*",
      "28",
      "0",
      "52"
    ],
    "previousTeam": "MI",
    "age": 32
  },
  {
    "id": "p194",
    "name": "Shai Hope",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "36",
      "2*",
      "57",
      "40",
      "41"
    ],
    "previousTeam": "SRH",
    "age": 29
  },
  {
    "id": "p195",
    "name": "Mahipal Lomror",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "37 & 1/31",
      "30 & 1/39"
    ],
    "previousTeam": "CSK",
    "age": 29
  },
  {
    "id": "p196",
    "name": "Murugan Ashwin",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "46 & 2/32",
      "44 & 2/34"
    ],
    "previousTeam": "PBKS",
    "age": 36
  },
  {
    "id": "p197",
    "name": "Matt Henry",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "19 & 2/18",
      "19 & 0/28"
    ],
    "previousTeam": "PBKS",
    "age": 36
  },
  {
    "id": "p198",
    "name": "Priyansh Arya",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "16",
      "56*",
      "35",
      "40",
      "50"
    ],
    "previousTeam": "RCB",
    "age": 28
  },
  {
    "id": "p199",
    "name": "Shreyas Iyer",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 85,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "20 & 2/17",
      "6 & 0/22"
    ],
    "previousTeam": "RR",
    "age": 35
  },
  {
    "id": "p200",
    "name": "Aditya Tare",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "47",
      "1*",
      "53",
      "9",
      "53"
    ],
    "previousTeam": "KKR",
    "age": 25
  },
  {
    "id": "p201",
    "name": "Reece Topley",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 79,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "1/36",
      "2/40",
      "3/19"
    ],
    "previousTeam": "PBKS",
    "age": 33
  },
  {
    "id": "p202",
    "name": "Vaibhav Arora",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 5,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "55",
      "32*",
      "56",
      "46",
      "53"
    ],
    "previousTeam": "RCB",
    "age": 26
  },
  {
    "id": "p203",
    "name": "Shahbaz Nadeem",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 7,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "72",
      "75*",
      "26",
      "32",
      "85"
    ],
    "previousTeam": "MI",
    "age": 20
  },
  {
    "id": "p204",
    "name": "Riyan Parag",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "47 & 2/35",
      "23 & 2/34"
    ],
    "previousTeam": "GT",
    "age": 20
  },
  {
    "id": "p205",
    "name": "Matthew Potts",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 77,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "10",
      "38*",
      "26",
      "41",
      "48"
    ],
    "previousTeam": "LSG",
    "age": 35
  },
  {
    "id": "p206",
    "name": "Wriddhiman Saha",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 78,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "81",
      "87*",
      "49",
      "33",
      "76"
    ],
    "previousTeam": "RCB",
    "age": 22
  },
  {
    "id": "p207",
    "name": "Mayank Agarwal",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "3/30",
      "2/29",
      "0/38"
    ],
    "previousTeam": "MI",
    "age": 32
  },
  {
    "id": "p208",
    "name": "Suyash Sharma",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 90,
    "popularity": 8,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "2/22",
      "1/27",
      "3/28"
    ],
    "previousTeam": "CSK",
    "age": 21
  },
  {
    "id": "p209",
    "name": "Sikandar Raza",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "60",
      "55*",
      "7",
      "10",
      "39"
    ],
    "previousTeam": "CSK",
    "age": 33
  },
  {
    "id": "p210",
    "name": "Rovman Powell",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "49 & 0/39",
      "33 & 1/22"
    ],
    "previousTeam": "KKR",
    "age": 29
  },
  {
    "id": "p211",
    "name": "Sameer Rizvi",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 4,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "19",
      "24*",
      "46",
      "28",
      "41"
    ],
    "previousTeam": "GT",
    "age": 35
  },
  {
    "id": "p212",
    "name": "Ayush Badoni",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "34",
      "99*",
      "44",
      "21",
      "74"
    ],
    "previousTeam": "RR",
    "age": 23
  },
  {
    "id": "p213",
    "name": "Jofra Archer",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 77,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "61",
      "34*",
      "42",
      "49",
      "62"
    ],
    "previousTeam": "CSK",
    "age": 23
  },
  {
    "id": "p214",
    "name": "Rahmanullah Gurbaz",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "38",
      "58*",
      "31",
      "12",
      "78"
    ],
    "previousTeam": "RCB",
    "age": 36
  },
  {
    "id": "p215",
    "name": "Luvnith Sisodia",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "88",
      "81*",
      "51",
      "24",
      "15"
    ],
    "previousTeam": "RR",
    "age": 36
  },
  {
    "id": "p216",
    "name": "R. Sai Kishore",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "3",
      "11*",
      "69",
      "29",
      "9"
    ],
    "previousTeam": "RCB",
    "age": 21
  },
  {
    "id": "p217",
    "name": "Shardul Thakur",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 4,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "1 & 0/26",
      "33 & 0/22"
    ],
    "previousTeam": "KKR",
    "age": 28
  },
  {
    "id": "p218",
    "name": "Washington Sundar",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "43",
      "43*",
      "5",
      "28",
      "29"
    ],
    "previousTeam": "MI",
    "age": 23
  },
  {
    "id": "p219",
    "name": "Vidwath Kaverappa",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "63",
      "88*",
      "22",
      "3",
      "31"
    ],
    "previousTeam": "KKR",
    "age": 18
  },
  {
    "id": "p220",
    "name": "Kusal Mendis",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "46",
      "32*",
      "3",
      "23",
      "42"
    ],
    "previousTeam": "DC",
    "age": 24
  },
  {
    "id": "p221",
    "name": "Keshav Maharaj",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 90,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "0/43",
      "1/32",
      "0/16"
    ],
    "previousTeam": "GT",
    "age": 30
  },
  {
    "id": "p222",
    "name": "M. Siddharth",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "81",
      "13*",
      "42",
      "30",
      "95"
    ],
    "previousTeam": "DC",
    "age": 29
  },
  {
    "id": "p223",
    "name": "Mandeep Singh",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "11 & 1/34",
      "2 & 0/32"
    ],
    "previousTeam": "RR",
    "age": 27
  },
  {
    "id": "p224",
    "name": "Darshan Nalkande",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 5,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "9",
      "55*",
      "32",
      "0",
      "66"
    ],
    "previousTeam": "KKR",
    "age": 20
  },
  {
    "id": "p225",
    "name": "Shreyas Gopal",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 6,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "94",
      "80*",
      "13",
      "10",
      "34"
    ],
    "previousTeam": "LSG",
    "age": 36
  },
  {
    "id": "p226",
    "name": "Tom Hartley",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 4,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "39 & 2/25",
      "39 & 0/36"
    ],
    "previousTeam": "CSK",
    "age": 24
  },
  {
    "id": "p227",
    "name": "Shakib Al Hasan",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 79,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "70",
      "64*",
      "20",
      "46",
      "59"
    ],
    "previousTeam": "CSK",
    "age": 30
  },
  {
    "id": "p228",
    "name": "Jayant Yadav",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "54",
      "90*",
      "35",
      "8",
      "47"
    ],
    "previousTeam": "MI",
    "age": 24
  },
  {
    "id": "p229",
    "name": "Vyshak Vijay Kumar",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 6,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "25 & 1/39",
      "20 & 1/35"
    ],
    "previousTeam": "GT",
    "age": 18
  },
  {
    "id": "p230",
    "name": "Prasidh Krishna",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 8,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "93",
      "70*",
      "37",
      "49",
      "29"
    ],
    "previousTeam": "MI",
    "age": 28
  },
  {
    "id": "p231",
    "name": "Prashant Solanki",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 7,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "43 & 2/35",
      "5 & 2/36"
    ],
    "previousTeam": "MI",
    "age": 29
  },
  {
    "id": "p232",
    "name": "Fazalhaq Farooqi",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 76,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "4",
      "52*",
      "46",
      "26",
      "4"
    ],
    "previousTeam": "CSK",
    "age": 33
  },
  {
    "id": "p233",
    "name": "Kartik Tyagi",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "30",
      "66*",
      "18",
      "0",
      "90"
    ],
    "previousTeam": "PBKS",
    "age": 34
  },
  {
    "id": "p234",
    "name": "Prerak Mankad",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "0 & 0/16",
      "42 & 0/15"
    ],
    "previousTeam": "DC",
    "age": 36
  },
  {
    "id": "p235",
    "name": "Jitesh Sharma",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "74",
      "19*",
      "69",
      "26",
      "48"
    ],
    "previousTeam": "MI",
    "age": 23
  },
  {
    "id": "p236",
    "name": "Umran Malik",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 78,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "14",
      "10*",
      "79",
      "38",
      "15"
    ],
    "previousTeam": "RR",
    "age": 36
  },
  {
    "id": "p237",
    "name": "Obed McCoy",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 75,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "80",
      "76*",
      "14",
      "16",
      "86"
    ],
    "previousTeam": "CSK",
    "age": 24
  },
  {
    "id": "p238",
    "name": "Karan Sharma",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "26 & 0/21",
      "45 & 2/34"
    ],
    "previousTeam": "KKR",
    "age": 21
  },
  {
    "id": "p239",
    "name": "Swastik Chikara",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "45 & 0/31",
      "3 & 1/28"
    ],
    "previousTeam": "CSK",
    "age": 20
  },
  {
    "id": "p240",
    "name": "Krishnappa Gowtham",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 4,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "34 & 0/27",
      "44 & 0/33"
    ],
    "previousTeam": "KKR",
    "age": 24
  },
  {
    "id": "p241",
    "name": "Arjun Tendulkar",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 89,
    "popularity": 4,
    "basePrice": 1.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "74",
      "27*",
      "63",
      "43",
      "89"
    ],
    "previousTeam": "SRH",
    "age": 35
  },
  {
    "id": "p242",
    "name": "Gerald Coetzee",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 4,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "24 & 2/16",
      "6 & 1/22"
    ],
    "previousTeam": "DC",
    "age": 23
  },
  {
    "id": "p243",
    "name": "Hanuma Vihari",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 91,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "18 & 1/18",
      "9 & 2/28"
    ],
    "previousTeam": "PBKS",
    "age": 21
  },
  {
    "id": "p244",
    "name": "Lalit Yadav",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "38",
      "10*",
      "75",
      "8",
      "28"
    ],
    "previousTeam": "SRH",
    "age": 25
  },
  {
    "id": "p245",
    "name": "Prithvi Shaw",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 85,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "44",
      "74*",
      "31",
      "21",
      "47"
    ],
    "previousTeam": "RCB",
    "age": 22
  },
  {
    "id": "p246",
    "name": "Amit Mishra",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "91",
      "49*",
      "9",
      "20",
      "65"
    ],
    "previousTeam": "SRH",
    "age": 18
  },
  {
    "id": "p247",
    "name": "Sakib Hussain",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "14 & 1/28",
      "24 & 1/29"
    ],
    "previousTeam": "RR",
    "age": 21
  },
  {
    "id": "p248",
    "name": "Kane Williamson",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "15 & 1/15",
      "40 & 2/25"
    ],
    "previousTeam": "PBKS",
    "age": 21
  },
  {
    "id": "p249",
    "name": "Baba Indrajith",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 90,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "1 & 2/29",
      "21 & 0/36"
    ],
    "previousTeam": "SRH",
    "age": 31
  },
  {
    "id": "p250",
    "name": "Tushar Deshpande",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 75,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "3/37",
      "3/27",
      "0/35"
    ],
    "previousTeam": "RR",
    "age": 31
  },
  {
    "id": "p251",
    "name": "Shahbaz Ahmed",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 83,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "12",
      "16*",
      "26",
      "20",
      "83"
    ],
    "previousTeam": "DC",
    "age": 34
  },
  {
    "id": "p252",
    "name": "Shashank Singh",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 6,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "89",
      "99*",
      "55",
      "28",
      "86"
    ],
    "previousTeam": "SRH",
    "age": 28
  },
  {
    "id": "p253",
    "name": "Suyash Prabhudessai",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 8,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "3/26",
      "0/30",
      "3/35"
    ],
    "previousTeam": "RR",
    "age": 19
  },
  {
    "id": "p254",
    "name": "Litton Das",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 79,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "36",
      "28*",
      "38",
      "25",
      "24"
    ],
    "previousTeam": "SRH",
    "age": 28
  },
  {
    "id": "p255",
    "name": "Gurkeerat Singh Mann",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 8,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "21",
      "77*",
      "70",
      "44",
      "50"
    ],
    "previousTeam": "GT",
    "age": 34
  },
  {
    "id": "p256",
    "name": "Anuj Rawat",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "42 & 1/19",
      "48 & 1/23"
    ],
    "previousTeam": "SRH",
    "age": 33
  },
  {
    "id": "p257",
    "name": "Abhimanyu Easwaran",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "0",
      "26*",
      "18",
      "11",
      "19"
    ],
    "previousTeam": "CSK",
    "age": 29
  },
  {
    "id": "p258",
    "name": "Odean Smith",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 81,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "3/32",
      "0/27",
      "0/24"
    ],
    "previousTeam": "LSG",
    "age": 36
  },
  {
    "id": "p259",
    "name": "Abhinav Manohar",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 8,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "51",
      "84*",
      "67",
      "40",
      "49"
    ],
    "previousTeam": "DC",
    "age": 36
  },
  {
    "id": "p260",
    "name": "Ajinkya Rahane",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 90,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "63",
      "66*",
      "2",
      "28",
      "75"
    ],
    "previousTeam": "KKR",
    "age": 34
  },
  {
    "id": "p261",
    "name": "Vicky Ostwal",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 7,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "68",
      "85*",
      "75",
      "16",
      "67"
    ],
    "previousTeam": "KKR",
    "age": 27
  },
  {
    "id": "p262",
    "name": "Dhruv Jurel",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 90,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "4 & 1/29",
      "34 & 2/28"
    ],
    "previousTeam": "LSG",
    "age": 18
  },
  {
    "id": "p263",
    "name": "Harpreet Brar",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "44",
      "63*",
      "28",
      "16",
      "66"
    ],
    "previousTeam": "MI",
    "age": 24
  },
  {
    "id": "p264",
    "name": "Saurabh Tiwary",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "1/27",
      "2/15",
      "2/40"
    ],
    "previousTeam": "MI",
    "age": 32
  },
  {
    "id": "p265",
    "name": "Najibullah Zadran",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 84,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "80",
      "32*",
      "22",
      "43",
      "45"
    ],
    "previousTeam": "SRH",
    "age": 35
  },
  {
    "id": "p266",
    "name": "Tymal Mills",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 82,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "64",
      "62*",
      "37",
      "24",
      "38"
    ],
    "previousTeam": "SRH",
    "age": 31
  },
  {
    "id": "p267",
    "name": "Musheer Khan",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "82",
      "80*",
      "33",
      "42",
      "7"
    ],
    "previousTeam": "MI",
    "age": 30
  },
  {
    "id": "p268",
    "name": "Tanush Kotian",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 77,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "48 & 0/21",
      "1 & 1/39"
    ],
    "previousTeam": "MI",
    "age": 29
  },
  {
    "id": "p269",
    "name": "Jamie Overton",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "38 & 1/22",
      "7 & 2/39"
    ],
    "previousTeam": "KKR",
    "age": 36
  },
  {
    "id": "p270",
    "name": "Naman Dhir",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "1/37",
      "3/23",
      "1/28"
    ],
    "previousTeam": "RR",
    "age": 30
  },
  {
    "id": "p271",
    "name": "Umesh Yadav",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 81,
    "popularity": 5,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "3/43",
      "3/35",
      "0/18"
    ],
    "previousTeam": "KKR",
    "age": 26
  },
  {
    "id": "p272",
    "name": "KS Bharat",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 82,
    "popularity": 8,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "2/16",
      "2/28",
      "1/43"
    ],
    "previousTeam": "GT",
    "age": 26
  },
  {
    "id": "p273",
    "name": "Sandip Sharma",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 76,
    "popularity": 6,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "40",
      "70*",
      "57",
      "46",
      "82"
    ],
    "previousTeam": "CSK",
    "age": 19
  },
  {
    "id": "p274",
    "name": "Harpreet Singh",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 6,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "recentForm": [
      "39 & 0/34",
      "38 & 1/15"
    ],
    "previousTeam": "KKR",
    "age": 23
  },
  {
    "id": "p275",
    "name": "Sheldon Jackson",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "29",
      "3*",
      "56",
      "40",
      "65"
    ],
    "previousTeam": "LSG",
    "age": 32
  },
  {
    "id": "p276",
    "name": "Shams Mulani",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 80,
    "popularity": 4,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "44 & 2/34",
      "24 & 1/16"
    ],
    "previousTeam": "LSG",
    "age": 26
  },
  {
    "id": "p277",
    "name": "Akshat Raghuwanshi",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 4,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "2/38",
      "3/17",
      "2/30"
    ],
    "previousTeam": "SRH",
    "age": 20
  },
  {
    "id": "p278",
    "name": "Sanvir Singh",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 6,
    "basePrice": 0.2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "0/21",
      "1/40",
      "0/28"
    ],
    "previousTeam": "LSG",
    "age": 18
  },
  {
    "id": "p279",
    "name": "Tanay Thyagarajan",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 82,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "65",
      "9*",
      "68",
      "37",
      "90"
    ],
    "previousTeam": "RR",
    "age": 23
  },
  {
    "id": "p280",
    "name": "Swapnil Singh",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "21",
      "98*",
      "51",
      "8",
      "13"
    ],
    "previousTeam": "SRH",
    "age": 24
  },
  {
    "id": "p281",
    "name": "Rajvardhan Hangargekar",
    "role": "Batsman",
    "nationality": "Indian",
    "rating": 87,
    "popularity": 5,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "35",
      "33*",
      "30",
      "44",
      "39"
    ],
    "previousTeam": "PBKS",
    "age": 31
  },
  {
    "id": "p282",
    "name": "Aiden Markram",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 76,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "46",
      "20*",
      "41",
      "44",
      "23"
    ],
    "previousTeam": "GT",
    "age": 30
  },
  {
    "id": "p283",
    "name": "Adam Zampa",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 83,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "0/41",
      "1/28",
      "2/32"
    ],
    "previousTeam": "RCB",
    "age": 20
  },
  {
    "id": "p284",
    "name": "Robin Minz",
    "role": "All-Rounder",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "36 & 1/33",
      "22 & 1/36"
    ],
    "previousTeam": "SRH",
    "age": 26
  },
  {
    "id": "p285",
    "name": "Sheldon Jackson",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 92,
    "popularity": 8,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "5",
      "15*",
      "64",
      "25",
      "2"
    ],
    "previousTeam": "MI",
    "age": 28
  },
  {
    "id": "p286",
    "name": "Siddharth Kaul",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 84,
    "popularity": 6,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "12",
      "85*",
      "21",
      "6",
      "71"
    ],
    "previousTeam": "GT",
    "age": 27
  },
  {
    "id": "p287",
    "name": "Josh Little",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium",
    "recentForm": [
      "22 & 2/16",
      "18 & 0/28"
    ],
    "previousTeam": "LSG",
    "age": 34
  },
  {
    "id": "p288",
    "name": "Manoj Bhandage",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 79,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "78",
      "28*",
      "8",
      "26",
      "66"
    ],
    "previousTeam": "SRH",
    "age": 23
  },
  {
    "id": "p289",
    "name": "Mark Wood",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 85,
    "popularity": 5,
    "basePrice": 1,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "41 & 2/38",
      "7 & 0/21"
    ],
    "previousTeam": "PBKS",
    "age": 24
  },
  {
    "id": "p290",
    "name": "Angkrish Raghuvanshi",
    "role": "Bowler",
    "nationality": "Indian",
    "rating": 86,
    "popularity": 4,
    "basePrice": 1,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "2/22",
      "0/21",
      "2/22"
    ],
    "previousTeam": "RCB",
    "age": 33
  },
  {
    "id": "p291",
    "name": "Simarjeet Singh",
    "role": "Wicketkeeper",
    "nationality": "Indian",
    "rating": 78,
    "popularity": 6,
    "basePrice": 0.2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "19",
      "12*",
      "42",
      "15",
      "21"
    ],
    "previousTeam": "SRH",
    "age": 20
  },
  {
    "id": "p292",
    "name": "Moeen Ali",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 75,
    "popularity": 5,
    "basePrice": 0.5,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "0/29",
      "1/15",
      "0/31"
    ],
    "previousTeam": "DC",
    "age": 36
  },
  {
    "id": "p293",
    "name": "Will Jacks",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 75,
    "popularity": 4,
    "basePrice": 0.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "24",
      "64*",
      "70",
      "42",
      "87"
    ],
    "previousTeam": "LSG",
    "age": 25
  },
  {
    "id": "p294",
    "name": "Lockie Ferguson",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 92,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "recentForm": [
      "0/20",
      "1/38",
      "2/16"
    ],
    "previousTeam": "GT",
    "age": 26
  },
  {
    "id": "p295",
    "name": "Akeal Hosein",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 5,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "recentForm": [
      "0/27",
      "2/44",
      "2/40"
    ],
    "previousTeam": "KKR",
    "age": 21
  },
  {
    "id": "p296",
    "name": "Jason Roy",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 6,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast",
    "recentForm": [
      "43 & 1/18",
      "29 & 1/37"
    ],
    "previousTeam": "DC",
    "age": 27
  },
  {
    "id": "p297",
    "name": "Lungi Ngidi",
    "role": "Batsman",
    "nationality": "Overseas",
    "rating": 87,
    "popularity": 7,
    "basePrice": 1.5,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "34",
      "21*",
      "3",
      "17",
      "39"
    ],
    "previousTeam": "DC",
    "age": 23
  },
  {
    "id": "p298",
    "name": "Dunith Wellalage",
    "role": "Bowler",
    "nationality": "Overseas",
    "rating": 80,
    "popularity": 7,
    "basePrice": 0.75,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "recentForm": [
      "3/33",
      "1/40",
      "2/26"
    ],
    "previousTeam": "LSG",
    "age": 34
  },
  {
    "id": "p299",
    "name": "Hazratullah Zazai",
    "role": "All-Rounder",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 4,
    "basePrice": 2,
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "recentForm": [
      "23 & 0/33",
      "20 & 1/33"
    ],
    "previousTeam": "RCB",
    "age": 29
  },
  {
    "id": "p300",
    "name": "Tom Curran",
    "role": "Wicketkeeper",
    "nationality": "Overseas",
    "rating": 91,
    "popularity": 7,
    "basePrice": 2,
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "None",
    "recentForm": [
      "74",
      "11*",
      "58",
      "39",
      "31"
    ],
    "previousTeam": "KKR",
    "age": 30
  }
];

export const PRESETS_AVATARS = [
  {
    "id": "av1",
    "name": "CSK Lion",
    "icon": "🦁",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "av2",
    "name": "MI Eagle",
    "icon": "🦅",
    "color": "from-blue-500 to-indigo-600"
  },
  {
    "id": "av3",
    "name": "RCB Tiger",
    "icon": "🐅",
    "color": "from-red-500 to-rose-700"
  },
  {
    "id": "av4",
    "name": "KKR Knight",
    "icon": "🛡️",
    "color": "from-purple-600 to-indigo-700"
  },
  {
    "id": "av5",
    "name": "SRH Sun",
    "icon": "🔥",
    "color": "from-orange-500 to-red-600"
  },
  {
    "id": "av6",
    "name": "RR Crown",
    "icon": "👑",
    "color": "from-pink-500 to-blue-500"
  },
  {
    "id": "av7",
    "name": "DC Tiger",
    "icon": "⚡",
    "color": "from-cyan-500 to-blue-700"
  },
  {
    "id": "av8",
    "name": "LSG Wings",
    "icon": "🪽",
    "color": "from-sky-400 to-indigo-500"
  },
  {
    "id": "av9",
    "name": "GT Titan",
    "icon": "🔱",
    "color": "from-slate-700 to-slate-900"
  },
  {
    "id": "av10",
    "name": "PBKS King",
    "icon": "⚔️",
    "color": "from-red-600 to-silver-500"
  }
];
