export default function Answers({ answers, onSelectAnswer, answerState, correctAnswer, selectedAnswer }) {
    return (
        <ul id="answers">
            {answers.map((answer, index) => {
                let classes = "";
                if (answerState === "answered" && selectedAnswer === answer) {
                    classes = "selected";
                }
                if (answerState === "correct" && selectedAnswer === answer) {
                    classes = "correct";
                }
                if (answerState === "wrong") {
                    if (selectedAnswer === answer) {
                        classes = "wrong";
                    }
                    if (answer === correctAnswer) {
                        classes = "correct";
                    }
                }
                return (
                    <li key={index} className="answer">
                        <button
                            onClick={() => onSelectAnswer(answer)}
                            className={classes}
                            disabled={answerState !== ""}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}