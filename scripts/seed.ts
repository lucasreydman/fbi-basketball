/**
 * Seeds the FBI Supabase project with redraft data:
 *   - 60 NBA players (current-season relevant)
 *   - Published Points + 9-cat ROS ranked lists (v1)
 *   - Published trade calc v1 with player values
 *
 * Run:  pnpm seed
 */

import { getAdminSupabase } from "../lib/supabase";
import { slugify } from "../lib/data/trade-math";

interface PlayerSeed {
  full_name: string;
  team: string;
  position: string;
  age: number;
}

const PLAYERS: PlayerSeed[] = [
  // Tier 1 — early-round cornerstones
  { full_name: "Shai Gilgeous-Alexander", team: "OKC", position: "G", age: 27.7 },
  { full_name: "Nikola Jokic",            team: "DEN", position: "C", age: 31.2 },
  { full_name: "Victor Wembanyama",       team: "SAS", position: "C", age: 22.4 },
  { full_name: "Anthony Edwards",         team: "MIN", position: "G", age: 24.6 },
  { full_name: "Giannis Antetokounmpo",   team: "MIL", position: "F", age: 31.5 },
  { full_name: "Luka Doncic",             team: "DAL", position: "G", age: 27.2 },
  { full_name: "Tyrese Haliburton",       team: "IND", position: "G", age: 26.2 },
  { full_name: "Jayson Tatum",            team: "BOS", position: "F", age: 28.1 },
  { full_name: "Devin Booker",            team: "PHX", position: "G", age: 29.6 },
  { full_name: "Karl-Anthony Towns",      team: "NYK", position: "C", age: 30.4 },

  // Tier 2 — early second-round
  { full_name: "Donovan Mitchell",        team: "CLE", position: "G", age: 29.5 },
  { full_name: "Cade Cunningham",         team: "DET", position: "G", age: 24.5 },
  { full_name: "Damian Lillard",          team: "MIL", position: "G", age: 35.6 },
  { full_name: "Anthony Davis",           team: "DAL", position: "F", age: 32.9 },
  { full_name: "Domantas Sabonis",        team: "SAC", position: "F", age: 29.6 },
  { full_name: "LaMelo Ball",             team: "CHA", position: "G", age: 24.6 },
  { full_name: "Jalen Brunson",           team: "NYK", position: "G", age: 29.5 },
  { full_name: "Trae Young",              team: "ATL", position: "G", age: 27.4 },
  { full_name: "Paolo Banchero",          team: "ORL", position: "F", age: 23.4 },
  { full_name: "Bam Adebayo",             team: "MIA", position: "C", age: 28.4 },

  // Tier 3 — mid-round building blocks
  { full_name: "Jaylen Brown",            team: "BOS", position: "F", age: 29.4 },
  { full_name: "Pascal Siakam",           team: "IND", position: "F", age: 31.6 },
  { full_name: "Tyrese Maxey",            team: "PHI", position: "G", age: 25.2 },
  { full_name: "Jamal Murray",            team: "DEN", position: "G", age: 29.0 },
  { full_name: "James Harden",            team: "LAC", position: "G", age: 36.4 },
  { full_name: "Alperen Sengun",          team: "HOU", position: "C", age: 23.6 },
  { full_name: "Scottie Barnes",          team: "TOR", position: "F", age: 24.7 },
  { full_name: "Chet Holmgren",           team: "OKC", position: "C", age: 24.0 },
  { full_name: "Franz Wagner",            team: "ORL", position: "F", age: 24.4 },
  { full_name: "Jaren Jackson Jr.",       team: "MEM", position: "F", age: 26.4 },

  // Tier 4 — solid contributors
  { full_name: "Jalen Williams",          team: "OKC", position: "F", age: 24.9 },
  { full_name: "Lauri Markkanen",         team: "UTA", position: "F", age: 28.7 },
  { full_name: "DeMar DeRozan",           team: "SAC", position: "F", age: 36.5 },
  { full_name: "De'Aaron Fox",            team: "SAS", position: "G", age: 28.2 },
  { full_name: "Mikal Bridges",           team: "NYK", position: "F", age: 29.4 },
  { full_name: "OG Anunoby",              team: "NYK", position: "F", age: 28.5 },
  { full_name: "Jrue Holiday",            team: "POR", position: "G", age: 35.6 },
  { full_name: "Brandon Ingram",          team: "TOR", position: "F", age: 28.4 },
  { full_name: "Zion Williamson",         team: "NOP", position: "F", age: 25.6 },
  { full_name: "Kevin Durant",            team: "HOU", position: "F", age: 37.4 },

  // Tier 5 — useful pieces
  { full_name: "Stephen Curry",           team: "GSW", position: "G", age: 37.9 },
  { full_name: "Jimmy Butler",            team: "GSW", position: "F", age: 36.4 },
  { full_name: "Kawhi Leonard",           team: "LAC", position: "F", age: 34.5 },
  { full_name: "Rudy Gobert",             team: "MIN", position: "C", age: 33.5 },
  { full_name: "Nikola Vucevic",          team: "CHI", position: "C", age: 35.4 },
  { full_name: "Walker Kessler",          team: "UTA", position: "C", age: 24.5 },
  { full_name: "Evan Mobley",             team: "CLE", position: "F", age: 24.8 },
  { full_name: "Darius Garland",          team: "CLE", position: "G", age: 25.9 },
  { full_name: "Fred VanVleet",           team: "HOU", position: "G", age: 31.9 },
  { full_name: "Josh Giddey",             team: "CHI", position: "G", age: 23.4 },

  // Tier 6 — late-round / streamers
  { full_name: "Coby White",              team: "CHI", position: "G", age: 25.9 },
  { full_name: "Norman Powell",           team: "MIA", position: "G", age: 32.7 },
  { full_name: "Jalen Duren",             team: "DET", position: "C", age: 22.3 },
  { full_name: "Onyeka Okongwu",          team: "ATL", position: "C", age: 25.2 },
  { full_name: "Dyson Daniels",           team: "ATL", position: "G", age: 22.9 },
  { full_name: "Amen Thompson",           team: "HOU", position: "G", age: 23.1 },
  { full_name: "Ausar Thompson",          team: "DET", position: "F", age: 23.1 },
  { full_name: "Stephon Castle",          team: "SAS", position: "G", age: 21.3 },
  { full_name: "Cason Wallace",           team: "OKC", position: "G", age: 22.1 },
  { full_name: "Trey Murphy III",         team: "NOP", position: "F", age: 25.7 },
];

