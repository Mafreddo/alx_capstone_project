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
        question: "The “Father of Artificial Intelligence” is",
        answer: [
            {text: "Charles Babbage", correct: false},
            {text: "John McCathy", correct: true},
            {text: "Allan Turing", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
    question: "Blind Search can be used for which of the following situations?",
    answer: [
        {text: "Real life simulation", correct: false},
        {text: "Advanced game theory", correct: false},
        {text: "Small Search Space", correct: true},
        {text: "Search Engine Optimisation", correct: false},
        ]
    },
    {
        question: "The name of the Artificial Intelligence system developed by Daniel Bobrow was?",
        answer: [
            {text: "STUDENT", correct: true},
            {text: "SIMD", correct: false},
            {text: "BACON", correct: false},
            {text: "SLUSH", correct: false},
            ]
    },
    {
        question: "Which of the following is a type of artificial intelligence agent?",
        answer: [
            {text: "Learni AI Agent", correct: false},
            {text: "Simple Reflex AI Agent", correct: false},
            {text: "Goal-Based AI Agent", correct: false},
            {text: "All of the above", correct: true},
            ]
    },
    {
        question: "Which of the following architecture is also known as systolic arrays?",
        answer: [
            {text: "SISD", correct: false},
            {text: "MISD", correct: true},
            {text: "SIMD", correct: false},
            {text: "None of the above", correct: false},
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