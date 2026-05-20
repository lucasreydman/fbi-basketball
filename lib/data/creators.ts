export type FollowLink = {
  label: string;
  platform: "Patreon" | "Substack" | "X" | "YouTube" | "RotoWire" | "RotoBaller" | "Bluesky" | "Linktree" | "Ko-fi";
  url: string;
  primary?: boolean;
};

export type Creator = {
  slug: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  longBio: string;
  links: FollowLink[];
};

export const CREATORS: Creator[] = [
  {
    slug: "brendan",
    name: "Brendan",
    handle: "@HiddenUpside",
    role: "Founder · Re-Draft Lead",
    bio: "Built FBI from a Discord server into the largest fantasy basketball community on the internet. Runs the World Cup. Drives the re-draft content + league formats.",
    longBio:
      "Brendan founded FBI in 2018 because every other fantasy basketball community he found was either too redraft-pilled or too far up the analytics rabbit hole to be useful at 11 PM the night before your trade deadline. Eight years later FBI runs the largest re-draft tournament in the format — the FBI World Cup — plus a Discord that's a full-time job to moderate. He designs the formats, runs the bracket, and probably knows your starting lineup better than you do. His Ko-fi is the easiest way to support the work directly.",
    links: [
      { label: "Support on Ko-fi", platform: "Ko-fi", url: "https://ko-fi.com/bdub1", primary: true },
      { label: "Follow on X", platform: "X", url: "https://x.com/HiddenUpside" },
    ],
  },
  {
    slug: "matt",
    name: "Matt",
    handle: "@NBAdynastyADP",
    role: "Founder · Dynasty Lead",
    bio: "The dynasty rankings + trade-value curve people quote when they want to win the argument. Patreon subscribers get the publish-day push.",
    longBio:
      "Matt is the dynasty ranking guy. Points, categories, rookies — he publishes the boards and the trade-value sheet that anchor most serious dynasty conversations in this community. The premium-curve math behind his trade calculator is fit to his own published numbers (R² 96–99%) and re-snaps to every new publish. His Patreon is the move if you want the rankings the day they drop. His Substack — The NBA Dynasty Report — is where the longer thought pieces and OverTime guest episodes live.",
    links: [
      { label: "Subscribe on Patreon", platform: "Patreon", url: "https://www.patreon.com/cw/NBADynastyADP", primary: true },
      { label: "The NBA Dynasty Report", platform: "Substack", url: "https://nbadynasty.substack.com" },
      { label: "Follow on X", platform: "X", url: "https://x.com/NBAdynastyADP" },
    ],
  },
  {
    slug: "adam",
    name: "Adam",
    handle: "@adamking91",
    role: "Lead Analyst",
    bio: "Carries the analytical side — cat builds, rebuild theory, weekly schedule strength, the math behind the takes. Writes for RotoWire and RotoBaller alongside the FBI work.",
    longBio:
      "Adam handles the side of fantasy basketball that doesn't get the algorithm love — the redraft labor of love, the long rebuilds, the asset accumulation games where you sell three roleplayers for a future first and wait. His regular columns at RotoWire and RotoBaller are where the analytical work lands week to week, plus guest appearances on Matt's Substack and the OverTime series. If you've ever been told 'you're tanking wrong,' it was probably him.",
    links: [
      { label: "Read on RotoWire", platform: "RotoWire", url: "https://www.rotowire.com/writer/adam-king-1022", primary: true },
      { label: "Read on RotoBaller", platform: "RotoBaller", url: "https://www.rotoballer.com/author/adamking91" },
      { label: "Follow on X", platform: "X", url: "https://x.com/Adamking91" },
    ],
  },
];
