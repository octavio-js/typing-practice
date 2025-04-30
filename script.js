const text = document.querySelector('#text').innerHTML;
let letters = [];

for(let i = 0; i < text.length; i++){
  letters.push(text[i]);
}

letters.forEach(letter => {
  let newLetter = document.createElement('p');
  newLetter.innerHTML = letter;
  newLetter.className = 'letter';
  newLetter.style.display = 'inline';
  document.body.appendChild(newLetter);
});