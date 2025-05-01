export default class CaspianChapter1 extends Phaser.Scene {
  constructor() {
    super('Chapter1');
  }

  preload() {
    // Backgrounds
    this.load.image('prologuescene6', 'assets/backgrounds/prologue/prologue-scene6.png');
    this.load.image('caspianscar', 'assets/backgrounds/caspian/caspianscar.png');
    this.load.image('caspianaptoutside', 'assets/backgrounds/caspian/caspianaptoutside.png');
    this.load.image('nighttime', 'assets/backgrounds/caspian/nighttime.png');

    // CG
    this.load.image('chapter1cg', 'assets/cg/chapter1cg.png');

    // Sprites
    this.load.image('caspianneutral', 'assets/sprites/Caspian-neutral.png');
    this.load.image('caspianhappy', 'assets/sprites/Caspian-happy.png');
    this.load.image('caspiansus', 'assets/sprites/Caspian-sus.png');
    this.load.image('sterlingneutral', 'assets/sprites/Sterling-neutral.png');
    this.load.image('sterlinguninterested', 'assets/sprites/Sterling-uninterested.png');

    // UI
    this.load.image('textbox', 'assets/ui/text-box.png');
    this.load.image('choicebox', 'assets/ui/Choices.png');
    this.load.image('homeButton', 'assets/ui/homebutton.png');
  }

  create() {
    this.bg = this.add.image(512, 384, 'prologuescene6').setOrigin(0.5);
    this.darkOverlay = this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.5).setVisible(false);

    this.caspian = this.add.image(300, 400, 'caspianneutral').setOrigin(0.5).setScale(0.6).setVisible(false);
    this.sterling = this.add.image(700, 400, 'sterlingneutral').setOrigin(0.5).setScale(0.6).setVisible(false);

    this.textbox = this.add.image(512, 650, 'textbox').setOrigin(0.5).setScale(1.5);

    this.nameText = this.add.text(80, 600, '', { font: '22px Arial', fill: '#ffffff', fontStyle: 'bold' }).setDepth(3);
    this.dialogueText = this.add.text(80, 640, '', { font: '20px Arial', fill: '#ffffff', wordWrap: { width: 860 } }).setDepth(3);

    // Home Button
    const homeButton = this.add.image(50, 50, 'homeButton').setOrigin(0.5).setScale(0.5).setInteractive();
    homeButton.on('pointerup', () => { this.scene.start('HomeScene'); });
    homeButton.on('pointerover', () => homeButton.setScale(0.55));
    homeButton.on('pointerout', () => homeButton.setScale(0.5));

    // Save Button
    const saveButton = this.add.text(850, 30, 'Save', { fontFamily: 'Arial', fontSize: '24px', color: '#00ff00' }).setInteractive();
    saveButton.on('pointerup', () => {
      localStorage.setItem('chapter1CurrentDialogue', this.currentDialogueIndex);
      localStorage.setItem('chapter1Score', this.chapterScore);
      alert('Progress Saved!');
    });

    this.storyDialogue = [
      {bg: 'prologuescene6', speaker: 'Caspian', text: "You really are committed to making a poor impression, aren’t you?", sprites: { caspian: 'caspianneutral' } },
        {bg: 'prologuescene6', speaker: '[player]', text: "Caspian’s voice is dry, but there is a flicker of something behind his eyes— amusement? Irritation? It’s hard to tell.", sprites: { caspian: 'caspianneutral' } },
        {bg: 'prologuescene6', speaker: '[player]', text: "Thank you for catching me. Again.", sprite: 'caspianneutral' },
        {bg: 'prologuescene6', speaker: '[player]', text: "The umbrella over our heads is shielding us from the worst of the rain, and I realize just how close we’re standing. He hasn’t let go of my waist yet.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'prologuescene6', speaker: 'Caspian', text: "You shouldn’t make it a habit of crashing into people", sprites: { caspian: 'caspiansus' } },
        {bg: 'prologuescene6', speaker: '[player]', text: "He releases me, straightening his cuffs.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'prologuescene6', speaker: '[player]', text: "Ah, yeah. I guess gravity and I aren’t on speaking terms today.", sprites: { caspian: 'caspianneutral' } },
        {bg: 'prologuescene6', speaker: '[player]', text: "A slight smirk trails at the edges of Caspians mouth.", sprites: { caspian: 'caspianhappy' }  },
        {bg: 'prologuescene6', speaker: 'Caspian', text: "I suppose not.", sprites: { caspian: 'caspianhappy' }   },
        {bg: 'prologuescene6', speaker: '[player]', text: "I smile, looking at my device. Still jammed. I’ll miss my shuttle at this rate. I grimace.", sprites: { caspian: 'caspianneutral' } },
        {bg: 'prologuescene6', speaker: 'Caspian', text: "Where are you going?", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'prologuescene6', speaker: '[player]', text: "Ah… the shuttle base.", sprites: { caspian: 'caspianneutral' } },
        {bg: 'prologuescene6', speaker: '[player]', text: "Checking his watch his face contorts.", sprites: { caspian: 'caspiansus' }  },
        {bg: 'prologuescene6', speaker: 'Caspian', text: "You won’t make it by last flight. Weather like this will ground shuttles for a few days at least. Do you have a back up plan?", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'prologuescene6', speaker: '[player]', text: "(Oh, he’s right. I read that before coming. The weather on Nivean can be unpredictable.)"},
        {bg: 'prologuescene6', speaker: '[player]', text: "I look back at my communicator, frantically looking for places to stay the night." },
        {bg: 'prologuescene6', speaker: 'Caspian', text: "Come. I have a spare room.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'prologuescene6', speaker: '[player]', text: "He turns towards a private car slowing at the curb. A tall man, stepping out to open the door.", sprites: { caspian: 'caspianneutral', sterling:'sterlinguninterested' }},
        {bg: 'prologuescene6', speaker: '[player]', text: "(Am I being invited?)" },
        // After Question 1
        {bg: 'caspianscar', speaker: '[player]', text: "The silence is overwhelming. Caspian scrolls through his tablet while the city blurs past the windows." },
        {bg: 'caspianscar', speaker: '[player]', text: "(I can't believe I'm in this car right now. I don't even know this man.)" },
        {bg: 'caspianscar', speaker: '[player]', text: "As I bite the side of my nail, I hear a quiet cough, jumping in my seat." },
        {bg: 'caspianscar', speaker: 'Caspian', text: "You're muttering to yourself. Loudly.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: '[player]', text: "Oh, sorry. It's just.. I was supposed to be going home." },
        {bg: 'caspianscar', speaker: '[player]', text: "Caspian adjusts in his seat, looking up from his tablet.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: 'Caspian', text: "Understandable to be nervous. A city I'm assuming you've never been to, in a car with a man you've met once.", sprites: { caspian: 'caspianneutral' } },
        {bg: 'caspianscar', speaker: '[player]', text: "Haha, yeah. Not too great on a judgment call." },
        {bg: 'caspianscar', speaker: '[player]', text: "A slight smirk trails on the edge of Caspians mouth.", sprites: { caspian: 'caspianhappy' }   },
        {bg: 'caspianscar', speaker: 'Caspian', text: "What brought you to the Showcase today?", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: '[player]', text: "Oh, I uh, I was looking at companies, and applying at booths today.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: 'Caspian', text: "Good use of a convention, put a face to the resume.", sprites: { caspian: 'caspianhappy' }   },
        {bg: 'caspianscar', speaker: 'Caspian', text: "What are your skills? Do you have a resume on you?", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: '[player]', text: "I shuffle into my bag, pulling out a folder, before handing him a copy." },
        {bg: 'caspianscar', speaker: 'Caspian', text: "You laughed earlier. He says suddenly, while inspecting my resume. At the booth.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: '[player]', text: "He’s not looking at me, but I know he’s listening." },
        {bg: 'caspianscar', speaker: 'Caspian', text: "I assume it wasn’t the product you found amusing", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: '[player]', text: "It was just an unexpected conversation… kind of endearing", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: 'Caspian', text: "Kade can be endearing.", sprites: { caspian: 'caspianneutral' }  },
        {bg: 'caspianscar', speaker: '[player]', text: "I look at him, surprised." },
        {bg: 'caspianscar', speaker: '[player]', text: "You know him?" },
        {bg: 'caspianscar', speaker: '[player]', text: "A soft smile creeped up on his face.", sprites: { caspian: 'caspianhappy' }   },
        {bg: 'caspianscar', speaker: 'Caspian', text: "Of course, we went to school together.", sprites: { caspian: 'caspianhappy' }   },
        {bg: 'caspianscar', speaker: 'Caspian', text: "He’s always been the outgoing one.", sprites: { caspian: 'caspianhappy' }   },
        {bg: 'caspianscar', speaker: '[player]', text: "(That explains how they seemed so at ease on stage together)" },
        {bg: 'caspianscar', speaker: '[player]', text: "As the car slows, my eyes fix on a glistening apartment building. I can't help but stare in awe." },
        {bg: 'caspianscar', speaker: 'Caspian', text: "Right, we're here." },
        {bg: 'caspianscar', speaker: '[player]', text: "As he steps out, he turns to me, offering his hand out of the back seat." },
        // After Question 2
        {bg: 'caspianaptoutside', speaker: '???', text: "This way, miss.", sprites: {sterling:'sterlingneutral' } },
        {bg: 'caspianaptoutside', speaker: '[player]', text: "It's the man from earlier.." },
        {bg: 'caspianaptoutside', speaker: '[player]', text: "His eyes steeled, his presence formidable." },
        {bg: 'caspianaptoutside', speaker: 'Caspian', text: "Always the charmer, Sterling." , sprites: { caspian: 'caspianhappy', sterling:'sterlingneutral' }},
        {bg: 'caspianaptoutside', speaker: 'Sterling', text: "Just my duty to be hospitable.", sprites: {sterling:'sterlingneutral' } },
        {bg: 'caspianaptoutside', speaker: '[player]', text: "His eyes landing on me. I furrow my brows, offended. As I go to respond, Caspian ushers me inside.", sprites: {sterling:'sterlinguninterested' } },
        {bg: 'nighttime', speaker: '[player]', text: "Inside a sprawling apartment filled with low lights, rain softly hitting the windows. This place is immaculate, and embodies Caspian in every way." },
        {bg: 'nighttime', speaker: '[player]', text: "I look around, taking in the open space, the sleek furniture, and the soft glow of the lights." },
        {bg: 'nighttime', speaker: '[player]', text: "Caspian sprawls on the couch, leaning back, closing his eyes.", sprites: { caspian: 'caspianneutral' } },
        {bg: 'nighttime', speaker: 'Caspian', text: "Make yourself comfortable. Sterling can assist you to your room.", sprites: { caspian: 'caspianneutral' } },
        {bg: 'nighttime', speaker: '[player]', text: "I nod, grateful for the hospitality." },
        {bg: 'nighttime', speaker: '[player]', text: "As I am ushered to the guest room, I take a moment to appreciate the view outside the window." },
        {bg: 'nighttime', speaker: '[player]', text: "The rain has stopped, and the city lights twinkle in the distance." },
    ];

    // Allow click to progress dialogue
      this.input.on('pointerup', this.advanceDialogue, this);
  
      // Load saved progress if exists
      const savedProgress = parseInt(localStorage.getItem(`chapter${this.chapterNumber}CurrentQuestion`), 10);
      if (savedProgress) {
        this.currentQuestion = savedProgress;
        this.chapterScore = parseInt(localStorage.getItem(`chapter${this.chapterNumber}Score`), 10) || 0;
        if (this.currentQuestion === 1) this.showQuestion1();
        else if (this.currentQuestion === 3) this.showQuestion2();
      } else {
        this.showDialogue();
      }
    }
  
    advanceDialogue() {
      if (this.inChoice) return; // Don’t advance dialogue if choice is active!
  
      this.currentDialogueIndex++;
  
      if (this.currentDialogueIndex === 3) {
        this.currentQuestion = 1;
        this.showQuestion1();
      } else if (this.currentDialogueIndex === 6) {
        this.currentQuestion = 3;
        this.showQuestion2();
      } else if (this.currentDialogueIndex >= this.storyDialogue.length) {
        this.finishChapter();
      } else {
        this.showDialogue();
      }
    }
  
    showDialogue() {
      const line = this.storyDialogue[this.currentDialogueIndex];
      if (!line) return;
  
      this.caspian.setVisible(line.speaker === 'caspian');
      this.assistant.setVisible(line.speaker === 'assistant');
      this.dialogueText.setText(line.text);
    }
  
    showQuestion1() {
      this.inChoice = true;
      this.dialogueText.setText('Choose your approach:');
  
      const happyChoice = this.add.text(200, 500, 'Thank you. I appreciate it.', { fontSize: '24px', color: '#ffffff' }).setInteractive();
      const neutralChoice = this.add.text(500, 500, 'I’ll manage on my own, but thanks', { fontSize: '24px', color: '#ffffff' }).setInteractive();
  
      happyChoice.on('pointerup', () => this.handleChoice(2));
      neutralChoice.on('pointerup', () => this.handleChoice(1));
    }
  
    showQuestion2() {
      this.inChoice = true;
      this.dialogueText.setText('Choose your next action:');
  
      const happyChoice = this.add.text(200, 500, 'Take his hand.', { fontSize: '24px', color: '#ffffff' }).setInteractive();
      const neutralChoice = this.add.text(500, 500, 'Get out of car on your own.', { fontSize: '24px', color: '#ffffff' }).setInteractive();
  
      happyChoice.on('pointerup', () => this.handleChoice(2, true));
      neutralChoice.on('pointerup', () => this.handleChoice(1, false));
    }
  
    handleChoice(score, unlockCG = false) {
      this.inChoice = false;
      this.chapterScore += score;
  
      if (this.currentQuestion === 1) {
        this.currentDialogueIndex++; // Move story forward
        localStorage.setItem(`chapter${this.chapterNumber}CurrentQuestion`, this.currentQuestion + 1);
        localStorage.setItem(`chapter${this.chapterNumber}Score`, this.chapterScore);
  
        this.clearChoices();
        this.showDialogue();
      } else {
        if (unlockCG) {
          this.unlockSpecialArtwork();
        }
        localStorage.setItem(`chapter${this.chapterNumber}Score`, this.chapterScore);
        localStorage.removeItem(`chapter${this.chapterNumber}CurrentQuestion`);
        this.clearChoices();
        this.currentDialogueIndex++;
        this.showDialogue();
      }
    }
  
    unlockSpecialArtwork() {
      const cg = this.add.image(512, 384, `chapter${this.chapterNumber}cg`).setScale(0.9);
      this.time.delayedCall(2000, () => {
        cg.destroy();
      });
    }
  
    clearChoices() {
      this.children.getAll().forEach(child => {
        if (child.input && child !== this.textbox && child !== this.dialogueText) {
          child.destroy();
        }
      });
    }
  
    finishChapter() {
      const previousMax = parseInt(localStorage.getItem('highestCleared'), 10) || 0;
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