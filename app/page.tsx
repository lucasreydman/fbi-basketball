import { Hero } from "@/components/home/hero";
import { LeaguesStrip } from "@/components/home/leagues-strip";
import { WorldCupBanner } from "@/components/home/world-cup-banner";
import { ToolsPreview } from "@/components/home/tools-preview";
import { PodcastsRow } from "@/components/home/podcasts-row";
import { CreatorsRow } from "@/components/home/creators-row";
import { ContentRow } from "@/components/home/content-row";
import { DiscordCta } from "@/components/home/discord-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LeaguesStrip />
      <WorldCupBanner />
      <ToolsPreview />
      <PodcastsRow />
      <CreatorsRow />
      <ContentRow />
      <DiscordCta />
    </>
  );
}
