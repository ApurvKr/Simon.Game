
var buttonColours = ["red", "blue", "green", "yellow"]//2.3

var gamePattern = [];//2.5
var userClickedPattern = [];//4.3

var started = false;//7.1
var level = 0;//7.2
//7.1
$(document).keydown(function(){
  if(!started){
  $("#level-title").text("Level "+level);//7.3
  nextSequence();
  started = true;
});

//4.1
$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");//4.2
  userClickedPattern.push(userChosenColour); //4.4

  //console.log(userClickedPattern);
  playSound(userChosenColour);//5.4
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);//8.2

});


//8.1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
    //8.3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //8.4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //8.5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {           //if wrong

      playSound("wrong"); //9.1
      $("body").addClass("game-over");  //9.2

      var score = level-1;
      
      $("#level-title").text("Game Over, Press Any Key to Restart");  //9.3
      $("#score-title").text("Score: " + score);

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);  //9.2

      startOver();  //10
    }
}
//2.1
function nextSequence(){

  $("#score-title").text("");  // Clear score display
  userClickedPattern = [];//8.6

  level++;//7.4

  $("#level-title").text("Level "+level);//7.5
  var randomNumber = Math.floor(Math.random() * 4);//2.2
  var randomChosenColour = buttonColours[randomNumber];//2.4
  gamePattern.push(randomChosenColour);//2.6

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//3.1&3.2
  playSound(randomChosenColour);

}

//5.2
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); //3.3 now 5.3
}

//6.1
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");//6.3

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100); //6.4
}

//10
function startOver(){

  level = 0;
  gamePattern = [];
  started = false;
}
