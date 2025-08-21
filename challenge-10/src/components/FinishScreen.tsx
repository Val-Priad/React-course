import { useQuestions } from "../Contexts/QuestionsContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highScore, dispatch } = useQuestions();
  const percentage = Math.ceil((points * 100) / maxPossiblePoints);
  let emoji;
  if (percentage === 100) emoji = "😏";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 60) emoji = "☺️";
  else if (percentage >= 50) emoji = "😐";
  else if (percentage >= 30) emoji = "😔";
  else if (percentage >= 0) emoji = "🤡";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({percentage}%)
      </p>
      <p className="highscore">High score: {highScore} points</p>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
