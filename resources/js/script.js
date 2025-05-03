let text = '';
let letters = [];
let letterElements = [];
let currentLetter = 0;
let correctChars = 0;
let amountOfWords = 30;

const lettersContainer = document.querySelector('#letters-container');
const accuracy = document.querySelector('#accuracy');
const resetButton = document.querySelector('#reset');
const selectWordsButtons = document.querySelectorAll('.word-choice');

document.addEventListener('DOMContentLoaded', generateText);

function getKey(event) {
  const rect = letterElements[currentLetter].getBoundingClientRect();
  const containerRect = lettersContainer.getBoundingClientRect();
  if (rect.bottom > containerRect.bottom - 20) {
    lettersContainer.scrollTop += rect.bottom - containerRect.bottom + 60;
  }  

  if (event.key === letters[currentLetter]) {
    if (letters[currentLetter] === ' ') {
      letterElements[currentLetter].style.backgroundColor = '#5f8c5f';
      currentLetter++;
      correctChars++;
    } else {
      letterElements[currentLetter].style.color = '#5f8c5f';
      currentLetter++;
      correctChars++;
    }
  } else {
    if (letters[currentLetter] === ' ') {
      letterElements[currentLetter].style.backgroundColor = '#cc6d5c';
      currentLetter++;
    } else {
      letterElements[currentLetter].style.color = '#cc6d5c';
      currentLetter++;
    }
  }

  if (currentLetter === letters.length) {
    document.body.removeEventListener('keydown', getKey);
    accuracy.style.display = 'block';
    accuracy.innerHTML = `Accuracy: ${Math.floor((correctChars * 100) / letters.length)}%`;
  }
}

document.body.addEventListener('keydown', getKey);
document.body.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    resetPage();
  }
});

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
  accuracy.style.display = 'none';
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
    });
}

// Select amount of words
selectWordsButtons.forEach(button => {
  button.addEventListener('click', event => {
    button.blur();
    amountOfWords = Number(event.target.innerText);
    generateText();
  });
});