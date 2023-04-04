const wordsStrEn =
  'sunny hot warm cold cloudy foggy windy fog rainy snowy wind snow rain weather';
const wordsEn = wordsStrEn.split(' ');

const wordsStrRu =
  'солнечная жаркая теплая холодная облачная туманная ветреная туман дождливый снежный ветер снег дождь погода';
const wordsRu = wordsStrRu.split(' ');

const wordsTranscript =
  'ˈsʌni hɑt wɔrm koʊld ˈklaʊdi ˈfɑɡi ˈwɪndi fɑɡ ˈreɪni ˈsnoʊi wɪnd snoʊ reɪn ˈwɛðər';
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
