import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext }  from "../../context/AuthContext"// Assuming you have an AuthContext to get the current user

const useChatSocket = (providerId) => {
  const { authUser } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
    const { _id } = authUser.user;
  useEffect(() => {
    if (authUser) {
      // Establish socket connection with userId as query parameter
      const socket = io("http://localhost:3030", { // Replace with your backend URL
        query: { userId: _id },
      });
      setSocket(socket);

      // Listen for new messages
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Join the chat room for the current conversation
      socket.emit("joinRoom", { providerId });

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, [providerId]);

  return { messages, socket };
};

export default useChatSocket;
