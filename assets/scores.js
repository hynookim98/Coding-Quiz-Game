//DOM declarations
var clearButton = document.getElementById('clear');

function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores"));

    highscores.sort(function (a,b) {
        return b.score - a.score;
    });

    console.log(highscores);

    for (var i=0; i < highscores.length; i++) {

        // conditional statement to see if score is zero. displays as zero instead of undefined
        // if(highscores[i].scores === undefined) {
        //     highscores[i].scores = "0";
        // }

        var scoreLine = document.createElement('li');
        scoreLine.textContent = highscores[i].initials + " - " + highscores[i].scores;
        
        var orderedList = document.getElementById('highscores');
        orderedList.append(scoreLine);
    }
}

function clearScores() {
    // remmoves item from local storage
    window.localStorage.removeItem('highscores');
    // refreshes page after removing list so user can see changes
    window.location.reload();
}

clearButton.onclick = clearScores;
printHighscores();