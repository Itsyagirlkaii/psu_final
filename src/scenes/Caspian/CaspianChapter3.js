// FINAL CORRECTED VERSION: CaspianChapter3.js
import SaveManager from '../SaveManager.js';
import EndGameManager from '../EndGameManager.js';


export default class CaspianChapter3 extends Phaser.Scene {
   constructor() {
       super('Chapter3');
   }


   preload() {
       // Backgrounds
       this.load.image('echleonlobby', 'assets/backgrounds/caspian/echleonlobby.png');
       this.load.image('caspiankitchen', 'assets/backgrounds/caspian/Caspiankitchen.png');
       this.load.image('caspianaptinside', 'assets/backgrounds/caspian/caspianday.png');
       this.load.image('caspianmeetingroom', 'assets/backgrounds/caspian/echleonmeetingroom.png');
       this.load.image('caspianrooftop', 'assets/backgrounds/caspian/echleonlounge.png');


       // CG
       this.load.image('caspianFull3', 'assets/cgs/caspian/caspianchapt3full.png');


       // Sprites
       this.load.image('caspianneutral', 'assets/sprites/Caspian-neutral.png');
       this.load.image('caspianhappy', 'assets/sprites/Caspian-happy.png');
       this.load.image('caspiansus', 'assets/sprites/Caspian-sus.png');
       this.load.image('caspiansad', 'assets/sprites/Caspian-sad.png');
       this.load.image('sterlingneutral', 'assets/sprites/Sterling-neutral.png');
       this.load.image('sterlinguninterested', 'assets/sprites/Sterling-uninterested.png');


       // UI
       this.load.image('textBox', 'assets/ui/text-box.png');
       this.load.image('choicebox', 'assets/ui/Choices.png');
       this.load.image('homeButton', 'assets/ui/homebutton.png');
   }


