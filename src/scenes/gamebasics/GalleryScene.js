// GalleryScene.js

export default class GalleryScene extends Phaser.Scene {
    constructor() {
      super('GalleryScene');
    }
  
    preload() {
      this.load.image('galleryBG', 'assets/ui/galleryBG.png');
      this.load.image('caspianCard', 'assets/ui/choosecaspian.png');
      this.load.image('kadeCard', 'assets/ui/choosekade.png');
      this.load.image('homeBtn', 'assets/ui/homebutton.png');
    }
  
    create() {
      this.add.image(512, 384, 'galleryBG').setOrigin(0.5);
  
      const caspianCard = this.add.image(312, 400, 'caspianCard').setOrigin(0.5).setInteractive();
      const kadeCard = this.add.image(712, 400, 'kadeCard').setOrigin(0.5).setInteractive();
  
      caspianCard.on('pointerdown', () => {
        this.scene.start('CaspianGalleryScene');
      });
  
      kadeCard.on('pointerdown', () => {
        this.scene.start('KadeGalleryScene');
      });
  
      const homeButton = this.add.image(100, 80, 'homeBtn').setOrigin(0.5).setScale(1.0).setInteractive();
      homeButton.on('pointerdown', () => {
        this.scene.start('HomeScene');
      });
    }
  }