import { useState, useCallback, useEffect } from "react";
import Answers from "./Answers.jsx";
import Questions from "../Questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import QuizCompletedImg from "../assets/quiz-complete.png";


export default function Quiz() {
    const [answerState, setAnswerState] = useState("");
    const [userAnswer, setUserAnswers] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length - 1;

    // Shuffle answers only when the question changes
    useEffect(() => {
        const answers = [...Questions[activeQuestionIndex].answers];
        answers.sort(() => Math.random() - 0.5);
        setShuffledAnswers(answers);
    }, [activeQuestionIndex]);

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setAnswerState("answered");
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
        setTimeout(() => {
            if (selectedAnswer === Questions[activeQuestionIndex].answers[0]){
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }
            setTimeout(() => {
                setAnswerState("");
            }, 1000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    if (userAnswer.length === Questions.length) {
        return <div id="summary">
            <img src={QuizCompletedImg} alt="Quiz Completed" />
            <h2>
             Quiz Completed!
             </h2>
            </div>
    }
    return(
        <div id="quiz">
            <QuestionTimer 
                key={activeQuestionIndex}
                onTimeout={handleSkipAnswer}
                timeout={10000}
            />
            <h2>
                {Questions[activeQuestionIndex].text}
            </h2>
            <Answers 
                answers={shuffledAnswers} 
                onSelectAnswer={handleSelectAnswer} 
                answerState={answerState}
                correctAnswer={Questions[activeQuestionIndex].answers[0]}
                selectedAnswer={userAnswer[activeQuestionIndex]}
            />
        </div>
    );
}