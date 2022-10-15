import "./App.css";
import LoadPage from "./components/Login/LoadPage";
import ChatApp from "./components/ChatApp/ChatApp";
import Footer from "./components/ChatApp/Footer";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [state, setState] = useState("");
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"));

  // async function logOut() {
  //   const response = await fetch("/rest-auth/logout/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'X-CSRFToken': Cookies.get('csrftoken'),
  //     },
  //     body: JSON.stringify(),
  //   });
  //   if (!response.ok) {
  //     console.warn(response);
  //   } else {
  //     const data = await response.json();
  //     Cookies.remove("Authorization");
  //     setAuth(false);
  //   }
  // }

  return (
    <div className="body">
      <header className="header">
        <div className="titles">
          <h2 className="title">CHATTN</h2>
          <span className="subtitle">never be lonely again</span>
        </div>
        <Button className="button" onClick={() => setAuth(false)}>
          Logout
        </Button>
      </header>
      <div>
        {auth ? <ChatApp /> : <LoadPage setAuth={() => setAuth(true)} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
