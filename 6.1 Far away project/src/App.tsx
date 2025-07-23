import "./index.css";
import { FormEvent, useState } from "react";

type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

function App() {
  const [items, setItems] = useState<[] | ItemType[]>([]);
  function handleAddItems(item: ItemType) {
    return setItems(() => [...items, item]);
  }
  function handleDeleteItem(id: number) {
    // TOLEARN If you modify current state using this state always pass it
    // to setSomething(), it guaranties that it will modify current state
    // correctly
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> &#127796; Far Away 👜</h1>;
}

function Form({ onAddItems }: { onAddItems: Function }) {
  const [description, setDescription] = useState("");
  const [quantity, setQty] = useState(1);
  // TOLEARN
  // Use a callback function when:
  //   - The new state depends on the previous state
  //   - You're making multiple state updates in quick succession
  //   - You need to ensure you're working with the most current state value

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDescription("");
    setQty(1);
    onAddItems(newItem);
    console.log(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name=""
        id=""
        value={quantity}
        onChange={(e) => setQty(+e.target.value)}
      >
        {Array.from({ length: 20 }).map((_, idx) => (
          <option key={idx} value={idx + 1}>
            {idx + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// TOLEARN component always must return something
function Item({
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

function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
}: {
  items: ItemType[];
  onDeleteItem: Function;
  onToggleItem: Function;
}) {
  return (
    <div className="list">
      <ul>
        {items.map((item: ItemType) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

export default App;
