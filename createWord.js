const wordsStrEn =
  "kitchen fly from two six four eyes spots spring warm sunny windy very where ask house";
const wordsEn = wordsStrEn.split(" ");

const wordsStrRu =
  "кухня летать из два шесть четыре глаза пятна весна теплый солнечный ветреный очень где спросить дом";
const wordsRu = wordsStrRu.split(" ");

const wordsJSON = [];

wordsEn.forEach((word, index) => {
  const wordObj = {};

  wordObj.ru = wordsRu[index];
  wordObj.en = word;
  wordObj.addWord = "";
  wordObj.audioEnUrl = "";
  wordObj.transcript = "";

  wordsJSON.push(wordObj);
});

console.log(JSON.stringify(wordsJSON));
