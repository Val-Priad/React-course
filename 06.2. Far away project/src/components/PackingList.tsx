import { useState } from "react";
import { ItemType } from "./App";
import { Item } from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteAllItems,
}: {
  items: ItemType[];
  onDeleteItem: Function;
  onToggleItem: Function;
  onDeleteAllItems: () => void;
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedArray;
  switch (sortBy) {
    case "description":
      sortedArray = items.toSorted((a, b) =>
        a.description.localeCompare(b.description)
      );
      break;
    case "packed":
      sortedArray = items.toSorted(
        (a, b) => Number(a.packed) - Number(b.packed)
      );
      break;
    default:
      sortedArray = items;
  }
  return (
    <div className="list">
      <ul>
        {sortedArray.map((item: ItemType) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteAllItems}>Clear list</button>
      </div>
    </div>
  );
}
