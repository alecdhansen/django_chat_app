import RoomList from "./RoomList";
import Messages from "./Messages";
import Cookies from "js-cookie";
import { useState, useCallback, useEffect } from "react";

function ChatApp() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomID, setRoomID] = useState(0);

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
    console.log("event", e.target);
    const response = await fetch(
      `/api_v1/rooms/${e.target.value}/messages/`
    ).catch(handleError);
    const data = await response.json();
    setRoomName(e.target.name);
    setRoomID(e.target.value);
    setMessages(data);
  };

  const addMessages = async (text, e) => {
    const newMessage = {
      text,
      room: parseInt(roomID),
      author: 1,
    };
    const response = await fetch(`/api_v1/rooms/${roomID}/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newMessage),
    });
    if (response.ok) {
      console.log(response);
      setMessages([...messages, newMessage]);
      return response.json();
    }
  };

  return (
    <div className="chatapp">
      <aside className="aside">
        <RoomList rooms={rooms} addRoom={addRoom} getMessages={getMessages} />
      </aside>
      <main className="mainmessages">
        <div className="messagesroomtitle">
          <h2>{roomName}</h2>
        </div>
        <Messages
          messages={messages}
          addMessages={addMessages}
          roomName={roomName}
        />
      </main>
    </div>
  );
}
export default ChatApp;
