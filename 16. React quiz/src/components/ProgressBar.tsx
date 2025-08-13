function ProgressBar({
  questionsQty,
  questionIdx,
  points,
  maxPossiblePoints,
}: {
  questionIdx: number;
  questionsQty: number;
  points: number;
  maxPossiblePoints: number;
}) {
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
