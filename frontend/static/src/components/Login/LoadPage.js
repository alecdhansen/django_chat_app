import Button from "react-bootstrap/Button";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

function LoadPage(props) {
  const [modalShow, setModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);
  return (
    <div className="preload">
      <div className="loadpage">
        <h2>Already a member?</h2>
        <Button className="bn" type="submit" onClick={() => setModalShow(true)}>
          Login
        </Button>
        <LoginForm
          show={modalShow}
          onHide={() => setModalShow(false)}
          setAuth={props.setAuth}
        />

        <h2>Want to chat?</h2>
        <Button
          className="bn"
          type="submit"
          onClick={() => setRegisterModalShow(true)}
        >
          Register
        </Button>
        <RegisterForm
          show={registerModalShow}
          onHide={() => setRegisterModalShow(false)}
          setAuth={props.setAuth}
        />
      </div>
    </div>
  );
}
export default LoadPage;
