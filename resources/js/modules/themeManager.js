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

function changeIcon(mode) {
  if (mode) {
    icon.src = './resources/media/black-icon.png';
  } else {
    icon.src = './resources/media/white-icon.png';
  }
}

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