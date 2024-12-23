

// import React, { useState } from "react";
// import axios from "axios";
// import { IconButton } from "@mui/material";
// import CreateIcon from "@mui/icons-material/Create";
// import GroupChat from "../../Images/GroupChatLogo.png";
// import "../GroupCreate/GroupCreate.css";

// function GroupCreate() {

//     let params = new URLSearchParams(window.location.search);
//     let userId = params.get("id");
//     let token_key = params.get("login");
//     let token = localStorage.getItem(token_key);
//   // State to manage group name and loading/error
//   const [groupName, setGroupName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handler to create the group chat
//   const handleCreateGroup = async () => {
//     if (!groupName) {
//       setError("Group name is required.");
//       return;
//     }

//     setError(""); // Reset any errors
//     setLoading(true); // Start loading

//     try {
//       // Replace this with your actual user array
   

//       // Call the API to create group chat
//       const { data } = await axios.post(
//         "http://localhost:4000/createGroupChat", // Adjust to match your server endpoint
//         {
//             users: '["647d94aea97e40a17278c7e5","647d999e4c3dd7ca9a2e6543"]', // Array of user IDs
//           chatName: groupName, // Group name input
//         },
//         {
//             headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Group created successfully:", data);
//       alert(`Group "${data.chatName}" created successfully!`);
//       setGroupName(""); // Clear the input
//     } catch (err) {
//       console.error("Error creating group:", err.response?.data?.message || err.message);
//       setError(err.response?.data?.message || "Failed to create group chat.");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center flex-col items-center w-full">
//         <div className="flex justify-center">
//           <img src={GroupChat} alt="Group Chat" className="w-2/5" />
//         </div>
//         <div className="sour-gummy text-4xl pb-3">Create Group Chat</div>
//         <div className="m-2 px-3 py-3 rounded-[15px] bg-white flex justify-between shadow-lg w-1/2">
//           <input
//             placeholder="Enter Group Name"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             className="px-2 w-full border-0 outline-0 bg-transparent"
//           />
//           <IconButton onClick={handleCreateGroup} disabled={loading}>
//             <CreateIcon />
//           </IconButton>
//         </div>
//         {error && <div className="text-red-500">{error}</div>}
//         {loading && <div>Loading...</div>}
//       </div>
//     </>
//   );
// }

// export default GroupCreate;

import React, { useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import GroupChat from "../../Images/GroupChatLogo.png";
import "../GroupCreate/GroupCreate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GroupCreate() {
  let params = new URLSearchParams(window.location.search);
  let userId = params.get("id");
  let token_key = params.get("login");
  let token = localStorage.getItem(token_key);

  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateGroup = async () => {
    if (!groupName) {
      setError("Group name is required.");
      toast.error("Group name is required.");
      return;
    }

    setError(""); // Reset any errors
    setLoading(true); // Start loading

    try {
      const { data } = await axios.post(
        "http://localhost:4000/createGroupChat",
        {
          users: '["6764f39b9701084cd1806132","6764f3cb9701084cd180613b"]',
          chatName: groupName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Group created successfully:", data);
      toast.success(`Group "${data.chatName}" created successfully!`);
      setGroupName(""); // Clear input
    } catch (err) {
      console.error("Error creating group:", err.response?.data?.message || err.message);
      const errorMsg = err.response?.data?.message || "Failed to create group chat.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex justify-center flex-col items-center w-full">
        <div className="flex justify-center">
          <img src={GroupChat} alt="Group Chat" className="w-2/5" />
        </div>
        <div className="sour-gummy text-4xl pb-3">Create Group Chat</div>
        <div className="m-2 px-3 py-3 rounded-[15px] bg-white flex justify-between shadow-lg w-1/2">
          <input
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="px-2 w-full border-0 outline-0 bg-transparent"
          />
          <IconButton onClick={handleCreateGroup} disabled={loading}>
            <CreateIcon />
          </IconButton>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {/* {loading && <div>Loading...</div>} */}
      </div>
    </>
  );
}

export default GroupCreate;
