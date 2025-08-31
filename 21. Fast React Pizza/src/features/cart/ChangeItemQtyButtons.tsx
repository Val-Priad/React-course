import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import {
  decreaseItemQuantity,
  getQtyById,
  increaseItemQuantity,
} from "./CartSlice";
import { useAppSelector } from "../../store";

function ChangeItemQtyButtons({ id }: { id: number }) {
  const dispatch = useDispatch();
  const itemQty = useAppSelector((store) => getQtyById(store, id));
  return (
    <>
      <Button onClick={() => dispatch(decreaseItemQuantity(id))} type="round">
        -
      </Button>
      <p>{itemQty}</p>
      <Button onClick={() => dispatch(increaseItemQuantity(id))} type="round">
        +
      </Button>
    </>
  );
}

export default ChangeItemQtyButtons;
