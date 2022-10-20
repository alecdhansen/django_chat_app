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

  const handleError = (err) => {
    console.warn(err);
  };

  const logout = async (e) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
      document.cookie =
        "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      await setAuth(false);
    }
  };

  return (
    <div className="body">
      <header className="header">
        <div className="titles">
          <h2 className="title">CHATTN</h2>
          <span className="subtitle">never be lonely again</span>
        </div>
        {auth ? (
          <Button className="button" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          ""
        )}
      </header>
      <div>
        {auth ? <ChatApp /> : <LoadPage setAuth={() => setAuth(true)} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
