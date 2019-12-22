var count = 0;
var timer = 75;
var stopTime;
var id;
var span = document.getElementById("time");
var questions = [
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
    title: "Arrays in Javascript are used to store ____.",
    choices: [
      "numers and strings",
      "boolean",
      "all of the above",
      "none of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["parentheses", "curly brackets", "quotes", "square brackets"],
    answer: "quotes"
  },
  {
    title: "We put JavaScript inside the ____ HTML element",
    choices: ["<body>", "<java>", "<script>", "<javascript>"],
    answer: "<script>"
  }
];

function start() {
  startTimer();
  var words = $(".words");
  var top = $(".top");
  var startquiz = document.getElementById("startbtn");
  var clock = document.getElementById("clock");

  words.remove();
  top.remove();
  startquiz.remove();
  clock.removeAttribute("class", "hidden");

  qC();
}

function qC() {
  var tDiv = $("<div>");
  tDiv.attr("class", "col-md-12 tDiv");
  var qDiv = $(".question");
  var aDiv = $("<div>");
  aDiv.attr("class", "col-md-12 aDiv");
  var cDiv = $(".answers");
  qDiv.append(tDiv);
  cDiv.append(aDiv);
  var question = $(".tDiv");
  var q = $("<h1>");
  q.attr("class", "q");
  q.text(questions[count].title);
  question.append(q);
  var choicesDiv = $(".aDiv");
  for (var x = 0; x < 4; x++) {
    var newChoice = $("<button>");
    newChoice.text(questions[count].choices[x]);
    newChoice.attr("class", "colorB");
    if (count === 4) {
      if (newChoice.text() === questions[count].answer) {
        newChoice.attr("onclick", "finishCorrect()");
      } else {
        newChoice.attr("onclick", "finishWrong()");
      }
    } else if (newChoice.text() === questions[count].answer) {
      newChoice.attr("onclick", "correctAnswer()");
    } else {
      newChoice.attr("onclick", "wrongAnswer()");
    }

    choicesDiv.append(newChoice);
  }

  count++;
}

function wrongAnswer() {
  var redoQ = $(".tDiv");
  redoQ.remove();
  var redoA = $(".aDiv");
  redoA.remove();
  qC();
  incorrect();
  loseTime();
}

function correctAnswer() {
  var redoQ = $(".tDiv");
  redoQ.remove();
  var redoA = $(".aDiv");
  redoA.remove();
  qC();
  correct();
}

function finished() {
  stopTime();
  span.innerHTML = timer;
  var top = $(".tDiv");
  var redoQ = $(".q");
  redoQ.text("All Done");
  var redoA = $(".aDiv");
  redoA.remove();
  var p = $("<p>");
  var label = $(
    '<label for="exampleFormControlInput1">Enter Initials:  </label>'
  );
  var input = $('<input id="input">');
  var submit = $("<button>Submit</button>");
  submit.attr("class", "main-buttons submit-btn");
  submit.attr("onclick", "submit()");
  p.text("Your score is " + span.innerHTML);
  p.attr("class", "newW");
  top.append(redoQ, p, label, input, submit);
  var clock = $("#clock");
  clock.attr("class", "hidden");
}

function finishCorrect() {
  correct();
  finished();
}

function finishWrong() {
  incorrect();
  loseTime();
  finished();
}

function startTimer() {
  id = setInterval(onSecond, 1000);
}

function stopTime() {
  clearInterval(id);
}

function onSecond() {
  timer--;
  if (timer >= 0) {
    span.innerHTML = timer;
  }
  if (timer === 0) {
    window.location.href = "scores.html";
  }
}

function loseTime() {
  timer -= 10;
  span.innerHTML = timer;
}

function correct() {
  var body = $(".aDiv");
  var line = $("<hr>");
  var message = $("<h2>Correct</h2>");
  body.append(line);
  body.append(message);
  setTimeout(function() {
    message.remove();
    line.remove();
  }, 3000);
}

function incorrect() {
  var body = $(".aDiv");
  var line = $("<hr>");
  var message = $("<h2>Wrong</h2>");
  body.append(line);
  body.append(message);
  setTimeout(function() {
    message.remove();
    line.remove();
  }, 3000);
}

var inputKey = "input";
var scoreKey = "score";

function submit() {
  var initial = document.querySelector("#input").value;
  var quizScore = span.innerHTML;

  localStorage.setItem(inputKey, initial);
  localStorage.setItem(scoreKey, quizScore);
  renderRegistered();
}

function renderRegistered() {
  window.location.href = "scores.html";
}

function highscores() {
  window.location.href = "scores.html";
}

function main() {
  window.location.href = "index.html";
}

function clearScore(){
  $("li").remove();
}
