import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Player from "../objects/player";
import { pickRandomPumpkin } from "../utils/assets";

export interface SceneType extends Scene {
  background?: Phaser.GameObjects.Image;
  player?: Player;
  controls?: Phaser.Types.Input.Keyboard.CursorKeys;
}

export class Game extends Scene {
  background?: Phaser.GameObjects.Image;
  player?: Player;
  controls?: Phaser.Types.Input.Keyboard.CursorKeys;
  private pumpkins?: Phaser.Physics.Arcade.Group;
  private spawnTimer = 0;
  private spawnInterval = 1000;

  private timerEvent!: Phaser.Time.TimerEvent;
  private timerText!: Phaser.GameObjects.Text;
  private gameOver: boolean = false;

  private score = 0;
  private scoreText?: Phaser.GameObjects.Text;

  private ground!: Phaser.GameObjects.TileSprite;
  private groundCollider!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("Game");
  }

  create() {
    this.background = this.add.image(512, 384, "background");
    this.player = new Player(this);
    this.controls = this.input.keyboard?.createCursorKeys();
    const { width, height } = this.sys.canvas;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#000000",
    });

    // Create the ground as a TileSprite with a fixed height of 50px
    this.ground = this.add.tileSprite(0, height - 30, width, 0, "ground");
    this.ground.setOrigin(0, 0); // Set origin to the top left corner

    // Create an invisible static physics body for collision
    this.groundCollider = this.physics.add.staticGroup();

    // Add a rectangle collider that matches the ground's width and height
    const groundBody = this.groundCollider.create(width / 2, height); // Center the collider horizontally and align it with ground level
    groundBody.setDisplaySize(width, 30); // Set collider size to match ground
    groundBody.refreshBody(); // Apply the new dimensions
    groundBody.setVisible(false); // Hide the collider

    // Enable collision with player or other objects
    this.physics.add.collider(this.player, this.groundCollider);
    EventBus.emit("current-scene-ready", this);

    // pumpkin creation
    this.pumpkins = this.physics.add.group();

    this.physics.add.collider(this.pumpkins, this.groundCollider, (p) =>
      p.destroy()
    );
    this.physics.add.overlap(
      this.pumpkins,
      this.player,
      this.handleCatchPumpkin,
      undefined,
      this
    );

    // Set the timer for 2 minutes (120 seconds)
    this.timerEvent = this.time.addEvent({
      delay: 120000, // 2 minutes in milliseconds
      callback: this.endGame,
      callbackScope: this,
      loop: false, // Run once
    });

    // Create timer text display on the right
    const canvasWidth = this.sys.canvas.width;
    this.timerText = this.add.text(canvasWidth - 250, 16, "Time: 02:00", {
      // Adjust X position as needed
      fontSize: "32px",
      color: "#000000",
    });

    // Call the updateTimer method every second
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }
  updateTimer() {
    if (this.timerEvent.getRemaining() > 0) {
      const remainingTime = Math.floor(this.timerEvent.getRemaining() / 1000);
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      // Format time as MM:SS
      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      this.timerText.setText(`Time: ${formattedTime}`);
    }
  }

  endGame() {
    this.gameOver = true;
    this.timerText.setText("Time: 00:00");
    this.changeScene(); // Pass score to game over scene
  }

  private handleCatchPumpkin(_: any, s: any) {
    const pump = s as Phaser.Physics.Arcade.Image;
    pump.width;
    pump.destroy();
    // Calculate points based on the pumpkin's width
    const baseWidth = 100; // Assuming the original width of the pumpkin sprite is 100px
    const scaleFactor = pump.displayWidth / baseWidth;
    const points = Math.floor(20 * scaleFactor); // Adjust multiplier as needed

    // Add points to the score
    this.score += points;

    this.scoreText?.setText(`Score: ${this.score}`);
  }

  update(_: number, delta: number) {
    this.player?.update();
    this.spawnTimer += delta;

    if (this.spawnTimer > this.spawnInterval) {
      this.spawnTimer = 0;
      this.resetSpawnInterval();
      this.spawnPumpkin();
    }
  }

  private spawnPumpkin() {
    // Spawn a new pumpkin at a random x position at the top of the screen
    const x = Phaser.Math.Between(0, this.sys.canvas.width);
    const pumpkin = this.pumpkins?.create(
      x,
      -20,
      pickRandomPumpkin()
    ) as Phaser.Physics.Arcade.Sprite;

    // Set properties of the pumpkin (e.g., gravity, bounce, etc.)
    pumpkin.setVelocityY(Phaser.Math.Between(50, 50)); // Fall speed
    const scale = Phaser.Math.FloatBetween(0.5, 3); // Adjust min and max scale as desired
    pumpkin.setScale(scale);
  }

  resetSpawnInterval() {
    this.spawnInterval = Phaser.Math.Between(500, 3000);
  }

  changeScene() {
    this.scene.start("GameOver", { score: this.score });
  }
}
