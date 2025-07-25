import { useState } from "react";
import "./App.css";

function App() {
  let [billAmount, setBillAmount] = useState<number>(0);
  let [percentage1, setPercentage1] = useState(0);
  let [percentage2, setPercentage2] = useState(0);

  function handleReset() {
    setBillAmount(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  const tip = (percentage1 + percentage2) / 2;
  const total = billAmount + (billAmount * tip) / 100;
  return (
    <div className="container">
      <BillAmount billAmount={billAmount} onBillAmountUpdate={setBillAmount}>
        How much was the bill?
      </BillAmount>
      <ServiceSatisfaction
        percentage={percentage1}
        onPercentageChange={setPercentage1}
      >
        How did you like the service
      </ServiceSatisfaction>
      <ServiceSatisfaction
        percentage={percentage2}
        onPercentageChange={setPercentage2}
      >
        How did your friend like the service
      </ServiceSatisfaction>
      {billAmount !== 0 && (
        <>
          <Bill>
            You pay {total} ({billAmount} + {tip} tip)
          </Bill>
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

export default App;

function BillAmount({
  children,
  billAmount,
  onBillAmountUpdate,
}: {
  children: React.ReactNode;
  billAmount: number;
  onBillAmountUpdate: Function;
}) {
  return (
    <div>
      <h3>{children}</h3>{" "}
      <input
        className="input--number"
        type="number"
        value={billAmount === 0 ? "" : billAmount}
        onChange={(e) => {
          onBillAmountUpdate(+e.target.value);
        }}
      />
    </div>
  );
}

function ServiceSatisfaction({
  children,
  percentage,
  onPercentageChange,
}: {
  children: React.ReactNode;
  percentage: number;
  onPercentageChange: Function;
}) {
  return (
    <div>
      <h3>{children} </h3>
      <select
        onChange={(e) => {
          const newValue = e.target.value;
          console.log(newValue);
          if (!Number.isFinite(+newValue)) return;
          onPercentageChange(+newValue);
        }}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">It was amazing (20%)</option>
      </select>
    </div>
  );
}

function Bill({ children }: { children: React.ReactNode }) {
  return <h3>{children}</h3>;
}

function Reset({ onReset }: { onReset: () => void }) {
  return <button onClick={onReset}>Reset</button>;
}
