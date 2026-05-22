export type NavItem = { href: string; label: string };

export const PRIMARY_NAV: NavItem[] = [
  { href: "/world-cup", label: "World Cup" },
  { href: "/leagues", label: "Leagues" },
  { href: "/tools", label: "Tools" },
  { href: "/creators", label: "Creators" },
  { href: "/content", label: "Content" },
  { href: "/store", label: "Store" },
];

export const DISCORD_URL = "https://discord.gg/VGXgjFuPbN";
export const PATREON_BASE = "https://www.patreon.com";
export const TWITTER_URL = "https://x.com/HiddenUpside";
export const YOUTUBE_URL = "https://www.youtube.com/@FantasyBasketballInternational";
export const EMAIL_URL = "mailto:fbi.leagues@gmail.com";

// In-house tool routes
export const TOOL_POINTS = "/tools/rankings/points";
export const TOOL_CATS = "/tools/rankings/cats";
export const TOOL_TRADE_CALC = "/tools/trade-calculator";
