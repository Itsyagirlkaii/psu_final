// PreloaderScene.js

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('PreloaderScene');
  }

  preload() {
    // BACKGROUNDS
    this.load.image('titleScreen', 'assets/ui/Title Screen.png');
    this.load.image('homeScreen', 'assets/ui/home.png');
    this.load.image('chooseStory', 'assets/ui/choosestory.png');
    this.load.image('startButton', 'assets/ui/StartButton.png');
    
    // PROLOGUE BACKGROUNDS
    this.load.image('prologue1', 'assets/backgrounds/prologue/Prologue-scene1.png');
    this.load.image('prologue2', 'assets/backgrounds/prologue/Prologue-scene2.png');
    this.load.image('prologue3', 'assets/backgrounds/prologue/Prologue-scene3.png');
    this.load.image('prologue4', 'assets/backgrounds/prologue/Prologue-scene4.png');
    this.load.image('prologue5', 'assets/backgrounds/prologue/Prologue-scene5.png');
    this.load.image('prologue6', 'assets/backgrounds/prologue/Prologue-scene6.png');

    // SPRITES
    this.load.image('Caspian', 'assets/sprites/Caspian-neutral.png');
    this.load.image('Kade', 'assets/sprites/Kade-neutral.png');

    // UI
    this.load.image('textBox', 'assets/ui/text-box.png');
  }

  create() {
    this.scene.start('TitleScene');
  }
}