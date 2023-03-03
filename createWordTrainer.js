const wordsStrEn =
  'picture say listen count describe guess work pairs thing story choose read colour many match number';
const wordsEn = wordsStrEn.split(' ');

const wordsStrRu =
  'картинка скажи послушай посчитай опиши догадайся работа(работать) пары вещь история выбери прочитай цвет много соответствие пронумеруй';
const wordsRu = wordsStrRu.split(' ');

const wordsJSON = [];

wordsEn.forEach((word, index) => {
  const wordObj = {};

  wordObj.ru = wordsRu[index];
  wordObj.en = word.split('').join(' ');
  wordObj.addWord = '';
  wordObj.audioEnUrl = `https://wooordhunt.ru/data/sound/sow/uk/${word}.mp3`;
  wordObj.transcript = '';

  wordsJSON.push(wordObj);
});

console.log(JSON.stringify(wordsJSON));
