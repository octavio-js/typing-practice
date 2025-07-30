function showStatistics() {
  if (currentLetter === letters.length) {
    document.body.removeEventListener('keydown', getKey);
    accuracy.style.display = 'block';
    stats.style.display = 'block';
    accuracy.innerHTML = `Accuracy: ${Math.floor((correctChars * 100) / letters.length)}%`;
    stats.innerHTML = `${letters.length} / ${correctChars} / ${incorrectChars} / ${missedSpaces}`;
  }
}