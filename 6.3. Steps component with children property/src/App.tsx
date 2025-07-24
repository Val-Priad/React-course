import React, { useState } from "react";

function App() {
  // TOLEARN all functions in react that start with use are hooks
  let [step, setStep] = useState(1);
  let [isOpen, setIsOpen] = useState(true);

  function handleNext() {
    // TOLEARN always use a callback to update a state
    if (step < 3) setStep((step) => ++step);
  }
  function handlePrevious() {
    if (step > 1) setStep((step) => --step);
  }

  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  return (
    <>
      <button
        className="close"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <Message step={step}>{messages[step - 1]}</Message>
          <div className="buttons">
            <Button
              backgroundColor="#7950f2"
              color="#fff"
              onClick={handlePrevious}
            >
              <span>👈</span> Pervious
            </Button>

            <Button
              backgroundColor="#7950f2"
              color="#fff"
              onClick={handleNext}
            >
              <span>👉</span> Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Message({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div className="message">
      <h3>Step {step}</h3> {children}
    </div>
  );
}

function Button({
  backgroundColor,
  color,
  onClick,
  children,
}: {
  backgroundColor: string;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
