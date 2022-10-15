function Messages({ messages }) {
  const messageView = messages.map((message) => (
    <div key={message.id} value={message.room}>
      <div>
        <h2>{message.author}</h2>
        <p>{message.text}</p>
      </div>
    </div>
  ));

  return <div>{messageView}</div>;
}
export default Messages;
