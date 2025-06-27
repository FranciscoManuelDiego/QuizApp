import React from "react";
const Summary = React.memo(function Summary ({ userAnswers, resetQuiz }) {
    return( 
    <div id="summary">
        <img src="/quiz-logo.png" alt="Quiz Completed" />
        <h2>Quiz Completed!</h2>
        <ul>
        {userAnswers.map((entry, index) => (
          <li key={index}>
            <strong className>Question {index + 1}:</strong> {entry.question}<br />
            <strong>Your Answer:</strong> {entry.selectedAnswer || "Skipped"}<br />
            <strong>Correct Answer:</strong> {entry.correctAnswer}<br />
            <strong>Result:</strong> {entry.isCorrect ? "✅" : "❌"}
          </li>
            ))}
        </ul>
        <button className="answer" onClick={resetQuiz}>Retry Quiz</button>
    </div>
)});

export default Summary;