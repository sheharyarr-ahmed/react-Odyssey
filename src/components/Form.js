import { useState } from "react";

export default function Form({ onAddItems }) {
  //implementation of controlled element in the forms
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]); //we want thsi new items and the value which is sotred in it we want to pass those data into packing list therefore we will now use lifting state up, hence we want to use this into both forms and packing list therefore we will move to its common parent element which in this is the app component
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {/* the onSubmit is an forms special property */}
      <h3>WHAT DO YOU NEED FOR YOUR TRIP?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="ITEM..."
        value={description} //implementation of controlled element
        onChange={(e) => setDescription(e.target.value)} //implementation of controlled element
      />
      <button>Add</button>
    </form>
  );
}
