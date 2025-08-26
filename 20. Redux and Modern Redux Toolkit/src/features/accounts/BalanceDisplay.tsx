import { DEFAULT_CURRENCY } from "../../Config";
import { useAppSelector } from "../../store";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: DEFAULT_CURRENCY,
  }).format(value);
}

function BalanceDisplay() {
  const balance = useAppSelector((store) => store.account.balance);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
