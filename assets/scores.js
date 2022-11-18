//DOM declarations
var clearButton = document.getElementById('clear');

function printHighscores() {
    // grabs stored object highscores from local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores"));

    // sorts highscores by scores
    highscores.sort(function (a,b) {
        return b.score - a.score;
    });

    // console log for debugging
    console.log(highscores);

    for (var i=0; i < highscores.length; i++) {
        // loop over each score element and create a new line for each one
        var scoreLine = document.createElement('li');

        // displays user initials and score with a '-' between
        scoreLine.textContent = highscores[i].initials + " - " + highscores[i].score;
        
        // create variable and grab DOM element
        var orderedList = document.getElementById('highscores');
        // display to user
        orderedList.append(scoreLine);
    }
}

function clearScores() {
    // remmoves item from local storage
    window.localStorage.removeItem('highscores');
    // refreshes page after removing list so user can see changes
    window.location.reload();
}

// runs function to clear scores when button is clicked
clearButton.onclick = clearScores;

// function to run when page is first loaded
printHighscores();