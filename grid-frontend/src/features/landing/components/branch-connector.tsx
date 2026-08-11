import { motion } from "motion/react";

/**
 * Vertical connector that splits from the centre into `count` branches,
 * each carrying its own animated pulse.
 */
export function BranchConnector({ count, height = 56 }: { count: number; height?: number }) {
  const xs = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100);
  const split = 45; // % of height where the trunk splits

  return (
    <div className="relative w-full" style={{ height }} aria-hidden="true">
      {/* trunk */}
      <span
        className="absolute left-1/2 w-px -translate-x-1/2 bg-border"
        style={{ top: 0, height: `${split}%` }}
      />
      <motion.span
        className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent"
        animate={{ top: ["0%", `${split}%`], opacity: [0, 1, 1] }}
        transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 1.1, ease: "linear" }}
      />

      {/* horizontal splitter */}
      {count > 1 && (
        <span
          className="absolute h-px bg-border"
          style={{ top: `${split}%`, left: `${xs[0]}%`, width: `${xs[count - 1]! - xs[0]!}%` }}
        />
      )}

      {/* branches */}
      {xs.map((x, i) => (
        <span key={x}>
          <span
            className="absolute w-px bg-border"
            style={{ left: `${x}%`, top: `${split}%`, height: `${100 - split}%` }}
          />
          <motion.span
            className="absolute size-1.5 -translate-x-1/2 rounded-full bg-accent"
            style={{ left: `${x}%` }}
            animate={{ top: [`${split}%`, "100%"], opacity: [1, 1, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              repeatDelay: 0.9,
              delay: 0.7 + i * 0.05,
              ease: "linear",
            }}
          />
        </span>
      ))}
    </div>
  );
}
