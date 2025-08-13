import { useEffect } from "react";

function Timer({
  secondsRemaining,
  dispatch,
}: {
  secondsRemaining: number;
  dispatch: React.Dispatch<any>;
}) {
  const minutes = Math.trunc(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const interval = setInterval(() => {
        dispatch({ type: "updateTimer" });
      }, 1000);
      return () => clearInterval(interval);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {(minutes + "").padStart(2, "0")}:{(seconds + "").padStart(2, "0")}
    </div>
  );
}

export default Timer;
