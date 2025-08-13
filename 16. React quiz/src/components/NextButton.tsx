function NextButton({
  dispatch,
  answerIdx,
  questionIdx,
  questionsQty,
}: {
  dispatch: React.Dispatch<any>;
  answerIdx: number | null;
  questionsQty: number;
  questionIdx: number;
}) {
  if (answerIdx === null) return null;
  if (questionIdx + 1 < questionsQty)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next question &rarr;
      </button>
    );
  else
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish quiz ⭐
      </button>
    );
}

export default NextButton;
