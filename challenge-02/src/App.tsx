import "./app.css";
import { useState } from "react";

function App() {
  const today = new Date();
  let [count, setCount] = useState(0);
  let [step, setStep] = useState(1);
  // TOLEARN when react rerenders the component it computes everything again
  // but with updated values, so all dependent on updated values variables will
  // also update
  let date = new Date();
  date.setDate(today.getDate() + count);

  return (
    <div className="container">
      <div className="modification-container">
        <button onClick={() => setStep(() => --step)} className="btn">
          &#45;
        </button>
        <p>Step: {step}</p>
        <button onClick={() => setStep(() => ++step)} className="btn">
          &#43;
        </button>
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
        <p>Count: {count}</p>
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
    </div>
  );
}

export default App;
