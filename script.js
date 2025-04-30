const text = document.querySelector('#text').innerHTML;
let letters = [];
let letterElements = [];

let currentLetter = 0;

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

function getKey(event){
  if(event.key === letters[currentLetter]){
    currentLetter++;
    console.log('good');
  } else {
    currentLetter++;
    console.log('bad');
  }
}

document.body.addEventListener('keydown', getKey);