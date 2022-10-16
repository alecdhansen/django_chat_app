import { useState } from "react";
import Card from "react-bootstrap/Card";

function Messages({ messages }) {
  const messageView = messages.map((message) => (
    <div key={message.id} value={message.room}>
      <Card className="mb-2 message-box">
        <Card.Header>{message.author}author</Card.Header>
        <Card.Body>
          <Card.Text>{message.text}text</Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="messagingapp">
        {/* <div>
          <input>type here...</input>
          <button type="submit">Send Chat</button>
        </div> */}
        <div className="messagelist">{messageView}</div>
      </div>
    </>
  );
}
export default Messages;
