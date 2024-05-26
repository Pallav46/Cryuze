import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth }  from "../../context/ProviderAuthContext"// Assuming you have an AuthContext to get the current user

const useProviderChatSocket = (customerId) => {
  const { authToken } = useAuth();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
    const { _id } = authToken.user;
  useEffect(() => {
    if (authToken) {
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
      socket.emit("joinRoom", { customerId });

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, [customerId]);

  return { messages, socket };
};

export default useProviderChatSocket;
