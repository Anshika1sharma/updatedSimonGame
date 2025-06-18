function goToNextPage() {
    window.location.href = "game.html"; 
}
function goToHomePage() {
    window.location.href = "index.html"; 
}

var Button = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var choosedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        store();
        started = true;
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function chosenColor() {
    var chosenNumber = nextSequence();
    var choosedColor = Button[chosenNumber];
    var $tile = $("#" + choosedColor);

    $tile.fadeTo(200, 0.3);
    setTimeout(function () {
        $tile.fadeTo(200, 1);
    }, 100);

    var sound = new Audio("./" + choosedColor + ".mp3");
    sound.play();

    return choosedColor;
}

function store() {
    choosedPattern = []; 
    level++;
    $("#level-title").text("Level " + level);
    var add = chosenColor();
    gamePattern.push(add);
}

$(".point").click(function () {
    var $tile = $(this);

    $tile.fadeTo(200, 0.3);
    setTimeout(function () {
        $tile.fadeTo(200, 1);
    }, 100);

    var userChosenColor = $(this).attr("id");
    choosedPattern.push(userChosenColor);

    var sound = new Audio("./" + userChosenColor + ".mp3");
    sound.play();

    checkAnswer(choosedPattern.length - 1);
});

function checkAnswer(currentIndex) {
    if (choosedPattern[currentIndex] === gamePattern[currentIndex]){
        if (choosedPattern.length === gamePattern.length) {
            incrementScore(); 
            setTimeout(function () {
                store();
            }, 1000);
        }
    } else {
        var wrongSound = new Audio("./wrong.mp3);
        wrongSound.play();

        $(".full-page").addClass("game-over");
        setTimeout(function () {
            $(".full-page ").removeClass("game-over");
        }, 200);
        localStorage.setItem('score', score);
        window.location.href = "scoreboard.html";

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    choosedPattern = [];
    started = false;
}

let score = 0;
function updateScore() {
    $('#score-display').text('Score: ' + score);
    
}

$('#quit-button').on('click', function() {
    score = 0; 
    updateScore();
});

function incrementScore() {
    score++;
    updateScore();
}



