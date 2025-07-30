document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('keyzen-theme');
  if (savedTheme && themes[savedTheme]) {
    applyTheme(savedTheme);
  } else {
    generateText();
  }
});

document.body.addEventListener('keydown', getKey);
document.body.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    resetPage();
  }
});

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

resetButton.addEventListener('click', resetPage);