import { useState } from "react";
import Questions from "../Questions.js";
import QuizCompletedImg from "../assets/quiz-complete.png";

export default function Quiz() {
    const [userAnswer, setUserAnswers] = useState([]);
   

    function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];  //Updating the previous state
        })
    }

    const activeQuestionIndex= userAnswer.length;
     const shuffledAnswers = Questions[activeQuestionIndex].answers.sort(() => Math.random() - 0.50) // Creates a new array from the questions.
    if (shuffledAnswers.length === activeQuestionIndex) {
        return <div id="summary">
            <img src={QuizCompletedImg} alt="Quiz Completed" />
            <h2>
             Quiz Completed!
             </h2>
            </div> // If there are no answers left, display a message.
    }
    return(
    <div id="quiz">
        <h1>
            {Questions[activeQuestionIndex].text}
        <ul id="answers">
            {shuffledAnswers.map((answer, index) => (
                <li key={index} className="answer">
                    <button onClick={() => handleSelectAnswer(answer)} >
                        {answer}
                    </button>
                </li>
            ))}
        </ul>
        </h1>
    </div>
)
}
// Function on button invokes only once per button click