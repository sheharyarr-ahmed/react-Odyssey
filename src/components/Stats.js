export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em> 🧳START ADDING SOME ITEMS TO YOUR PACKING LIST 🛍️</em>
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
