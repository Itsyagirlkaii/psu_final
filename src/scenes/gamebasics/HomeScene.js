export default class HomeScene extends Phaser.Scene {
  constructor() {
    super('HomeScene');
  }

  preload() {
    this.load.image('homeBG',            'assets/ui/home.png');
    this.load.image('startcontinue',     'assets/ui/startcontinue.png');
    this.load.image('chooseRouteButton', 'assets/ui/choosestory.png');
    this.load.image('galleryButton',     'assets/ui/gallery.png');
    this.load.image('creditsButton',     'assets/ui/credits.png');
    this.load.image('saveButton',        'assets/ui/savebutton.png');
    this.load.image('clearButton',       'assets/ui/clearbutton.png');
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;
  
    // Background
    this.add.image(cx, cy, 'homeBG').setOrigin(0.5);
    this.cameras.main.fadeIn(300, 0, 0, 0);
  
    // Main buttons
    const startBtn  = this.add.image(cx, cy - 30, 'startcontinue').setOrigin(0.5).setScale(0.9);
    const chooseBtn = this.add.image(cx, cy + 45,  'chooseRouteButton').setOrigin(0.5).setScale(0.9);
    const saveBtn   = this.add.image(cx, cy + 113,  'saveButton').setOrigin(0.5).setScale(0.9);
    const clearBtn  = this.add.image(cx, cy + 165, 'clearButton').setOrigin(0.5).setScale(0.9);

    const gallery = this.add.image(cx - 80, cy + 240, 'galleryButton').setOrigin(0.5).setScale(1.0);
    const credits = this.add.image(cx + 80, cy + 240, 'creditsButton').setOrigin(0.5).setScale(1.0);

    this.cameras.main.once('camerafadeincomplete', () => {
      startBtn.setInteractive({ useHandCursor: true }).on('pointerup', () => this.fadeToStart());
      chooseBtn.setInteractive({ useHandCursor: true }).on('pointerup', () => this.fadeDirect('ChooseStoryScene'));
      gallery.setInteractive({ useHandCursor: true }).on('pointerup', () => this.fadeDirect('GalleryScene'));
      credits.setInteractive({ useHandCursor: true }).on('pointerup', () => this.fadeDirect('CreditScene'));

      // SAVE
      saveBtn.setInteractive({ useHandCursor: true }).on('pointerup', () => {
        const data = {
          route: this.registry.get('currentRoute'),
          chapter: this.registry.get('currentChapter'),
          playerName: this.registry.get('playerName'),
        };
        localStorage.setItem('niveanSave', JSON.stringify(data));
        this.showPopup('Game saved!');
      });

      // CLEAR
      clearBtn.setInteractive({ useHandCursor: true }).on('pointerup', () => {
        localStorage.removeItem('niveanSave');
        localStorage.removeItem('highestCleared');
        localStorage.removeItem('chapter1cgUnlocked');
        this.registry.remove('currentRoute');
        this.registry.remove('currentChapter');
        this.registry.remove('playerName');
        this.showPopup('Save data cleared.');
      });
    });
  }

  // ➡ For Start/Continue button only
  fadeToStart() {
    if (!this.cameras.main._fadeEffect?.isRunning) {
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(500, () => {
        const savedData = JSON.parse(localStorage.getItem('niveanSave'));
        if (savedData && savedData.chapter) {
          this.scene.start(savedData.chapter);
        } else {
          this.scene.start('PrologueScene'); // No save? Start fresh
        }
      });
    }
  }

  // ➡ For all other buttons
  fadeDirect(target) {
    if (!this.cameras.main._fadeEffect?.isRunning) {
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(500, () => this.scene.start(target));
    }
  }

  showPopup(message) {
    const popup = this.add.text(this.scale.width / 2, 100, message, {
      font: '24px Arial',
      fill: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);

    this.time.delayedCall(1500, () => popup.destroy());
  }
}