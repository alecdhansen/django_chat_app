import { useState, useCallback, useEffect } from "react";

function RoomList({ rooms, addRoom, getMessages }) {
  const [room, setRoom] = useState({
    name: "",
  });

  function handleChange(event) {
    setRoom(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addRoom(room);
    setRoom("");
  }

  const html = rooms.map((room) => (
    <button
      type="button"
      value={room.id}
      key={room.title}
      className="li"
      onClick={getMessages}
    >
      <h2>{room.title}</h2>
    </button>
  ));

  if (!rooms) {
    return <div>Fetching data ...</div>;
  }

  return (
    <div>
      Chat Rooms
      <div>{html}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Room"
          name="new-room"
          onChange={handleChange}
        />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}
export default RoomList;