   create() {
       this.chapterNumber = 3;
       this.playerName = this.registry.get('playerName') || 'Player';


       this.bg = this.add.image(512, 384, 'echleonlobby').setOrigin(0.5);
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
       {bg: 'echleonlobby', speaker: '', text: "The lobby of Echelon Quantum is everything I imagined—cold, breathtaking, and intimidating. Polished surfaces, chrome lines, and quiet efficiency. Even the air smells calculated."}, //1
       {bg: 'echleonlobby', speaker: '', text: "I shouldn’t be nervous, but I am. A new world, a new job, and the shadow of a man who seems to command this entire place without raising his voice."}, //2
       {bg: 'echleonlobby', speaker: '', text: "Sterling stands at the entrance, tablet in hand.", sprites: { sterling:'sterlingneutral' }}, //3
       {bg: 'echleonlobby', speaker: 'Sterling', text: "Miss, you’re not late—yet.", sprites: { sterling:'sterlingneutral' }}, //4
       {bg: 'echleonlobby', speaker: '[player]', text: "I take it you’re my welcoming committee?", sprites: { sterling:'sterlinguninterested' }}, //5
       {bg: 'echleonlobby', speaker: 'Sterling', text: "I’m the wall between you and catastrophe. Consider me an early warning system. I have been tasked to onboard you.", sprites: { sterling:'sterlinguninterested' }}, //6
       {bg: 'echleonlobby', speaker: '', text: "(He’s warm and fuzzy as ever.)", sprites: { sterling:'sterlinguninterested' }}, //7
       {bg: 'echleonlobby', speaker: '[player]', text: "I am looking forward to it.", sprites: { sterling:'sterlinguninterested' }}, //8
       {bg: 'caspianmeetingroom', speaker: '', text: "Ushered into a conference room by Sterling, Caspian is already mid-sentence, surrounded by a group of workers. His tone is measured, confident. Every word lands with precision."}, //9
       {bg: 'caspianmeetingroom', speaker: '', text: "He notices me instantly."}, //10
       {bg: 'caspianmeetingroom', speaker: 'Caspian', text: "You’re just in time.", sprites: { caspian:'caspianhappy'}}, //11
       {bg: 'caspianmeetingroom', speaker: '', text: "He nods in my direction, the other people in the room following his gaze to look at me."}, //12
       {bg: 'caspianmeetingroom', speaker: 'Caspian', text: "Team, I'd like you to meet the newest member of our team.", sprites: { caspian:'caspianhappy'}}, //13
       {bg: 'caspianmeetingroom', speaker: '', text: "As the meeting ends, the room filters out. Caspian lingers.", sprites: { caspian:'caspianneutral'}}, //14
       {bg: 'caspianmeetingroom', speaker: 'Caspian', text: "You’ve reviewed the onboarding materials, I assume.", sprites: { caspian:'caspianneutral'}}, //15
       {bg: 'caspianmeetingroom', speaker: '[player]', text: "Yes. Thoroughly.", sprites: { caspian:'caspianneutral'}}, //16
       {bg: 'caspianmeetingroom', speaker: '', text: "(Sterling made sure of that...)", sprites: { caspian:'caspianneutral'}}, //17
       {bg: 'caspianmeetingroom', speaker: 'Caspian', text: "Good. Then you’re ready to contribute.", sprites: { caspian:'caspianneutral'}}, //18
       {bg: 'caspianmeetingroom', speaker: '', text: "He turns to face a wall-sized projection, data scrolling across it in real-time.", sprites: { caspian:'caspianneutral'}}, //19
       {bg: 'caspianmeetingroom', speaker: 'Caspian', text: "I’m assigning you to my team. You’ll shadow me for now. Consider it an accelerated track.", sprites: { caspian:'caspianneutral'}}, //20
       {bg: 'caspianrooftop', speaker: '', text: "Hours later, he leads me up to a private rooftop lounge. It’s quiet. The view is stunning—Nivean stretches out in glittering layers."}, //21
       {bg: 'caspianrooftop', speaker: 'Caspian', text: "I don’t often explain myself. But you’re not here by accident.", sprites: { caspian:'caspiannsad'}}, //22
       {bg: 'caspianrooftop', speaker: '', text: "He steps closer, just enough to make the moment feel heavy."}, //23
       {bg: 'caspianrooftop', speaker: 'Caspian', text: "I saw potential in you. It’s rare that I act on instinct. Even rarer that I let anyone close.", sprites: { caspian:'caspiansad'}}, //24
       {bg: 'caspianrooftop', speaker: '', text: "(He’s opening up... in his own way.)"}, //25
       {bg: 'caspianrooftop', speaker: 'Caspian', text: "You’ll either prove me right—or become a lesson.", sprites: { caspian:'caspianneutral'}}, //26
       {bg: 'caspianrooftop', speaker: '', text: "The wind shifts slightly. The city breathes.", sprites: { caspian:'caspianhappy'}}, //27
       {bg: 'caspianrooftop', speaker: '', text: "Caspian turns away, but not before I catch the smallest smile at the corner of his mouth.", sprites: { caspian:'caspianhappy'}}, //28
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


   if (this.currentDialogueIndex === 20) {
       this.currentQuestion = 1;
       this.showQuestion1();
   } else if (this.currentDialogueIndex === 25) {  
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
       this.happyChoice = this.add.text(512, 350, 'I won’t let you down.', {
           fontSize: '18px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'That’s... unexpected.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.happyChoice.on('pointerup', () => {
           this.chapterScore += 2;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 21; // move forward
           this.cleanupChoices();
           this.showDialogue();;
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 21; // move forward
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
       this.happyChoice = this.add.text(512, 350, 'I’m honored you did. I won’t take it for granted.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'That’s a lot to place on someone you barely know.', {
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
                   this.currentDialogueIndex = 26; 
                   this.advanceDialogue();
               });
           } else {
               this.currentDialogueIndex = 26;
               this.advanceDialogue();
           }
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false;
           this.cleanupChoices();
           this.currentDialogueIndex = 26;
           this.advanceDialogue();
       });
   }


   unlockCG() {
       localStorage.setItem('chapterUnlocked3', true);
       this.registry.set('caspianUnlocked3', true);
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