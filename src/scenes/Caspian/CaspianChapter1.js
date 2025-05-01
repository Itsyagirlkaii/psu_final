// FINAL CORRECTED VERSION: CaspianChapter1.js
import SaveManager from '../SaveManager.js';
import EndGameManager from '../EndGameManager.js';

export default class CaspianChapter1 extends Phaser.Scene {
   constructor() {
       super('Chapter1');
   }


   preload() {
       // Backgrounds
       this.load.image('prologue6', 'assets/backgrounds/prologue/Prologue-scene6.png');
       this.load.image('caspianscar', 'assets/backgrounds/caspian/Caspiancarscene.png');
       this.load.image('caspianaptoutside', 'assets/backgrounds/caspian/Caspianapartmentoutside.png');
       this.load.image('nighttime', 'assets/backgrounds/caspian/caspiannight.png');


       // CG
       this.load.image('caspianFull1', 'assets/cgs/caspian/caspianchapt1full.png');


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
       this.chapterNumber = 1;
       this.playerName = this.registry.get('playerName') || 'Player';


       this.bg = this.add.image(512, 384, 'prologue6').setOrigin(0.5);
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
       this.chapterScore = parseInt(localStorage.getItem('chapter1Score'), 10) || 0;
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
       {bg: 'prologue6', speaker: 'Caspian', text: "You really are committed to making a poor impression, aren’t you?", sprites: { caspian: 'caspianneutral' } }, //1
       {bg: 'prologue6', speaker: '', text: "Caspian’s voice is dry, but there is a flicker of something behind his eyes— amusement? Irritation? It’s hard to tell.", sprites: { caspian: 'caspianneutral' } },//2
       {bg: 'prologue6', speaker: '[player]', text: "Thank you for catching me. Again.", sprites: { caspian: 'caspianneutral' }}, //3
       {bg: 'prologue6', speaker: '', text: "The umbrella over our heads is shielding us from the worst of the rain, and I realize just how close we’re standing. He hasn’t let go of my waist yet.", sprites: { caspian: 'caspianneutral' }  }, //4
       {bg: 'prologue6', speaker: 'Caspian', text: "You shouldn’t make it a habit of crashing into people", sprites: { caspian: 'caspiansus' } }, //5
       {bg: 'prologue6', speaker: '', text: "He releases me, straightening his cuffs.", sprites: { caspian: 'caspianneutral' }  }, //6
       {bg: 'prologue6', speaker: '[player]', text: "Ah, yeah. I guess gravity and I aren’t on speaking terms today.", sprites: { caspian: 'caspianneutral' } }, //7
       {bg: 'prologue6', speaker: '', text: "A slight smirk trails at the edges of Caspians mouth.", sprites: { caspian: 'caspianhappy' }  }, //8
       {bg: 'prologue6', speaker: 'Caspian', text: "I suppose not.", sprites: { caspian: 'caspianhappy' }   }, //9
       {bg: 'prologue6', speaker: '', text: "I smile, looking at my device. Still jammed. I’ll miss my shuttle at this rate. I grimace.", sprites: { caspian: 'caspianneutral' } },//10
       {bg: 'prologue6', speaker: 'Caspian', text: "Where are you going?", sprites: { caspian: 'caspianneutral' }  }, //11
       {bg: 'prologue6', speaker: '[player]', text: "Ah… the shuttle base.", sprites: { caspian: 'caspianneutral' } }, //12
       {bg: 'prologue6', speaker: '', text: "Checking his watch his face contorts.", sprites: { caspian: 'caspiansus' }  }, //13
       {bg: 'prologue6', speaker: 'Caspian', text: "You won’t make it by last flight. Weather like this will ground shuttles for a few days at least. Do you have a back up plan?", sprites: { caspian: 'caspianneutral' }  }, //14
       {bg: 'prologue6', speaker: '', text: "(Oh, he’s right. I read that before coming. The weather on Nivean can be unpredictable.)"}, //15
       {bg: 'prologue6', speaker: '', text: "I look back at my communicator, frantically looking for places to stay the night." }, //16
       {bg: 'prologue6', speaker: 'Caspian', text: "Come. I have a spare room.", sprites: { caspian: 'caspianneutral' }  }, //17
       {bg: 'prologue6', speaker: '', text: "He turns towards a private car slowing at the curb. A tall man, stepping out to open the door.", sprites: { caspian: 'caspianneutral', sterling:'sterlinguninterested' }}, //18
       {bg: 'prologue6', speaker: '', text: "(Am I being invited?)" }, //19
       {bg: 'caspianscar', speaker: '', text: "The silence is overwhelming. Caspian scrolls through his tablet while the city blurs past the windows." },
       {bg: 'caspianscar', speaker: '', text: "(I can't believe I'm in this car right now. I don't even know this man.)" },
       {bg: 'caspianscar', speaker: '', text: "As I bite the side of my nail, I hear a quiet cough, jumping in my seat." },
       {bg: 'caspianscar', speaker: 'Caspian', text: "You're muttering to yourself. Loudly.", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: '[player]', text: "Oh, sorry. It's just.. I was supposed to be going home." },
       {bg: 'caspianscar', speaker: '', text: "Caspian adjusts in his seat, looking up from his tablet.", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: 'Caspian', text: "Understandable to be nervous. A city I'm assuming you've never been to, in a car with a man you've met once.", sprites: { caspian: 'caspianneutral' } },
       {bg: 'caspianscar', speaker: '[player]', text: "Haha, yeah. Not too great on a judgment call." },
       {bg: 'caspianscar', speaker: '', text: "A slight smirk trails on the edge of Caspians mouth.", sprites: { caspian: 'caspianhappy' }   },
       {bg: 'caspianscar', speaker: 'Caspian', text: "What brought you to the Showcase today?", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: '[player]', text: "Oh, I uh, I was looking at companies, and applying at booths today.", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: 'Caspian', text: "Good use of a convention, put a face to the resume.", sprites: { caspian: 'caspianhappy' }   },
       {bg: 'caspianscar', speaker: 'Caspian', text: "What are your skills? Do you have a resume on you?", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: '', text: "I shuffle into my bag, pulling out a folder, before handing him a copy." },
       {bg: 'caspianscar', speaker: 'Caspian', text: "You laughed earlier. He says suddenly, while inspecting my resume. At the booth.", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: '', text: "He’s not looking at me, but I know he’s listening." },
       {bg: 'caspianscar', speaker: 'Caspian', text: "I assume it wasn’t the product you found amusing", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: '[player]', text: "It was just an unexpected conversation… kind of endearing", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: 'Caspian', text: "Kade can be endearing.", sprites: { caspian: 'caspianneutral' }  },
       {bg: 'caspianscar', speaker: '', text: "I look at him, surprised." },
       {bg: 'caspianscar', speaker: '[player]', text: "You know him?" },
       {bg: 'caspianscar', speaker: '', text: "A soft smile creeped up on his face.", sprites: { caspian: 'caspianhappy' }   },
       {bg: 'caspianscar', speaker: 'Caspian', text: "Of course, we went to school together.", sprites: { caspian: 'caspianhappy' }   },
       {bg: 'caspianscar', speaker: 'Caspian', text: "He’s always been the outgoing one.", sprites: { caspian: 'caspianhappy' }   },
       {bg: 'caspianscar', speaker: '', text: "(That explains how they seemed so at ease on stage together)" },
       {bg: 'caspianscar', speaker: '', text: "As the car slows, my eyes fix on a glistening apartment building. I can't help but stare in awe." },
       {bg: 'caspianscar', speaker: '', text: "As he steps out, he turns to me, offering his hand out of the back seat." },
       {bg: 'caspianaptoutside', speaker: '???', text: "This way, miss.", sprites: {sterling:'sterlingneutral' } },
       {bg: 'caspianaptoutside', speaker: '', text: "It's the man from earlier..", sprites: {sterling:'sterlingneutral' } },
       {bg: 'caspianaptoutside', speaker: '', text: "His eyes steeled, his presence formidable.", sprites: {sterling:'sterlingneutral' } },
       {bg: 'caspianaptoutside', speaker: 'Caspian', text: "Always the charmer, Sterling." , sprites: { caspian: 'caspianhappy', sterling:'sterlingneutral' }},
       {bg: 'caspianaptoutside', speaker: 'Sterling', text: "Just my duty to be hospitable.", sprites: {sterling:'sterlingneutral' } },
       {bg: 'caspianaptoutside', speaker: '', text: "His eyes landing on me. I furrow my brows, offended. As I go to respond, Caspian ushers me inside.", sprites: {sterling:'sterlinguninterested' } },
       {bg: 'nighttime', speaker: '', text: "Inside a sprawling apartment filled with low lights, rain softly hitting the windows. This place is immaculate, and embodies Caspian in every way." },
       {bg: 'nighttime', speaker: '', text: "I look around, taking in the open space, the sleek furniture, and the soft glow of the lights." },
       {bg: 'nighttime', speaker: '', text: "Caspian sprawls on the couch, leaning back, closing his eyes.", sprites: { caspian: 'caspianneutral' } },
       {bg: 'nighttime', speaker: 'Caspian', text: "Make yourself comfortable. Sterling can assist you to your room.", sprites: { caspian: 'caspianneutral' } },
       {bg: 'nighttime', speaker: '', text: "I nod, grateful for the hospitality." },
       {bg: 'nighttime', speaker: '', text: "As I am ushered to the guest room, I take a moment to appreciate the view outside the window." },
       {bg: 'nighttime', speaker: '', text: "The rain has stopped, and the city lights twinkle in the distance." },
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


   if (this.currentDialogueIndex === 19) {
       this.currentQuestion = 1;
       this.showQuestion1();
   } else if (this.currentDialogueIndex === 46) {  // <<< AFTER 47 shows normally
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
  
       this.choiceTitle = this.add.text(512, 250, 'Choose your response:', {
           fontSize: '32px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5);
  
       this.happyBox = this.add.image(512, 350, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.happyChoice = this.add.text(512, 350, 'Thank you. I appreciate it.', {
           fontSize: '24px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'I’ll manage on my own, but thanks.', {
           fontSize: '19px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.happyChoice.on('pointerup', () => {
           this.chapterScore += 2;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 20; // move forward
           this.cleanupChoices();
           this.advanceDialogue();
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false; // FIX
           this.currentDialogueIndex = 20; // move forward
           this.cleanupChoices();
           this.advanceDialogue();
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
       this.happyChoice = this.add.text(512, 350, 'Take his hand.', {
           fontSize: '24px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.neutralBox = this.add.image(512, 450, 'choicebox').setOrigin(0.5).setScale(0.6);
       this.neutralChoice = this.add.text(512, 450, 'Get out of the car on your own.', {
           fontSize: '19px',
           color: '#ffffff',
           fontFamily: 'Arial'
       }).setOrigin(0.5).setInteractive();
  
       this.happyChoice.on('pointerup', () => {
           this.chapterScore += 2;
           this.inChoice = false;
           this.cleanupChoices();
           if (this.chapterScore === 4) {
               this.showCGUnlockMessage(() => {
                   this.currentDialogueIndex = 47; // "offering his hand"
                   this.showDialogue();
               });
           } else {
               this.currentDialogueIndex = 47;
               this.showDialogue();
           }
       });
  
       this.neutralChoice.on('pointerup', () => {
           this.chapterScore += 1;
           this.inChoice = false;
           this.cleanupChoices();
           this.currentDialogueIndex = 47;
           this.showDialogue();
       });
   }


   unlockCG() {
        this.registry.set('caspianUnlocked1', true);
        localStorage.setItem('caspianUnlocked1', 'true');
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