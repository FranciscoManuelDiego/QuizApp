import Header from './components/Header';
import { QuizProvider } from './context/QuizContext';
import Quiz from './components/Quiz';

function App() {
    return (
        <QuizProvider>
            <div>
                <Header />
            <main>
                <Quiz />
            </main>
                <p style={{textAlign: "center",
                    textSize: "1.5rem",
                }}>Developed by Francisco Diego</p>
            </div>
        </QuizProvider>
    );
}

export default App;
