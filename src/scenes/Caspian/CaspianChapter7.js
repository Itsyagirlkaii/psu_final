// FINAL CORRECTED VERSION: CaspianChapter7.js
import SaveManager from '../SaveManager.js';
import EndGameManager from '../EndGameManager.js';


export default class CaspianChapter7 extends Phaser.Scene {
   constructor() {
       super('Chapter7');
   }


   preload() {
       // Backgrounds
       this.load.image('caspianshuttle', 'assets/backgrounds/caspian/caspianshuttle.png');
       this.load.image('caspiannight', 'assets/backgrounds/caspian/caspiannight.png');
       this.load.image('caspianoffice', 'assets/backgrounds/caspian/caspianoffice.png');


       // CG
       this.load.image('caspianFull7', 'assets/cgs/caspian/caspianchapt7full.png');


       // Sprites
       this.load.image('caspiansad', 'assets/sprites/Caspian-sad.png');
       this.load.image('caspianangry', 'assets/sprites/Caspian-angry.png');
       this.load.image('caspiansurprised', 'assets/sprites/Caspian-surprised.png');
       this.load.image('sterlingneutral', 'assets/sprites/Sterling-neutral.png');
       this.load.image('sterlinguninterested', 'assets/sprites/Sterling-uninterested.png');


       // UI
       this.load.image('textBox', 'assets/ui/text-box.png');
       this.load.image('choicebox', 'assets/ui/Choices.png');
       this.load.image('homeButton', 'assets/ui/homebutton.png');
   }


   create() {
       this.chapterNumber = 7;
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
       this.chapterScore = parseInt(localStorage.getItem('chapter7Score'), 10) || 0;
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
       {bg: 'caspianshuttle', speaker: '', text: "We’re already halfway back to Nivean, but something’s shifted. Caspian’s quiet—more than usual. The hum of the shuttle is the only sound between us."}, //
       {bg: 'caspianshuttle', speaker: '[player]', text: "You’ve barely said a word."}, //
       {bg: 'caspianshuttle', speaker: 'Caspian', text: "I’m considering how many truths I’ve buried. And how many more I’m willing to dig up.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: '', text: "I blink.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: '[player]', text: "That sounds... heavy.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianshuttle', speaker: 'Caspian', text: "It is.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspiannight', speaker: '', text: "Back in the city, the quiet follows us. The skyline beyond the windows feels distant tonight, muted."}, //
       {bg: 'caspiannight', speaker: '', text: "He’s pacing. Restless.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspiannight', speaker: 'Caspian', text: "Do you ever think about how we get here? The choices. The costs.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspiannight', speaker: '[player]', text: "All the time.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspiannight', speaker: '', text: "He pauses, then looks at me directly.", sprites: { caspian: 'caspiansurprised' }}, //
       {bg: 'caspiannight', speaker: 'Caspian', text: "There’s something you should know. I wasn’t entirely honest about the breach at Echelon. It wasn’t just a random attack. It was meant for me. A message.", sprites: { caspian: 'caspiansurprised' }}, //
       {bg: 'caspiannight', speaker: '[player]', text: "A message from who?"}, //
       {bg: 'caspiannight', speaker: 'Caspian', text: "Someone I used to trust.", sprites: { caspian: 'caspianangry' }}, //
       {bg: 'caspiannight', speaker: '', text: "There’s a beat of silence. He sits, tension coiling in his shoulders.", sprites: { caspian: 'caspianangry' }}, //
       {bg: 'caspiannight', speaker: 'Caspian', text: "I can handle being a target. But if you’re going to be close to me, you deserve to know what that means.", sprites: { caspian: 'caspianangry' }}, //
       {bg: 'caspianoffice', speaker: '', text: "Later, I find him in his office—lights low, hands resting against a glass desk, gaze unfocused.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianoffice', speaker: '[player]', text: "Are you okay?", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianoffice', speaker: 'Caspian', text: "No. But I will be.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianoffice', speaker: '', text: "He looks at me, finally vulnerable in a way I’ve never seen before.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianoffice', speaker: 'Caspian', text: "You’ve seen the best and worst of this already. And you’re still here.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianoffice', speaker: '[player]', text: "I’m still here.", sprites: { caspian: 'caspiansad' }}, //
       {bg: 'caspianoffice', speaker: '', text: "The silence this time feels different. Safe. Earned."}, //
       
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


   if (this.currentDialogueIndex === 16) {
       this.currentQuestion = 1;
       this.showQuestion1();
   } else if (this.currentDialogueIndex === 22) {  
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
       this.happyChoice = this.add.text(512, 350, 'Then let me stay. I’ll face it with you.', {
           fontSize: '18px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'Thanks for telling me. I’ll be careful.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.happyChoice.on('pointerup', () => {
           this.chapterScore += 2;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 17; // move forward
           this.cleanupChoices();
           this.showDialogue();;
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 17; // move forward
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
       this.happyChoice = this.add.text(512, 350, 'Because I care about you.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'Because you’ve let me in more than anyone else has.', {
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
                   this.currentDialogueIndex = 23; 
                   this.advanceDialogue();
               });
           } else {
               this.currentDialogueIndex = 23;
               this.advanceDialogue();
           }
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false;
           this.cleanupChoices();
           this.currentDialogueIndex = 23;
           this.advanceDialogue();
       });
   }


   unlockCG() {
       localStorage.setItem('chapterUnlocked7', true);
       this.registry.set('caspianUnlocked7', true);
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