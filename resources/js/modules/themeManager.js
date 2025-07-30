import { themes } from './constants.js';
import { state } from "./stateManager.js";
import { resetPage } from './uiManager.js';
import {
  changeThemeDiv, lightModeDiv, darkModeDiv, themeChoices,
  lightModeDiv, darkModeDiv, lightThemes, darkThemes
} from './domElements.js';

function changeIcon(mode) {
  if (mode) {
    icon.src = './resources/media/black-icon.png';
  } else {
    icon.src = './resources/media/white-icon.png';
  }
}

export function applyTheme(themeId) {
  const theme = themes[themeId];
  let isLight = theme.isThemeLight;

  localStorage.setItem('keyzen-theme', themeId);

  changeIcon(isLight);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--container-background', theme.typingBackground);
  document.documentElement.style.setProperty('--text-color', theme.text);
  document.documentElement.style.setProperty('--border-color', theme.borders);
  document.documentElement.style.setProperty('--letters-color', theme.defaultLetters);
  state.currentLetterColor = theme.defaultLetters;
  state.currentCorCharCol = theme.correctLetter;
  state.currentIncorCharCol = theme.incorrectLetter;
  state.currentNextLetterCol = theme.nextLetter;
  state.currentNextSpaceCol = theme.spaces;
  document.documentElement.style.setProperty('--hover-effect', theme.hover);
  document.documentElement.style.setProperty('--clicked-buttonBg', theme.clickedButtonBg);
  document.documentElement.style.setProperty('--clicked-buttonText', theme.clickedButtonText);
  resetPage();
}

changeThemeDiv.addEventListener('click', () => {
  if (state.areThemesOpen) {
    lightModeDiv.style.display = 'none';
    darkModeDiv.style.display = 'none';
    lightThemes.style.display = 'none';
    darkThemes.style.display = 'none';
    state.areLightThemesOpen = false;
    state.areDarkThemesOpen = false;
  } else {
    lightModeDiv.style.display = 'block';
    darkModeDiv.style.display = 'block';
  }
  state.areThemesOpen = !state.areThemesOpen;
});

lightModeDiv.addEventListener('click', event => {
  event.stopPropagation();
  if (state.areLightThemesOpen) {
    lightThemes.style.display = 'none';
  } else {
    lightThemes.style.display = 'block';
    darkThemes.style.display = 'none';
    state.areDarkThemesOpen = false;
  }
  state.areLightThemesOpen = !state.areLightThemesOpen;
});

darkModeDiv.addEventListener('click', event => {
  event.stopPropagation();
  if (state.areDarkThemesOpen) {
    darkThemes.style.display = 'none';
  } else {
    darkThemes.style.display = 'block';
    lightThemes.style.display = 'none';
    state.areLightThemesOpen = false;
  }
  state.areDarkThemesOpen = !state.areDarkThemesOpen;
});

themeChoices.forEach(themeChoice => {
  themeChoice.addEventListener('click', event => {
    event.stopPropagation();
    const selectedTheme = event.target.id;
    applyTheme(selectedTheme);
  });
});