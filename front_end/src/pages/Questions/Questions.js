import React, {useEffect, useRef} from 'react'
import questions from "./QuestionList";
import '../style/Questions.css';


const Questions = () => {
    const nextButtonRef = useRef(null);
    const answerButtonsRef = useRef(null);
    const questionElementRef = useRef(null);


    useEffect(() => {
      
        const questionElement = questionElementRef.current;
   //   const questionElement = document.getElementById("question");
      
      const answerButtons = answerButtonsRef.current;
   //  const answerButtons = document.getElementById("answer-buttons");
      
      const nextButton = nextButtonRef.current;
   // const nextButton = document.getElementById("next-quizbtn");
    

        let currentQuestionIndex = 0;
        let score = 0;
        
    function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("quizbtn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function selectAnswer(e) {
    const selectedquizbtn = e.target;
    const isCorrect = selectedquizbtn.dataset.correct === "true";
    if (isCorrect) {
        selectedquizbtn.classList.add("correct");
        score++;
    } else {
        selectedquizbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
 }

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
     }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

  startQuiz(); })

  
  
  return (
    <div className='quizBody'>
      <>
        <div className="quizContainer">
        <h1>Quiz ##</h1>
        <div className="quiz">
            <h2 id="question" ref={questionElementRef}>question goes here</h2>
            <div id="answer-buttons" ref={answerButtonsRef}>
                <button className="quizbtn" type="button">answer 1</button>
                <button className="quizbtn" type="button">answer 2</button>
                <button className="quizbtn" type="button">answer 3</button>
                <button className="quizbtn" type="button">answer 4</button>
            </div>
            <button id="next-btn" ref={nextButtonRef} type="button">Next</button>
        </div>
    </div>
      </>
 
  </div>
   
  )
}

export default Questions;