var score = localStorage.getItem("score")
var initials = localStorage.getItem("User Initials")
var olScoresEl = document.getElementById("scores-container")
var btnClear = document.getElementById("clear")
var scores = []

var appendScores = function() {
    var textToShowScores = "1." + initials + " - " + score;
    var liScoreEl = document.createElement("li")
    liScoreEl.textContent = textToShowScores;
    olScoresEl.appendChild(liScoreEl)
}

appendScores()

var removeChildNodes = function(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

btnClear.addEventListener("click", function() {
    removeChildNodes(olScoresEl)
})


