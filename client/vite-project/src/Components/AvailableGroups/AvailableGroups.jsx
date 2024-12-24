




import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import WhisperWaveLogo from "../../Images/WhisperWaveLogo.png";
import { useSelector } from "react-redux";

function AvailableGroups() {
  const params = new URLSearchParams(window.location.search);
  const token_key = params.get("login"); // Fetch token key from URL
  const userId = params.get("id");
 

  const token = localStorage.getItem(token_key); // Get the actual token

  const [users, setUsers] = useState([]); // State to store fetched users
  const [search, setSearch] = useState(""); // State for search input
  const [selectedChat, setSelectedChat] = useState(null); // State for selected chat


  const lightTheme = useSelector((state) => state.themeKey.themeKey);
  // Function to fetch users
  const fetchUsers = async () => {
    if (!token) {
      console.error("No token found! Please log in again.");
      return;
    }
    try {
      const  data  = await axios.get(`http://localhost:4000/fetchGroups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Users:", data.data);
      setUsers(data.data); // Set users to state
      
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  // Function to access or create a chat
  const accessChat = async (chatId) => {
    if (!token || !userId) {
      console.error("Missing token or user ID.");
      return;
    }
    try {
      const { data } = await axios.put(
        `http://localhost:4000/addselfgroup/${chatId}/${userId}`, // Pass chatId and userId
        {}, // Empty payload, as backend doesn't require any body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Chat accessed:", data);
      setSelectedChat(data); // Set the selected chat in the state
    } catch (error) {
      console.error("Error accessing chat:", error.response?.data || error.message);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={`sideBar flex flex-col bg-slate-200 w-full rounded-l-lg `}>
      {/* Header */}
      <div className={`sb-Header flex justify-between  m-2 px-2 py-3  rounded-[15px] bg-white shadow-lg ${lightTheme ? '' : 'dark'}`}>
        <div className="flex justify-center items-center">
          <img src={WhisperWaveLogo} alt="Logo" className="w-8" />
          <span className="px-3 text-lg font-semibold">Available Groups</span>
        </div>
      </div>

      {/* Search Input */}
      <div className={`sb-search m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg ${lightTheme ? '' : 'dark'}`}>
        <SearchIcon className={`${lightTheme ? '' : 'dark'}`} />
        <input
          placeholder="Search"
          className={`search-Box px-2 border-0 outline-0 bg-transparent w-full${lightTheme ? '' : 'dark'}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User List */}
      <div
        className={`sb-conversation m-2 px-3 py-3 shadow-lg pt-5 rounded-[15px] bg-white h-full overflow-y-auto
          [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-300 ${lightTheme ? '' : 'dark'}`}
      >
        {users.length > 0 ? (
          users
            .filter((user) =>
              user.chatName?.toLowerCase().includes(search.toLowerCase())
            ) // Filter users by search
            .map((user) => (
              <div
                key={user._id}
                className="p-1 mb-2 userListitems_container flex items-center bg-slate-300 rounded-[12px] cursor-pointer"
                onClick={() => accessChat(user._id)} // Click to access chat
              >
                <div className="p-2">
                  <p className="bg-slate-200 text-slate-400 p-2 px-4 border-4 border-white font-extrabold rounded-full">
                    {user.chatName ? user.chatName.charAt(0).toUpperCase() : "?"}
                  </p>
                </div>
                <div className="w-full px-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-700">
                      {user.chatName || "Unnamed Group"}
                    </p>
                    <p className="text-xs text-gray-500">{user.updatedAt}</p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500">No groups found</p>
        )}
      </div>
    </div>
  );
}

export default AvailableGroups;
