export default class CaspianProfileScene extends Phaser.Scene {
  constructor() {
    super('CaspianProfileScene');
  }

  preload() {
    this.load.image('caspianProfile', 'assets/ui/choosecharacter-Caspian.png');
    this.load.image('beginRoute', 'assets/ui/beginroute.png');
    this.load.image('backButton', 'assets/ui/backbutton.png');
  }

  create() {
    // Fade in the scene smoothly
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // Profile image
    const profile = this.add.image(512, 384, 'caspianProfile')
      .setOrigin(0.5)
      .setScale(0.94);

    // Begin route button
    const beginBtn = this.add.image(730, 675, 'beginRoute')
      .setOrigin(0.5)
      .setInteractive()
      .setScale(0.85)
      .setDepth(2); // Ensure it's clickable above all other layers

    beginBtn.on('pointerup', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('ChapterSelect');
      });
    });

    // Home/back button
    const backBtn = this.add.image(80, 80, 'backButton')
      .setOrigin(0.5)
      .setScale(0.8)
      .setInteractive()
      .setDepth(2);

    backBtn.on('pointerup', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('ChooseStoryScene');
      });
    });
  }
}