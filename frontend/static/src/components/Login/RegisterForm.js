import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useState } from "react";

function RegisterForm(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const passwordMatch = (e) => {
    e.preventDefault();
    if (state.password1 !== state.password2) {
      alert("Your passwords do not match.");
      return;
    } else {
      handleSubmit(e);
    }
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
    }
    props.setAuth();
    props.onHide();
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login">
            <form onSubmit={passwordMatch} className="loginform2">
              <div className="formcontent">
                <label htmlFor="username" className="labelwrap">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username..."
                  required
                  onChange={handleInput}
                  value={state.username}
                  name="username"
                  className="input"
                ></input>
              </div>
              <div className="formcontent">
                <label htmlFor="email" className="labelwrap2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email address..."
                  required
                  onChange={handleInput}
                  value={state.email}
                  name="email"
                  className="input"
                ></input>
              </div>
              <div className="formcontent">
                <label htmlFor="password1" className="labelwrap3">
                  Password
                </label>
                <input
                  type="password1"
                  id="password1"
                  placeholder="Password"
                  required
                  onChange={handleInput}
                  value={state.password1}
                  name="password1"
                  pattern=".{8,}"
                  title="Must contain at least 8 or more characters"
                  className="input"
                ></input>
              </div>
              <div className="formcontent">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password2"
                  id="password2"
                  placeholder="Password"
                  required
                  onChange={handleInput}
                  value={state.password2}
                  name="password2"
                  pattern=".{8,}"
                  title="Must contain at least 8 or more characters"
                  className="input"
                ></input>
              </div>
              <Button className="modalbtn" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterForm;
