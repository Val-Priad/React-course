import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { accountReducer } from "./features/accounts/accountSlice";
import { customerReducer } from "./features/customers/customerSlice";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunk))
);

export type TRootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
