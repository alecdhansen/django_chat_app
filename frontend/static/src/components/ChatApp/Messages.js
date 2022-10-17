import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Messages({ messages, addMessages, roomName }) {
  const [newMessage, setNewMessage] = useState("");
  const messageView = messages.map((message) => (
    <div key={message.id} value={message.room}>
      <Card className="mb-2 message-box">
        <Card.Header>{message.author}author</Card.Header>
        <Card.Body>
          <Card.Text>{message.text}</Card.Text>
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
        <Form onSubmit={handleSubmit} value={roomName.id}>
          <Form.Control
            placeholder="type here..."
            type="text"
            name={roomName.id}
            onChange={handleChange}
          />

          <Button type="submit">Send Chat</Button>
        </Form>
        <div className="messagelist">{messageView}</div>
      </div>
    </>
  );
}
export default Messages;
