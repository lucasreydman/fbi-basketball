import Image from "next/image";
import { cn } from "@/lib/utils";

export function Seal({
  size = 40,
  className,
  inverted = true,
  priority = false,
}: {
  size?: number;
  className?: string;
  inverted?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src="/fbi-seal.png"
      alt="FBI"
      width={size}
      height={size}
      priority={priority}
      className={cn(
        "block select-none",
        inverted && "invert brightness-150 contrast-110",
        className,
      )}
    />
  );
}

export function SealWatermark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none select-none",
        className,
      )}
      aria-hidden
    >
      <Image
        src="/fbi-seal.png"
        alt=""
        width={600}
        height={600}
        className="block invert brightness-150 opacity-[0.03]"
      />
    </div>
  );
}
