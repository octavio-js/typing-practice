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

function highlightWordCount(button){
  selectWordsButtons.forEach(b => {
    b.classList.remove('selected');
  });
  button.classList.add('selected');
}

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