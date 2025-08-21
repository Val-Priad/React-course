import { useQuestions } from "../Contexts/QuestionsContext";

function Options() {
  const { questions, questionIdx, answerIdx, dispatch } = useQuestions();
  const question = questions[questionIdx];
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={
            "btn btn-option" +
            (idx === answerIdx ? " answer " : "") +
            (answerIdx || answerIdx === 0
              ? idx === question.correctOption
                ? " correct "
                : " wrong "
              : "")
          }
          key={option}
          disabled={answerIdx !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: idx })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
