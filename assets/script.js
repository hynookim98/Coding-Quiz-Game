// initializing variables
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('problems');
var timer = document.getElementById('time');
var question = document.getElementById('question');
var choices = document.getElementById('choices');
var lastScreen = document.getElementById('end-screen');
var score = document.getElementById('final-score');
var initials = document.getElementById("user-initials");
var submitButton = document.getElementById('submit');


// giving user around 10 seconds per question
var time = questionList.length * 10;
var questionIndex = 0;
var currentTimerNumber;

// function runs at first when start button is pressed
function startQuizGame() {

    var mainPage = document.getElementById('main-page');
    mainPage.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    currentTimerNumber = setInterval(countdown, 1000);

    timer.textContent = time;

    chooseQuestion();
}

function countdown() {
    time--;
    timer.textContent = time;

    if (time < 1) {
        endGame();
    }
}

function chooseQuestion() {
    var problem = questionList[questionIndex];

    question.textContent = problem.question;

    choices.innerHTML = ""; // clears previous questions' choices from the screen

    for (var i=0; i < problem.choices.length; i++) {
        var diffChoices = problem.choices[i];
        var choiceBtn = document.createElement('button');

        choiceBtn.setAttribute('class', 'choiceClick');
        choiceBtn.textContent = diffChoices;

        choices.append(choiceBtn); //append child???

    }
}

function choiceClicked(event) {
    var clicked = event.target;

    // does nothing is user clicks on blank areas on page
    if(!clicked.matches('.choiceClick')) {
        return
    }

    if (clicked.value !== questionList[questionIndex].answer) { //FIX IT
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timer.textContent = time;

        // place audio cue here

    } 

    questionIndex++;

     //checking conditions to end game
    if (time <= 0 || questionIndex === questionList.length) {
        endGame();
    } else {
        chooseQuestion();
    }
}

function endGame() {
    clearInterval(currentTimerNumber);

    questionsEl.setAttribute('class', 'hide');

    lastScreen.removeAttribute('class');

    score.textContent = time;
}

function saveScore() {
    //saves user input and removes excess space from input before saving
    var userInitials = initials.value.trim();

    if (initials === null) {
        var highscores = JSON.parse(window.localStorage.getItem("highscores"));
        
        var currentUserScore = {
            score: time,
            initials: userInitials
        };

        highscores.push(currentUserScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores))
    
        window.location.href = "view-highscores.html";
    }   
}

function scoreEnter(event) {
    if(event.key === "Enter") {
        saveScore();
    }
}

// event listeners
// when user presses start button it will run function startQuizGame
startButton.onclick = startQuizGame;
choices.onclick = choiceClicked;
submitButton.onclick = saveScore;
initials.onkeyup = scoreEnter;

