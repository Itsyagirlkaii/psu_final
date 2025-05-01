import BootScene from './scenes/Boot.js';
import PreloaderScene from './scenes/Preloader.js';
import TitleScene from './scenes/gamebasics/TitleScene.js';
import HomeScene from './scenes/gamebasics/HomeScene.js';
import ChooseStoryScene from './scenes/gamebasics/ChooseStoryScene.js';
import PrologueScene from './scenes/PrologueScene.js';
import PlayerNameScene from './scenes/gamebasics/PlayerNameScene.js';
import CreditScene from './scenes/gamebasics/CreditScene.js'; // Fixed import to match the scene name
import CaspianProfileScene from './scenes/Caspian/CaspianProfileScene.js';
import GalleryScene from './scenes/gamebasics/GalleryScene.js';
import CaspianGalleryScene from './scenes/Caspian/CaspianGalleryScene.js';
import ImageViewScene from './scenes/gamebasics/ImageViewScene.js';
import ChapterSelectScene from './scenes/gamebasics/ChapterSelectScene.js';// Added import for ChapterSelectScene
import CaspianChapter1 from './scenes/Caspian/CaspianChapter1.js'; // Added import for CaspianChapter1Scene
import SaveManager from './scenes/SaveManager.js';
import CaspianChapter2 from './scenes/Caspian/CaspianChapter2.js'; // Added import for CaspianChapter2Scene
import EndGameManager from './scenes/EndGameManager.js';
import CaspianChapter3 from './scenes/Caspian/CaspianChapter3.js'; // Added import for CaspianChapter3Scene
import CaspianChapter4 from './scenes/Caspian/CaspianChapter4.js'; // Added import for CaspianChapter4Scene
import CaspianChapter5 from './scenes/Caspian/CaspianChapter5.js'; // Added import for CaspianChapter5Scene
import CaspianChapter6 from './scenes/Caspian/CaspianChapter6.js'; // Added import for CaspianChapter6Scene
import CaspianChapter7 from './scenes/Caspian/CaspianChapter7.js'; // Added import for CaspianChapter7Scene
import CaspianChapter8 from './scenes/Caspian/CaspianChapter8.js'; // Added import for CaspianChapter8Scene
import CaspianChapter9 from './scenes/Caspian/CaspianChapter9.js'; // Added import for CaspianChapter9Scene


const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  scene: [
    BootScene,
    PreloaderScene,
    TitleScene,
    HomeScene,
    ChooseStoryScene,
    PrologueScene,
    PlayerNameScene,
    CreditScene, // Fixed reference to match the import
    CaspianProfileScene, // Added CaspianProfileScene
    CaspianGalleryScene, // Added CaspianGalleryScene
    GalleryScene, // Added GalleryScene
    ImageViewScene, // Added ImageViewScene
    ChapterSelectScene, // Added ChapterSelectScene
    CaspianChapter1, // Added CaspianChapter1Scene
    SaveManager, // Added SaveManager
    CaspianChapter2, // Added CaspianChapter2Scene
    EndGameManager, // Added EndGameManager
    CaspianChapter3, // Added CaspianChapter3Scene
    CaspianChapter4, // Added CaspianChapter4Scene
    CaspianChapter5, // Added CaspianChapter5Scene
    CaspianChapter6, // Added CaspianChapter6Scene
    CaspianChapter7, // Added CaspianChapter7Scene
    CaspianChapter8, // Added CaspianChapter8Scene
    CaspianChapter9, // Added CaspianChapter9Scene
  ], // Combine all scenes into a single array
  dom: {
    createContainer: true, // Enable DOM container
  },
  parent: 'game-container', // Optional: Attach to a specific container in your HTML
  backgroundColor: '#000000',
};

// Ensure the DOM element with id 'game-container' exists
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  if (!container) {
    console.error("Error: 'game-container' element not found in the DOM.");
    return; // Prevent further execution if the container is missing
  }

  // Initialize the Phaser game
  new Phaser.Game(config);
});