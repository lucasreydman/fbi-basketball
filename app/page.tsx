import { Hero } from "@/components/home/hero";
import { TickerTape } from "@/components/home/ticker-tape";
import { WorldCupBanner } from "@/components/home/world-cup-banner";
import { LeaguesStrip } from "@/components/home/leagues-strip";
import { ToolsPreview } from "@/components/home/tools-preview";
import { CreatorsRow } from "@/components/home/creators-row";
import { ContentRow } from "@/components/home/content-row";
import { DiscordCta } from "@/components/home/discord-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TickerTape />
      <WorldCupBanner />
      <LeaguesStrip />
      <ToolsPreview />
      <CreatorsRow />
      <ContentRow />
      <DiscordCta />
    </>
  );
}
