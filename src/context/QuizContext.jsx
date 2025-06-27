import { createContext, useContext, useState } from "react";
import Questions from "../Questions.js";

const quizContext = createContext();

export function QuizProvider({ children }) {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState("");
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    return (
    <quizContext.Provider value={{
      Questions,
      userAnswers,
      setUserAnswers,
      answerState,
      setAnswerState,
      activeQuestionIndex,
      setActiveQuestionIndex
    }}>
      {children}
    </quizContext.Provider>
  );
}

export function useQuiz() {
    return useContext(quizContext);
} //Global values to prevent re renders.