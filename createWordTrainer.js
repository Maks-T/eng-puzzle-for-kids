const wordsStrEn = 'season autumn winter spring summer fly_away riddle';
const wordsEn = wordsStrEn.split(' ');

const wordsStrRu = 'сезон осень зима весна лето улетать загадка';
const wordsRu = wordsStrRu.split(' ');

const wordsTranscript =
  'ˈsizən ˈɔtəm ˈwɪntər sprɪŋ ˈsʌmər flaɪ_əˈweɪ ˈrɪdəlˈsʌni hɑt wɔrm koʊld ˈklaʊdi ˈfɑɡi ˈwɪndi fɑɡ ˈreɪni ˈsnoʊi wɪnd snoʊ reɪn ˈwɛðər';
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
