import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { removeItem } from "./CartSlice";

function RemoveItemButton({ id }: { id: number }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(removeItem(id))} type="small">
      Remove
    </Button>
  );
}

export default RemoveItemButton;
