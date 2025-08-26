import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CURRENCY } from "../../Config";

export type TAccountState = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

const initialStateAccount: TAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export type TAccountAction =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; purpose: string };
    }
  | { type: "account/payLoan" }
  | { type: "account/convertingCurrency" };

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    requestLoan: (state, action) => {
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
    },
    payLoan: (state) => {
      state.balance += state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency: (state) => {
      state.isLoading = true;
    },
  },
});
export function deposit(amount: number, currency: string) {
  if (currency === DEFAULT_CURRENCY) {
    return { type: "account/deposit", payload: amount };
  }

  return async function (
    dispatch: React.Dispatch<TAccountAction>,
    getState: () => TAccountState
  ) {
    dispatch({ type: "account/convertingCurrency" });
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=${DEFAULT_CURRENCY}`
    );
    const data = await response.json();

    const convertedAmount = (amount * data.rates[DEFAULT_CURRENCY]).toFixed(2);

    dispatch({ type: "account/deposit", payload: +convertedAmount });
  };
}
export function withdraw(amount: number): TAccountAction {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount: number, purpose: string): TAccountAction {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}

export function payLoan(): TAccountAction {
  return { type: "account/payLoan" };
}

export function accountReducer(
  state = initialStateAccount,
  action: TAccountAction
): TAccountState {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      if (action.payload > state.balance) return state;
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
