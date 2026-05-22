import { RankedListEditor } from "@/components/admin/ranked-list-editor";
import { DraftBanner } from "@/components/admin/draft-banner";
import { ToolPageHeader } from "@/components/shell/tool-page-header";
import { loadDraftAndEntries } from "@/lib/data/admin-rankings";

export const dynamic = "force-dynamic";

export default async function AdminPointsPage() {
  const { listId, draftVersion, publishedVersion, entries } = await loadDraftAndEntries("points");
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <ToolPageHeader
        eyebrow="Editor · Points"
        title="Points Rankings"
        subtitle={`${entries.length} players. Drag to reorder. Edit values inline. Publish when ready.`}
      />
      <DraftBanner surface="points" draftVersion={draftVersion} publishedVersion={publishedVersion} />
      <RankedListEditor listId={listId} initial={entries} />
    </div>
  );
}
