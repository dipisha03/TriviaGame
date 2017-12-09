// Pseudo Code 

// Create a trivia game that shows only one question until the player answers it or their time runs out.
// If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question - do this without user input.
// The scenario is similar for wrong answers and time-outs.
// If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
// If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.
// On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

// Assign variables 
var startScreen;
var gameHTML;
var counter = 20;
var questionArray = ["Who directed the show?", "Which year was the show released?", "What is eleven nicknamed?", "Which one of the four friends goes missing?", "Who spends the night with Nancy after she escapes the parallel universe and is terrified?", "Who finds will at the end of season 1", "What creature breaks out of the parallel universe?"];
var answerArray = [["Duffer Brothers", "Stephen King", "Steven Spielberg", "Wes Anderson"], ["2014","2016","2017","2015"], ["Ellen", "Ella", "El", "Elis"], ["Mike","Dustin","Will","Lucas"], ["Will", "Steve", "Barb", "Jonathan"], ["Nancy","Joyce","Karen","Jim"], ["Demon", "IT", "Demogorgon", "Snake"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/Duffer_Brothers.jpg'>", "<img class='center-block img-right' src='assets/images/release_date.jpg'>", "<img class='center-block img-right' src='assets/images/eleven.jpg'>", "<img class='center-block img-right' src='assets/images/will.jpg'>", "<img class='center-block img-right' src='assets/images/jonathan.jpeg'>", "<img class='center-block img-right' src='assets/images/joyce.png'>", "<img class='center-block img-right' src='assets/images/Demogorgon.png'>"];
var correctAnswers = ["A. Duffer Brothers", "B. 2016", "C. El", "C. Will", "D. Jonathan", "B. Joyce", "C. Demogorgon"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");

$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
  $(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button,
// and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
  event.preventDefault();  // added line to test issue on GitHub Viewer
  clickSound.play();
  generateHTML();

  timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
  //answeredQuestion = true;
  clickSound.play();
  selectedAnswer = $(this).text();
  if(selectedAnswer === correctAnswers[questionCounter]) {
    //alert("correct");

    clearInterval(theClock);
    generateWin();
  }
  else {
    //alert("wrong answer!");
    clearInterval(theClock);
    generateLoss();
  }
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
  clickSound.play();
  resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 2000);  //  change to 2000 or other amount
}

function generateWin() {
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 2000);  //  change to 2000 or other amount
}

function generateLoss() {
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 2000); //  change to 2000 or other amount
}

function generateHTML() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 6) {
  questionCounter++;
  generateHTML();
  counter = 20;
  timerWrapper();
  }
  else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
  + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" 
  + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally 
  + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " 
  + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 20;
  generateHTML();
  timerWrapper();
}

