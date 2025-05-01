// FINAL CORRECTED VERSION: CaspianChapter8.js
import SaveManager from '../SaveManager.js';
import EndGameManager from '../EndGameManager.js';


export default class CaspianChapter8 extends Phaser.Scene {
   constructor() {
       super('Chapter8');
   }


   preload() {
       // Backgrounds
       this.load.image('alleyway', 'assets/backgrounds/caspian/meetkadealleyway.png');
       this.load.image('hackerterm', 'assets/backgrounds/caspian/caspianhackingterminal.png');
       this.load.image('loungenight', 'assets/backgrounds/caspian/echleonloungenight.png');


       // CG
       this.load.image('caspianFull2', 'assets/cgs/caspian/caspianchapt2full.png');


       // Sprites
       this.load.image('caspianneutral', 'assets/sprites/Caspian-neutral.png');
       this.load.image('caspianhappy', 'assets/sprites/Caspian-happy.png');
       this.load.image('caspiansus', 'assets/sprites/Caspian-sus.png');
       this.load.image('kadeneutral', 'assets/sprites/Kade-neutral.png');
       this.load.image('kadehappy', 'assets/sprites/Kade-Happy.png');


       // UI
       this.load.image('textBox', 'assets/ui/text-box.png');
       this.load.image('choicebox', 'assets/ui/Choices.png');
       this.load.image('homeButton', 'assets/ui/homebutton.png');
   }


   create() {
       this.chapterNumber = 8;
       this.playerName = this.registry.get('playerName') || 'Player';


       this.bg = this.add.image(512, 384, 'alleyway').setOrigin(0.5);
       this.darkOverlay = this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.5).setVisible(false);


       this.caspian = this.add.image(300, 400, 'caspianneutral').setOrigin(0.5).setScale(0.8).setVisible(false);
       this.kade = this.add.image(800, 450, 'kadeneutral').setOrigin(0.5).setScale(0.7).setVisible(false);


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
       this.chapterScore = parseInt(localStorage.getItem('chapter8Score'), 10) || 0;
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
       {bg: 'alleyway', speaker: '', text: "It’s late when we meet Kade. He’s leaning against a rusted support beam in an alley that hums with flickering neon. The air buzzes with static and the scent of ozone. This place doesn’t fit Caspian at all—but somehow, it’s where he chose to go."}, //
       {bg: 'alleyway', speaker: 'Kade', text: "Well, well. This is new. You finally admit you need help?", sprites:{kade: 'kadehappy'}}, //
       {bg: 'alleyway', speaker: 'Caspian', text: "I admit there’s a threat that needs removing. And you’re uniquely suited for messy problems.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'alleyway', speaker: 'Kade', text: "You say the nicest things.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'alleyway', speaker: '', text: "Their eyes meet. It’s sharp, but not hostile.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'alleyway', speaker: '[player]', text: "You two really are opposites, huh?", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'alleyway', speaker: 'Caspian', text: "And yet we keep ending up in the same messes.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: 'Caspian', text: "The trail leads us to a decommissioned server bank deep in the city’s underbelly. Dust and broken terminals, but one flickers faintly—alive.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: 'Kade', text: "Classic. They left a calling card.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: 'Caspian', text: "Encrypted. But sloppy.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: '[player]', text: "Do you think it’s someone trying to frame you?", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: 'Caspian', text: "No. It’s personal. They wanted me to see it.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: 'Kade', text: "Then let’s leave a message of our own.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: '', text: "I assist while Kade slices through the code, Caspian redirecting firewalls like he’s conducting an orchestra. It’s surreal watching them—so different, yet moving in sync.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: 'Kade', text: "Got a name. And an old access point. You recognize it?", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'hackerterm', speaker: '', text: "Caspian stiffens.", sprites: { caspian: 'caspiansus', kade:'kadeneutral' }}, //
       {bg: 'hackerterm', speaker: 'Caspian', text: "Yes.", sprites: { caspian: 'caspiansus', kade:'kadeneutral' }}, //
       {bg: 'hackerterm', speaker: '[player]', text: "Who is it?", sprites: { caspian: 'caspiansus', kade:'kadeneutral' }}, //
       {bg: 'hackerterm', speaker: 'Caspian', text: "An ex-partner. Someone I trusted with everything.", sprites: { caspian: 'caspiansus', kade:'kadeneutral' }}, //
       {bg: 'hackerterm', speaker: 'Caspian', text: "No. I know how it starts. I’m done letting people pull my strings.", sprites: { caspian: 'caspiansus', kade:'kadeneutral' }}, //
       {bg: 'hackerterm', speaker: '', text: "He looks at me—resolve clear in his expression.", sprites: { caspian: 'caspianneutral', kade:'kadeneutral' }}, //
       {bg: 'hackerterm', speaker: 'Caspian', text: "This time, I decide what matters.", sprites: { caspian: 'caspianhappy'}}, //
       {bg: 'loungenight', speaker: '', text: "Later, after it’s done, we all stand overlooking the city. Kade makes a joke I barely catch—but Caspian actually smiles.", sprites: { caspian: 'caspianhappy', kade:'kadehappy' }}, //
       {bg: 'loungenight', speaker: 'Kade', text: "Guess the suit’s got some fire in him after all.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'loungenight', speaker: 'Caspian', text: "Only when necessary.", sprites: { caspian: 'caspianneutral', kade:'kadehappy' }}, //
       {bg: 'loungenight', speaker: '', text: "He glances at me—softer, more open."}, //
       
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
           if (line.sprites.kade) {
               this.kade.setTexture(line.sprites.kade).setVisible(true);
           } else {
               this.kade.setVisible(false);
           }
       } else {
           this.caspian.setVisible(false);
           this.kade.setVisible(false);
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
       this.happyChoice = this.add.text(512, 350, 'I’m with you. Both of you.', {
           fontSize: '18px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'I just want this to end cleanly.', {
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
       this.happyChoice = this.add.text(512, 350, 'Then let’s take control back. Together.', {
           fontSize: '16px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'Then let’s be smart about this.', {
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
       localStorage.setItem('chapterUnlocked8', true);
       this.registry.set('caspianUnlocked8', true);
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