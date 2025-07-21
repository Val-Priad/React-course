import { useState } from "react";

function App() {
  const [advice, setAdvice] = useState("");
  let [adviceCount, setAdviceCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setAdviceCount(++adviceCount);
    console.log(data);
  }

  // useEffect(() => {
  //   getAdvice();
  // }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice!</button>
      <Message count={adviceCount}></Message>
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice:)
    </p>
  );
}

export default App;
