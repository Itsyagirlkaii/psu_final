// ImageViewScene.js

export default class ImageViewScene extends Phaser.Scene {
    constructor() {
      super('ImageViewScene');
    }
  
    preload() {
      const key = this.registry.get('currentFullImage');
      if (key) {
        this.load.image(key, `assets/cgs/caspian/${key}.png`);
      }
      this.load.image('backButton', 'assets/ui/backbutton.png'); // fix from earlier too
    }    
  
    create() {
      const fullImageKey = this.registry.get('currentFullImage');
      if (!fullImageKey) {
        console.warn('No image key set in registry. Returning to gallery.');
        this.scene.start('CaspianGalleryScene');
        return;
      }
  
      // Add full-size image centered
      this.fullImage = this.add.image(512, 384, fullImageKey).setOrigin(0.5);
      this.fullImage.setScale(0.9); // Scale as needed for your full image size
  
      // Add close button
      const closeBtn = this.add.image(950, 80, 'xbutton')
        .setInteractive()
        .setScale(0.5)
        .setOrigin(1, 0);
  
      closeBtn.on('pointerdown', () => {
        this.scene.start('CaspianGalleryScene');
      });
    }
  }