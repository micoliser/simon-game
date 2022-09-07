$("#footer-p").click((event) => {
  let instructions = $("#instructions");
  if (instructions.css("display") === "none") {
    instructions.removeClass("how-to-play");
    instructions.addClass("how-to-play-shown");
    $("#footer-p").text("Hide");
  } else {
    instructions.removeClass("how-to-play-shown");
    instructions.addClass("how-to-play");
    $("#footer-p").text("How to play")
  }
})


/*********** GAME PLAY **************/

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let buttonColours = ["green", "red", "yellow", "blue"];

function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function (event) {

  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
})

function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => $("#" + currentColour).removeClass("pressed"), 100);
}

$(document).keydown(startGame);
$("#start").click(startGame);

function startGame() {
  let head = $("#level-title");
  if (/\b(game\sover,\s)?press\sany\skey\sor\sclick\s(start\s)?to\s(re)?start\b/.test(head.text().toLowerCase())) {
    $("#start").removeClass("start-shown");
    $("#start").addClass("start-hidden");
    nextSequence();
  }
}

function checkAnswer(currentPattern) {
  let gamePatternAnswer = gamePattern[userClickedPattern.length - 1];
  if (currentPattern === gamePatternAnswer) {
    if(userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];

      setTimeout(() => {
        nextSequence();
      }, 100);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#start").removeClass("start-hidden");
  $("#start").addClass("start-shown");

  let wrong = new Audio("sounds/wrong.mp3");
  wrong.play();

  $("#level-title").text("Game Over, Press Any Key or Click Start to Restart");

  $("body").addClass("game-over");

  setTimeout(() => $("body").removeClass("game-over"), 200);

  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
