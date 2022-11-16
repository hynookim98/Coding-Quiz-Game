// initializing variables
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('problems');
var timer = document.getElementById('time');
var question = document.getElementById('question');
var choices = document.getElementById('choices');


// giving user around 10 seconds per question
var time = questionList.length * 10;
var questionIndex = 0;

// function runs at first when start button is pressed
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
    var problem = questionList[questionIndex];

    question.textContent = problem.title;

    for (var i=0; i < problem.choices.length; i++) {
        var diffChoices = problem.choices[i];
        var choiceBtn = document.createElement('button');

        choiceBtn.textContent = diffChoices;
        choices.append(choiceBtn); //append child???
    }
}

// event listeners
// when user presses start button it will run function startQuizGame
startButton.onclick = startQuizGame;
