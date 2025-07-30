import { getKey } from './typingEngine.js';
import { accuracy, stats } from './domElements.js';
import { state } from './stateManager.js';

export function showStatistics() {
  if (state.currentLetter === state.letters.length) {
    document.body.removeEventListener('keydown', getKey);
    accuracy.style.display = 'block';
    stats.style.display = 'block';
    accuracy.innerHTML = `Accuracy: ${Math.floor((state.correctChars * 100) / state.letters.length)}%`;
    stats.innerHTML = `${state.letters.length} / ${state.correctChars} / ${state.incorrectChars} / ${state.missedSpaces}`;
  }
}