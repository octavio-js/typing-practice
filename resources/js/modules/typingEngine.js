function isLetterCorrect(event) {
  return event.key === letters[currentLetter] ? true : false;
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
  } catch (e) {}
}