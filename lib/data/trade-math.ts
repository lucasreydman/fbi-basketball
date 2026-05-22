import type { PremiumCurve } from "./types";

export function adjustedValue(v: number, p: PremiumCurve): number {
  if (v <= 0) return 0;
  return v * (
    p.coef_a
    + p.coef_b * Math.pow(v / p.max_list, p.exponent)
    + 0.11    * Math.pow(v / p.max_trade, 1.3)
    + 0.22    * Math.pow(v / (p.max_list + 2000), 1.28)
  );
}

export function sumRaw(values: number[]): number {
  return values.reduce((s, v) => s + v, 0);
}

export function sumAdjusted(values: number[], p: PremiumCurve): number {
  return values.reduce((s, v) => s + adjustedValue(v, p), 0);
}

export interface Verdict {
  status: "fair" | "underpaying" | "overpaying";
  variance: number;
  message: string;
}

export function verdict(youSendAdj: number, youGetAdj: number): Verdict {
  const diff = youGetAdj - youSendAdj;
  const mid = (youGetAdj + youSendAdj) / 2;
  const variance = mid > 0 ? Math.abs(diff) / mid : 0;
  if (variance < 0.05) return { status: "fair", variance, message: "Looks even." };
  if (diff > 0) {
    return {
      status: "underpaying", variance,
      message: variance > 0.2 ? "You're stealing it — opponent's package outvalues yours by a lot." : "You come out slightly ahead.",
    };
  }
  return {
    status: "overpaying", variance,
    message: variance > 0.2 ? "You're paying a premium tax for the cornerstone." : "You give up slightly more value.",
  };
}

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
