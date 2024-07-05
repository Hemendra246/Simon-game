
var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


$('#start').click(function(){
    
    if(!started){
      $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
    else{
        alert('your game is already started')
    }
})


$('.btn').on("click", function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour)
    playaudio(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function playaudio(name){
    var audio = new Audio("sounds/"+name+".mp3");
        audio.play(); 
}

function nextSequence(){
  userClickedPattern = [];
    level++;
    $('#level-title').text(`level ${level}`)
    var randomNumber =Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playaudio(randomChosenColour);
}

function animatePress(currentColour){
 $('#'+currentColour).addClass("pressed")
 setTimeout(function(){
 $('#'+currentColour).removeClass("pressed")
 },100)
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
{
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);

  }
}
else{
  playaudio("wrong")
  $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press start game to play again");
      startOver();
    
}
}
function startOver(){
level=0;
started=false;
gamePattern=[];

}