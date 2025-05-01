// ChooseStoryScene.js
export default class ChooseStoryScene extends Phaser.Scene {
  constructor() {
    super('ChooseStoryScene');
  }

  preload() {
    this.load.image('chooseCharacterBG', 'assets/ui/chooseCharacterBG.png');
    this.load.image('caspianCard', 'assets/ui/choosecaspian.png');
    this.load.image('kadeCard', 'assets/ui/choosekade.png');
    this.load.image('homeButton', 'assets/ui/homebutton.png');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // Background
    this.add.image(centerX, centerY, 'chooseCharacterBG');

    // Caspian Card
    const caspianCard = this.add.image(300, 400, 'caspianCard').setInteractive();
    caspianCard.on('pointerdown', () => {
      this.scene.start('CaspianProfileScene');
    });

    // Kade Card (still placeholder logic for now)
    const kadeCard = this.add.image(740, 400, 'kadeCard').setInteractive();
    kadeCard.on('pointerdown', () => {
      // For now, loop back to title or later: this.scene.start('KadeProfileScene')
      this.scene.start('TitleScene');
    });

    // Home Button
    const homeBtn = this.add.image(80, 80, 'homeButton')
      .setOrigin(0.5)
      .setScale(0.8)
      .setInteractive();

    homeBtn.on('pointerdown', () => {
      this.scene.start('HomeScene');
    });
  }
}