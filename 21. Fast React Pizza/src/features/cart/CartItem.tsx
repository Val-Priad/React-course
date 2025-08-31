import { type CartItem } from "../services/apiRestaurant";
import { formatCurrency } from "../utilities/helpers";
import ChangeItemQtyButtons from "./ChangeItemQtyButtons";
import RemoveItemButton from "./RemoveItemButton";

function CartItem({ item }: { item: CartItem }) {
  const { pizzaId: id, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <div className="flex items-center gap-1 md:gap-3">
          <ChangeItemQtyButtons id={id} />
          <RemoveItemButton id={id} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
