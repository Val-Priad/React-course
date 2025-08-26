import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useAppSelector } from "./store";

function App() {
  const customerName = useAppSelector((store) => store.customer.fullName);
  const customerCreated = customerName.length > 0;
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customerCreated && (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}

      {!customerCreated && <CreateCustomer />}
    </div>
  );
}

export default App;
