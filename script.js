class Sounds {
  constructor() {
    this.audioWin = new Audio("./assets/sounds/Slugfest_game_won_01.ogg");
    this.audioClick = new Audio("./assets/sounds/Menu_click_08.ogg");
    this.audioSuccess = new Audio("./assets/sounds/succes.wav");
    this.audioMistakes = new Audio("./assets/sounds/mistake.wav");
  }
  win() {
    this.audioWin.play();
  }

  click() {
    this.audioClick.play();
  }

  success() {
    this.audioSuccess.play();
  }

  mistakes() {
    this.audioMistakes.play();
  }
}

class AppHTML {
  constructor(classContainer) {
    this.container = document.querySelector(classContainer);
  }

  run() {
    this.renderElements();
  }

  renderElements() {
    this.container.innerHTML = "";
    this.createElements();

    this.container.append(
      this.elemStatisticPanel,
      this.elemDescription,
      this.elemSentence,
      this.elemBoard,
      this.elemPanelBtn
    );
  }

  createElements() {
    this.createElementStatistic();

    this.elemDescription = this.createElement(
      "p",
      ["description"],
      "Переведи предложение"
    );

    this.elemSentence = this.createElement("p", ["sentence"], "empty");

    this.elemBoard = this.createElement("div", ["board"], "");

    this.elemBtnCheck = this.createElement(
      "button",
      ["btn-check"],
      "Проверить"
    );

    this.elemBtnNext = this.createElement(
      "button",
      ["btn-next", "hide"],
      "Следующий"
    );

    this.elemPanelBtn = this.createElement("div", ["panel-btn"], "");

    this.elemPanelBtn.append(this.elemBtnCheck, this.elemBtnNext);

    this.elemSuccessMessage = this.createElement(
      "div",
      ["success"],
      "Правильно"
    );

    this.elemErrorMessage = this.createElement("div", ["error"], "Неправильно");

    this.elemDelText = this.createElement("s", ["delete-text"], "");

    this.elemRightText = this.createElement("div", ["right-text"], "");
  }

  createElementStatistic() {
    this.elemStatisticPanel = this.createElement(
      "div",
      ["statistic-panel"],
      ""
    );

    const elemCountQuesTitle = this.createElement(
      "span",
      ["count-title"],
      "Всего вопросов:"
    );

    this.elemCountQues = this.createElement(
      "span",
      ["count-stat", "count-ques"],
      ""
    );

    const elemKnewQuesTitle = this.createElement(
      "span",
      ["count-title"],
      "Изучено:"
    );

    this.elemKnewQues = this.createElement(
      "span",
      ["count-stat", "knew-ques"],
      "0"
    );

    const elemLeftQuesTitle = this.createElement(
      "span",
      ["count-title"],
      "Осталось изучить:"
    );

    this.elemLeftQues = this.createElement(
      "span",
      ["count-stat", "left-ques"],
      ""
    );

    this.elemStatisticPanel.append(
      elemCountQuesTitle,
      this.elemCountQues,
      elemKnewQuesTitle,
      this.elemKnewQues,
      elemLeftQuesTitle,
      this.elemLeftQues
    );
  }

  createElement(tag, classList, innerHTML) {
    const elem = document.createElement(tag);

    classList.forEach((className) => {
      elem.classList.add(className);
    });

    elem.innerHTML = innerHTML;

    return elem;
  }

  showSuccesMessage() {
    this.elemBoard.append(this.elemSuccessMessage);
  }

  showErrorMessage() {
    this.elemBoard.append(this.elemErrorMessage);
  }

  showBtnCheck() {
    this.elemBtnCheck.classList.remove("hide");
    this.elemBtnNext.classList.add("hide");
  }

  showBtnNext() {
    this.elemBtnNext.classList.remove("hide");
    this.elemBtnCheck.classList.add("hide");
  }

  showRightText(text) {
    this.elemRightText.innerHTML = text;
    this.elemBoard.append(this.elemRightText);
  }

  showDelText(text) {
    this.elemDelText.innerHTML = text;
    this.elemBoard.append(this.elemDelText);
  }
}

class AppUnit {
  constructor() {}

  async loadUnit(unitName) {
    const unitResponse = await fetch(unitName);

    const unitData = await unitResponse.json();
    this.questions = unitData.questions.sort(() => Math.random() - 0.5);

    return unitData;
  }
}

class App {
  mistakes = 0;
  success = 0;
  indexQues = 0;
  wordElems = [];
  selectedElems = [];
  sounds = new Sounds();

  constructor(className) {
    this.appHTML = new AppHTML(className);
    this.appUnit = new AppUnit();
  }

  async run() {
    this.appHTML.run();
    this.unitData = await this.appUnit.loadUnit("unit2.json");

    this.questions = this.appUnit.questions;
    this.appHTML.elemCountQues.innerHTML = this.questions.length;
    this.appHTML.elemLeftQues.innerHTML = this.questions.length;

    this.loadQues();
  }

  loadQues() {
    console.log("this.questions", this.questions);
    this.ques = this.questions[this.indexQues];
    console.log("this.indexQues", this.indexQues);
    console.log(" this.ques", this.ques);

    this.appHTML.elemSentence.innerHTML = this.ques.ru;
    this.renderElementsWord();
    this.addEventsToElements();
  }

  nextQues() {
    this.wordElems = [];
    this.selectedElems = [];
    this.removeEventsToElements;
    this.loadQues();
  }

