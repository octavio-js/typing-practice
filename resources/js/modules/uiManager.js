import { state } from "./stateManager.js";
import { lettersContainer, accuracy, stats } from "./domElements.js";
import { getKey } from './typingEngine.js';
import { generateText } from './wordGenerator.js';

export function resetPage() {
  state.letterElements.forEach(letter => {
    lettersContainer.removeChild(letter);
  });
  state.text = '';
  state.letters = [];
  state.letterElements = [];
  state.currentLetter = 0;
  state.correctChars = 0;
  state.incorrectChars = 0;
  state.missedSpaces = 0;
  accuracy.style.display = 'none';
  stats.style.display = 'none';
  document.body.addEventListener('keydown', getKey);
  generateText();
}