// Points ranking — current-season ROS expectations, descending value
// Tier 1 = elite (top ~10), 2 = first-round, 3 = second-round, 4 = mid, 5 = late, 6 = streamer
const POINTS_ORDER: { name: string; tier: 1 | 2 | 3 | 4 | 5 | 6; value: number; change_n: number }[] = [
  { name: "Shai Gilgeous-Alexander", tier: 1, value: 100, change_n: 0 },
  { name: "Nikola Jokic",            tier: 1, value:  98, change_n: 1 },
  { name: "Victor Wembanyama",       tier: 1, value:  96, change_n: -1 },
  { name: "Anthony Edwards",         tier: 1, value:  93, change_n: 0 },
  { name: "Giannis Antetokounmpo",   tier: 1, value:  91, change_n: 0 },
  { name: "Luka Doncic",             tier: 1, value:  88, change_n: -2 },
  { name: "Tyrese Haliburton",       tier: 1, value:  86, change_n: 1 },
  { name: "Jayson Tatum",            tier: 1, value:  85, change_n: 0 },
  { name: "Devin Booker",            tier: 1, value:  82, change_n: 2 },
  { name: "Karl-Anthony Towns",      tier: 1, value:  80, change_n: 0 },

  { name: "Donovan Mitchell",        tier: 2, value:  76, change_n: 1 },
  { name: "Cade Cunningham",         tier: 2, value:  74, change_n: 3 },
  { name: "Damian Lillard",          tier: 2, value:  72, change_n: -1 },
  { name: "Anthony Davis",           tier: 2, value:  70, change_n: 0 },
  { name: "Domantas Sabonis",        tier: 2, value:  69, change_n: -1 },
  { name: "LaMelo Ball",             tier: 2, value:  67, change_n: 2 },
  { name: "Jalen Brunson",           tier: 2, value:  66, change_n: 0 },
  { name: "Trae Young",              tier: 2, value:  64, change_n: 1 },
  { name: "Paolo Banchero",          tier: 2, value:  62, change_n: 2 },
  { name: "Bam Adebayo",             tier: 2, value:  60, change_n: -2 },

  { name: "Jaylen Brown",            tier: 3, value:  57, change_n: 0 },
  { name: "Pascal Siakam",           tier: 3, value:  56, change_n: 1 },
  { name: "Tyrese Maxey",            tier: 3, value:  55, change_n: -1 },
  { name: "Jamal Murray",            tier: 3, value:  54, change_n: 0 },
  { name: "James Harden",            tier: 3, value:  52, change_n: 2 },
  { name: "Alperen Sengun",          tier: 3, value:  51, change_n: 3 },
  { name: "Scottie Barnes",          tier: 3, value:  50, change_n: 0 },
  { name: "Chet Holmgren",           tier: 3, value:  49, change_n: -2 },
  { name: "Franz Wagner",            tier: 3, value:  48, change_n: 1 },
  { name: "Jaren Jackson Jr.",       tier: 3, value:  46, change_n: 0 },

  { name: "Jalen Williams",          tier: 4, value:  43, change_n: 2 },
  { name: "Lauri Markkanen",         tier: 4, value:  42, change_n: 0 },
  { name: "DeMar DeRozan",           tier: 4, value:  41, change_n: -1 },
  { name: "De'Aaron Fox",            tier: 4, value:  40, change_n: 0 },
  { name: "Mikal Bridges",           tier: 4, value:  38, change_n: 1 },
  { name: "OG Anunoby",              tier: 4, value:  37, change_n: 0 },
  { name: "Jrue Holiday",            tier: 4, value:  36, change_n: -2 },
  { name: "Brandon Ingram",          tier: 4, value:  35, change_n: 0 },
  { name: "Zion Williamson",         tier: 4, value:  34, change_n: -3 },
  { name: "Kevin Durant",            tier: 4, value:  33, change_n: 1 },

  { name: "Stephen Curry",           tier: 5, value:  30, change_n: -1 },
  { name: "Jimmy Butler",            tier: 5, value:  29, change_n: 0 },
  { name: "Kawhi Leonard",           tier: 5, value:  28, change_n: -1 },
  { name: "Rudy Gobert",             tier: 5, value:  27, change_n: 0 },
  { name: "Nikola Vucevic",          tier: 5, value:  26, change_n: 1 },
  { name: "Walker Kessler",          tier: 5, value:  25, change_n: 2 },
  { name: "Evan Mobley",             tier: 5, value:  24, change_n: 0 },
  { name: "Darius Garland",          tier: 5, value:  23, change_n: -2 },
  { name: "Fred VanVleet",           tier: 5, value:  22, change_n: 0 },
  { name: "Josh Giddey",             tier: 5, value:  21, change_n: 1 },

  { name: "Coby White",              tier: 6, value:  18, change_n: 0 },
  { name: "Norman Powell",           tier: 6, value:  17, change_n: 0 },
  { name: "Jalen Duren",             tier: 6, value:  16, change_n: 1 },
  { name: "Onyeka Okongwu",          tier: 6, value:  15, change_n: 0 },
  { name: "Dyson Daniels",           tier: 6, value:  14, change_n: 2 },
  { name: "Amen Thompson",           tier: 6, value:  13, change_n: 3 },
  { name: "Ausar Thompson",          tier: 6, value:  12, change_n: 1 },
  { name: "Stephon Castle",          tier: 6, value:  10, change_n: 2 },
  { name: "Cason Wallace",           tier: 6, value:   9, change_n: 0 },
  { name: "Trey Murphy III",         tier: 6, value:   8, change_n: -1 },
];

