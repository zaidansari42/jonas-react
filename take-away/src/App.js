const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Watch", quantity: 12, packed: false },
  { id: 4, description: "Cap", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Header />
      <FormBar />
      <List />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>🏝️ FAR AWAY 🧳</h1>;
}

function FormBar() {
  const handleSubmit = () => {};

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😍</h3>
      <select id="mySelect" name="mySelect">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option>{num}</option>
        ))}
      </select>
      <input type="text" />
      <button>Add</button>
    </form>
  );
}

function List() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((el) => (
          <li>
            <input type="checkbox" />
            <span style={el.packed ? { textDecoration: "line-through" } : {}}>
              {el.quantity} {el.description}
            </span>
            <button>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="stats">
      <em>You Have X items on your list and you have already packed x (X%)</em>
    </footer>
  );
}
