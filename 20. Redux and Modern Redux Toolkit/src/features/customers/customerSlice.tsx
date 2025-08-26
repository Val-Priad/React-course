export type TCustomerState = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

export type TCustomerAction =
  | {
      type: "customer/createCustomer";
      payload: { fullName: string; nationalID: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export function createCustomer(
  fullName: string,
  nationalID: string
): TCustomerAction {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName: "string"): TCustomerAction {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

export function customerReducer(
  state = initialStateCustomer,
  action: TCustomerAction
): TCustomerState {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
