

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate



// function UserChatList() {
//   let params = new URLSearchParams(window.location.search);
//   let userId = params.get("id");
//   let token_key = params.get("login");
//   let token = localStorage.getItem(token_key);

//   const [chats, setChats] = useState([]);
//   const [error, setError] = useState(null);
//   const fetched = useRef(false); // Prevent repeated fetch calls
//   const navigate = useNavigate(); // Initialize navigate function

//   const fetchChats = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/fetchChats/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       ); // Your API endpoint
//       setChats(response.data);
//       console.log("responsedata", response.data);
//     } catch (err) {
//       console.error("Error fetching chats:", err);
//       setError("Failed to load chats.");
//     }
//   };

//   // UseEffect to fetch data once when the component mounts
//   useEffect(() => {
//     if (userId && !fetched.current) {
//       fetched.current = true; // Mark as fetched to prevent re-fetching
//       fetchChats();
//     }
//   }, [userId]); // Depend only on userId

//   // Handle click and navigate to ChatArea
//   const handleChatClick = (chatId, receiverId) => {
//     navigate(
//       `ChatArea?chatId=${chatId}&login=${token_key}&id=${userId}&receiver=${receiverId}` // Pass receiverId in the URL
//     );
//   };

//   return (
//     <div className="chat-list-container space-y-4">
//       {error && <p className="text-red-500">{error}</p>}

//       {chats.length > 0 ? (
//         chats.map((chat) => {
//           const receiverId =
//           chat.users[0]._id === userId ? chat.users[1]._id : chat.users[0]._id;
        
//             console.log("receiverId",receiverId)

//           return (
//             <div
//               key={chat._id}
//               onClick={() => handleChatClick(chat._id, receiverId)} // Pass receiverId
//               className="userListitems_container flex items-center bg-slate-300 rounded-[12px] cursor-pointer hover:bg-slate-400"
//             >
//               {/* User profile */}
//               <div className="p-2">
//                 <p className="bg-slate-200 text-slate-400 p-3 px-4 border-4 border-white font-extrabold rounded-full">
//                   {chat.users?.[1]?.name[0]?.toUpperCase() || "?"}
//                 </p>
//               </div>

//               {/* Chat details */}
//               <div className="w-full px-2">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xl font-semibold text-gray-700">
//                     {chat.isGroupChat
//                       ? chat.chatName
//                       : chat.users[1]?.name || "Unknown"}
//                   </p>
//                   <p className="text-xs text-gray-700">
//                     {new Date(chat.updatedAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//                 <p className="text-gray-700 text-xs">
//                   {chat.latestMessage?.content || "No messages yet"}
//                 </p>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p>No chats found</p>
//       )}
//     </div>
//   );
// }

// export default UserChatList;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UserChatList() {
  let params = new URLSearchParams(window.location.search);
  let userId = params.get("id");
  let token_key = params.get("login");
  let token = localStorage.getItem(token_key);

  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const fetched = useRef(false); // Prevent repeated fetch calls
  const navigate = useNavigate(); // Initialize navigate function

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/fetchChats/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ); // Your API endpoint
      setChats(response.data);
      console.log("responsedata", response.data);
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Failed to load chats.");
    }
  };

  // UseEffect to fetch data once when the component mounts
  useEffect(() => {
    if (userId && !fetched.current) {
      fetched.current = true; // Mark as fetched to prevent re-fetching
      fetchChats();
    }
  }, [userId]); // Depend only on userId

  // Handle click and navigate to ChatArea
  const handleChatClick = (chatId, receiverId) => {
    navigate(
      `ChatArea?chatId=${chatId}&login=${token_key}&id=${userId}&receiver=${receiverId}` // Pass receiverId in the URL
    );
  };

  return (
    <div className="chat-list-container space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      {chats.length > 0 ? (
        chats.map((chat) => {
          // Ensure chat.users is defined and has at least two users
          if (!chat.users || chat.users.length < 2) {
            return null; // Skip this chat if users are not defined or not enough users
          }

          const receiverId =
            chat.users[0]._id === userId ? chat.users[1]._id : chat.users[0]._id;

          console.log("receiverId", receiverId);

          return (
            <div
              key={chat._id}
              onClick={() => handleChatClick(chat._id, receiverId)} // Pass receiverId
              className="userListitems_container flex items-center bg-slate-300 rounded-[12px] cursor-pointer hover:bg-slate-400"
            >
              {/* User profile */}
              <div className="p-2">
                <p className="bg-slate-200 text-slate-400 p-3 px-4 border-4 border-white font-extrabold rounded-full">
                  {chat.users?.[1]?.name[0]?.toUpperCase() || "?"}
                </p>
              </div>

              {/* Chat details */}
              <div className="w-full px-2">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-700">
                    {chat.isGroupChat ? chat.chatName : chat.users[1]?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-700">
                    {new Date(chat.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-gray-700 text-xs">
                  {chat.latestMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No chats found</p>
      )}
    </div>
  );
}

export default UserChatList;
