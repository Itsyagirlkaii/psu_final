// FINAL CORRECTED VERSION: CaspianChapter6.js
import SaveManager from '../SaveManager.js';
import EndGameManager from '../EndGameManager.js';


export default class CaspianChapter6 extends Phaser.Scene {
   constructor() {
       super('Chapter6');
   }


   preload() {
       // Backgrounds
       this.load.image('caspianshuttle', 'assets/backgrounds/caspian/caspianshuttle.png');
       this.load.image('caspianhome', 'assets/backgrounds/caspian/caspianshomestead.png');
       this.load.image('zephbalcony', 'assets/backgrounds/caspian/zephbalcony.png');
       this.load.image('zephgarden', 'assets/backgrounds/caspian/zephgardenwalk.png');


       // CG
       this.load.image('caspianFull2', 'assets/cgs/caspian/caspianchapt2full.png');


       // Sprites
       this.load.image('caspianneutral', 'assets/sprites/Caspian-neutral.png');
       this.load.image('caspianhappy', 'assets/sprites/Caspian-happy.png');
       this.load.image('caspiansad', 'assets/sprites/Caspian-sad.png');
       this.load.image('sterlingneutral', 'assets/sprites/Sterling-neutral.png');
       this.load.image('sterlinguninterested', 'assets/sprites/Sterling-uninterested.png');


       // UI
       this.load.image('textBox', 'assets/ui/text-box.png');
       this.load.image('choicebox', 'assets/ui/Choices.png');
       this.load.image('homeButton', 'assets/ui/homebutton.png');
   }


   create() {
       this.chapterNumber = 6;
       this.playerName = this.registry.get('playerName') || 'Player';


       this.bg = this.add.image(512, 384, 'caspianshuttle').setOrigin(0.5);
       this.darkOverlay = this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.5).setVisible(false);


       this.caspian = this.add.image(300, 400, 'caspianneutral').setOrigin(0.5).setScale(0.8).setVisible(false);
       this.sterling = this.add.image(800, 450, 'sterlingneutral').setOrigin(0.5).setScale(0.7).setVisible(false);


       this.textBox = this.add.image(512, 700, 'textBox').setDepth(2).setAlpha(0.7);


       this.nameText = this.add.text(80, 600, '', { font: '22px Arial', fill: '#ffffff', fontStyle: 'bold' }).setDepth(3);
       this.dialogueText = this.add.text(80, 640, '', { font: '20px Arial', fill: '#ffffff', wordWrap: { width: 860 } }).setDepth(3);


       const saveButton = this.add.text(850, 30, 'Save', {
           fontFamily: 'Arial',
           fontSize: '24px',
           color: '#00ff00'
       }).setInteractive();
      
       saveButton.on('pointerup', (pointer) => {
           pointer.event.stopPropagation();
           SaveManager.saveProgress(this.scene.key, this.currentDialogueIndex, this.chapterScore);
           this.showSavePopup(); // 👈 you were missing this
       });


       const homeButton = this.add.image(50, 50, 'homeButton').setOrigin(0.5).setScale(1.0).setInteractive();
       homeButton.on('pointerup', () => {
           this.scene.start('HomeScene');
       });


       this.currentDialogueIndex = 0;
       this.chapterScore = parseInt(localStorage.getItem('chapter6Score'), 10) || 0;
       this.justMadeChoice = false;


       this.storyDialogue = this.buildStory();


       const savedData = SaveManager.loadProgress();
       if (savedData.chapter === this.scene.key) {
           if (savedData.dialogueIndex !== null) {
               this.currentDialogueIndex = savedData.dialogueIndex;
           }
           if (savedData.score !== null) {
               this.chapterScore = savedData.score;
           }
       }


       const savedProgress = parseInt(localStorage.getItem(`chapter${this.chapterNumber}CurrentQuestion`), 10);
       if (savedProgress) {
           this.currentQuestion = savedProgress;
           if (this.currentQuestion === 1) this.showQuestion1();
           else if (this.currentQuestion === 3) this.showQuestion2();
       } else {
           this.showDialogue();
       }


