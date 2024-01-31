import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Watch", quantity: 12, packed: false },
  { id: 4, description: "Cap", quantity: 12, packed: true },
];

export default function App() {
  // state
  const [totalItems, setTotalItems] = useState(initialItems);

  const handleItems = (item) => {
    setTotalItems([...totalItems, item]);
  };

  const UpdateAfterCheck = (updatedItems) => {
    setTotalItems(updatedItems);
  };
  const UpdateAfterDelete = (updatedItems) => {
    setTotalItems(updatedItems);
  };

  return (
    <div className="app">
      <Header />
      <FormBar handleItems={handleItems} />
      <List
        UpdateAfterCheck={UpdateAfterCheck}
        UpdateAfterDelete={UpdateAfterDelete}
        totalItems={totalItems}
        setTotalItems={setTotalItems}
      />
      <Footer totalItems={totalItems} />
    </div>
  );
}

function Header() {
  return <h1>🏝️ FAR AWAY 🧳</h1>;
}

function FormBar({ handleItems }) {
  // States
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handling Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  // Handling Change
  const handleChange = (value) => {
    setDescription(value);
  };

  const handleOption = (value) => {
    setQuantity(value);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😍</h3>
      <select
        id="mySelect"
        name="mySelect"
        onChange={(e) => handleOption(e.target.value)}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={description}
      />
      <button>Add</button>
    </form>
  );
}

function List({ UpdateAfterCheck, UpdateAfterDelete, totalItems }) {
  // Handling Functions
  const handleChecked = (checked, productId) => {
    const updatedItems = totalItems.map((el) => {
      if (el.id === productId) {
        return { ...el, packed: checked };
      }
      return el;
    });
    UpdateAfterCheck(updatedItems);
  };

  const handleDelete = (productId) => {
    const updatedItems = totalItems.filter((el) => el.id !== productId);

    UpdateAfterDelete(updatedItems);
  };

  // Use Effect

  return (
    <div className="list">
      <ul>
        {totalItems.map((el) => (
          <li key={el.id}>
            <input
              type="checkbox"
              checked={el.packed}
              onChange={(e) => handleChecked(e.target.checked, el.id)}
            />
            <span style={el.packed ? { textDecoration: "line-through" } : {}}>
              {el.quantity} {el.description}
            </span>
            <button onClick={(e) => handleDelete(el.id)}>❌</button>
          </li>
        ))}
      </ul>
      <select value="packed">
        <option value="input">Sort by Input</option>
        <option value="packed">Sort by Packed</option>
        <option value="number">Sort by Number</option>
      </select>
    </div>
  );
}

function Footer({ totalItems }) {
  const packedItems = totalItems.filter((item) => item.packed);
  const percentageOfPackedItems = Math.ceil(
    (packedItems.length / totalItems.length) * 100
  );

  return (
    <footer className="stats">
      <em>
        You Have {totalItems?.length} items on your list and you have already
        packed {packedItems.length} ({percentageOfPackedItems}%)
      </em>
    </footer>
  );
}
