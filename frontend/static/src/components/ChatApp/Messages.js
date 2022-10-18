import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiOutlineSend } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

function Messages({ messages, addMessages, roomName, deleteMessage }) {
  const [text, setText] = useState("");
  const messageView = messages.map((message) => (
    <div className="all-message" key={message.id} value={message.room}>
      <Card className="mb-2 message-box">
        <Card.Header className="messageheader">
          <span className="username">
            {message.username.charAt(0).toUpperCase() +
              message.username.slice(1)}
          </span>
          <Button
            type="button"
            value={message.id}
            onClick={() => deleteMessage(message.id)}
            className="deletebutton"
          >
            <FaTrashAlt />
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Text className="messagebody">{message.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));

  const scrollingElement = document.scrollingElement || document.body;
  const scrollToBottom = () => {
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  };

  function handleSubmit(e) {
    e.preventDefault();
    addMessages(text);
    setText("");
    scrollToBottom();
  }
  function handleChange(e) {
    setText(e.target.value);
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
            placeholder="Message..."
            type="text"
            value={text}
            onChange={handleChange}
            className="messageinput"
          />

          <Button className="submitbutton messagesubmitbutton" type="submit">
            <AiOutlineSend />
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Messages;
