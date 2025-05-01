export default class ChapterSelectScene extends Phaser.Scene {
    constructor() {
      super('ChapterSelect');
    }
  
    preload() {
      this.load.image('bgChapterSelect', 'assets/ui/selectchapter.png');
      for (let i = 1; i <= 9; i++) {
        this.load.image(`Chapter${i}unlock`, `assets/ui/Chapter${i}unlock.png`);
      }
      this.load.image('Chapter0unlock', 'assets/ui/Prologue.png');
      this.load.image('Chapterlocked', 'assets/ui/Chapterlocked.png');
      this.load.image('homeButton', 'assets/ui/homebutton.png');
    }
  
    create() {
      // Fade in
      this.cameras.main.fadeIn(1000, 0, 0, 0);
  
      // Background
      this.add.image(0, 0, 'bgChapterSelect').setOrigin(0);
  
      const totalchapters = 10; // Prologue + 9 chapters
      const cols = 5;
      const spacingX = 150;
      const spacingY = 220;
      const startX = this.cameras.main.centerX - spacingX * 2;
      const startY = 300;
  
      const buttons = [];
      const chapters = this.getChapterData(); // Fix: Initialize chapters array
  
      chapters.forEach((ch, index) => {
        const x = startX + (index % cols) * spacingX;
        const y = startY + Math.floor(index / cols) * spacingY;
        const texture = ch.unlocked ? `Chapter${ch.id}unlock` : 'Chapterlocked';
        const btn = this.add.image(x, y + 600, texture).setInteractive();
      
        // Slide in animation
        this.tweens.add({
          targets: btn,
          y: y,
          duration: 800,
          ease: 'Back.easeOut',
          delay: index * 100,
        });
  
        if (ch.unlocked) {
          const glow = this.add.graphics();
          glow.fillStyle(0xffffff, 0.5);
          glow.fillCircle(btn.x, btn.y, 60);
          glow.setVisible(false);
          glow.setAlpha(0.5);
  
          let glowTween = null;
  
          btn.on('pointerover', () => {
            glow.setVisible(true);
  
            this.tweens.add({
              targets: btn,
              scale: 1.05,
              duration: 150,
              ease: 'Power2',
            });
  
            glowTween = this.tweens.add({
              targets: glow,
              alpha: { from: 0.3, to: 0.6 },
              duration: 800,
              ease: 'Sine.easeInOut',
              yoyo: true,
              repeat: -1,
            });
          });
  
          btn.on('pointerout', () => {
            glow.setVisible(false);
  
            this.tweens.add({
              targets: btn,
              scale: 1,
              duration: 150,
              ease: 'Power2',
            });
  
            if (glowTween) {
              glowTween.stop();
              glowTween = null;
            }
          });
  
          btn.on('pointerup', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
              if (ch.id === 0) {
                this.scene.start('PrologueScene'); // 🔥 If Prologue
              } else {
                this.scene.start(`Chapter${ch.id}`); // 🔥 If Chapter 1-9
              }
            });
          });
  
        } else {
          btn.on('pointerover', () => {
            this.tweens.add({
              targets: btn,
              alpha: 0.7,
              duration: 150,
              ease: 'Power2',
            });
          });
  
          btn.on('pointerout', () => {
            this.tweens.add({
              targets: btn,
              alpha: 1,
              duration: 150,
              ease: 'Power2',
            });
          });
        }
  
        buttons.push({ btn });
      });
  
      // Sparkle on newly unlocked chapter
      const justUnlocked = parseInt(localStorage.getItem('justUnlocked'), 10);
      if (justUnlocked) {
        const index = justUnlocked - 1;
        const x = startX + (index % cols) * spacingX;
        const y = startY + Math.floor(index / cols) * spacingY;
  
        localStorage.removeItem('justUnlocked');
      }
  
      // Home Button
      const backBtn = this.add.image(80, 80, 'homeButton').setInteractive();
      backBtn.on('pointerup', () => {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start('HomeScene');
        });
      });
    }
  
    getChapterData() {
        const totalChapters = 10; // Prologue + 9
        const cleared = parseInt(localStorage.getItem('highestCleared'), 10) || 0;
        return Array.from({ length: totalChapters }, (_, i) => ({
          id: i, // Prologue is 0
          unlocked: i <= cleared + 1, // Prologue is always open
        }));
    }
}