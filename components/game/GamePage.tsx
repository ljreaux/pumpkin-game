"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { IRefPhaserGame } from "./PhaserGame";
import { MainMenu } from "./scenes/MainMenu";
import { Button } from "../ui/button";

// ensures that phaser never loads on the server
const PhaserGame = dynamic(
  () => import("./PhaserGame").then((mod) => mod.PhaserGame),
  { ssr: false }
);

function GamePage() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene) {
        scene.changeScene();
      }
    }
  };

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      <div className="flex gap-4">
        <div>
          <Button onClick={changeScene}>Change Scene</Button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
