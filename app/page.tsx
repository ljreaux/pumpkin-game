"use client";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
// ensures that phaser never loads on the server
const GamePage = dynamic(
  () => import("@/components/game/GamePage").then((mod) => mod),
  { ssr: false }
);
export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="py-24">
        <GamePage />
        <Toaster />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
