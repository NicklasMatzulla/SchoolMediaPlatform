import React, {useState} from "react";
import Button from "../button/Button";
import "./MultiChoice.css";

const MultiChoice = ({ args }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [feedback, setFeedback] = useState(null);

    const questions = [];
    const correctAnswers = {};

    for (let i = 0; i < args.length; i += 3) {
        const question = args[i].trim(); // Frage
        const options = args[i + 1].split(";").map(option => option.trim());
        correctAnswers[question] = args[i + 2].split(";").map(answer => answer.trim());

        questions.push({
            question,
            options,
        });
    }

    const handleSelect = (question, index, isSingleChoice) => {
        setSelectedAnswers((prev) => {
            if (isSingleChoice) {
                return { ...prev, [question]: [index] };
            }
            const currentSelection = prev[question] || [];
            const newSelection = currentSelection.includes(index)
                ? currentSelection.filter((i) => i !== index)
                : [...currentSelection, index];

            return { ...prev, [question]: newSelection };
        });
    };

    const checkAnswers = () => {
        const results = {};
        let allCorrect = true;

        questions.forEach(({ question, options }) => {
            const selected = selectedAnswers[question] || [];
            const correct = correctAnswers[question] || [];

            if (selected.length === 0) {
                results[question] = false;
                allCorrect = false;
            } else {
                const isCorrect =
                    selected.length === correct.length && selected.every((index) => correct.includes(options[index]));

                results[question] = isCorrect;

                if (!isCorrect) allCorrect = false;
            }
        });

        setFeedback({
            results,
            message: allCorrect ? "¡Todo correcto, super trabajo!" : "Hay algunos errores.",
        });
    };

    return (
        <div className="multi-choice">
            {questions.map(({ question, options }) => (
                <div key={question} className="multi-choice-block">
                    <p className="multi-choice-question">{question}</p>
                    {options.map((text, index) => (
                        <label
                            key={index}
                            className={`multi-choice-option ${feedback?.results?.[question] === false ? "error" : ""}`}
                        >
                            <input
                                type="checkbox"
                                name={question}
                                checked={(selectedAnswers[question] || []).includes(index)}
                                onChange={() => handleSelect(question, index, false)}
                            />
                            <span className="custom-input"></span>
                            {text}
                        </label>
                    ))}
                </div>
            ))}
            <Button onClick={checkAnswers} className="multi-choice-button">Evaluación</Button>
            {feedback && (
                <p className={`final-message ${feedback.results ? "success" : "fail"}`}>{feedback.message}</p>
            )}
        </div>
    );
};

export default MultiChoice;
