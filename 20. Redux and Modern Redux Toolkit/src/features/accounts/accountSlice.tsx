import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CURRENCY } from "../../Config";
import { AppDispatch } from "../../store";

export type TAccountState = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

const initialState: TAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      if (action.payload <= 0) return;
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw: (state, action) => {
      if (action.payload <= 0) return;
      if (action.payload > state.balance) return;

      state.balance -= action.payload;
    },
    requestLoan: (state, action) => {
      if (state.loan > 0) return;
      if (action.payload.amount <= 0) return;
      if (action.payload.purpose.length === 0) return;

      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance += action.payload.amount;
    },
    payLoan: (state) => {
      state.balance -= state.loan;
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

  return async function (dispatch: AppDispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=${DEFAULT_CURRENCY}`
    );
    const data = await response.json();

    const convertedAmount = (amount * data.rates[DEFAULT_CURRENCY]).toFixed(2);

    dispatch({ type: "account/deposit", payload: +convertedAmount });
  };
}

export const { withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions;

export default accountSlice.reducer;
