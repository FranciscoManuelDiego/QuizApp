import { useState, useCallback, useEffect } from "react";
import Answers from "./Answers.jsx";
import { useQuiz } from "../context/QuizContext.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
import Summary from "./Summary.jsx";


export default function Quiz() {
    const {
        Questions,
        userAnswers,
        setUserAnswers,
        answerState,
        setAnswerState,
        activeQuestionIndex,
        setActiveQuestionIndex
    } = useQuiz();
     // Guard against out-of-bounds
    if (!Questions[activeQuestionIndex]) {
        return null;
    }

    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false); // To ask the user if they want to start
    

    const quizFinished = userAnswers.length === Questions.length;
    // Shuffle answers only when the question changes
    useEffect(() => {
        const answers = [...Questions[activeQuestionIndex].answers];
        answers.sort(() => Math.random() - 0.5);
        setShuffledAnswers(answers);
    }, [activeQuestionIndex , Questions]);

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
         if (quizFinished) return; // Prevent updates after quiz ends

        setAnswerState("answered");
        setUserAnswers(prev => [
        ...prev,
        {
            question: Questions[activeQuestionIndex].text,
            selectedAnswer: selectedAnswer,
            correctAnswer: Questions[activeQuestionIndex].answers[0],
            isCorrect: selectedAnswer === Questions[activeQuestionIndex].answers[0],
        }
        ]);
        setTimeout(() => {
            // Check again in case the quiz finished while waiting
        if (userAnswers.length + 1 === Questions.length) return;
            if (selectedAnswer === Questions[activeQuestionIndex].answers[0]){ // This signals that the first answer is the correct one.
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }
            setTimeout(() => {
                // Check again in case the quiz finished while waiting
                if (userAnswers.length + 1 === Questions.length) return;
                setAnswerState("");
                setActiveQuestionIndex(prev => prev + 1);
            }, 1000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        if (quizFinished) return;
        // Only skip if the user hasn't answered yet
        if (answerState === "") {
            handleSelectAnswer(null);
        }
    }, [handleSelectAnswer]);

    
     if (!quizStarted) {
        return (
        <div id="start-screen">
            <h2>Welcome to the History Quiz!</h2>
            <p> How much do you know about history? Test your knowledge with this quiz.
                (You can translate the quiz with the browser aswell.)
            </p>
            <button className="answer" onClick={() => setQuizStarted(true)}>
             Start Quiz
            </button>
        </div>
        );
    }

    if (userAnswers.length === Questions.length) {
        return(
            <Summary userAnswers={userAnswers} resetQuiz={handleResetQuiz} />
        )
    } //Takes the answer and shows it in the summary component.
    function handleResetQuiz() {
        setUserAnswers([]);
        setActiveQuestionIndex(0);
        setAnswerState("");
    }
    return(
        <div id="quiz">
            <QuestionTimer 
                questionIndex={activeQuestionIndex}
                onTimeout={handleSkipAnswer}
                timeout={17000}
            />
            <h2>
                {Questions[activeQuestionIndex].text}
            </h2>
            <Answers 
                answers={shuffledAnswers} 
                onSelectAnswer={handleSelectAnswer} 
                answerState={answerState}
                correctAnswer={Questions[activeQuestionIndex].answers[0]}
                selectedAnswer={userAnswers[activeQuestionIndex]?.selectedAnswer} // ?. means optional chaining, it will return undefined if the object is not defined yet
            />
        </div>
    );
}
