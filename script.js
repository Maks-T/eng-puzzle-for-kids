const boardElem = document.querySelector(".board");

const btnCheck = document.querySelector(".btn-check");
const btnNext = document.querySelector(".btn-next");
const sentence = document.querySelector(".sentence");

const countQuesElem = document.querySelector("#count-ques");
const knewQuesElem = document.querySelector("#knew-ques");
const leftQuesElem = document.querySelector("#left-ques");

let mistakes = 0;
let success = 0;
/*
let countQues = 0;
let knewQues = 0;
let leftQues = 0;*/

const unit1Promise = fetch("unit1.json");

unit1Promise
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let indexQues = 0;

    const questions = data.questions.sort(() => Math.random() - 0.5);

    countQuesElem.innerHTML = questions.length;
    knewQuesElem.innerHTML = 0;
    leftQuesElem.innerHTML = questions.length;

    nextQues(questions[indexQues]);

    function nextQues(ques) {
      boardElem.innerHTML = "";
      const successElem = document.createElement("div");

      successElem.classList.add("success");
      successElem.classList.add("hide");

      successElem.innerHTML = "Правильно!";
      boardElem.appendChild(successElem);

      const errorElem = document.createElement("div");

      errorElem.classList.add("error");
      errorElem.classList.add("hide");

      errorElem.innerHTML = "Ошибка!";
      boardElem.appendChild(errorElem);

      sentence.innerHTML = ques.ru;
      let words = (ques.en + " " + ques.addWord).split(" ");
      words = words.sort(() => Math.random() - 0.5);

      words.forEach((word) => {
        const wordElem = document.createElement("div");
        wordElem.classList.add("word");
        wordElem.classList.add(getColorClass(word));

        wordElem.innerHTML = word;
        boardElem.appendChild(wordElem);
      });

      const wordElems = document.querySelectorAll(".word");

      const gap = 10;
      const boardX = boardElem.clientWidth;
      const boardY = boardElem.clientHeight;

      let curElems = [];

      let curElemX = gap;
      let curElemY = boardY / 2;

      let curSelectElemX = gap;
      let curSelectElemY = gap;

      wordElems.forEach((elem) => {
        if (curElemX + elem.clientWidth > boardX) {
          curElemX = gap;
          curElemY += elem.clientHeight + gap * 2;
        }

        elem.dataset.startX = elem.style.left = curElemX;
        elem.dataset.startY = elem.style.top = curElemY;

        curElemX = curElemX + elem.clientWidth + gap;
      });

      const handlerBoardElem = (event) => {
        if (event.target.classList.contains("word")) {
          const elem = event.target;

          if (curSelectElemX + elem.clientWidth > boardX) {
            curSelectElemX = gap;
            curSelectElemY += elem.clientHeight + gap * 2;
          }

          elem.style.left = curSelectElemX;
          elem.style.top = curSelectElemY;

          //elem.dataset.index = curElems.length;
          curElems.push(elem);

          console.log("curElems", curElems);

          elem.classList.remove("word");
          elem.classList.add("word_active");

          curSelectElemX += elem.clientWidth + gap;

          Sounds.click();
        } else if (event.target.classList.contains("word_active")) {
          const elem = event.target;

          curSelectElemX = gap;
          curSelectElemY = gap;

          curElems = curElems
            .filter((el) => {
              return elem !== el;
            })
            .map((elem) => {
              if (curSelectElemX + elem.clientWidth > boardX) {
                curSelectElemX = gap;
                curSelectElemY += elem.clientHeight + gap * 2;
              }

              elem.style.left = curSelectElemX;
              elem.style.top = curSelectElemY;

              curSelectElemX += elem.clientWidth + gap;

              return elem;
            });

          console.log(curElems);

          elem.style.left = elem.dataset.startX;
          elem.style.top = elem.dataset.startY;

          elem.classList.remove("word_active");
          elem.classList.add("word");
        }
      };

      boardElem.addEventListener("click", handlerBoardElem);

      const hadlerBtnCheck = (event) => {
        const curWord = curElems.reduce((text, elem) => {
          return text + elem.innerHTML;
        }, "");

        if (
          curWord
            .trim()
            .toLowerCase()
            .replace(/[\s.,%]/g, "") ==
          ques.en
            .trim()
            .toLowerCase()
            .replace(/[\s.,%]/g, "")
        ) {
          console.log("ПРАВИЛЬНО");

          success += 1;
          questions.splice(indexQues, 1);

          knewQuesElem.innerHTML = Number(knewQuesElem.innerHTML) + 1;
          leftQuesElem.innerHTML = questions.length;

          successElem.classList.remove("hide");

          Sounds.success();
          console.log(" questions", questions);
        } else {
          console.log("НЕ ПРАВИЛЬНО");

          errorElem.classList.remove("hide");
          mistakes += 1;

          indexQues += 1;
          if (indexQues > questions.length - 1) {
            indexQues = 0;
          }

          Sounds.mistakes();
          console.log(" questions", questions);
        }

        event.target.classList.add("hide");
        btnNext.classList.remove("hide");

        console.log(curWord);

        boardElem.removeEventListener("click", handlerBoardElem);
        btnCheck.removeEventListener("click", hadlerBtnCheck);
      };

      btnCheck.addEventListener("click", hadlerBtnCheck);

      const handlerBtnNext = (event) => {
        event.target.classList.add("hide");
        btnCheck.classList.remove("hide");
        successElem.classList.add("hide");
        errorElem.classList.add("hide");

        if (questions.length) {
          nextQues(questions[indexQues]);
        } else {
          boardElem.innerHTML = `Вы все изучили! 
          у вас ${mistakes} ошибок
          и ${success} правильных ответов
          `;
          Sounds.win();
        }

        btnNext.removeEventListener("click", handlerBtnNext);
      };

      btnNext.addEventListener("click", handlerBtnNext);
    }

    function getColorClass(curWord) {
      const objColor = data.colors.find((color) => {
        return color.words.some(
          (word) =>
            word
              .trim()
              .toLowerCase()
              .replace(/[\s.,%]/g, "") ===
            curWord
              .trim()
              .toLowerCase()
              .replace(/[\s.,%]/g, "")
        );
      });

      if (objColor) return objColor.color;
      return "white";
    }
  });

//SOUNDS

class Sounds {
  static win() {
    this.audio = new Audio("./assets/sounds/Slugfest_game_won_01.ogg");
    this.audio.play();
  }

  static click() {
    this.audio = new Audio("./assets/sounds/Menu_click_08.ogg");
    this.audio.play();
  }

  static success() {
    this.audio = new Audio("./assets/sounds/succes.wav");
    this.audio.play();
  }

  static mistakes() {
    this.audio = new Audio("./assets/sounds/mistake.wav");
    this.audio.play();
  }
}
