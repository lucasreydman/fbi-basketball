export type FollowLink = {
  label: string;
  platform: "Patreon" | "Substack" | "X" | "YouTube";
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
      "Brendan founded FBI in 2018 because every other fantasy basketball community he found was either too redraft-pilled or too far up the analytics rabbit hole to be useful at 11 PM the night before your trade deadline. Eight years later FBI runs the most competitive invite-only dynasty bracket in the format, plus a Discord that's a full-time job to moderate. He runs the World Cup, designs the re-draft formats, and probably knows your starting lineup better than you do.",
    links: [
      { label: "Follow on X", platform: "X", url: "https://x.com/HiddenUpside", primary: true },
    ],
  },
  {
    slug: "matt",
    name: "Matt",
    handle: "@NBAdynastyADP",
    role: "Founder · Dynasty Lead",
    bio: "The dynasty rankings + trade-value curve people quote when they want to win the argument. Patreon subscribers get the publish-day push.",
    longBio:
      "Matt is the dynasty ranking guy. Points, categories, rookies — he publishes the boards and the trade-value sheet that anchor most serious dynasty conversations in this community. The premium-curve math behind his trade calculator is fit to his own published numbers (R² 96–99%) and re-snaps to every new publish. His Patreon is the move if you want the rankings the day they drop.",
    links: [
      { label: "Subscribe on Patreon", platform: "Patreon", url: "https://www.patreon.com/c/NBADynastyADP", primary: true },
      { label: "Follow on X", platform: "X", url: "https://x.com/NBAdynastyADP" },
    ],
  },
  {
    slug: "adam",
    name: "Adam",
    handle: "@adamking91",
    role: "Lead Analyst",
    bio: "Carries the analytical side — cat builds, rebuild theory, pick-curve work, weekly schedule strength. The math behind the takes.",
    longBio:
      "Adam handles the side of fantasy basketball that doesn't get the algorithm love — the redraft labor of love, the long rebuilds, the asset accumulation games where you sell three roleplayers for a future first and wait. If you've ever been told 'you're tanking wrong,' it was probably him. His Substack is where the longer analytical work lands.",
    links: [
      { label: "Read on Substack", platform: "Substack", url: "https://substack.com/@adamking91", primary: true },
      { label: "Follow on X", platform: "X", url: "https://x.com/adamking91" },
    ],
  },
];
