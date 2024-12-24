import React, { useState, useEffect } from "react";
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
  const [users, setUsers] = useState([]); // To hold the user list
  const [selectedUsers, setSelectedUsers] = useState([]); // To keep track of selected users

  // Fetch the list of users that can be added to the group
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/fetchUsers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data || []);
        console.log(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users.");
      }
    };

    fetchUsers();
  }, [token]);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setError("Group name is required.");
      toast.error("Group name is required.");
      return;
    }

    if (selectedUsers.length === 0) {
      setError("No users selected.");
      toast.error("Please select users for the group.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/createGroupChat",
        { users: selectedUsers, chatName: groupName }, // Directly pass the array of selected users
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Group created successfully:", data);
      toast.success(`Group "${data.chatName}" created successfully!`);
      setGroupName("");
      setSelectedUsers([]); // Reset the user selection
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create group chat.";
      console.error("Error creating group:", errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting and deselecting users
  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId); // Deselect
      } else {
        return [...prevSelected, userId]; // Select
      }
    });
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
            disabled={loading}
          />
          <IconButton onClick={handleCreateGroup} disabled={loading}>
            {loading ? <div className="spinner"></div> : <CreateIcon />}
          </IconButton>
        </div>
        {error && <div className="text-red-500">{`Error: ${error}`}</div>}

        {/* List of users to be added to the group */}
        <div className="w-1/2 mt-4">
          <h4>Select users to add:</h4>
          <div className="user-list">
            {Array.isArray(users) &&
              users.map((user) => (
                <div key={user._id} className="user-item">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)} // Check if the user is selected
                    onChange={() => handleUserSelection(user._id)} // Handle selection
                  />
                  {user.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupCreate;
