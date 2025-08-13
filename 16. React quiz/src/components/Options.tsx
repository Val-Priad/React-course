import { TQuestion } from "./App";

function Options({
  question,
  dispatch,
  answerIdx,
}: {
  question: TQuestion;
  answerIdx: number | null;
  dispatch: React.Dispatch<any>;
}) {
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
