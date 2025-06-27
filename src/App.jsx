import Header from './components/Header';
import { QuizProvider } from './context/QuizContext';
import Quiz from './components/Quiz';
function App() {
    return (
        <QuizProvider>
            <div className="App">
                <Header />
            <main>
                <Quiz />
            </main>
            </div>
        </QuizProvider>
    );
}

export default App;
