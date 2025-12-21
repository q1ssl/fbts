// import React from 'react'
// import Notification  from  "../../assets/Notification.png";
// import Queries  from  "../../assets/Queries.png";
// import ChatForm from './ChatForm';
// function Header() {
//   return (
//     <div>
//        <div className="dashboard-header">
//              <h4>Employe Self Service</h4> 
//              <div className="top-right-icons">
//              <div> <p>FD00000</p></div> 
//                <div> <img src={Notification} alt="" /></div>  
//                  {/* <div> <ChatForm/> </div> */}
//              </div>
            
//           </div>
//     </div>
//   )
// }

// export default Header



import React, { useState, useEffect } from "react";
import Notification from "../../assets/Notification.png";
import Queries from "../../assets/Queries.png";
// import ChatForm from "../HomeDashboard/ChatForm"; // adjust path if needed

const Header = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("employee_id");
    if (name) {
      setEmployeeName(name);
    }
  }, []);

  return (
    <div className="dashboard-header">
      <h4>Employee Self Service</h4>
      
      <div className="top-right-icons">
        <div><p>{employeeName || "FD00000"}</p></div>
        <div>
          <img
            src={Notification}
            alt="Notifications"
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="relative">
          <img
            src={Queries}
            alt="Chat"
            style={{ cursor: "pointer" }}
            onClick={() => setShowChat(!showChat)}
          />
          {/* {showChat && (
            // <div className="chat-popup">
            //   <ChatForm onClose={() => setShowChat(false)} />
            // </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
