// initializing variables
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var timer = document.getElementById('time');

function startQuizGame() {

    var mainPage = document.getElementById('main-page');
    mainPage.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    var timerID = setInterval(countdown, 1000);

    // timer.textContent = 
}

// event listeners
startButton.onclick = startQuizGame;
