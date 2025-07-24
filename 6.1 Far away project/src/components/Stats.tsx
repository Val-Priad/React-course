import { ItemType } from "./App";

export default function Stats({ items }: { items: ItemType[] }) {
  const totalItemsQty = items.length;
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const packedItemsQty = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItemsQty * 100) / totalItemsQty);
  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100 ? (
          <>You have everything! Ready to go 🛫</>
        ) : (
          <>
            You have {totalItemsQty} items on your list, and you already packed
            {" " + packedItemsQty}{" "}
            {Number.isNaN(packedPercentage) ? "" : <>({packedPercentage}%)</>}
          </>
        )}
      </em>
    </footer>
  );
}
