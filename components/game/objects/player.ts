import { SceneType } from "../scenes/Game";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  declare scene: SceneType;
  constructor(scene: SceneType) {
    const { width, height } = scene.sys.canvas;
    super(scene, width / 2, height - 100, "cauldron");
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.5);
    this.setBounceX(1);
  }

  update() {
    const vx = this.width * 2;
    if (this.scene.controls?.left.isDown) {
      this.setVelocityX(-vx);
    }
    if (this.scene.controls?.right.isDown) {
      this.setVelocityX(vx);
    }
  }
}
