import { useState } from "react";
import Questions from "../Questions.js";
export default function Quiz() {
    const [userAnswer, setUserAnswers] = useState([]);

    const activeQuestionIndex= userAnswer.length;
    return(
    <div id="quiz">
        <h1>
            {Questions[activeQuestionIndex].text}
            {Questions[activeQuestionIndex].id}
        </h1>
    </div>
)}