// 9-cat ordering — punts-friendly bigs and stat-rate players climb, scoring guards dip
const CATS_ORDER: { name: string; tier: 1 | 2 | 3 | 4 | 5 | 6; value: number; extras: Record<string, number> }[] = [
  { name: "Nikola Jokic",            tier: 1, value: 100, extras: { fg_pct: 0.583, ft_pct: 0.829, fg3m: 1.1, pts: 29.4, reb: 12.5, ast: 9.9, stl: 1.6, blk: 0.8, to: 3.2 } },
  { name: "Victor Wembanyama",       tier: 1, value:  97, extras: { fg_pct: 0.476, ft_pct: 0.829, fg3m: 2.4, pts: 24.8, reb: 11.0, ast: 3.7, stl: 1.2, blk: 3.7, to: 3.1 } },
  { name: "Shai Gilgeous-Alexander", tier: 1, value:  94, extras: { fg_pct: 0.519, ft_pct: 0.891, fg3m: 2.0, pts: 32.7, reb: 5.0, ast: 6.3, stl: 1.8, blk: 1.0, to: 2.4 } },
  { name: "Giannis Antetokounmpo",   tier: 1, value:  90, extras: { fg_pct: 0.602, ft_pct: 0.659, fg3m: 0.5, pts: 30.4, reb: 11.9, ast: 6.5, stl: 0.8, blk: 1.0, to: 3.1 } },
  { name: "Anthony Davis",           tier: 1, value:  87, extras: { fg_pct: 0.555, ft_pct: 0.815, fg3m: 0.4, pts: 24.7, reb: 11.6, ast: 3.5, stl: 1.2, blk: 2.2, to: 2.3 } },
  { name: "Karl-Anthony Towns",      tier: 1, value:  84, extras: { fg_pct: 0.524, ft_pct: 0.829, fg3m: 2.7, pts: 24.4, reb: 12.8, ast: 3.1, stl: 0.7, blk: 1.0, to: 2.7 } },
  { name: "Domantas Sabonis",        tier: 1, value:  81, extras: { fg_pct: 0.588, ft_pct: 0.737, fg3m: 0.5, pts: 19.4, reb: 13.5, ast: 6.0, stl: 0.7, blk: 0.5, to: 2.8 } },
  { name: "Tyrese Haliburton",       tier: 1, value:  79, extras: { fg_pct: 0.467, ft_pct: 0.851, fg3m: 3.0, pts: 18.6, reb: 3.5, ast: 9.2, stl: 1.4, blk: 0.7, to: 2.3 } },
  { name: "Anthony Edwards",         tier: 1, value:  76, extras: { fg_pct: 0.447, ft_pct: 0.836, fg3m: 4.3, pts: 27.1, reb: 5.7, ast: 4.5, stl: 1.3, blk: 0.6, to: 3.4 } },
  { name: "Luka Doncic",             tier: 1, value:  74, extras: { fg_pct: 0.478, ft_pct: 0.779, fg3m: 3.8, pts: 28.2, reb: 8.3, ast: 7.7, stl: 1.4, blk: 0.5, to: 4.0 } },

  { name: "Jaren Jackson Jr.",       tier: 2, value:  70, extras: { fg_pct: 0.464, ft_pct: 0.776, fg3m: 2.0, pts: 22.5, reb: 5.6, ast: 1.9, stl: 1.2, blk: 1.6, to: 1.9 } },
  { name: "Chet Holmgren",           tier: 2, value:  68, extras: { fg_pct: 0.524, ft_pct: 0.788, fg3m: 1.5, pts: 17.6, reb: 8.1, ast: 2.4, stl: 0.7, blk: 2.5, to: 1.4 } },
  { name: "Alperen Sengun",          tier: 2, value:  66, extras: { fg_pct: 0.541, ft_pct: 0.704, fg3m: 0.5, pts: 21.4, reb: 9.9, ast: 5.0, stl: 0.9, blk: 0.7, to: 2.7 } },
  { name: "Bam Adebayo",             tier: 2, value:  64, extras: { fg_pct: 0.522, ft_pct: 0.766, fg3m: 0.5, pts: 19.6, reb: 9.7, ast: 4.0, stl: 1.2, blk: 0.9, to: 2.4 } },
  { name: "Walker Kessler",          tier: 2, value:  61, extras: { fg_pct: 0.677, ft_pct: 0.512, fg3m: 0.0, pts: 11.0, reb: 12.2, ast: 0.7, stl: 0.7, blk: 2.4, to: 1.0 } },
  { name: "Donovan Mitchell",        tier: 2, value:  60, extras: { fg_pct: 0.439, ft_pct: 0.864, fg3m: 3.6, pts: 24.1, reb: 4.8, ast: 5.2, stl: 1.3, blk: 0.4, to: 2.4 } },
  { name: "Pascal Siakam",           tier: 2, value:  58, extras: { fg_pct: 0.519, ft_pct: 0.762, fg3m: 1.6, pts: 19.5, reb: 7.0, ast: 3.6, stl: 0.7, blk: 0.5, to: 1.8 } },
  { name: "Evan Mobley",             tier: 2, value:  56, extras: { fg_pct: 0.567, ft_pct: 0.685, fg3m: 0.6, pts: 17.8, reb: 9.5, ast: 3.2, stl: 0.8, blk: 1.6, to: 1.8 } },
  { name: "Jaylen Brown",            tier: 2, value:  54, extras: { fg_pct: 0.464, ft_pct: 0.700, fg3m: 2.4, pts: 22.4, reb: 6.0, ast: 4.7, stl: 1.1, blk: 0.4, to: 2.4 } },
  { name: "Cade Cunningham",         tier: 2, value:  52, extras: { fg_pct: 0.456, ft_pct: 0.860, fg3m: 2.6, pts: 24.8, reb: 6.3, ast: 9.1, stl: 0.9, blk: 0.7, to: 4.6 } },

  { name: "OG Anunoby",              tier: 3, value:  49, extras: { fg_pct: 0.481, ft_pct: 0.730, fg3m: 2.3, pts: 17.7, reb: 5.0, ast: 1.7, stl: 1.5, blk: 0.7, to: 1.4 } },
  { name: "Mikal Bridges",           tier: 3, value:  47, extras: { fg_pct: 0.460, ft_pct: 0.821, fg3m: 2.1, pts: 17.6, reb: 3.6, ast: 3.6, stl: 1.0, blk: 0.4, to: 1.7 } },
  { name: "Franz Wagner",            tier: 3, value:  45, extras: { fg_pct: 0.469, ft_pct: 0.875, fg3m: 1.7, pts: 21.6, reb: 5.4, ast: 5.7, stl: 1.2, blk: 0.4, to: 3.0 } },
  { name: "Paolo Banchero",          tier: 3, value:  43, extras: { fg_pct: 0.453, ft_pct: 0.728, fg3m: 1.6, pts: 26.1, reb: 7.4, ast: 4.8, stl: 0.9, blk: 0.6, to: 3.2 } },
  { name: "Scottie Barnes",          tier: 3, value:  42, extras: { fg_pct: 0.454, ft_pct: 0.747, fg3m: 1.6, pts: 19.1, reb: 7.8, ast: 6.0, stl: 1.4, blk: 1.1, to: 2.9 } },
  { name: "Tyrese Maxey",            tier: 3, value:  40, extras: { fg_pct: 0.448, ft_pct: 0.866, fg3m: 3.8, pts: 26.3, reb: 3.4, ast: 6.1, stl: 1.8, blk: 0.5, to: 2.4 } },
  { name: "LaMelo Ball",             tier: 3, value:  39, extras: { fg_pct: 0.413, ft_pct: 0.866, fg3m: 4.0, pts: 25.1, reb: 5.4, ast: 6.9, stl: 1.6, blk: 0.3, to: 3.2 } },
  { name: "Jrue Holiday",            tier: 3, value:  37, extras: { fg_pct: 0.444, ft_pct: 0.882, fg3m: 1.8, pts: 11.1, reb: 4.4, ast: 4.0, stl: 1.0, blk: 0.6, to: 1.5 } },
  { name: "James Harden",            tier: 3, value:  36, extras: { fg_pct: 0.418, ft_pct: 0.878, fg3m: 3.0, pts: 22.8, reb: 5.8, ast: 8.7, stl: 1.5, blk: 0.7, to: 4.0 } },
  { name: "Trae Young",              tier: 3, value:  34, extras: { fg_pct: 0.418, ft_pct: 0.871, fg3m: 3.0, pts: 24.2, reb: 3.0, ast: 11.6, stl: 1.2, blk: 0.2, to: 4.7 } },

  { name: "Dyson Daniels",           tier: 4, value:  32, extras: { fg_pct: 0.490, ft_pct: 0.760, fg3m: 1.7, pts: 14.1, reb: 5.9, ast: 4.4, stl: 3.0, blk: 0.7, to: 1.6 } },
  { name: "Amen Thompson",           tier: 4, value:  30, extras: { fg_pct: 0.557, ft_pct: 0.692, fg3m: 0.3, pts: 14.1, reb: 8.2, ast: 3.8, stl: 1.4, blk: 1.3, to: 1.5 } },
  { name: "Lauri Markkanen",         tier: 4, value:  29, extras: { fg_pct: 0.430, ft_pct: 0.882, fg3m: 2.6, pts: 19.0, reb: 5.9, ast: 1.8, stl: 0.7, blk: 0.6, to: 1.7 } },
  { name: "Jalen Williams",          tier: 4, value:  28, extras: { fg_pct: 0.483, ft_pct: 0.793, fg3m: 1.9, pts: 21.6, reb: 5.3, ast: 5.1, stl: 1.7, blk: 0.7, to: 2.3 } },
  { name: "Stephen Curry",           tier: 4, value:  27, extras: { fg_pct: 0.448, ft_pct: 0.929, fg3m: 4.4, pts: 24.5, reb: 4.4, ast: 6.1, stl: 1.1, blk: 0.4, to: 2.9 } },
  { name: "De'Aaron Fox",            tier: 4, value:  26, extras: { fg_pct: 0.470, ft_pct: 0.789, fg3m: 2.1, pts: 19.7, reb: 4.0, ast: 6.1, stl: 1.6, blk: 0.3, to: 2.5 } },
  { name: "Damian Lillard",          tier: 4, value:  25, extras: { fg_pct: 0.428, ft_pct: 0.918, fg3m: 3.0, pts: 24.9, reb: 4.5, ast: 7.1, stl: 1.0, blk: 0.2, to: 3.1 } },
  { name: "Devin Booker",            tier: 4, value:  24, extras: { fg_pct: 0.466, ft_pct: 0.870, fg3m: 2.1, pts: 25.6, reb: 4.1, ast: 6.5, stl: 0.9, blk: 0.4, to: 3.3 } },
  { name: "Jamal Murray",            tier: 4, value:  22, extras: { fg_pct: 0.453, ft_pct: 0.881, fg3m: 2.4, pts: 21.4, reb: 4.0, ast: 6.3, stl: 0.9, blk: 0.4, to: 2.5 } },
  { name: "Jayson Tatum",            tier: 4, value:  20, extras: { fg_pct: 0.453, ft_pct: 0.833, fg3m: 3.3, pts: 26.8, reb: 8.7, ast: 5.6, stl: 1.0, blk: 0.5, to: 2.6 } },

  { name: "Norman Powell",           tier: 5, value:  18, extras: { fg_pct: 0.474, ft_pct: 0.812, fg3m: 2.7, pts: 17.7, reb: 3.2, ast: 2.1, stl: 1.1, blk: 0.4, to: 1.7 } },
  { name: "Jalen Brunson",           tier: 5, value:  17, extras: { fg_pct: 0.479, ft_pct: 0.829, fg3m: 2.5, pts: 25.6, reb: 3.4, ast: 7.4, stl: 0.9, blk: 0.2, to: 2.4 } },
  { name: "Onyeka Okongwu",          tier: 5, value:  16, extras: { fg_pct: 0.555, ft_pct: 0.738, fg3m: 0.5, pts: 13.4, reb: 8.8, ast: 1.6, stl: 0.6, blk: 1.0, to: 1.3 } },
  { name: "Jalen Duren",             tier: 5, value:  15, extras: { fg_pct: 0.602, ft_pct: 0.781, fg3m: 0.0, pts: 11.5, reb: 11.4, ast: 2.4, stl: 0.5, blk: 1.2, to: 1.4 } },
  { name: "Rudy Gobert",             tier: 5, value:  14, extras: { fg_pct: 0.659, ft_pct: 0.585, fg3m: 0.0, pts: 11.6, reb: 12.0, ast: 1.0, stl: 0.7, blk: 1.6, to: 1.4 } },
  { name: "Brandon Ingram",          tier: 5, value:  13, extras: { fg_pct: 0.467, ft_pct: 0.785, fg3m: 1.7, pts: 18.7, reb: 5.5, ast: 4.7, stl: 0.6, blk: 0.5, to: 2.4 } },
  { name: "Kawhi Leonard",           tier: 5, value:  12, extras: { fg_pct: 0.499, ft_pct: 0.870, fg3m: 1.9, pts: 19.1, reb: 5.8, ast: 3.0, stl: 1.5, blk: 0.7, to: 1.4 } },
  { name: "Kevin Durant",            tier: 5, value:  11, extras: { fg_pct: 0.525, ft_pct: 0.880, fg3m: 2.0, pts: 25.8, reb: 6.0, ast: 4.0, stl: 0.8, blk: 1.2, to: 3.0 } },
  { name: "Jimmy Butler",            tier: 5, value:  10, extras: { fg_pct: 0.514, ft_pct: 0.836, fg3m: 0.5, pts: 17.1, reb: 5.3, ast: 4.7, stl: 1.2, blk: 0.5, to: 1.4 } },
  { name: "Nikola Vucevic",          tier: 5, value:   9, extras: { fg_pct: 0.531, ft_pct: 0.793, fg3m: 1.8, pts: 18.0, reb: 10.2, ast: 3.4, stl: 0.8, blk: 0.7, to: 1.4 } },

  { name: "Trey Murphy III",         tier: 6, value:   8, extras: { fg_pct: 0.443, ft_pct: 0.872, fg3m: 3.0, pts: 21.2, reb: 5.1, ast: 3.4, stl: 1.4, blk: 0.6, to: 1.7 } },
  { name: "Coby White",              tier: 6, value:   7, extras: { fg_pct: 0.434, ft_pct: 0.872, fg3m: 2.6, pts: 20.4, reb: 3.7, ast: 4.5, stl: 0.8, blk: 0.2, to: 1.8 } },
  { name: "Josh Giddey",             tier: 6, value:   6, extras: { fg_pct: 0.464, ft_pct: 0.780, fg3m: 1.6, pts: 14.6, reb: 8.1, ast: 7.1, stl: 1.2, blk: 0.6, to: 2.7 } },
  { name: "Darius Garland",          tier: 6, value:   5, extras: { fg_pct: 0.451, ft_pct: 0.853, fg3m: 2.1, pts: 18.4, reb: 2.7, ast: 6.5, stl: 1.3, blk: 0.1, to: 2.6 } },
  { name: "Ausar Thompson",          tier: 6, value:   4, extras: { fg_pct: 0.508, ft_pct: 0.668, fg3m: 1.0, pts: 13.4, reb: 7.5, ast: 3.1, stl: 1.7, blk: 1.1, to: 1.7 } },
  { name: "Fred VanVleet",           tier: 6, value:   3, extras: { fg_pct: 0.392, ft_pct: 0.864, fg3m: 2.4, pts: 14.2, reb: 3.7, ast: 5.6, stl: 1.4, blk: 0.6, to: 1.6 } },
  { name: "Cason Wallace",           tier: 6, value:   2, extras: { fg_pct: 0.485, ft_pct: 0.745, fg3m: 1.5, pts: 8.4, reb: 3.4, ast: 1.7, stl: 1.8, blk: 0.6, to: 0.8 } },
  { name: "Stephon Castle",          tier: 6, value:   2, extras: { fg_pct: 0.434, ft_pct: 0.745, fg3m: 1.2, pts: 14.7, reb: 3.6, ast: 4.1, stl: 0.9, blk: 0.4, to: 2.4 } },
  { name: "DeMar DeRozan",           tier: 6, value:   1, extras: { fg_pct: 0.466, ft_pct: 0.852, fg3m: 0.7, pts: 22.2, reb: 3.9, ast: 4.4, stl: 0.8, blk: 0.6, to: 2.1 } },
  { name: "Zion Williamson",         tier: 6, value:   1, extras: { fg_pct: 0.566, ft_pct: 0.694, fg3m: 0.1, pts: 22.9, reb: 5.6, ast: 4.4, stl: 0.8, blk: 0.4, to: 2.8 } },
];

