let text = '';
let letters = [];
let letterElements = [];
let currentLetter = 0;
let correctChars = 0;

document.addEventListener('DOMContentLoaded', generateText);

let lettersContainer = document.createElement('div');
lettersContainer.id = 'letters-container';
document.body.appendChild(lettersContainer);

let accuracy = document.createElement('p');
accuracy.id = 'accuracy';
accuracy.innerHTML = 'Accuracy: 0%';

let resetButton = document.createElement('button');
resetButton.id = 'reset';
resetButton.innerText = 'Reset';
resetButton.style.display = 'block';

function getKey(event){
  if(event.key === letters[currentLetter]){
    if(letters[currentLetter] === ' '){
      letterElements[currentLetter].style.backgroundColor = 'rgb(0, 200, 0)';
      currentLetter++;
      correctChars++;
    } else {
      letterElements[currentLetter].style.color = 'rgb(0, 200, 0)';
      currentLetter++;
      correctChars++;
    }
  } else {
    if(letters[currentLetter] === ' '){
      letterElements[currentLetter].style.backgroundColor = 'red';
      currentLetter++;
    } else {
      letterElements[currentLetter].style.color = 'red';
      currentLetter++;
    }
  }

  if(currentLetter === letters.length){
    document.body.removeEventListener('keydown', getKey);
    accuracy.style.display = 'block';
    accuracy.innerHTML = `Accuracy: ${Math.floor((correctChars * 100) / letters.length)}%`;
  }
}

document.body.addEventListener('keydown', getKey);

// Reset Button
resetButton.addEventListener('click', () => {
  resetButton.blur();
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
});

// Generate Text
function generateText(){
  fetch('resources/json/randomWords.json')
  .then(res => res.json())
  .then(words => {
    for(let i = 0; i < 10; i++){
      let randomIndex = Math.floor(Math.random() * words.length);
      if(i === 0){
        text += words[randomIndex];
      } else {
        text += ' ' + words[randomIndex];
      }
    }

    for(let i = 0; i < text.length; i++){
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
  document.body.appendChild(accuracy);
  document.body.appendChild(resetButton);
}