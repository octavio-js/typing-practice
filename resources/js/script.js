let text = '';
let letters = [];
let letterElements = [];
let currentLetter = 0;
let correctChars = 0;
let incorrectChars = 0;
let missedSpaces = 0;
let amountOfWords = 30;

const lettersContainer = document.querySelector('#letters-container');
const accuracy = document.querySelector('#accuracy');
const stats = document.querySelector('#stats');
const resetButton = document.querySelector('#reset');
const selectWordsButtons = document.querySelectorAll('.word-choice');

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('keyzen-theme');
  if (savedTheme && themes[savedTheme]) {
    applyTheme(savedTheme);
  }
  generateText();
});

// Letter validation
let currentLetterColor = '#2e3440';
let currentCorCharCol = '#3fa796';
let currentIncorCharCol = '#d47fa6';
let currentNextLetterCol = '#f0a202';
let currentNextSpaceCol = '#c2b8a3';

function isLetterCorrect(event) {
  return event.key === letters[currentLetter] ? true : false;
}

function changeLettersColor() {
  letterElements.forEach(letter => {
    letter.style.color = currentLetterColor;
  });
}

function changeCorIncorCharColor(isCorrect, letterColor, spaceColor) {
  if (isCorrect) {
    if (letters[currentLetter] === ' ') {
      letterElements[currentLetter].style.backgroundColor = spaceColor;
    } else {
      letterElements[currentLetter].style.color = letterColor;
    }
  } else {
    if (letters[currentLetter] === ' ') {
      letterElements[currentLetter].style.backgroundColor = spaceColor;
      missedSpaces++;
    } else {
      letterElements[currentLetter].style.color = letterColor;
    }
  }
}

function changeNextCharColor(letterColor, spaceColor) {
  try {
    if (letters[currentLetter + 1] === ' ') {
      letterElements[currentLetter + 1].style.backgroundColor = spaceColor;
    } else {
      letterElements[currentLetter + 1].style.color = letterColor;
    }
  } catch (e) { }
}

function getKey(event) {
  let isCorrect;

  if (event.key === ' ') {
    event.preventDefault();
  }

  changeNextCharColor(currentNextLetterCol, currentNextSpaceCol);

  const rect = letterElements[currentLetter].getBoundingClientRect();
  const containerRect = lettersContainer.getBoundingClientRect();
  if (rect.bottom > containerRect.bottom - 20) {
    lettersContainer.scrollTop += rect.bottom - containerRect.bottom + 60;
  }

  if (isLetterCorrect(event)) {
    isCorrect = true;
    changeCorIncorCharColor(isCorrect, currentCorCharCol, currentCorCharCol);
    currentLetter++;
    correctChars++;
  } else {
    isCorrect = false;
    changeCorIncorCharColor(isCorrect, currentIncorCharCol, currentIncorCharCol);
    currentLetter++;
    incorrectChars++;
  }

  showStatistics();
}

document.body.addEventListener('keydown', getKey);
document.body.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    resetPage();
  }
});

// Show statistics
function showStatistics() {
  if (currentLetter === letters.length) {
    document.body.removeEventListener('keydown', getKey);
    accuracy.style.display = 'block';
    stats.style.display = 'block';
    accuracy.innerHTML = `Accuracy: ${Math.floor((correctChars * 100) / letters.length)}%`;
    stats.innerHTML = `${letters.length} / ${correctChars} / ${incorrectChars} / ${missedSpaces}`;
  }
}

// Reset Button
resetButton.addEventListener('click', resetPage);

function resetPage() {
  letterElements.forEach(letter => {
    lettersContainer.removeChild(letter);
  });
  text = '';
  letters = [];
  letterElements = [];
  currentLetter = 0;
  correctChars = 0;
  incorrectChars = 0;
  missedSpaces = 0;
  accuracy.style.display = 'none';
  stats.style.display = 'none';
  document.body.addEventListener('keydown', getKey);
  generateText();
}

// Generate Text
function generateText() {
  letterElements.forEach(letter => {
    lettersContainer.removeChild(letter);
  });
  text = '';
  letters = [];
  letterElements = [];
  currentLetter = 0;
  correctChars = 0;
  accuracy.style.display = 'none';
  fetch('resources/json/randomWords.json')
    .then(res => res.json())
    .then(words => {
      for (let i = 0; i < amountOfWords; i++) {
        let randomIndex = Math.floor(Math.random() * words.length);
        if (i === 0) {
          text += words[randomIndex];
        } else {
          text += ' ' + words[randomIndex];
        }
      }

      for (let i = 0; i < text.length; i++) {
        letters.push(text[i]);
      }

      letters.forEach(letter => {
        let newLetter = document.createElement('p');
        newLetter.innerHTML = letter;
        newLetter.className = 'letter';
        lettersContainer.appendChild(newLetter);
        letterElements.push(newLetter);
      });
      changeLettersColor();
    });
}

