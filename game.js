var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var userPattern = [];

var level = 0;

var started = false;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {nextSequence();} , 1000);
        }
    }
    else {
        const wrong = "wrong";
        playSound(wrong);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over. Press Any Key To Restart");
        startOver();
    }
}

function nextSequence() {
    userPattern = [];
    level += 1;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
