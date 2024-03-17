function startCountdDown(duration,display){
    let timer = duration,minutes,seconds;
    setInterval(function(){
        minutes = parseInt(timer / 60,10);
        seconds = parseInt(timer % 60, 10); 

        minutes = minutes < 5 ? "0" + minutes : minutes;
        seconds = seconds < 5 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" +seconds;

        if(--timer < 0){
            timer = duration;
            alert("time is up!!!")
        }
    }, 1000);
}

window.onload = function(){
    let duration  = 300; //5 minutes
    let display = document.querySelector('#timer');
    startCountdDown(duration,display);
};

const questions = [
    {
        question: "How many rings are on the Olympic flag?",
        answer: [
            {text: "None", correct: false},
            {text: "4", correct: true},
            {text: "5", correct: false},
            {text: "7", correct: false},
        ]
    },
    {
    question: "What is a tarsier?",
    answer: [
        {text: "A bird", correct: false},
        {text: "A lizard", correct: false},
        {text: "A primate", correct: true},
        {text: "A fish", correct: false},
        ]
    },
    {
        question: "How did spiderman get his powers?",
        answer: [
            {text: "He was bitten by a radioactive spider", correct: true},
            {text: "He was born with spiders", correct: false},
            {text: "he is a casualty of military experiment that went wrong", correct: false},
            {text: "He woke up with spiders after a strange dream", correct: false},
            ]
    },
    {
        question: "Which of these animals does NOT appear in the Chinese zodiac?",
        answer: [
            {text: "Bear", correct: true},
            {text: "Dog", correct: false},
            {text: "Dragon", correct: false},
            {text: "Rabbit", correct: false},
            ]
    },
    {
        question: "How many hoes are on a standard bowling ball",
        answer: [
            {text: "2", correct: false},
            {text: "3", correct: true},
            {text: "5", correct: false},
            {text: "None", correct: false},
            ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startquiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". "+ currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextbutton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(f){
    const selectedBtn = f.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block"; 
} 

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! You can do better. `;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startquiz();
    }
});

startquiz();