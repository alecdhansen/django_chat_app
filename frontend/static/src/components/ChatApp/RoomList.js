import { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoMdAdd } from "react-icons/io";

function RoomList({ rooms, addRoom, getMessages }) {
  const [room, setRoom] = useState({
    name: "",
  });

  function handleChange(e) {
    setRoom(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addRoom(room);
    setRoom("");
  }

  const html = rooms.map((room) => (
    <Button
      name={room.title}
      type="button"
      value={room.id}
      key={room.title}
      className="roombtn"
      onClick={getMessages}
    >
      {room.title}
    </Button>
  ));

  if (!rooms) {
    return <div>Fetching data ...</div>;
  }

  return (
    <>
      <h2 className="chatroomstitle">Chat Rooms</h2>
      <Form className="roomsubmit" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Add Room..."
          className="input"
          name="new-room"
          onChange={handleChange}
        />
        <Button className="submitbutton messagesubmitbutton" type="submit">
          <IoMdAdd />
        </Button>
      </Form>
      <div className="roombtnlist">{html}</div>
    </>
  );
}
export default RoomList;
