import { useDispatch } from "react-redux";
import { Pizza } from "../services/apiRestaurant";
import Button from "../ui/Button";
import { formatCurrency } from "../utilities/helpers";
import RemoveItemButton from "../cart/RemoveItemButton";
import { useAppSelector } from "../../store";
import { getQtyById } from "../cart/CartSlice";
import ChangeItemQtyButtons from "../cart/ChangeItemQtyButtons";

function MenuItem({ pizza }: { pizza: Pizza }) {
  const dispatch = useDispatch();
  const { name, id, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const itemQty = useAppSelector((state) => getQtyById(state, id));
  const isInCart = itemQty > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch({ type: "cart/addItem", payload: newItem });
  }

  return (
    <li className="flex gap-4 py-2 pt-0.5">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}

          {isInCart && (
            <div className="flex items-center gap-1 md:gap-3">
              <ChangeItemQtyButtons id={id} />
              <RemoveItemButton id={id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
