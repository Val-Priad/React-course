import LinkButton from "../ui/LinkButton";
import Button from "../ui/Button";
import CartItem from "./CartItem";
import { useAppSelector } from "../../store";
import { clearCart, getCart } from "./CartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useAppSelector((state) => state.user.username);
  const cart = useAppSelector((state) => getCart(state));
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b border-b-stone-200">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="small" to="/order/new">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
