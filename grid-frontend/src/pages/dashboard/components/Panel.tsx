import React from "react";

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-border bg-card p-7 shadow-soft ${className}`}>
      {children}
    </div>
  );
}
