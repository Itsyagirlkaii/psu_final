// FINAL CORRECTED VERSION: CaspianChapter2.js
import SaveManager from '../SaveManager.js';
import EndGameManager from '../EndGameManager.js';


export default class CaspianChapter2 extends Phaser.Scene {
   constructor() {
       super('Chapter2');
   }


   preload() {
       // Backgrounds
       this.load.image('guestroom', 'assets/backgrounds/caspian/guestbedroom.png');
       this.load.image('caspiankitchen', 'assets/backgrounds/caspian/Caspiankitchen.png');
       this.load.image('caspianaptinside', 'assets/backgrounds/caspian/caspianday.png');


       // CG
       this.load.image('caspianFull2', 'assets/cgs/caspian/caspianchapt2full.png');


       // Sprites
       this.load.image('caspianneutral', 'assets/sprites/Caspian-neutral.png');
       this.load.image('caspianhappy', 'assets/sprites/Caspian-happy.png');
       this.load.image('caspiansus', 'assets/sprites/Caspian-sus.png');
       this.load.image('sterlingneutral', 'assets/sprites/Sterling-neutral.png');
       this.load.image('sterlinguninterested', 'assets/sprites/Sterling-uninterested.png');


       // UI
       this.load.image('textBox', 'assets/ui/text-box.png');
       this.load.image('choicebox', 'assets/ui/Choices.png');
       this.load.image('homeButton', 'assets/ui/homebutton.png');
   }


   create() {
       this.chapterNumber = 2;
       this.playerName = this.registry.get('playerName') || 'Player';


       this.bg = this.add.image(512, 384, 'guestroom').setOrigin(0.5);
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
       this.chapterScore = parseInt(localStorage.getItem('chapter2Score'), 10) || 0;
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
       {bg: 'guestroom', speaker: '', text: "Sunlight piercing through the windows, casting gold across the glass surfaces. I blink, adjusting to the brightness."}, //1
       {bg: 'guestroom', speaker: '', text: "I'm still trying to make sense of waking up in a guest bedroom the size of my entire apartment back home." },//2
       {bg: 'guestroom', speaker: '', text: "(He really wasn't joking about a spare room..)"}, //3
       {bg: 'guestroom', speaker: '', text: "A soft scent of coffee, seeps into the room. My stomach grumbles. I quickly wipe my eyes and straighten my hair and the pajamas Sterling found for me."}, //4
       {bg: 'guestroom', speaker: '', text: "(It's amazing how swiftly Sterling provided me with pajamas, these are softer than anything I've owned..)"}, //5
       {bg: 'guestroom', speaker: '', text: "I gather my nerves, and quietly open the guest room door." }, //6
       {bg: 'caspiankitchen', speaker: '', text: "I step into the kitchen to find Caspian already there, dressed, composed, and reading something off a holographic display hovering over the counter. A sleek coffee machine hisses softly beside him.", sprites: { caspian: 'caspianhappy' } }, //7
       {bg: 'caspiankitchen', speaker: 'Caspian', text: "You’re up earlier than expected. The guest bed tends to make people overly comfortable.", sprites: { caspian: 'caspianhappy' }  }, //8
       {bg: 'caspiankitchen', speaker: '[player]', text: "I'm just not used to being pampered." }, //9
       {bg: 'caspiankitchen', speaker: 'Caspian', text: "It's not pampering, it's standard hospitality, he chuckles.", sprites: { caspian: 'caspianhappy' } },//10
       {bg: 'caspiankitchen', speaker: '', text: "He gestures toward a cup already set out. Steam curls from it gently." }, //11
       {bg: 'caspiankitchen', speaker: 'Caspian', text: "You drink coffee, yes?", sprites: { caspian: 'caspianneutral' } }, //12
       {bg: 'caspiankitchen', speaker: '', text: "He shifts slightly, eyes still skimming his tablet.", sprites: { caspian: 'caspianneutral' }  }, //13
       {bg: 'caspiankitchen', speaker: 'Caspian', text: "You’ll be invited to Echelon’s orientation later this week. They’ve fast-tracked your clearance.", sprites: { caspian: 'caspianneutral' }  }, //14
       {bg: 'caspiankitchen', speaker: '', text: "My heart stutters. (Orientation? Clearance?)"}, //15
       {bg: 'caspiankitchen', speaker: '[player]', text: "What? Did you... pull strings?" }, //16
       {bg: 'caspiankitchen', speaker: 'Caspian', text: "Your résumé did most of the talking. I merely ensured the right eyes saw it.", sprites: { caspian: 'caspianneutral' }  }, //17
       {bg: 'caspiankitchen', speaker: '', text: "A pause hangs between us—weighted.", sprites: { caspian: 'caspianneutral' }}, //18
       {bg: 'caspiankitchen', speaker: 'Caspian', text: "It is not a favor. The effort you showed yesterday warrants an opporunity." }, //19
       {bg: 'caspiankitchen', speaker: 'Caspian', text: "Good. That’s what I expect. Echleon is top in the industry, we need strong employees.", sprites: { caspian: 'caspianhappy' } },
       {bg: 'caspianaptinside', speaker: '', text: "He sets down the tablet, finally meeting my eyes directly.", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianaptinside', speaker: 'Caspian', text: "There are few people I can trust to handle what’s ahead. I hope you’ll prove yourself worth the exception.", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianaptinside', speaker: '', text: "(That almost sounded… personal?)", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianaptinside', speaker: '', text: "He turns away before I can reply." },
       {bg: 'caspianaptinside', speaker: 'Caspian', text: "I’ll be heading in the office. I expect you to be on time for orientation." },
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


   if (this.currentDialogueIndex === 12) {
       this.currentQuestion = 1;
       this.showQuestion1();
   } else if (this.currentDialogueIndex === 19) {  
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
       this.happyChoice = this.add.text(512, 350, 'Yes, thank you. This smells amazing.', {
           fontSize: '18px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'Yeah. As long as it has caffeine, I’m good.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.happyChoice.on('pointerup', () => {
           this.chapterScore += 2;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 13; // move forward
           this.cleanupChoices();
           this.showDialogue();;
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 13; // move forward
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
       this.happyChoice = this.add.text(512, 350, 'Then I’ll give you everything I’ve got.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'I’ll do my best not to waste the opportunity.', {
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
                   this.currentDialogueIndex = 20; 
                   this.advanceDialogue();
               });
           } else {
               this.currentDialogueIndex = 20;
               this.advanceDialogue();
           }
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false;
           this.cleanupChoices();
           this.currentDialogueIndex = 20;
           this.advanceDialogue();
       });
   }


   unlockCG() {
       localStorage.setItem('chapterUnlocked2', true);
       this.registry.set('caspianUnlocked2', true);
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