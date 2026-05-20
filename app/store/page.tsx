import { PRODUCTS } from "@/lib/data/store";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Store · FBI",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Store"
        title={
          <>
            FBI merch, <span className="italic text-orange">made to wear in.</span>
          </>
        }
        description="Heavyweight cottons, premium fleeces, unstructured hats. Each piece comes in dark and light variants. Worldwide shipping."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <div key={p.slug} className="group">
              <div
                className="relative aspect-square overflow-hidden border border-rule bg-canvas-soft transition-colors group-hover:border-orange"
                style={{ borderRadius: 3 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex h-32 w-32 items-center justify-center bg-orange/12 font-display text-orange"
                    style={{ borderRadius: "50%", fontSize: "3rem", fontWeight: 500 }}
                  >
                    {p.sku.split(" ")[0]}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-orange px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-obsidian" style={{ borderRadius: 2 }}>
                  {p.category}
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="text-[15px] text-bone">{p.name}</h3>
                <div className="font-display tabular text-[18px] text-orange">${p.price}</div>
              </div>
              <p className="mt-1 text-[13px] text-ash">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.variants.slice(0, 3).map((v) => (
                  <span
                    key={v}
                    className="border border-rule px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ash"
                    style={{ borderRadius: 2 }}
                  >
                    {v}
                  </span>
                ))}
                {p.variants.length > 3 && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
                    +{p.variants.length - 3}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="mt-4 w-full border border-rule py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
                style={{ borderRadius: 2 }}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
          Shop integration mocked — production swap to Shopify or Squarespace checkout
        </p>
      </section>
    </>
  );
}