const PREMIUM_CURVE = {
  coef_a: 0.10,
  coef_b: 0.04,
  exponent: 8,
  max_list: 100,
  max_trade: 200,
};

async function main() {
  const supabase = getAdminSupabase();

  // 1. Seed players (idempotent)
  console.log("seed: players");
  const playerRecords = PLAYERS.map((p) => ({
    full_name: p.full_name,
    slug: slugify(p.full_name),
    team: p.team,
    position: p.position,
    age: p.age,
  }));
  const { error: playersErr } = await supabase
    .from("players")
    .upsert(playerRecords, { onConflict: "slug" });
  if (playersErr) throw new Error(`seed players: ${playersErr.message}`);

  const { data: playerRows } = await supabase.from("players").select("id, slug, full_name");
  const idBySlug = new Map((playerRows ?? []).map((p) => [p.slug, p.id]));
  console.log(`  upserted ${playerRecords.length} players`);

  // 2. Wipe any existing lists/calcs (idempotent reseed)
  await supabase.from("trade_calc_versions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("ranked_lists").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // 3. Points list — published v1
  console.log("seed: points list");
  const { data: pointsList, error: pointsErr } = await supabase
    .from("ranked_lists")
    .insert({
      surface: "points",
      status: "published",
      version: 1,
      published_at: new Date().toISOString(),
      notes: "Initial ROS Points board — through the All-Star break.",
    })
    .select()
    .single();
  if (pointsErr || !pointsList) throw new Error(`seed points list: ${pointsErr?.message}`);

  const pointsEntries = POINTS_ORDER.map((row, i) => ({
    list_id: pointsList.id,
    player_id: idBySlug.get(slugify(row.name)),
    rank: i + 1,
    tier: row.tier,
    value: row.value,
    change_n: row.change_n,
    extras: {},
  })).filter((e) => e.player_id != null);
  const { error: peErr } = await supabase.from("ranking_entries").insert(pointsEntries);
  if (peErr) throw new Error(`seed points entries: ${peErr.message}`);
  console.log(`  inserted ${pointsEntries.length} points entries`);

  // 4. Cats list — published v1
  console.log("seed: cats list");
  const { data: catsList, error: catsErr } = await supabase
    .from("ranked_lists")
    .insert({
      surface: "cats",
      status: "published",
      version: 1,
      published_at: new Date().toISOString(),
      notes: "Initial ROS 9-cat board — Jokic remains the cat-league king.",
    })
    .select()
    .single();
  if (catsErr || !catsList) throw new Error(`seed cats list: ${catsErr?.message}`);

  const catsEntries = CATS_ORDER.map((row, i) => ({
    list_id: catsList.id,
    player_id: idBySlug.get(slugify(row.name)),
    rank: i + 1,
    tier: row.tier,
    value: row.value,
    change_n: 0,
    extras: row.extras,
  })).filter((e) => e.player_id != null);
  const { error: ceErr } = await supabase.from("ranking_entries").insert(catsEntries);
  if (ceErr) throw new Error(`seed cats entries: ${ceErr.message}`);
  console.log(`  inserted ${catsEntries.length} cats entries`);

  // 5. Trade calc — published v1 (uses points-style values)
  console.log("seed: trade calc");
  const { data: calc, error: calcErr } = await supabase
    .from("trade_calc_versions")
    .insert({
      status: "published",
      version: 1,
      published_at: new Date().toISOString(),
      notes: "Trade values anchored to ROS Points v1.",
      premium_curve: PREMIUM_CURVE,
    })
    .select()
    .single();
  if (calcErr || !calc) throw new Error(`seed calc: ${calcErr?.message}`);

  const tradeRows = POINTS_ORDER.map((row) => ({
    calc_id: calc.id,
    player_id: idBySlug.get(slugify(row.name)),
    value: row.value,
  })).filter((r) => r.player_id != null);
  const { error: tvErr } = await supabase.from("trade_values").insert(tradeRows);
  if (tvErr) throw new Error(`seed trade values: ${tvErr.message}`);
  console.log(`  inserted ${tradeRows.length} trade values`);

  console.log("seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
