// Boot.js

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  init() {
    // Game-wide settings can go here
    this.scale.align = 'center'; // Aligning the game to the center
    this.scale.scaleMode = Phaser.Scale.FIT;
    this.cameras.main.setBackgroundColor('#000');
  }

  preload() {
    // Optionally load a loading image or minimal asset
  }

  create() {
    // Move to the Preloader scene next
    this.scene.start('PreloaderScene');
  }
}