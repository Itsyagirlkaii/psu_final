export default class SaveManager {
    static saveProgress(chapter, dialogueIndex, score) {
        const saveData = {
            chapter,
            dialogueIndex,
            score
        };
        localStorage.setItem('niveanSave', JSON.stringify(saveData));
    }

    static loadProgress() {
        const data = localStorage.getItem('niveanSave');
        if (data) {
            return JSON.parse(data);
        }
        return { chapter: null, dialogueIndex: null, score: null };
    }

    static clearProgress() {
        localStorage.removeItem('niveanSave');
    }
}