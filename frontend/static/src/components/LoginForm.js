import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function LoginForm(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleError = (err) => console.warn(err);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("oops! somethign went wrong");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      props.setauth();
      props.onHide();
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login">
          <form onSubmit={handleSubmit} className="loginform">
            Login
            <div>
              <label htmlFor="username" className="labelwrap">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                onChange={handleInput}
                value={state.username}
                name="username"
              ></input>
            </div>
            <div>
              <label htmlFor="password" className="labelwrap">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                onChange={handleInput}
                value={state.password}
                name="password"
              ></input>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default LoginForm;
