debugger;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameOn = false,
    level = 0,
    clickCount = 0;
var wrongSound = new Audio("sounds/wrong.mp3");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function animatePressed(key) {
    $("#" + key).addClass("pressed");
    setTimeout(() => {
        $("#" + key).removeClass("pressed");
    }, 100);
}

function animateAndPlay(key) {
    $("." + key)
        .fadeOut(100)
        .fadeIn("slow");
    animatePressed(key);
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function nextSequence() {
    updateTitle("Level " + level);
    var randomNumber = getRandomInt(4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateAndPlay(randomChosenColor);
    level++;
    clickCount = 0;
}

$(".btn").on("click", clickHandler);

function clickHandler() {
    clickCount++;

    var userChosenButton = this.id;

    userClickedPattern.push(userChosenButton);

    if (userChosenButton === gamePattern[clickCount - 1]) {
        // ok
        animateAndPlay(userChosenButton);

        if (clickCount == gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        // fail

        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        updateTitle("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    clickCount = 0;
    isGameOn = false;
    gamePattern = [];
}

function updateTitle(text) {
    $("h1").text(text);
}

document.addEventListener("keydown", () => {
    if (!isGameOn) {
        level = 0;
        nextSequence();
    }
    isGameOn = true;
});
