import { useQuestions } from "../Contexts/QuestionsContext";

function NextButton() {
  const { dispatch, answerIdx, questionIdx, questionsQty } = useQuestions();
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