// Select amount of words
let selectedButton;

selectWordsButtons.forEach(button => {
  button.addEventListener('click', event => {
    button.blur();
    selectedButton = button;
    button.classList.add('selected');
    amountOfWords = Number(event.target.innerText);
    highlightWordCount(selectedButton);
    generateText();
  });
});

// Highlight current word count
function highlightWordCount(button){
  selectWordsButtons.forEach(b => {
    b.classList.remove('selected');
  });
  button.classList.add('selected');
}

// Themes
const changeThemeDiv = document.querySelector('#change-theme');
const lightModeDiv = document.querySelector('#light-mode');
const darkModeDiv = document.querySelector('#dark-mode');
const lightThemes = document.querySelector('.light-themes');
const darkThemes = document.querySelector('.dark-themes');
const themeChoices = document.querySelectorAll('.theme-choice');
let areThemesOpen = false;
let areLightThemesOpen = false;
let areDarkThemesOpen = false;

const themes = {
  // Light Themes
  'soft-focus': {
    background: '#dfe6e6',
    typingBackground: '#e4f1ef',
    text: '#2e3440',
    borders: '#b0c4c4',
    defaultLetters: '#2e3440',
    correctLetter: '#3fa796',
    incorrectLetter: '#d47fa6',
    nextLetter: '#f0a202',
    spaces: '#c2b8a3',
    hover: '#8abbb3',
    clickedButtonBg: '#a8d4cc',
    clickedButtonText: '#20302e',
    isThemeLight: true
  },
  'sunrise-grove': {
    background: '#fff9f0',
    typingBackground: '#fffdf8',
    text: '#3a3d27',
    borders: '#cec1aa',
    defaultLetters: '#3a3d27',
    correctLetter: '#5caa72',
    incorrectLetter: '#e05d5d',
    nextLetter: '#d4a600',
    spaces: '#ffc46c',
    hover: '#bca86d',
    clickedButtonBg: '#f3c96b',
    clickedButtonText: '#3a2c00',
    isThemeLight: true
  },
  'crystal-lake': {
    background: '#e3f7f6',
    typingBackground: '#f4fcfc',
    text: '#284248',
    borders: '#b0dad7',
    defaultLetters: '#284248',
    correctLetter: '#34bfa1',
    incorrectLetter: '#f2778a',
    nextLetter: '#ffa15f',
    spaces: '#f8c97a',
    hover: '#7abfae',
    clickedButtonBg: '#91e0d3',
    clickedButtonText: '#18403a',
    isThemeLight: true
  },
  'lavender-bloom': {
    background: '#f8f4fa',
    typingBackground: '#fefbff',
    text: '#3e3b4f',
    borders: '#d3c0dc',
    defaultLetters: '#3e3b4f',
    correctLetter: '#84d3b1',
    incorrectLetter: '#eb799a',
    nextLetter: '#c99be0',
    spaces: '#cba1db',
    hover: '#c49fcf',
    clickedButtonBg: '#d4a6e8',
    clickedButtonText: '#3e2a4f',
    isThemeLight: true
  },
  'zen-dunes': {
    background: '#f9f5eb',
    typingBackground: '#fefbf3',
    text: '#3a382f',
    borders: '#dcd1ba',
    defaultLetters: '#3a382f',
    correctLetter: '#71b67a',
    incorrectLetter: '#d8654f',
    nextLetter: '#b08e33',
    spaces: '#f7b56d',
    hover: '#b7a179',
    clickedButtonBg: '#d8ae64',
    clickedButtonText: '#3a2f17',
    isThemeLight: true
  },
  // Dark Themes
  'night-lotus': {
    background: '#1c1b2a',
    typingBackground: '#242233',
    text: '#dde1eb',
    borders: '#3a3752',
    defaultLetters: '#dde1eb',
    correctLetter: '#70d1b4',
    incorrectLetter: '#f0758a',
    nextLetter: '#ffd447',
    spaces: '#f8a45d',
    hover: '#67a49f',
    clickedButtonBg: '#413c5e',
    clickedButtonText: '#eae6ff',
    isThemeLight: false
  },
  'shadow-fern': {
    background: '#1f2a23',
    typingBackground: '#26322c',
    text: '#d6e7db',
    borders: '#395145',
    defaultLetters: '#d6e7db',
    correctLetter: '#8ddcaa',
    incorrectLetter: '#e27979',
    nextLetter: '#ced44c',
    spaces: '#f8bb60',
    hover: '#7aa48c',
    clickedButtonBg: '#4e6f5b',
    clickedButtonText: '#e7fbee',
    isThemeLight: false
  },
  'muted-tides': {
    background: '#1d2326',
    typingBackground: '#282e31',
    text: '#d0dce6',
    borders: '#41545a',
    defaultLetters: '#d0dce6',
    correctLetter: '#7fc0e3',
    incorrectLetter: '#dd7790',
    nextLetter: '#ffd661',
    spaces: '#ffc37e',
    hover: '#7ea8be',
    clickedButtonBg: '#506a78',
    clickedButtonText: '#e6f5ff',
    isThemeLight: false
  },
  'charcoal-tea': {
    background: '#1c1a17',
    typingBackground: '#26231f',
    text: '#f3eee7',
    borders: '#3f3c37',
    defaultLetters: '#f3eee7',
    correctLetter: '#98d4a2',
    incorrectLetter: '#e37c66',
    nextLetter: '#e9c04a',
    spaces: '#f3a35f',
    hover: '#a2ae95',
    clickedButtonBg: '#665c4a',
    clickedButtonText: '#fff7e9',
    isThemeLight: false
  },
  'velvet-dusk': {
    background: '#221e29',
    typingBackground: '#2b2734',
    text: '#f2eff7',
    borders: '#4c4656',
    defaultLetters: '#f2eff7',
    correctLetter: '#a3bce3',
    incorrectLetter: '#df6e93',
    nextLetter: '#ffcc4d',
    spaces: '#f8a97c',
    hover: '#c3a9d6',
    clickedButtonBg: '#6f5c82',
    clickedButtonText: '#fbeaff',
    isThemeLight: false
  }
}

