import { state } from './stateManager.js';
import { lettersContainer, accuracy, selectWordsButtons } from './domElements.js';
import { wordList } from './constants.js';
import { changeLettersColor } from './typingEngine.js';

export function generateText() {
  state.letterElements.forEach(letter => {
    lettersContainer.removeChild(letter);
  });
  state.text = '';
  state.letters = [];
  state.letterElements = [];
  lettersContainer.scrollTop = 0;
  state.currentLetter = 0;
  state.correctChars = 0;
  accuracy.style.display = 'none';

  for (let i = 0; i < state.amountOfWords; i++) {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    if (i === 0) {
      state.text += wordList[randomIndex];
    } else {
      state.text += ' ' + wordList[randomIndex];
    }
  }

  for (let i = 0; i < state.text.length; i++) {
    state.letters.push(state.text[i]);
  }

  state.letters.forEach(letter => {
    let newLetter = document.createElement('p');
    newLetter.innerHTML = letter;
    newLetter.className = 'letter';
    lettersContainer.appendChild(newLetter);
    state.letterElements.push(newLetter);
  });
  changeLettersColor();
}

function highlightWordCount(button){
  selectWordsButtons.forEach(b => {
    b.classList.remove('selected');
  });
  button.classList.add('selected');
}

selectWordsButtons.forEach(button => {
  button.addEventListener('click', event => {
    button.blur();
    state.selectedButton = button;
    button.classList.add('selected');
    state.amountOfWords = Number(event.target.innerText);
    highlightWordCount(state.selectedButton);
    generateText();
  });
});