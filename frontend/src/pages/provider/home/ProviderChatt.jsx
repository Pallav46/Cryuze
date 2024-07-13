// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/provider/Sidebar";
import Conversationspro from "../../../components/provider/Conversationspro";
import ChatSkletonProvider from "../../../components/provider/ChatSkletonProvider";
// import Messages from "../../../components/provider/Messages";
// import useProviderChatt from "../../../hooks/provider/useProviderChatt";

const ProviderChatt = () => {

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      <Sidebar />
        <Conversationspro />
    </div>
  );
};

export default ProviderChatt;
