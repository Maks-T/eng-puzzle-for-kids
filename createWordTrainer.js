const wordsStrEn =
  'puppy run sound under egg sun lunch plum net suddenly see tree hungry sit eat like very look late help board near';
const wordsEn = wordsStrEn.split(' ');

const wordsStrRu =
  'щенок бегать звук яйцо солнце обед слива сетка вдруг видеть дерево голодный сидеть есть(кушать) нравится очень смотреть(наблюдать) помощь доска рядом';
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
