// PlayerNameScene.js

export default class PlayerNameScene extends Phaser.Scene {
    constructor() {
      super('PlayerNameScene');
    }
  
    create() {
      // Dimmed background rectangle
      this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.85);
  
      // Title text
      this.add.text(512, 200, 'What’s your name?', {
        font: '32px Arial',
        fill: '#ffffff'
      }).setOrigin(0.5);
  
      // ✅ Use Phaser's built-in DOM creation method
      this.inputField = this.add.dom(512, 300).createFromHTML(`
        <input type="text" id="nameInput" placeholder="Enter your name"
          style="
            font-size: 24px;
            padding: 10px;
            border-radius: 5px;
            border: none;
            outline: none;
            text-align: center;
            width: 300px;
          "
        />
      `);
  
      // Confirm button
      const confirmBtn = this.add.text(512, 400, 'Confirm', {
        font: '28px Arial',
        fill: '#ffffff',
        backgroundColor: '#444',
        padding: { x: 20, y: 10 },
      }).setOrigin(0.5).setInteractive();
  
      confirmBtn.on('pointerdown', () => {
        const nameInput = document.getElementById('nameInput');
        const playerName = nameInput?.value.trim();
  
        if (playerName) {
          this.registry.set('playerName', playerName);
          this.inputField.destroy(); // ✅ Clean removal of input from DOM
          this.scene.start('HomeScene');
        }
      });
    }
  
    shutdown() {
      const input = document.getElementById('nameInput');
      if (input) input.remove(); // Fallback cleanup
    }
  }