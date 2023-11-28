var correctAnswer;
var questionId = 4
var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timeoutHandler = setTimeout(forward, 3000);

fetch('/questions/1')
    .then(response => response.json())
    .then(data => showQuestion(data)
);

function showQuestion() {
    let question = hotList[displayedQuestion].question;
    if (!question) return;
    console.log(question);
    document.getElementById("questionText").innerText = question.questionText
    document.getElementById("answer1").innerText = question.answer1
    document.getElementById("answer2").innerText = question.answer2
    document.getElementById("answer3").innerText = question.answer3
    correctAnswer = question.correctAnswer;
    if (question.image) {
        document.getElementById("picture").src = "https://szoft1.comeback.hu/hajo/" + question.image;
        document.getElementById("picture").classList.remove("hidden")
    }
    else {
        document.getElementById("picture").classList.add("hiddden")
    }
    document.getElementById("answer1").classList.remove("correct", "incorrect");
    document.getElementById("answer2").classList.remove("correct", "incorrect");
    document.getElementById("answer3").classList.remove("correct", "incorrect");
}

function loadQuestion(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    showQuestion();
                }
            }
        );
}

function forward() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    showQuestion()
}

function back() {
    questionId--;
    loadQuestion(questionId)
}

window.onload = function (e) {
    console.log("Page loaded...");
    document.getElementById("forwardButton").onclick = forward;
    document.getElementById("backButton").onclick = back;
    loadQuestion(questionId)
}

function choose(n) {
    if (n != correctAnswer) {
        document.getElementById(`answer${n}`).classList.add("incorrect");
        document.getElementById(`answer${correctAnswer}`).classList.add("correct");
    }
    else {
        document.getElementById(`válasz${correctAnswer}`).classList.add("correct");
    }
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }
    for (var i = 0; i < questionsInHotList; i++) {
        loadQuestion(nextQuestion, i);
        nextQuestion++;
    }
}