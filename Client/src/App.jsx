import React from "react";
import Chat from "./Pages/Chat";
import { Route , Routes, useNavigate} from "react-router-dom";

const App = () => {
  const Navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-black relative">
      <div onClick={()=>{
        Navigate("/chat")
      }} className="absolute w-20 flex items-center justify-center h-20 rounded-2xl bottom-20 right-20 bg-red-500 cursor-pointer">
        Chat
        
      </div>

      <Routes>
          <Route path = "/chat" element = {<Chat/>}></Route>
        </Routes>
    </div>
  );
};

export default App;
