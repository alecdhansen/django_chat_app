import RoomList from "./RoomList";
import Messages from "./Messages";
import Cookies from "js-cookie";
import { useState, useCallback, useEffect } from "react";

function ChatApp() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomID, setRoomID] = useState(1);

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

  useEffect(() => {
    handleClick();
  }, []);

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
      setRooms([...rooms, newRoom]);
      window.location.reload();
    }
  };

  const handleClick = (e) => {
    if (e?.type === "click") {
      // runs on click
      setRoomName(e.target.name);
      setRoomID(e.target.value);
      getMessages(e.target.value);
    } else {
      // runs on initial load
      setRoomName("Fun Room");
      setRoomID(1);
      getMessages(1);
    }
  };

  const getMessages = async (roomValue) => {
    const response = await fetch(`/api_v1/rooms/${roomValue}/messages/`).catch(
      handleError
    );
    const data = await response.json();
    setMessages(data);
  };

  const addMessages = async (text) => {
    const newMessage = {
      text,
      room: parseInt(roomID),
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
      const data = await response.json();
      setMessages([data, ...messages]);
    }
  };

  const deleteMessage = async (id) => {
    const response = await fetch(`/api_v1/rooms/${roomID}/messages/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    const index = messages.findIndex((message) => message.id === id);
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  return (
    <div className="chatapp">
      <aside className="aside">
        <RoomList rooms={rooms} addRoom={addRoom} getMessages={handleClick} />
      </aside>
      <main className="mainmessages">
        <div className="messagesroomtitle">
          <h2>{roomName}</h2>
        </div>
        <Messages
          messages={messages}
          addMessages={addMessages}
          roomName={roomName}
          deleteMessage={deleteMessage}
        />
      </main>
    </div>
  );
}
export default ChatApp;

// TO DO LIST
// 3. Add logout option

// const getMessages = async (e) => {
//   console.log("event", e.target.value);
//   const response = await fetch(
//     `/api_v1/rooms/${e.target.value}/messages/`
//   ).catch(handleError);
//   const data = await response.json();
//   setRoomName(e.target.name);
//   setRoomID(e.target.value);
//   setMessages(data);
// };
