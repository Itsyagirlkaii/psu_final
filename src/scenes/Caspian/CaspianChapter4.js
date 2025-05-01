// FINAL CORRECTED VERSION: CaspianChapter4.js
import SaveManager from '../SaveManager.js';
import EndGameManager from '../EndGameManager.js';


export default class CaspianChapter4 extends Phaser.Scene {
   constructor() {
       super('Chapter4');
   }


   preload() {
       // Backgrounds
       this.load.image('caspiannight', 'assets/backgrounds/caspian/caspiannight.png');
       this.load.image('caspianhallway', 'assets/backgrounds/caspian/caspianhallway.png');


       // CG
       this.load.image('caspianFull4', 'assets/cgs/caspian/caspianchapt4full.png');


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
       this.chapterNumber = 4;
       this.playerName = this.registry.get('playerName') || 'Player';


       this.bg = this.add.image(512, 384, 'caspiannight').setOrigin(0.5);
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
       this.chapterScore = parseInt(localStorage.getItem('chapter4Score'), 10) || 0;
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
       {bg: 'caspiannight', speaker: '', text: "The lights in Caspian’s apartment are dimmed, the rain still whispering against the tall windows. It’s the end of a long day, and somehow I ended up back here—feet tucked beneath me on his impossibly sleek couch, while he reads through something on his tablet across from me."}, //1
       {bg: 'caspiannight', speaker: '', text: "(We haven’t said much since the rooftop.)"}, //2
       {bg: 'caspiannight', speaker: '', text: "I sip from a cup of tea Sterling handed me earlier—without a word, of course. He’s since disappeared, probably judging my posture somewhere from the shadows."}, //3
       {bg: 'caspiannight', speaker: 'Caspian', text: "You held your own today. I expected less.", sprites: { caspian:'caspianneutral'}}, //4
       {bg: 'caspiannight', speaker: '', text: "(That’s... a compliment, right?)", sprites: { caspian:'caspianneutral'}}, //5
       {bg: 'caspiannight', speaker: '[player]', text: "I was just trying not to embarrass myself.", sprites: { caspian:'caspianneutral'}}, //6
       {bg: 'caspiannight', speaker: 'Caspian', text: "An admirable start.", sprites: { caspian:'caspianhappy'}}, //7
       {bg: 'caspiannight', speaker: '', text: "He puts down the tablet and looks at me, really looks.", sprites: { caspian:'caspianneutral'}}, //8
       {bg: 'caspiannight', speaker: 'Caspian', text: "You have good qualities in your work, it just needs a little polishing.", sprites: { caspian:'caspianneutral'}}, //9
       {bg: 'caspiannight', speaker: '', text: "I smile at my tea."}, //10
       {bg: 'caspiannight', speaker: '[player]', text: "I'm sure Sterling would jump at the chance to polish me.", sprites: { caspian:'caspianneutral'}}, //11
       {bg: 'caspiannight', speaker: '', text: "Caspian chuckles.", sprites: { caspian:'caspianhappy'}}, //12
       {bg: 'caspiannight', speaker: 'Caspian', text: "You’re not what I expected. Most people try to impress me. You don’t seem concerned with that.", sprites: { caspian:'caspianneutral'}}, //13
       {bg: 'caspiannight', speaker: 'Caspian', text: "It's just refreshing to see. People tend to be loud, needing the acknowledgement of others to feel important. Being an industry expert, it can be exhausting to have to constantly cater to that.", sprites: { caspian:'caspiansad'}}, //14
       {bg: 'caspiannight', speaker: '', text: "He rises, walks to the window. The skyline glows like circuitry beneath the storm.", sprites: { caspian:'caspiansad'}}, //15
       {bg: 'caspiannight', speaker: 'Caspian', text: "When I built this place, I designed it to be silent. No distractions. Just… space to think.", sprites: { caspian:'caspiansad'}}, //16
       {bg: 'caspiannight', speaker: '[player]', text: "It’s beautiful. But doesn’t it get lonely?", sprites: { caspian:'caspiansad'}}, //17
       {bg: 'caspiannight', speaker: '', text: "He doesn’t answer immediately.", sprites: { caspian:'caspiansad'}}, //18
       {bg: 'caspiannight', speaker: 'Caspian', text: "It did.", sprites: { caspian:'caspiansad'}}, //19
       {bg: 'caspiannight', speaker: '', text: "There’s a beat of quiet. Then he turns back, expression unreadable.", sprites: { caspian:'caspianneutral'}}, //20
       {bg: 'caspiannight', speaker: 'Caspian', text: "Would you like to stay the night again? The guest room is available.", sprites: { caspian:'caspianneutral'}}, //21
       {bg: 'caspiannight', speaker: '', text: "(I feel my heart skip.)", sprites: { caspian:'caspianneutral'}}, //22
       {bg: 'caspiannight', speaker: 'Caspian', text: "The room is yours as long as you need it. It's nice to have company.", sprites: { caspian:'caspianhappy'}}, //23
       {bg: 'caspianhallway', speaker: '', text: "I follow him down the hall, the ambient lighting low and warm. He opens the door to the guest suite like it’s second nature.", sprites: { caspian:'caspianhappy'}}, //24
       {bg: 'caspianhallway', speaker: 'Caspian', text: "Sleep well.", sprites: { caspian:'caspianhappy'}}, //25
       {bg: 'caspianhallway', speaker: '', text: "He pauses at the doorway just a moment longer than necessary."}, //26
       {bg: 'caspianhallway', speaker: '', text: "Then he’s gone."}, //27
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
       this.happyChoice = this.add.text(512, 350, 'I’d rather be real than perfect', {
           fontSize: '19px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'I guess I don’t know how to impress someone like you.', {
           fontSize: '15px',
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
       this.caspian.setVisible(false);
  
       this.choiceTitle = this.add.text(512, 250, 'Choose your response:', {
           fontSize: '32px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5);
  
       this.happyBox = this.add.image(512, 350, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.happyChoice = this.add.text(512, 350, 'I’d like to stay.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'Only if it’s not an inconvenience.', {
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
       localStorage.setItem('chapterUnlocked4', true);
       this.registry.set('caspianUnlocked4', true);
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