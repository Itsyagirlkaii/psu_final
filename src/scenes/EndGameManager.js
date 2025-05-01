export default class EndGameManager {
    static saveChapterScore(chapter, score) {
      localStorage.setItem(`chapter${chapter}Score`, score);
    }
  
    static loadChapterScore(chapter) {
      return parseInt(localStorage.getItem(`chapter${chapter}Score`), 10) || 0;
    }
  
    static calculateEnding() {
      let totalScore = 0;
      let totalChapters = 9; // ✅ Update if you have more/less later
  
      for (let i = 1; i <= totalChapters; i++) {
        totalScore += this.loadChapterScore(i);
      }
  
      const averageScore = totalScore / totalChapters;
  
      // ✅ Define your ending thresholds
      if (averageScore >= 4) {
        return 'Happy Ending';
      } else if (averageScore >= 3) {
        return 'Good Ending';
      } else {
        return 'Neutral Ending';
      }
    }
  }