import RoomList from "./RoomList";
import Messages from "./Messages";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Footer from "./Footer";
import { useState, useCallback, useEffect } from "react";

function ChatApp() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState({ id: 0, title: "" });

  const handleError = (err) => {
    console.warn(err);
  };

  const getRoomList = useCallback(async () => {
    const response = await fetch("/api_v1/rooms/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setRooms(data);
    }
  }, []);

  useEffect(() => {
    getRoomList();
  }, [getRoomList]);

  const addRoom = async (title) => {
    const newRoom = {
      title: title,
    };
    const response = await fetch("/api_v1/rooms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newRoom),
    });
    if (response.ok) {
      console.log(response);
      setRooms([...rooms, newRoom]);
      return response.json();
    }
  };

  const getMessages = async (e) => {
    const response = await fetch(`/api_v1/rooms/1/messages/`);
    const data = await response.json();
    const matchedRoom = rooms.find((room) => {
      const roomIdString = room.id.toString();
      return roomIdString === e.target.value;
    });
    setShow(matchedRoom);
    setMessages(data);
  };

  const getRooms = async () => {
    const response = await fetch("/api_v1/rooms/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setRooms(data);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="chatapp">
      <aside className="aside">
        <RoomList rooms={rooms} addRoom={addRoom} getMessages={getMessages} />
      </aside>
      <main className="mainmessages">
        <Messages messages={messages} />
      </main>
    </div>
  );
}
export default ChatApp;
