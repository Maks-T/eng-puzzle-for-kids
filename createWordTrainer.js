const wordsStrEn =
  'computer girl lamp door window goldwish kitten snake carpet chair armchair sofa mirror table desk bookcase room brown floor sweets rabbit hamster cake little bed dad granny grandad name';
const wordsEn = wordsStrEn.split(' ');

const wordsStrRu =
  'компьютер девочка лампа дверь окно золотая_рыбка котёнок змея ковёр стул кресло диван зеркало стол книжный_стол книжный_шкаф комната коричневый пол конфеты кролик хомяк пироженок(торт) маленький кровать папа бабушка дедушка имя';
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
