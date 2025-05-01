const fs = require('fs');
const randomWords = require('random-words');
const FILE = 'resources/json/randomWords.json';
const TOTAL_WORDS = 2000;
const stream = fs.createWriteStream(FILE);

stream.write('[');

for (let i = 0; i < TOTAL_WORDS; i++) {
  const word = JSON.stringify(randomWords());
  stream.write(word + (i < TOTAL_WORDS - 1 ? ',' : ''));
}

stream.write(']');
stream.end();