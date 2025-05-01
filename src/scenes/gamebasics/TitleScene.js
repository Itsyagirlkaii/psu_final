// TitleScene.js

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    // Assets already loaded in Preloader
  }

  create() {
    // Add title screen background
    this.add.image(512, 384, 'titleScreen').setOrigin(0.5);

    // Add Start button
    const startButton = this.add.image(512, 600, 'startButton').setInteractive().setScale(1);

// Optional hover effects
startButton.on('pointerover', () => startButton.setTint(0xdddddd));
startButton.on('pointerout', () => startButton.clearTint());

    startButton.on('pointerdown', () => {
      this.scene.start('PlayerNameScene');
    });
  }
}