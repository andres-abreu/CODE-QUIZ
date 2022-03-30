//DOM elements
var bodyEl = document.querySelector("body")
const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];
var questionContainerEl = document.getElementById("question-container")
var questionTitleEl = document.getElementById("question-title")
var choicesContainerEl = document.getElementById("choices-container")
var feedbackEl = document.getElementById("feedback")
var questionIndex = 0;
var time = 0;
var timeEl = document.getElementById("time-text");
var allDoneContainerEl = document.getElementById("all-done");
var scoreSpanEl = document.getElementById("score");
var initialInputEl = document.getElementById("enter-initials");
var btnSubmitInitialsEl = document.getElementById("submit-initials");

time = questions.length*15
score = 0
gameOver = false;
allDoneContainerEl.id = "hide";

//function timer
var timer = function() {
    var timer = setInterval(function(){
        timeEl.textContent = time;
        time--
        if (time < 0) {
            clearInterval(timer)
            score = 0;
            showAllDone()
            localStorage.setItem("score",score)
        }
    },1000)
}

//start quiz function
var startQuiz = function() {
    timer()
    if(questionIndex === 0) {
        renderQuestion(questions[questionIndex])
    }
    return
}

//create a function to render the question
var renderQuestion = function(obj) {
    questionTitleEl.innerHTML = obj.title;
    for (i = 0; i < obj.choices.length;i++) {
        var choiceLiEL = document.querySelector("li")
        choiceLiEL.textContent = obj.choices[i]
        choicesContainerEl.appendChild(choiceLiEL)
    }
    return
}

//check if answer is correct
var answerChecker = function(e) {
    element = e.target;
    if (element.textContent === questions[questionIndex].answer) {
        console.log("correct")
        feedbackEl.textContent = "Correct"
    } else if (element.textContent != questions[questionIndex].answer) {
        time -= 10;
        feedbackEl.textContent = "Incorrect"
    }
    questionIndex++
    if(questionIndex < questions.length) {
        renderQuestion(questions[questionIndex])
    } else {
        score = time;
        showAllDone()
        localStorage.setItem("score",score)
        return
    }
    return
}

//hide the all done section until game is over
//when game is over show all done section and hide quiz section
//span with id score = score
//capture the initials and the scores on submit btn
//on submit btn go to highscores.html

var showAllDone = function() {
    timeEl.id = "hide"
    questionContainerEl.id = "hide"
    allDoneContainerEl.id = "show"
    scoreSpanEl.textContent = score
}

btnSubmitInitialsEl.addEventListener("click",function(event) {
    event.preventDefault()
    var userInitials = ""
    userInitials = initialInputEl.value;
    localStorage.setItem("User Initials", userInitials)
    window.location.href = "highscores.html"
})
startQuiz()
choicesContainerEl.addEventListener("click", answerChecker)