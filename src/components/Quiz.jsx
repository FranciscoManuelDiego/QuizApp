import { useState } from "react";
import Questions from "../Questions.js";
export default function Quiz() {
    const [userAnswer, setUserAnswers] = useState([]);
   

    function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];  //Updating the previous state
        })
    }

    const activeQuestionIndex= userAnswer.length;
     const shuffledAnswers = Questions[activeQuestionIndex].answers.sort(() => Math.random() - 0.50) // Creates a new array from the questions.
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
// Funciton on button invokes only once per button click