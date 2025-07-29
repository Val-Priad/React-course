import "../index.css";
import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

function App() {
  const [items, setItems] = useState<[] | ItemType[]>([]);

  function handleAddItems(item: ItemType) {
    return setItems((items) => [...items, item]);
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

  function handleDeleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
