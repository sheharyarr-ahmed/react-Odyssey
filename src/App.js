import { useState } from "react";
import "./index.css";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 12, packed: false },
// ]; dummy data
export default function App() {
  //  lift state up
  const [items, setItems] = useState([]);
  // const numItems = items.length
  //this function also got lifted up
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id);
    return setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
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
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>FAR AWAY</h1>;
}
function Form({ onAddItems }) {
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
function PackingList({ items, onDeleteItem, onToggleItem }) {
  // making an controlled element
  const [sortBy, setSortBy] = useState("input");
  let sortedItems; // we created this variabe beacause we dont want to make anothet useState because we jsut want to do computation on sortBy piece of state so thats why we derived the sortBy state and did some computation on it.
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div>
        {/* assigning the value of that controlled element */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">SORT BY THE INPUT ORDER</option>
          <option value="description">SORT BY THE DESCRIPTION</option>
          <option value="packed">SORT BY THE PACKED STATUS</option>
        </select>
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>START ADDING SOME ITEMS TO YOUR PACKING LIST</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "YOU GOT EVERYTHING! READY TO GO ✈️"
          : `YOU HAVE ${numItems} ITEMS ON YOUR LIST, AND YOU ALREADY PACKED
        ${numPacked} ${percentage}`}
      </em>
    </footer>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>

    //the condtion which we place inside the onClick function is that because the onClick function returns an event which will be called and that will call the onDeleteItem function
  );
}