function applyTheme(themeId) {
  const theme = themes[themeId];
  let isLight = theme.isThemeLight;

  localStorage.setItem('keyzen-theme', themeId);

  changeIcon(isLight);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--container-background', theme.typingBackground);
  document.documentElement.style.setProperty('--text-color', theme.text);
  document.documentElement.style.setProperty('--border-color', theme.borders);
  document.documentElement.style.setProperty('--letters-color', theme.defaultLetters);
  currentLetterColor = theme.defaultLetters;
  currentCorCharCol = theme.correctLetter;
  currentIncorCharCol = theme.incorrectLetter;
  currentNextLetterCol = theme.nextLetter;
  currentNextSpaceCol = theme.spaces;
  document.documentElement.style.setProperty('--hover-effect', theme.hover);
  document.documentElement.style.setProperty('--clicked-buttonBg', theme.clickedButtonBg);
  document.documentElement.style.setProperty('--clicked-buttonText', theme.clickedButtonText);
  resetPage();
}

document.body.addEventListener('click', (event) => {
  if (!changeThemeDiv.contains(event.target)) {
    lightModeDiv.style.display = 'none';
    darkModeDiv.style.display = 'none';
    lightThemes.style.display = 'none';
    darkThemes.style.display = 'none';
    areThemesOpen = false;
    areLightThemesOpen = false;
    areDarkThemesOpen = false;
  }
});

changeThemeDiv.addEventListener('click', () => {
  if (areThemesOpen) {
    lightModeDiv.style.display = 'none';
    darkModeDiv.style.display = 'none';
    lightThemes.style.display = 'none';
    darkThemes.style.display = 'none';
    areLightThemesOpen = false;
    areDarkThemesOpen = false;
  } else {
    lightModeDiv.style.display = 'block';
    darkModeDiv.style.display = 'block';
  }
  areThemesOpen = !areThemesOpen;
});

lightModeDiv.addEventListener('click', event => {
  event.stopPropagation();
  if (areLightThemesOpen) {
    lightThemes.style.display = 'none';
  } else {
    lightThemes.style.display = 'block';
    darkThemes.style.display = 'none';
    areDarkThemesOpen = false;
  }
  areLightThemesOpen = !areLightThemesOpen;
});

darkModeDiv.addEventListener('click', event => {
  event.stopPropagation();
  if (areDarkThemesOpen) {
    darkThemes.style.display = 'none';
  } else {
    darkThemes.style.display = 'block';
    lightThemes.style.display = 'none';
    areLightThemesOpen = false;
  }
  areDarkThemesOpen = !areDarkThemesOpen;
});

themeChoices.forEach(themeChoice => {
  themeChoice.addEventListener('click', event => {
    event.stopPropagation();
    const selectedTheme = event.target.id;
    applyTheme(selectedTheme);
  });
});

// Change icon
const icon = document.querySelector('.keyzen-logo');

function changeIcon(mode) {
  if (mode) {
    icon.src = './resources/media/black-icon.png';
  } else {
    icon.src = './resources/media/white-icon.png';
  }
}