import "./app.css";
import { useState } from "react";

function App() {
  const today = new Date();
  let [count, setCount] = useState(0);
  let [step, setStep] = useState(1);

  let date = new Date();
  date.setDate(today.getDate() + count);

  return (
    <div className="container">
      <div className="modification-container">
        <p>{step}</p>
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
      </div>
      <div className="modification-container">
        <button
          onClick={() => {
            setCount(() => count - step);
          }}
          className="btn"
        >
          &#45;
        </button>
        <input
          type="text"
          value={count}
          onChange={(e: any) => {
            let value = +e.target.value;
            if (!Number.isInteger(value)) return;
            setCount(value);
          }}
        />
        <button
          onClick={() => {
            setCount(() => count + step);
          }}
          className="btn"
        >
          &#43;
        </button>
      </div>
      <h1 className="date">
        {count > 0
          ? `${count} days from today is `
          : count < 0
          ? `${count} days ago was `
          : "Today is "}
        {date.toDateString()}
      </h1>
      {count === 0 ? (
        ""
      ) : (
        <button
          className="reset"
          onClick={() => {
            setStep(1);
            setCount(0);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default App;
