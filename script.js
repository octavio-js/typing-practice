const text = document.querySelector('#text').innerHTML;

let letters = [];
let letterElements = [];

let currentLetter = 0;
let correctChars = 0;

for(let i = 0; i < text.length; i++){
  letters.push(text[i]);
}

letters.forEach(letter => {
  let newLetter = document.createElement('p');
  newLetter.innerHTML = letter;
  newLetter.className = 'letter';
  document.body.appendChild(newLetter);
  letterElements.push(newLetter);
});

let accuracy = document.createElement('p');
accuracy.id = 'accuracy';
accuracy.innerHTML = 'Accuracy: 0%';
document.body.appendChild(accuracy);

let resetButton = document.createElement('button');
resetButton.id = 'reset';
resetButton.innerText = 'Reset';
resetButton.style.display = 'block';
document.body.appendChild(resetButton);

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

// Button
resetButton.addEventListener('click', () => {
  letterElements.forEach(letter => {
    letter.style.color = 'black';
    letter.style.backgroundColor = 'white';
  });
  resetButton.blur();
  correctChars = 0;
  currentLetter = 0;
  accuracy.style.display = 'none';
  document.body.addEventListener('keydown', getKey);
});