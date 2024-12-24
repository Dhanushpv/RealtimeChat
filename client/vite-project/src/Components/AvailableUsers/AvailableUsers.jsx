


import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png';
import { useSelector } from 'react-redux';

function AvailableUsers() {
  let params = new URLSearchParams(window.location.search);
  let token_key = params.get('login'); // Fetch token key from URL
  let token = localStorage.getItem(token_key); // Get the actual token
  const lightTheme = useSelector((state) => state.themeKey.themeKey);

  const [users, setUsers] = useState([]); // State to store fetched users
  const [search, setSearch] = useState(''); // State for search input
  const [selectedChat, setSelectedChat] = useState(null); // State for selected chat

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/fetchUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data); // Set users to state
      console.log('Fetched Users:', data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  // Function to access or create a chat
  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/accessChat/${userId}`,
        {}, // Empty payload
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Chat accessed:', data);
      setSelectedChat(data); // Set selected chat to state
    } catch (error) {
      console.error('Error accessing chat:', error.message);
    }
  };

  // Fetch users on component mount or when search changes
  useEffect(() => {
    if (token) {
      fetchUsers();
    } else {
      console.error('No token found! Please log in again.');
    }
  }, [search]);

  return (
    <>
      <div className={`sideBar flex flex-col bg-slate-200 w-full rounded-l-lg `}>
        {/* Header */}
        <div className={`sb-Header flex justify-between m-2 px-2 py-2 rounded-[15px] bg-white shadow-lg ${lightTheme ? '' : 'dark'}`}>
                            <div className="flex justify-center items-center">
                                <img src={WhisperWaveLogo} alt="Logo" className="w-3" />
                                <span className="px-3">Available Users</span>
                            </div>
                        </div>

        {/* Search Input */}
        <div className={`sb-search m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg ${lightTheme ? '' : 'dark'}`}>
          <SearchIcon />
          <input
            placeholder="Search"
            className="search-Box px-2 border-0 outline-0 bg-transparent"
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
            users.map((user) => (
              <div
                key={user._id}
                className="p-1 mb-2 userListitems_container flex items-center bg-slate-300 rounded-[12px] cursor-pointer"
                onClick={() => accessChat(user._id)} // Click to access chat
              >
                <div className="p-2">
                  <p className="bg-slate-200 text-slate-400 p-2 px-4 border-4 border-white font-extrabold rounded-full">
                    {user.name.charAt(0).toUpperCase()}
                  </p>
                </div>
                <div className="w-full px-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-700">{user.email}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AvailableUsers;
