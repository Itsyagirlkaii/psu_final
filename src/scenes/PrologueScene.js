export default class PrologueScene extends Phaser.Scene {
  constructor() {
    super('PrologueScene');
  }

  preload() {
    this.load.image('prologue1', 'assets/backgrounds/prologue/Prologue-scene1.png');
    this.load.image('prologue2', 'assets/backgrounds/prologue/Prologue-scene2.png');
    this.load.image('prologue3', 'assets/backgrounds/prologue/Prologue-scene3.png');
    this.load.image('prologue4', 'assets/backgrounds/prologue/Prologue-scene4.png');
    this.load.image('prologue5', 'assets/backgrounds/prologue/Prologue-scene5.png');
    this.load.image('prologue6', 'assets/backgrounds/prologue/Prologue-scene6.png');
    this.load.image('textBox', 'assets/ui/text-box.png');
    this.load.image('homeButton', 'assets/ui/homebutton.png');
    this.load.image('Caspian-neutral', 'assets/sprites/Caspian-neutral.png');
    this.load.image('Caspian-happy', 'assets/sprites/Caspian-happy.png');
    this.load.image('Kade-Happy', 'assets/sprites/Kade-Happy.png');
    this.load.image('Kade-neutral', 'assets/sprites/Kade-neutral.png');
  }

  create() {
    this.currentScene = parseInt(localStorage.getItem('prologueStep')) || 0;
    this.playerName = this.registry.get('playerName') || 'Player';
    this.previousBg = null;

    // Initialize the background
    this.background = this.add.image(512, 384, 'prologue1').setDepth(0);

    this.createUI();

    this.dialogues = [
      {bg: 'prologue1', speaker: '', text: "The shuttle touched down a few minutes ago, and I still haven’t caught my breath."},
      {bg: 'prologue1', speaker: '', text: "District One is everything I was told it would be - clean, polished, and towering like it’s trying too hard. Even the air feels expensive."},
      {bg: 'prologue1', speaker: '', text: "I tighten my grip on the event ID in my hand. It’s just a piece of holo paper, with a lanyard attached but it feels heavier than that. I worked so hard to get here, years of internships and career building. Now I’m here, alone, on a planet I never thought I’d step foot on in my dreams."},
      {bg: 'prologue2', speaker: '', text: "(I can’t believe I’m actually here!)"},
      {bg: 'prologue2', speaker: '', text: "The showcase pavilion is buzzing already. Sleek prototypes hum softly, shiny glass displays filled with microchips, and vendor booths sharing videos on screens. Everyone looks so at home."},
      {bg: 'prologue3', speaker: '', text: "I stop at a booth showcasing the latest surveillance AI. It’s…fine? Flashy, a little over the top."},
      {bg: 'prologue3', speaker: '', text: "(I don’t know what I’m supposed to be impressed with?)"},
      {bg: 'prologue3', speaker: '???', text: "That system wouldn’t stop a toddler with a screwdriver.", sprite: 'Kade-Happy'},
      {bg: 'prologue3', speaker: '???', text: "They always add glowing red eyes like it’s actually going to scare someone,", sprite: 'Kade-Happy' },
      {bg: 'prologue3', speaker: '???', text: "It’s basically a haunted Roomba.", sprite: 'Kade-Happy'},
      {bg: 'prologue3', speaker: '', text: "I laugh - like, actually laugh before I catch myself."},
      {bg: 'prologue3', speaker: '???', text: "Things deserve more protection than that system could provide,", sprite: 'Kade-neutral' },
      {bg: 'prologue3', speaker: '???', text: "I’ll see you around.", sprite: 'Kade-neutral'},
      {bg: 'prologue4', speaker: '', text: "Before I can respond, he gives me a lazy salute and disappears back into the crowd."},
      {bg: 'prologue4', speaker: '', text: "(Was that… flirting?)"},
      {bg: 'prologue4', speaker: '', text: "I round the corner, checking the blinking light on my device. Late. I’m late for this keynote. My hand’s halfway in my bag to grab my notepad when my watch strap catches on to something and -"},
      {bg: 'prologue4', speaker: '', text: "I crash into someone. Hard. A sturdy hand catches my arm."},
      {bg: 'prologue4', speaker: '???', text: "I suggest a touch more awareness.", sprite: 'Caspian-neutral'},
      {bg: 'prologue4', speaker: '', text: "As swiftly as he caught me, he’s gone. (That didn’t feel real.)"},
      {bg: 'prologue5', speaker: 'VOICE', text: "Thank you all for joining today! Please welcome our speakers!"},
      {bg: 'prologue5', speaker: '', text: "(I’m right on time!)"},
      {bg: 'prologue5', speaker: '', text: "I step into the auditorium, the lights dimming as I find a seat. The stage is lit up with a massive screen displaying the event logo."},
      {bg: 'prologue5', speaker: '', text: "The lights dim further, and a spotlight shines on the stage."},
      {bg: 'prologue5', speaker: 'VOICE', text: "Welcome to the Nivean Technology Showcase!"},
      {bg: 'prologue5', speaker: 'VOICE', text: "We are thrilled to have you here today."},
      {bg: 'prologue5', speaker: 'VOICE', text: "Today, we have two incredible speakers who will share their insights on the future of technology."},
      {bg: 'prologue5', speaker: 'VOICE', text: "Please welcome our first speaker, a visionary in the field of quantum computing."},
      {bg: 'prologue5', speaker: '', text: "The spotlight shines on a figure walking onto the stage."},
      {bg: 'prologue5', speaker: 'VOICE', text: "Caspian Grey, the Lead Tech Futurist for Echelon Quantum.", sprite: 'Caspian-neutral'},
      {bg: 'prologue5', speaker: '', text: "(What!? The man I just bumped into works for one of the largest tech companies in the world!)"},
      {bg: 'prologue5', speaker: 'VOICE', text: "Please welcome our second speaker, Kade Varyn, a Cyber Heist Specialist.", sprite: 'Kade-Happy' },
      {bg: 'prologue5', speaker: '', text: "(Him? I thought he was just here to see vendors?)"},
      {bg: 'prologue5', speaker: '', text: "With the end of the keynote podcast, the showcase ends in a blur of applause and holograms."},
      {bg: 'prologue6', speaker: '', text: "People are already filtering out. Umbrellas activating with a soft hiss as the rain begins to fall. I step outside into the open air, the cool drizzle dotting my shoulders almost instantly."},
      {bg: 'prologue6', speaker: '', text: "I reach for my communicator in my bag to request a taxi, but the network is jammed. Everyone is trying to leave at once. I walk to the curb, squinting at the rows of cyber cars zipping past."},
      {bg: 'prologue6', speaker: '', text: "Suddenly, I am elbowed, slipping. My heart jumps as I lose my balance. My arms flail, grabbing onto the nearest solid thing. Closing my eyes on instinct."},
      {bg: 'prologue6', speaker: '???', text: "Oh, well..."},
      {bg: 'prologue6', speaker: '', text: "I open my eyes to see…"}
    ];

    this.showScene(this.dialogues[this.currentScene]);

    // Flag to track if the click is on an interactive UI element
    this.isUIInteraction = false;

    this.input.on('pointerdown', (pointer) => {
      if (!this.isUIInteraction) {
        this.currentScene++;
        if (this.currentScene < this.dialogues.length) {
          localStorage.setItem('prologueStep', this.currentScene);
          this.showScene(this.dialogues[this.currentScene]);
        } else {
          localStorage.removeItem('prologueStep');
          this.scene.start('ChooseStoryScene');
        }
      }
      this.isUIInteraction = false; // Reset the flag after handling the click
    });
  }

  createUI() {
    // Home button
    this.add.image(60, 40, 'homeButton')
      .setInteractive()
      .setDepth(10)
      .setScale(1.0)
      .on('pointerdown', (pointer) => {
        this.isUIInteraction = true; // Set the flag to prevent advancing the scene
        pointer.event.stopPropagation();
        this.scene.start('HomeScene');
      });
  
    // Clear progress button
    const clearBtn = this.add.text(890, 750, 'Clear', {
      font: '18px Arial',
      fill: '#ff4c4c'
    }).setInteractive().setDepth(4);
  
    clearBtn.on('pointerdown', (pointer) => {
      this.isUIInteraction = true; // Set the flag to prevent advancing the scene
      pointer.event.stopPropagation();
      localStorage.removeItem('prologueStep');
      this.currentScene = 0;
      this.showScene(this.dialogues[this.currentScene]);
    });
  }

  showScene(sceneData) {
    const speakerName = sceneData.speaker === '[player]' ? this.playerName : sceneData.speaker;
  
    const cleanupOldScene = () => {
      if (this.nameText) this.nameText.destroy();
      if (this.dialogueText) this.dialogueText.destroy();
      if (this.characterImage) this.characterImage.destroy();
      if (this.textBox) this.textBox.destroy();
    };
  
    const renderNewScene = () => {
      // Character sprite
      if (sceneData.sprite) {
        this.characterImage = this.add.image(512, 400, sceneData.sprite).setDepth(1);
      }
  
      // Text box (semi-transparent, at the bottom)
      this.textBox = this.add.image(512, 700, 'textBox').setDepth(2).setAlpha(0.7);
  
      // Speaker name
      this.nameText = this.add.text(80, 600, speakerName, {
        font: '22px Arial',
        fill: '#ffffff',
        fontStyle: 'bold'
      }).setDepth(3);
  
      // Dialogue text
      this.dialogueText = this.add.text(80, 640, sceneData.text, {
        font: '20px Arial',
        fill: '#ffffff',
        wordWrap: { width: 860 }
      }).setDepth(3);
    };
  
    // Only fade if background is changing
    if (sceneData.bg !== this.lastBackground) {
      this.lastBackground = sceneData.bg;
      this.cameras.main.fadeOut(250, 0, 0, 0);
  
      this.time.delayedCall(250, () => {
        this.background.setTexture(sceneData.bg);
        cleanupOldScene();
        renderNewScene();
        this.cameras.main.fadeIn(250, 0, 0, 0);
      });
    } else {
      cleanupOldScene();
      renderNewScene();
    }
  }
}  
