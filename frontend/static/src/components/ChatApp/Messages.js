import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ReactDOM from "react-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Messages({ messages, addMessages, roomName, deleteMessage }) {
  const [newMessage, setNewMessage] = useState({ text: "" });
  const messageView = messages.map((message) => (
    <div className="all-message" key={message.id} value={message.room}>
      <Card className="mb-2 message-box">
        <Card.Header className="messageheader">
          <span>{message.author}</span>
          <Button
            type="button"
            onClick={deleteMessage}
            className="deletebutton"
          >
            Delete
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Text className="messagebody">{message.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));

  function handleSubmit(e) {
    e.preventDefault();
    addMessages(newMessage);
    setNewMessage("");
  }
  function handleChange(e) {
    console.log(e.target.value);
    setNewMessage(e.target.value);
  }

  return (
    <>
      <div className="messagingapp">
        <div className="messagelist">{messageView}</div>
        <Form
          onSubmit={handleSubmit}
          value={roomName.id}
          className="messagetextbox"
        >
          <Form.Control
            placeholder="type here..."
            type="text"
            name={roomName.id}
            onChange={handleChange}
            className="messageinput"
          />

          <Button className="submitbutton messagesubmitbutton" type="submit">
            Send
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Messages;
