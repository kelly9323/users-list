import { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";

function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <h1>Liste des Utilisateurs</h1>
      <div>
        <input
          type="text"
          placeholder="Rechercher par nom ou email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div>
        <UserList searchInput={searchInput} />
      </div>
    </>
  );
}

export default App;
