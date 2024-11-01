import { GameObjects, Scene } from "phaser";
import { Score } from "@/models/scores";
import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  background?: GameObjects.Image;
  title?: GameObjects.Text;

  constructor() {
    super("MainMenu");
  }

  create() {
    const topTen: Score[] = this.registry.get("topTen");
    const startY = 150; // Start position for the score list
    const fontSize = 36; // Large font size to fill the screen
    const lineSpacing = 50; // Spacing between each score entry

    // Add background image and set its depth low to ensure it stays behind text
    this.background = this.add.image(512, 384, "background").setDepth(0);

    // Add title at the top of the screen with a higher depth than the background
    this.title = this.add
      .text(512, 50, "Pumpkin Catcher", {
        fontFamily: "Arial Black",
        fontSize: "64px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(1); // Ensure the title is above the background

    // Convert top ten scores into a displayable list with date
    topTen?.forEach((player, index) => {
      const date = new Date(player.created_at).toLocaleDateString();
      const scoreText = `${index + 1}. ${player.name}: ${
        player.score
      } on ${date}`;

      this.add
        .text(200, startY + index * lineSpacing, scoreText, {
          fontFamily: "Arial",
          fontSize: `${fontSize}px`,
          color: "#CC8400",
          align: "left",
        })
        .setOrigin(0, 0.5)
        .setDepth(1); // Ensure each score is above the background
    });

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("Game");
  }
}
