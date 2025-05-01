// CreditScene.js

export default class CreditScene extends Phaser.Scene {
    constructor() {
        super('CreditScene');
    }

    preload() {
        this.load.image('creditScreen', 'assets/ui/creditpage.png');
        this.load.image('backButton',   'assets/ui/backbutton.png');
    }

    create() {
        const { width, height } = this.scale;

        // 1) draw your full-screen credits background, centered
        this.add.image(width / 2, height / 2, 'creditScreen')
            .setOrigin(0.5);

        // 2) add the back button in the top-left, with a little padding
        const PADDING = 20;
        const back = this.add.image(PADDING, PADDING, 'backButton')
            .setOrigin(0, 0)                     // (0,0) = top-left of the sprite
            .setInteractive({ useHandCursor:true })
            .setScale(0.5);                      // tweak your scale as needed

        // 3) wire up the click to go back
        back.on('pointerdown', () => {
            this.scene.start('HomeScene');
        });

        // 4) optional: ensure it’s on top of everything
        this.children.bringToTop(back);
    }
}