  renderElementsWord() {
    this.appHTML.elemBoard.innerHTML = "";

    let words = (this.ques.en + " " + this.ques.addWord).split(" ");
    words = words.sort(() => Math.random() - 0.5);

    words.forEach((word) => {
      const wordElem = document.createElement("div");
      wordElem.classList.add("word");
      wordElem.classList.add(this.getColorClass(word));

      wordElem.innerHTML = word;
      this.wordElems.push(wordElem);
      this.appHTML.elemBoard.append(wordElem);
    });

    const gap = 10;

    const boardX = this.appHTML.elemBoard.clientWidth;
    const boardY = this.appHTML.elemBoard.clientHeight;

    let coordElemX = gap;
    let coordElemY = boardY / 2;

    this.wordElems.forEach((elem) => {
      if (coordElemX + elem.clientWidth > boardX) {
        coordElemX = gap;
        coordElemY += elem.clientHeight + gap * 2;
      }

      elem.dataset.startX = elem.style.left = coordElemX;
      elem.dataset.startY = elem.style.top = coordElemY;

      coordElemX = coordElemX + elem.clientWidth + gap;
    });
  }

  addEventsToElements() {
    this.appHTML.elemBoard.addEventListener("click", this.handlerElementBoard);

    this.appHTML.elemBtnCheck.addEventListener(
      "click",
      this.handlerElementBtnCheck
    );

    this.appHTML.elemBtnNext.addEventListener(
      "click",
      this.handlerElementBtnNext
    );
  }

  removeEventsToElements() {
    this.appHTML.elemBoard.removeEventListener(
      "click",
      this.handlerElementBoard
    );

    this.appHTML.elemBtnCheck.removeEventListener(
      "click",
      this.handlerElementBtnCheck
    );

    this.appHTML.elemBtnNext.removeEventListener(
      "click",
      this.handlerElementBtnNext
    );
  }

  handlerElementBoard = (event) => {
    const elem = event.target;

    const gap = 10;

    const boardX = this.appHTML.elemBoard.clientWidth;

    let coordSelectElemX = gap;
    let coordSelectElemY = gap;

    if (this.selectedElems.length) {
      coordSelectElemX =
        parseInt(this.selectedElems[this.selectedElems.length - 1].style.left) +
        parseInt(
          this.selectedElems[this.selectedElems.length - 1].clientWidth
        ) +
        gap;

      coordSelectElemY = parseInt(
        this.selectedElems[this.selectedElems.length - 1].style.top
      );
    }

    if (event.target.classList.contains("word")) {
      if (coordSelectElemX + elem.clientWidth > boardX) {
        coordSelectElemX = gap;
        coordSelectElemY =
          parseInt(
            this.selectedElems[this.selectedElems.length - 1].style.top
          ) +
          elem.clientHeight +
          gap;
      }

      elem.style.left = coordSelectElemX;
      elem.style.top = coordSelectElemY;

      this.selectedElems.push(elem);

      elem.classList.remove("word");
      elem.classList.add("word_active");

      coordSelectElemX = elem.clientWidth + gap;

      this.sounds.click();
    } else if (event.target.classList.contains("word_active")) {
      const elem = event.target;

      coordSelectElemX = gap;
      coordSelectElemY = gap;

      this.selectedElems = this.selectedElems
        .filter((el) => {
          return elem !== el;
        })
        .map((elem) => {
          if (coordSelectElemX + elem.clientWidth > boardX) {
            coordSelectElemX = gap;
            coordSelectElemY += elem.clientHeight + gap * 2;
          }

          elem.style.left = coordSelectElemX;
          elem.style.top = coordSelectElemY;

          coordSelectElemX += elem.clientWidth + gap;

          return elem;
        });

      elem.style.left = elem.dataset.startX;
      elem.style.top = elem.dataset.startY;

      elem.classList.remove("word_active");
      elem.classList.add("word");
    }
  };

  handlerElementBtnCheck = (event) => {
    const curWord = this.selectedElems.reduce((text, elem) => {
      return text + elem.innerHTML + " ";
    }, "");

    if (
      curWord
        .trim()
        .toLowerCase()
        .replace(/[\s.,%]/g, "") ==
      this.ques.en
        .trim()
        .toLowerCase()
        .replace(/[\s.,%]/g, "")
    ) {
      console.log("ПРАВИЛЬНО");

      this.success += 1;

      this.appHTML.elemKnewQues.innerHTML =
        Number(this.appHTML.elemKnewQues.innerHTML) + 1;

      this.appHTML.elemBoard.innerHTML = "";
      this.appHTML.showRightText(this.ques.en);
      this.appHTML.showSuccesMessage();

      this.questions.splice(this.indexQues, 1);
      this.appHTML.elemLeftQues.innerHTML = this.questions.length;
      if (this.indexQues > this.questions.length - 1) {
        this.indexQues = 0;
      }

      this.sounds.success();
    } else {
      console.log("НЕ ПРАВИЛЬНО");

      this.appHTML.elemBoard.innerHTML = "";
      this.appHTML.showDelText(curWord);
      this.appHTML.showRightText(this.ques.en);
      this.appHTML.showErrorMessage();
      this.mistakes += 1;

      this.indexQues += 1;

      if (this.indexQues > this.questions.length - 1) {
        this.indexQues = 0;
      }

      this.sounds.mistakes();
    }

    this.appHTML.showBtnNext();
  };

  handlerElementBtnNext = (event) => {
    this.appHTML.showBtnCheck();

    if (this.questions.length) {
      this.nextQues();
    } else {
      this.appHTML.elemBoard.innerHTML = `Вы все изучили! 
          у вас ${this.mistakes} ошибок
          и ${this.success} правильных ответов
          `;
      this.sounds.win();
      this.appHTML.elemPanelBtn.innerHTML = "";
    }
  };

  getColorClass(curWord) {
    const objColor = this.unitData.colors.find((color) => {
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
}

const app = new App(".main__wrapper");

window.onload = () => {
  app.run();
};
