import { useAppSelector } from "../../store";

function Customer() {
  const customerName = useAppSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
