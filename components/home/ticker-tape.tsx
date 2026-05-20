import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const ITEMS = [
  { type: "rank", label: "Wemby", value: "#1", change: "—" },
  { type: "rank", label: "SGA", value: "#2", change: "▲ 1" },
  { type: "rank", label: "Edwards", value: "#3", change: "▼ 1" },
  { type: "rank", label: "Banchero", value: "#10", change: "▲ 3" },
  { type: "event", label: "World Cup ’26 reg", value: "Sep 1", change: "OPENS" },
  { type: "rank", label: "Booker", value: "#8", change: "▼ 2" },
  { type: "event", label: "Balls Deep · ep 184", value: "Today", change: "LIVE" },
  { type: "rank", label: "Tatum", value: "#6", change: "▲ 2" },
  { type: "event", label: "Trade deadline", value: "Mar 7", change: "PAST" },
  { type: "rank", label: "Haliburton", value: "#9", change: "▼ 1" },
  { type: "rank", label: "Holmgren", value: "#11", change: "▲ 1" },
  { type: "event", label: "NBA Dynasty · ep 96", value: "Fri", change: "DROPS" },
  { type: "rank", label: "Jokić", value: "#5", change: "—" },
  { type: "rank", label: "Cunningham", value: "#7", change: "▲ 1" },
  { type: "rank", label: "Doncic", value: "#4", change: "—" },
  { type: "event", label: "Tank Me Later · ep 41", value: "Thu", change: "DROPS" },
];

export function TickerTape() {
  // Duplicate for seamless infinite scroll
  const all = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-rule bg-canvas-soft">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-canvas-soft to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-canvas-soft to-transparent" aria-hidden />

      <div className="tape flex w-max items-center gap-0 py-3 will-change-transform">
        {all.map((it, i) => {
          const isUp = it.change.startsWith("▲");
          const isDown = it.change.startsWith("▼");
          const isEvent = it.type === "event";
          return (
            <div
              key={`${i}-${it.label}`}
              className="flex items-center gap-3 border-r border-rule px-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                {it.label}
              </span>
              <span
                className={`font-display tabular text-[15px] ${isEvent ? "text-accent" : "text-ink"}`}
                style={{ fontVariationSettings: '"opsz" 36' }}
              >
                {it.value}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                  isEvent
                    ? "text-accent"
                    : isUp
                      ? "text-positive"
                      : isDown
                        ? "text-negative"
                        : "text-ink-dim"
                }`}
              >
                {isUp ? <TrendingUp className="inline" size={11} /> : isDown ? <TrendingDown className="inline" size={11} /> : null}
                <span className="ml-1">{it.change}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
