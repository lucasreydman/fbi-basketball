import { RankedListEditor, type ExtraColumn } from "@/components/admin/ranked-list-editor";
import { DraftBanner } from "@/components/admin/draft-banner";
import { ToolPageHeader } from "@/components/shell/tool-page-header";
import { loadDraftAndEntries } from "@/lib/data/admin-rankings";

export const dynamic = "force-dynamic";

const CATS_COLUMNS: ExtraColumn[] = [
  { key: "fg_pct", label: "FG%", width: "56px" },
  { key: "ft_pct", label: "FT%", width: "56px" },
  { key: "fg3m",   label: "3PM", width: "48px" },
  { key: "pts",    label: "PTS", width: "48px" },
  { key: "reb",    label: "REB", width: "48px" },
  { key: "ast",    label: "AST", width: "48px" },
  { key: "stl",    label: "STL", width: "48px" },
  { key: "blk",    label: "BLK", width: "48px" },
  { key: "to",     label: "TO",  width: "48px" },
];

export default async function AdminCatsPage() {
  const { listId, draftVersion, publishedVersion, entries } = await loadDraftAndEntries("cats");
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <ToolPageHeader
        eyebrow="Editor · 9-cat"
        title="9-cat Rankings"
        subtitle={`${entries.length} players with full per-category projections.`}
      />
      <DraftBanner surface="cats" draftVersion={draftVersion} publishedVersion={publishedVersion} />
      <RankedListEditor listId={listId} initial={entries} columns={CATS_COLUMNS} />
    </div>
  );
}
