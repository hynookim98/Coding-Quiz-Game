// initializing variables
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var timer = document.getElementById('time');

// giving user around 10 seconds per question
var time = questionList.length * 10;

function startQuizGame() {

    var mainPage = document.getElementById('main-page');
    mainPage.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    var timerID = setInterval(countdown, 1000);

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

}

// event listeners
startButton.onclick = startQuizGame;
