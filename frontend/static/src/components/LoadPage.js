import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./LoginForm";
import Register from "./Register";
import { useState } from "react";

function LoadPage(props) {
  const [modalShow, setModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);
  return (
    <div>
      <h2>Already a member?</h2>
      <Button type="submit" onClick={() => setModalShow(true)}>
        Login
      </Button>
      <LoginForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />

      <h2>Want to join?</h2>
      <Button type="submit" onClick={() => setRegisterModalShow(true)}>
        Register
      </Button>
      <Register
        show={registerModalShow}
        onHide={() => setRegisterModalShow(false)}
      />
    </div>
  );
}
export default LoadPage;
