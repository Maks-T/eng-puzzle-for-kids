const wordsStrEn =
  'school exercise-book book ruler rubber pencil-case teacher pupil bag pencil pen yellow brown green blue purple';
const wordsEn = wordsStrEn.split(' ');

const wordsStrRu =
  'школа тетрадь книга линейка стерка пенал учитель ученил сумка карандаш ручка желтый коричневый зеленый голубой фиолетовый';
const wordsRu = wordsStrRu.split(' ');

const wordsJSON = [];

wordsEn.forEach((word, index) => {
  const wordObj = {};

  wordObj.ru = wordsRu[index];
  wordObj.en = word.split('').join(' ');
  wordObj.addWord = '';
  wordObj.audioEnUrl = '';
  wordObj.transcript = '';

  wordsJSON.push(wordObj);
});

console.log(JSON.stringify(wordsJSON));