       this.input.on('pointerup', this.advanceDialogue, this);
   }


   buildStory() {
       return [
       {bg: 'caspianshuttle', speaker: '', text: "I wasn’t expecting a shuttle ride. Certainly not to another planet."}, //
       {bg: 'caspianshuttle', speaker: '', text: "Caspian hadn’t explained much—just that he was “taking care of something personally” and that I was to accompany him. Now we’re alone in a sleek transport, its interior all dark leather and quiet hums."}, //
       {bg: 'caspianshuttle', speaker: '[player]', text: "So… where exactly are we going?", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: 'Caspian', text: "Zephyros. My home.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: '', text: "(Wait. His home? As in the planet he’s from?)"}, //
       {bg: 'caspianshuttle', speaker: 'Caspian', text: "There’s a matter of inheritance. I need to review something at my family estate.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: '', text: "I nod slowly. He’s staring out the window, but I can see it—his jaw is tenser than usual.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: '[player]', text: "You don’t seem thrilled about it.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: 'Caspian', text: "I’m not.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianhome', speaker: '', text: "The estate is stunning. Towering, symmetrical, and glowing softly in pale tones beneath a silver sky. Everything about it feels too perfect. Too cold."}, //
       {bg: 'caspianhome', speaker: '', text: "Inside, we’re greeted by automated staff and a single older woman with sharp eyes."}, //
       {bg: 'caspianhome', speaker: '???', text: "You brought someone?"}, //
       {bg: 'caspianhome', speaker: 'Caspian', text: "She’s with me.", sprites: { caspian: 'caspianneutral' }}, //
       {bg: 'caspianhome', speaker: '???', text: "Mm."}, //
       {bg: 'caspianhome', speaker: '', text: "(That… didn’t sound welcoming.)"}, //
       {bg: 'zephgarden', speaker: '', text: "We walk the perimeter of the estate later, past glowing flora and silent fountains. It’s breathtaking—but it feels like a cage"}, //
       {bg: 'zephgarden', speaker: 'Caspian', text: "This place looks like legacy. But it’s built on expectation.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'zephgarden', speaker: '[player]', text: "And do you plan to live up to it?", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'zephgarden', speaker: '', text: "He stops. Turns to me.", sprites: { caspian: 'caspianneutral' }}, //
       {bg: 'zephgarden', speaker: 'Caspian', text: "I’m not sure anymore. I used to think it was all that mattered. Now... there’s something else.", sprites: { caspian: 'caspianneutral' }}, //
       {bg: 'zephgarden', speaker: '', text: "(He means me. Doesn’t he?)"}, //
       {bg: 'zephgarden', speaker: 'Caspian', text: "I don’t know what this is yet. But I want to find out.", sprites: { caspian: 'caspianhappy' }}, //
       {bg: 'zephgarden', speaker: '', text: "My heart skips.", sprites: { caspian: 'caspianhappy' }}, //
       {bg: 'zephgarden', speaker: '', text: "That night, we stand side by side on a balcony overlooking the silent glow of Zephyros. He doesn’t speak. He doesn’t need to"}, //
       
   ];
}


showSavePopup() {
   const savePopup = this.add.text(512, 384, 'Progress Saved!', {
       fontSize: '28px',
       fontFamily: 'Arial',
       color: '#00ff00',
       backgroundColor: '#000000',
       padding: { left: 15, right: 15, top: 10, bottom: 10 }
   }).setOrigin(0.5).setDepth(10);


   this.tweens.add({
       targets: savePopup,
       alpha: 0,
       duration: 1500,
       ease: 'Power2',
       delay: 1500,
       onComplete: () => savePopup.destroy()
   });
}


advanceDialogue() {
    if (this.inChoice) return;

    if (this.justMadeChoice) {
        this.justMadeChoice = false;
        this.showDialogue();
        return;
    }

    this.currentDialogueIndex++;

    if (this.currentDialogueIndex >= this.storyDialogue.length) {
        this.finishChapter();
        return;
    }


   if (this.currentDialogueIndex === 15) {
       this.currentQuestion = 1;
       this.showQuestion1();
   } else if (this.currentDialogueIndex === 23) {  
        this.currentQuestion = 3;
        this.showQuestion2();
    } else {
        this.showDialogue();
    }
}


   showDialogue() {
       const line = this.storyDialogue[this.currentDialogueIndex];


       if (line.bg && line.bg !== this.bg.texture.key) {
           this.tweens.add({
               targets: this.bg,
               alpha: 0,
               duration: 500,
               onComplete: () => {
                   this.bg.setTexture(line.bg);
                   this.tweens.add({
                       targets: this.bg,
                       alpha: 1,
                       duration: 500
                   });
               }
           });
       }


       if (line.sprites) {
           if (line.sprites.caspian) {
               this.caspian.setTexture(line.sprites.caspian).setVisible(true);
           } else {
               this.caspian.setVisible(false);
           }
           if (line.sprites.sterling) {
               this.sterling.setTexture(line.sprites.sterling).setVisible(true);
           } else {
               this.sterling.setVisible(false);
           }
       } else {
           this.caspian.setVisible(false);
           this.sterling.setVisible(false);
       }


       if (line.speaker === '[player]') {
           this.nameText.setText(this.playerName);
       } else {
           this.nameText.setText(line.speaker);
       }


       this.dialogueText.setText(line.text);
   }


   showQuestion1() {
       this.inChoice = true;
       this.textBox.setVisible(false);
       this.nameText.setVisible(false);
       this.dialogueText.setVisible(false);
       this.darkOverlay.setVisible(true);
       this.caspian.setVisible(false);
  
       this.choiceTitle = this.add.text(512, 250, 'Choose your response:', {
           fontSize: '32px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5);
  
       this.happyBox = this.add.image(512, 350, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.happyChoice = this.add.text(512, 350, 'It’s a beautiful place. Thank you for letting me see it.', {
           fontSize: '18px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'I wasn’t sure what to expect.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.happyChoice.on('pointerup', () => {
           this.chapterScore += 2;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 16; // move forward
           this.cleanupChoices();
           this.showDialogue();;
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 16; // move forward
           this.cleanupChoices();
           this.showDialogue();;
       });
   }


   showQuestion2() {
       this.inChoice = true;
       this.textBox.setVisible(false);
       this.nameText.setVisible(false);
       this.dialogueText.setVisible(false);
       this.darkOverlay.setVisible(true);
  
       this.choiceTitle = this.add.text(512, 250, 'Choose your response:', {
           fontSize: '32px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5);
  
       this.happyBox = this.add.image(512, 350, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.happyChoice = this.add.text(512, 350, 'Then let’s figure it out. Together.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'That’s a big shift. But I respect it.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.happyChoice.on('pointerup', () => {
           this.chapterScore += 2;
           this.inChoice = false;
           this.cleanupChoices();
           if (this.chapterScore === 4) {
               this.showCGUnlockMessage(() => {
                   this.currentDialogueIndex = 24; 
                   this.advanceDialogue();
               });
           } else {
               this.currentDialogueIndex = 24;
               this.advanceDialogue();
           }
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false;
           this.cleanupChoices();
           this.currentDialogueIndex = 24;
           this.advanceDialogue();
       });
   }


   unlockCG() {
       localStorage.setItem('chapterUnlocked6', true);
       this.registry.set('caspianUnlocked6', true);
   }


   showCGUnlockMessage(callback) {
       this.unlockMessage = this.add.text(512, 384, 'CG Unlocked! Check the Gallery!', {
           fontSize: '28px',
           color: '#ffff00',
           fontFamily: 'Arial',
           backgroundColor: '#000000',
           padding: { left: 10, right: 10, top: 10, bottom: 10 }
       }).setOrigin(0.5).setDepth(10);
  
       this.input.once('pointerdown', () => {
           this.unlockMessage.destroy();
           if (callback) callback(); // now move forward
       });
   }
  


   cleanupChoices() {
       this.darkOverlay.setVisible(false);
       if (this.choiceTitle) this.choiceTitle.destroy();
       if (this.happyBox) this.happyBox.destroy();
       if (this.happyChoice) this.happyChoice.destroy();
       if (this.neutralBox) this.neutralBox.destroy();
       if (this.neutralChoice) this.neutralChoice.destroy();
       this.textBox.setVisible(true);
       this.nameText.setVisible(true);
       this.dialogueText.setVisible(true);
       this.justMadeChoice = true;
   }


   finishChapter() {
        EndGameManager.saveChapterScore(this.chapterNumber, this.chapterScore);

       if (this.chapterScore >= 4) this.unlockCG();
       const previousMax = parseInt(localStorage.getItem('highestCleared'), 10) || 0;
       const chapterScore = parseInt(this.chapterScore, 10) || 0;
  
       if (chapterScore >= 4) {}
  
       if (this.chapterNumber > previousMax) {
           localStorage.setItem('highestCleared', this.chapterNumber);
           localStorage.setItem('justUnlocked', this.chapterNumber + 1);
       }
  
       this.cameras.main.fadeOut(500, 0, 0, 0);
       this.cameras.main.once('camerafadeoutcomplete', () => {
           this.scene.start('ChapterSelect');
       });
   }
}