import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import { getTotalCartPrice, getTotalCartQuantity } from "./CartSlice";
import { formatCurrency } from "../utilities/helpers";

function CartOverview() {
  const totalQuantity = useAppSelector((store) => getTotalCartQuantity(store));
  const totalPrice = useAppSelector((store) => getTotalCartPrice(store));

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
