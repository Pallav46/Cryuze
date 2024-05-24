// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/provider/Sidebar";
import Conversations from "../../../components/provider/Conversations";
// import Messages from "../../../components/provider/Messages";
// import useProviderChatt from "../../../hooks/provider/useProviderChatt";

const ProviderChatt = () => {
  // const { data, error, isLoading } = useProviderChatt();
  // const navigate = useNavigate();
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");

  // useEffect(() => {
  //   if (error) {
  //     navigate("/providers/login");
  //   }
  // }, [error, navigate]);

  // useEffect(() => {
  //   if (data) {
  //     setMessages(data);
  //   }
  // }, [data]);

  // const handleSendMessage = (message) => {
  //   // Implement the function to send a new message
  //   // This could involve calling a function from a hook or an API call
  //   // Then update the messages state with the new message
  //   setMessages((prevMessages) => [...prevMessages, message]);
  //   setNewMessage(""); // Clear the input after sending
  // };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-6 flex flex-col">
        <Conversations />
        {/* <Messages 
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        /> */}
      </div>
    </div>
  );
};

export default ProviderChatt;
