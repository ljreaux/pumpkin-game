import GamePage from "@/components/game/GamePage";

export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="py-24">
        <GamePage />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
