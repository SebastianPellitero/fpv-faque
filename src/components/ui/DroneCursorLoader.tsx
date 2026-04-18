"use client";

import dynamic from "next/dynamic";

// ssr: false is only valid inside a Client Component (Next.js 16+)
const DroneCursor = dynamic(
  () => import("./DroneCursor").then((m) => m.DroneCursor),
  { ssr: false }
);

export function DroneCursorLoader() {
  return <DroneCursor />;
}
