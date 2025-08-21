import { useQuestions } from "../Contexts/QuestionsContext";

function ProgressBar() {
  const { questionsQty, questionIdx, points, maxPossiblePoints } =
    useQuestions();
  return (
    <header className="progress">
      <progress max={questionsQty} value={questionIdx + 1} />
      <p>
        Question <strong>{questionIdx + 1}</strong> / {questionsQty}
      </p>
      <p>
        Points <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default ProgressBar;
