import { useReducer } from "react";

const INITIAL_STEP = 1;
const INITIAL_COUNT = 0;

type TState = {
  count: number;
  step: number;
};

type TAction = {
  type: string;
  payload?: any;
};

function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case "dec":
      return { ...state, count: --state.count };
    case "inc":
      return { ...state, count: ++state.count };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { count: INITIAL_COUNT, step: INITIAL_STEP };
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const initialState = { count: INITIAL_COUNT, step: INITIAL_STEP };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e: any) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e: any) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
