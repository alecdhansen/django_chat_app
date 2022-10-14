import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LoginForm from "./components/LoginForm";
import LoadPage from "./components/LoadPage";
import ChatApp from "./components/ChatApp";
import Register from "./components/Register";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Cookies from "js-cookie";

{
  /* <div>{auth ? <ChatApp /> : <LoadPage setAuth={setAuth} />}</div> */
}

function App() {
  const [state, setState] = useState("");
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"));
  // const [selection, setSelection] = useState("App");

  // let html;
  //

  // if (selection == "App") {
  //   html = <LoadPage />;
  // } else if (selection == "Login") {
  //   html = <LoginForm />;
  // } else if (selection == "Register") {
  //   html = <Register />;
  // }
  return (
    <div>
      <header className="header">
        <div className="titles">
          <h2 className="title">CHATTN</h2>
          <span className="subtitle">never be lonely again</span>
        </div>
        <Button onClick={() => setAuth(false)}>Logout</Button>
      </header>
      <LoadPage setAuth={() => setAuth(true)} />
    </div>
  );
}

export default App;
