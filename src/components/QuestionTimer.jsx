import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeout, questionIndex }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // Reset timer when question changes
    useEffect(() => {
        setRemainingTime(timeout);
    }, [timeout, questionIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 85) {
                    clearInterval(interval);
                    onTimeout();
                    return 0;
                }
                return prev - 85;
            });
        }, 85);

        return () => clearInterval(interval);
    }, [timeout, onTimeout, questionIndex]);

    return (
        <progress
            id="question-time"
            value={remainingTime}
            max={timeout}
            style={{ width: "100%", height: "20px" }}
        />
    );
}