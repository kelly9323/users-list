import "./App.css";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <h1>Liste des Utilisateurs</h1>
      <div>{/* search input */}</div>
      <div>
        <UserList />
      </div>
    </>
  );
}

export default App;
