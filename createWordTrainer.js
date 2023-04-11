const wordsStrEn = 'season autumn winter spring summer fly_away riddle';
const wordsEn = wordsStrEn.split(' ');

const wordsStrRu = 'сезон осень зима весна лето улетать загадка';
const wordsRu = wordsStrRu.split(' ');

const wordsTranscript = '';
const wordsTr = wordsTranscript.split(' ');

const wordsJSON = [];

wordsEn.forEach((word, index) => {
  const wordObj = {};

  wordObj.ru = wordsRu[index];
  wordObj.en = word.split('').join(' ');
  wordObj.addWord = '';
  wordObj.audioEnUrl = `https://wooordhunt.ru/data/sound/sow/uk/${word}.mp3`;
  wordObj.transcript = wordsTr[index];

  wordsJSON.push(wordObj);
});

console.log(JSON.stringify(wordsJSON));
