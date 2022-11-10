import $ from "jquery";

//* Symbol name that matches getbootstrap icons font - used for the game board cards
const gameCardsBoard1 = [
  { symbol: "airplane-engines", color: "#f03e35" },
  { symbol: "bicycle", color: "#ed8013" },
  { symbol: "camera-reels", color: "#e8e813" },
  { symbol: "fast-forward-circle", color: "#5ac716" },
  { symbol: "hourglass", color: "#16c7c4" },
  { symbol: "piggy-bank", color: "#3565de" },
  { symbol: "sign-stop-lights", color: "#4c18db" },
  { symbol: "train-front", color: "#ad42eb" },
];

const gameSymbolsBoard2 = [
  "airplane-engines",
  "bicycle",
  "currency-bitcoin",
  "camera-reels",
  "fast-forward-circle",
  "joystick",
  "nintendo-switch",
  "speedometer2",
  "umbrella",
  "youtube",
];

const rainbowColorsBoard2 = [
  "#f03e35",
  "#fa5f8d",
  "#ed8013",
  "#e8e813",
  "#5ffa83",
  "#5ac716",
  "#16c7c4",
  "#3565de",
  "#4c18db",
  "#ad42eb",
];

let currentMatched = 0;
let currentFlipped = 0;
let selectedCards = [];

const gameStart = () => {
  $("#boardContainerPage").hide();
  $("#startButton").on("click", () => {
    $("#instructionPage").hide();
    $("#boardContainerPage").show();
    $("#board").show();
    $("#board2").hide();
    generateBoard();
    selectCard();
    $(".match").show();
  });
};

//* Array with objects for game board 1 is cloned and then shuffled so that when each time the game resets, the cards placement is randomized
//* The cards are then placed with a 'card-back' & a 'card-front' class
const generateBoard = () => {
  const cloneCards = [...gameCardsBoard1, ...gameCardsBoard1];
  const shuffleCards = shuffleArray(cloneCards);
  for (let i = 0; i < shuffleCards.length; i++) {
    const $cardBack = $("<div>")
      .addClass("card-back bi bi-" + shuffleCards[i].symbol)
      .css("background-color", shuffleCards[i].color);
    const $cardFront = $('<div class="card-front">').text("?");
    const $card = $('<div class="card">');
    $card.append($($cardBack)).append($($cardFront));
    $("#board").append($($card));
  }
  renderMatchScore();
};

//* Board 2 objective is to only match the symbols, ignoring the background color of the cards (serves as distraction)
const generateBoard2 = () => {
  const cloneSymbols = [...gameSymbolsBoard2, ...gameSymbolsBoard2];
  const cloneColors = [...rainbowColorsBoard2, ...rainbowColorsBoard2];
  const shuffleSymbols = shuffleArray(cloneSymbols);
  const shuffleColors = shuffleArray(cloneColors);
  for (let i = 0; i < shuffleSymbols.length; i++) {
    const $cardBack = $("<div>")
      .addClass("card-back bi bi-" + shuffleSymbols[i])
      .css("background-color", shuffleColors[i]);
    const $cardFront = $('<div class="card-front">').text("?");
    const $card = $('<div class="card">');
    $card.append($($cardBack)).append($($cardFront));
    $("#board2").append($($card));
  }
};

//* selectCard function -
//* 'flipped' class is added with event targeting to trigger the css that rotates the card
//* checking of match or mismatch of the cards done when the currentFlipped (cards) is equal 2
//* regardless of match or mismatch, the 'flipped' class will be removed; if its a match, a 'matched' class will be added permanently to show the cards faced up

const selectCard = () => {
  $(".card").on("click", (event) => {
    $(event.currentTarget).addClass("flipped");
    currentFlipped++;
    selectedCards.push($(event.currentTarget).children().attr("class"));

    if (currentFlipped === 2 && selectedCards[0] === selectedCards[1]) {
      $(".flipped").removeClass("flipped").addClass("matched");
      currentMatched++;
      renderMatchScore();
      currentFlipped = 0;
      selectedCards = [];
    }
    if (currentFlipped === 2 && selectedCards[0] !== selectedCards[1]) {
      setTimeout(() => {
        $(".flipped").removeClass("flipped");
        selectedCards = [];
        currentFlipped = 0;
      }, 1000);
    }
    if (currentFlipped > 2) {
      $(".flipped").removeClass("flipped");
    }
    if (currentMatched === 8) {
      loadBoard2();
    }
  });
};

const selectCardBoard2 = () => {
  $(".card").on("click", (event) => {
    $(event.currentTarget).addClass("flipped");
    currentFlipped++;
    selectedCards.push($(event.currentTarget).children().attr("class"));

    if (currentFlipped === 2 && selectedCards[0] === selectedCards[1]) {
      $(".flipped").removeClass("flipped").addClass("matched");
      currentMatched++;
      renderMatchScore();
      currentFlipped = 0;
      selectedCards = [];
    }
    if (currentFlipped === 2 && selectedCards[0] !== selectedCards[1]) {
      setTimeout(() => {
        $(".flipped").removeClass("flipped");
        selectedCards = [];
        currentFlipped = 0;
      }, 1000);
    }
    if (currentFlipped > 2) {
      $(".flipped").removeClass("flipped");
    }
    if (currentMatched === 18) {
      gameWon();
    }
  });
};

//* shuffleArray function for generating the game board randomized
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const renderMatchScore = () => {
  $(".match-count").text(currentMatched);
};

const loadBoard2 = () => {
  $(".proceed").show();
  $("#board").addClass("fade");
  setTimeout(() => {
    $("#board").hide();
    generateBoard2();
    selectCardBoard2();
    $(".proceed").hide();
    $("#board2").show();
  }, 2500);
};

const gameWon = () => {
  $("#board2").addClass("fade");
  $(".win").show();
  $("#restartButton").on("click", () => {
    gameRestart();
  });
};

const gameRestart = () => {
  $(".win").hide();
  $("#instructionPage").show();
  $(".card").remove();
  $(".fade").removeClass("fade");
  currentMatched = 0;
  $(".match").hide();
  renderMatchScore();
};

gameStart();
