// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { ChangeEvent, useEffect, useState } from "react";

type ExchangeRateResponseT = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export default function App() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [amount, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  let [output, setOutput] = useState<string | null>(null);

  function convertCurrency() {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Error fetching data =(");
        const data: ExchangeRateResponseT = await res.json();

        setOutput(data.rates[currencyTo] + "");
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          } else console.log("Unexpected error 💥💥💥");
        }
      }
    }

    setOutput(null);
    setError("");

    if (currencyFrom === currencyTo) {
      setOutput(amount);
      return;
    }
    if (!Number.isFinite(+amount)) return;
    if (+amount === 0) return;

    fetchData();

    return function () {
      controller.abort();
    };
  }

  useEffect(convertCurrency, [currencyFrom, currencyTo, amount]);

  return (
    <div className="App">
      <input
        type="text"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCurrency(e.target.value);
        }}
      />
      <select
        value={currencyFrom}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setCurrencyFrom(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setCurrencyTo(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {isLoading && "Loading..."}
        {output && (
          <>
            {Number(output).toFixed(2)} {currencyTo}
          </>
        )}
        {error && <>{error}</>}
      </p>
    </div>
  );
}
