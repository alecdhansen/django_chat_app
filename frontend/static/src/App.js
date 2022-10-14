import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LoginForm from "./components/LoginForm";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [state, setState] = useState("");
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"));

  return (
    <>
      <header className="header">
        <div className="titles">
          <h2 className="title">CHATTN</h2>
          <span className="subtitle">never be lonely again</span>
        </div>
        <Button>Logout</Button>
      </header>
      <div className="App">
        <LoginForm setAuth={setAuth} />
      </div>
    </>
  );
}

export default App;
