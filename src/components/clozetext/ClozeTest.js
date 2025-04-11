import React, { useState } from "react";
import Button from "../button/Button";
import "./ClozeText.css";

const ClozeText = ({ args }) => {
    const [userInputs, setUserInputs] = useState(Array(args.length - 1).fill(""));
    const [feedback, setFeedback] = useState(Array(args.length - 1).fill(null));
    const [finalMessage, setFinalMessage] = useState("");
    const [allCorrect, setAllCorrect] = useState(null);

    const correctAnswers = args.slice(1);

    const handleChange = (index, value) => {
        const newInputs = [...userInputs];
        newInputs[index] = value;
        setUserInputs(newInputs);
        setFeedback((prev) => {
            const newFeedback = [...prev];
            newFeedback[index] = null;
            return newFeedback;
        });
        setAllCorrect(null);
    };

    const checkAnswers = () => {
        const newFeedback = userInputs.map(
            (input, index) => input.trim().toLowerCase() === correctAnswers[index].toLowerCase()
        );

        setFeedback(newFeedback);

        const isAllCorrect = newFeedback.every(Boolean);
        setAllCorrect(isAllCorrect);
        setFinalMessage(isAllCorrect ? "¡Todo correcto, super trabajo!" : "Hay algunos errores.");
    };

    return (
        <div className="cloze-text">
            <p>
                {args[0].split("___").map((part, index) => (
                    <React.Fragment key={index}>
                        {part}
                        {index < correctAnswers.length && (
                            <input
                                type="text"
                                value={userInputs[index]}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className={`cloze-input ${feedback[index] === false ? "error" : ""}`}
                                placeholder="..."
                            />
                        )}
                    </React.Fragment>
                ))}
            </p>
            <Button onClick={checkAnswers} className={`cloze-button ${allCorrect === true ? "correct" : allCorrect === false ? "wrong" : ""}`}>
                Evaluación
            </Button>
            {allCorrect !== null && <p className={`final-message ${allCorrect ? "success" : "fail"}`}>{finalMessage}</p>}
        </div>
    );
};

export default ClozeText;
