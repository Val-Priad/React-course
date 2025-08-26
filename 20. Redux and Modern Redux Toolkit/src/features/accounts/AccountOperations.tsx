import { useState } from "react";
import { useDispatch } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import { useAppSelector } from "../../store";
import { DEFAULT_CURRENCY } from "../../Config";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  const dispatch = useDispatch();
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    isLoading,
  } = useAppSelector((store) => store.account);

  function handleDeposit() {
    if (!Number.isFinite(+depositAmount)) return;

    // @ts-ignore
    dispatch(deposit(+depositAmount, currency));
    setDepositAmount("");
  }

  function handleWithdrawal() {
    if (!Number.isFinite(+withdrawalAmount)) return;

    dispatch(withdraw(+withdrawalAmount));
  }

  function handleRequestLoan() {
    if (!Number.isFinite(+loanAmount)) return;

    dispatch(requestLoan(+loanAmount, loanPurpose));
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>
            Pay back ${currentLoan} {currentLoanPurpose}
          </span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
