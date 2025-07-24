import { ItemType } from "./App";

// TOLEARN component always must return something
export function Item({
  item,
  onDeleteItem,
  onToggleItem,
}: {
  item: ItemType;
  onDeleteItem: Function;
  onToggleItem: Function;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
