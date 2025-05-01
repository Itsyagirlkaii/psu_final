export default class CaspianGalleryScene extends Phaser.Scene {
  constructor() {
    super('CaspianGalleryScene');
  }

  preload() {
    // background
    this.load.image('indvpicpagecaspian', 'assets/ui/indvpicpagecaspian.png');
    // back button
    this.load.image('backButton', 'assets/ui/backbutton.png');
    // placeholder
    this.load.image('Nopic', 'assets/ui/Nopic.png');

    // Thumbnails
    this.load.image('caspianThumb1', 'assets/cgs/caspian/caspianchapt1thumb.png');
    this.load.image('caspianThumb2', 'assets/cgs/caspian/caspianchapt2thumb.png');
    this.load.image('caspianThumb3', 'assets/cgs/caspian/caspianchapt3thumb.png');
    this.load.image('caspianThumb4', 'assets/cgs/caspian/caspianchapt4thumb.png');
    this.load.image('caspianThumb5', 'assets/cgs/caspian/caspianchapt5thumb.png');
    this.load.image('caspianThumb6', 'assets/cgs/caspian/caspianchapt6thumb.png');
    this.load.image('caspianThumb7', 'assets/cgs/caspian/caspianchapt7thumb.png');
    this.load.image('caspianThumb8', 'assets/cgs/caspian/caspianchapt8thumb.png');
    this.load.image('caspianThumb9', 'assets/cgs/caspian/caspianchapt9thumb.png');
    this.load.image('caspianThumb10', 'assets/cgs/caspian/caspiangoodthumb.png');
    this.load.image('caspianThumb11', 'assets/cgs/caspian/caspiannormalthumb.png');
    this.load.image('caspianThumb12', 'assets/cgs/caspian/caspianhappythumb.png');

    // Full-size images
    this.load.image('caspianFull1', 'assets/cgs/caspian/caspianchapt1full.png');
    this.load.image('caspianFull2', 'assets/cgs/caspian/caspianchapt2full.png');
    this.load.image('caspianFull3', 'assets/cgs/caspian/caspianchapt3full.png');
    this.load.image('caspianFull4', 'assets/cgs/caspian/caspianchapt4full.png');
    this.load.image('caspianFull5', 'assets/cgs/caspian/caspianchapt5full.png');
    this.load.image('caspianFull6', 'assets/cgs/caspian/caspianchapt6full.png');
    this.load.image('caspianFull7', 'assets/cgs/caspian/caspianchapt7full.png');
    this.load.image('caspianFull8', 'assets/cgs/caspian/caspianchapt8full.png');
    this.load.image('caspianFull9', 'assets/cgs/caspian/caspianchapt9full.png');
    this.load.image('caspianGoodEndFull', 'assets/cgs/caspian/caspiangoodfull.png');
    this.load.image('caspianNormalFull', 'assets/cgs/caspian/caspiannormalfull.png');
    this.load.image('caspianHappyFull', 'assets/cgs/caspian/caspianhappyfull.png');
  }

  create() {
    // Background
    this.add.image(512, 384, 'indvpicpagecaspian').setOrigin(0.5);

    // Back button
    const backButton = this.add.image(80, 80, 'backButton').setOrigin(0.5).setInteractive();
    backButton.on('pointerdown', () => {
      this.scene.start('GalleryScene');
    });

    // Positioning
    const startX = 180;
    const startY = 200;
    const spacingX = 210;
    const spacingY = 180;

    const totalCards = 12; // Now 12 unlockables
    let cardIndex = 1;

    // 🔗 Map card number to full-sized image keys
    const imageMap = {
      1: 'caspianFull1',
      2: 'caspianFull2',
      3: 'caspianFull3',
      4: 'caspianFull4',
      5: 'caspianFull5',
      6: 'caspianFull6',
      7: 'caspianFull7',
      8: 'caspianFull8',
      9: 'caspianFull9',
      10: 'caspianGoodEndFull',
      11: 'caspianNormalFull',
      12: 'caspianHappyFull',
    };

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (cardIndex > totalCards) break;

        const x = startX + col * spacingX;
        const y = startY + row * spacingY;

        const isUnlocked = localStorage.getItem(`caspianUnlocked${cardIndex}`) === 'true';
        const thumbKey = isUnlocked ? `caspianThumb${cardIndex}` : 'Nopic';

        const thumb = this.add.image(x, y, thumbKey).setOrigin(0.5).setScale(0.7).setInteractive();

        if (isUnlocked) {
           thumb.on('pointerdown', () => {
            const fullKey = imageMap[cardIndex];
            if (fullKey) {
              this.registry.set('currentFullImage', fullKey);
              this.scene.start('ImageViewScene');
        }
      });    
}

        cardIndex++;
      }
      if (cardIndex > totalCards) break;
    }
  }
}