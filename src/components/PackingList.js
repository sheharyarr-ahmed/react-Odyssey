import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
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
      <div className="actions">
        {/* assigning the value of that controlled element */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">SORT BY THE INPUT ORDER</option>
          <option value="description">SORT BY THE DESCRIPTION</option>
          <option value="packed">SORT BY THE PACKED STATUS</option>
        </select>
        <button onClick={onClearList}>CLEAR LIST</button>
      </div>
    </div>
  );
}
