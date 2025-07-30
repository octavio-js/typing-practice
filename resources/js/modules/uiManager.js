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