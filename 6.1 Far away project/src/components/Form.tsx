import { useState, FormEvent } from "react";

export default function Form({ onAddItems }: { onAddItems: Function }) {
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
