// initializing variables and grabbing DOM elements by id
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('problems');
var timer = document.getElementById('time');
var question = document.getElementById('question');
var choices = document.getElementById('choices');
var lastScreen = document.getElementById('end-screen');
var score = document.getElementById('final-score');
var initials = document.getElementById("user-initials");
var submitButton = document.getElementById('submit');

// used for debugging
console.log(window.location.pathname);

// giving user around 10 seconds per question
var time = questionList.length * 10;
// initializing variable for question number at 0
var questionIndex = 0;
var currentTimerNumber;

// function runs at first when start button is pressed
function startQuizGame() {

    // grab elements on main page to hide them from user for game screen to come
    var mainPage = document.getElementById('main-page');
    mainPage.setAttribute('class', 'hide');

    // removes hide class from questions element allowing user to see it
    questionsEl.removeAttribute('class');

    // run function countdown() every 1000 milliseconds or every second
    currentTimerNumber = setInterval(countdown, 1000);

    // set timer text to time every second so user sees time go down
    timer.textContent = time;

    // call function to choose a question from array of questions
    chooseQuestion();
}

function countdown() {
    // this function is ran every second
    // time goes down by 1 every second
    time--;
    timer.textContent = time;

    // conditional statement to see if time is less than 1 and if it run a function called endGame()
    if (time < 1) {
        endGame();
    }
}

function chooseQuestion() {
    // create variable problem to grab question from array by index to display to user one at a time
    var problem = questionList[questionIndex];

    // display question to user
    question.textContent = problem.question;

    choices.innerHTML = ""; // clears previous questions' choices from the screen

    for (var i=0; i < problem.choices.length; i++) {
        // loop over each questions' choices and create a button for each choice
        var diffChoices = problem.choices[i];
        var choiceBtn = document.createElement('button');

        choiceBtn.setAttribute('class', 'choiceClick');
        // choiceBtn.setAttribute('value', problem)
        choiceBtn.textContent = diffChoices;

        // display button of different choices to user
        choices.append(choiceBtn); //append child???

    }
}

function choiceClicked(event) {
    // pass clicked event through this function
    // stores what was clicked in variable
    var clicked = event.target;

    // does nothing if user clicks on blank areas on page
    if(!clicked.matches('.choiceClick')) {
        return
    }

    // conditional statement that runs if user presses wrong answer
    if (clicked.textContent !== questionList[questionIndex].answer) { 
        // 15 seconds is deducted from time/score if wrong answer is selected
        time -= 15;
        // console log for debugging
        console.log("wrong answer");

        // if statement so time cant go negative
        if (time < 0) {
            time = 0;
        }

        timer.textContent = time;

        // place audio cue here

    } else {
        console.log("Correct Answer!");
        // optional audio cue here
    }

    // moves on to next question
    questionIndex++;

     //checking conditions to end game
    if (time <= 0 || questionIndex === questionList.length) {
        endGame();
    } else {
        chooseQuestion();
    }
}

function endGame() {
    // if game is ended function runs
    // clears time interval number variable
    clearInterval(currentTimerNumber);

    // hides the question element from user again after game is finished
    questionsEl.setAttribute('class', 'hide');

    // after game is finished last screen from HTML is unhidden from user
    lastScreen.removeAttribute('class');

    // stores the remaining time left when game is ended and scores it as user's score
    score.textContent = time;
}

function saveScore() {
    //saves user input and removes excess space from input before saving
    var userInitials = initials.value.trim();

    // conditional statement runs as long as user input is not empty
    if (userInitials !== '') {
        // grabs any stored initials from local storage
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // create object to store user initials and score
        var currentUserScore = {
            score: time,
            initials: userInitials
        };

        // pushes new user score to local storage
        highscores.push(currentUserScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        
        // after user saves initials - redirect user to view-highscores.html
        window.location.href = 'view-highscores.html';
    
    }
}

function scoreEnter(event) {
    // during user input if user presses ENTER run Save score function 
    if(event.key === "Enter") {
        saveScore();
    }
}

// event listeners
// when user presses start button it will run function startQuizGame
startButton.onclick = startQuizGame;
choices.onclick = choiceClicked;

// makes it so user can press either submit button OR Enter key to save score
submitButton.onclick = saveScore;
initials.onkeyup = scoreEnter;