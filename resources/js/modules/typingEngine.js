import { state } from "./stateManager.js";
import { lettersContainer } from "./domElements.js";
import { showStatistics } from './statistics.js';

function isLetterCorrect(event) {
  return event.key === state.letters[state.currentLetter] ? true : false;
}

export function getKey(event) {
  let isCorrect;
  if (event.key === ' ') {
    event.preventDefault();
  }
  changeNextCharColor(state.currentNextLetterCol, state.currentNextSpaceCol);

  const rect = state.letterElements[state.currentLetter].getBoundingClientRect();
  const containerRect = lettersContainer.getBoundingClientRect();
  if (rect.bottom > containerRect.bottom - 20) {
    lettersContainer.scrollTop += rect.bottom - containerRect.bottom + 60;
  }

  if (isLetterCorrect(event)) {
    isCorrect = true;
    changeCorIncorCharColor(isCorrect, state.currentCorCharCol, state.currentCorCharCol);
    state.currentLetter++;
    state.correctChars++;
  } else {
    isCorrect = false;
    changeCorIncorCharColor(isCorrect, state.currentIncorCharCol, state.currentIncorCharCol);
    state.currentLetter++;
    state.incorrectChars++;
  }
  showStatistics();
}

export function changeLettersColor() {
  state.letterElements.forEach(letter => {
    letter.style.color = state.currentLetterColor;
  });
}

function changeCorIncorCharColor(isCorrect, letterColor, spaceColor) {
  if (isCorrect) {
    if (state.letters[state.currentLetter] === ' ') {
      state.letterElements[state.currentLetter].style.backgroundColor = spaceColor;
    } else {
      state.letterElements[state.currentLetter].style.color = letterColor;
    }
  } else {
    if (state.letters[state.currentLetter] === ' ') {
      state.letterElements[state.currentLetter].style.backgroundColor = spaceColor;
      state.missedSpaces++;
    } else {
      state.letterElements[state.currentLetter].style.color = letterColor;
    }
  }
}

function changeNextCharColor(letterColor, spaceColor) {
  try {
    if (state.letters[state.currentLetter + 1] === ' ') {
      state.letterElements[state.currentLetter + 1].style.backgroundColor = spaceColor;
    } else {
      state.letterElements[state.currentLetter + 1].style.color = letterColor;
    }
  } catch (e) {}
}