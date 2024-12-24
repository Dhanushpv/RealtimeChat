
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Menu, MenuItem } from '@mui/material';
import SelfContainerSection from '../SelfContainerSection/SelfContainerSection';
import GetMessageSection from '../GetMessageSection/GetMessageSection';
import '../ChatArea/ChatArea.css';

const ENDPOINT = "http://localhost:4000";
let socket;

function ChatArea() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const tokenKey = params.get('login');
    const receiver = params.get('receiver');
    const chatId = params.get('chatId');
    const token = localStorage.getItem(tokenKey);

    const lightTheme = useSelector((state) => state.themeKey.themeKey);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverName, setReceiverName] = useState('User');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isGroupChat, setIsGroupChat] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [success, setSuccess] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:4000/allMessages/${chatId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data);
            socket.emit('join chat', chatId);
            scrollToBottom();
        } catch (err) {
            setError('Failed to fetch messages.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            let response;

            if (isGroupChat) {
                response = await axios.post(
                    `http://localhost:4000/sendGroupMessage/${chatId}/${userId}`,
                    { content: message },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                response = await axios.post(
                    `http://localhost:4000/sendMessage/${userId}/${receiver}`,
                    { content: message },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            setMessages((prevMessages) => [...prevMessages, response.data]);
            setMessage('');
            scrollToBottom();
            socket.emit('new message', response.data);
        } catch (err) {
            setError('Failed to send message.');
            console.error(err);
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleProfileVisibility = () => {
        setIsProfileVisible((prev) => !prev);
    };

    const openMenu = Boolean(anchorEl);

    const handleGroupExit = async () => {
        try {
            // Retrieve the token from localStorage using the correct key
            const token = localStorage.getItem(tokenKey); 
    
            const response = await axios.put(
                `http://localhost:4000/groupExit/${chatId}/${userId}`,
                {}, // Empty request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the correct token
                        "Content-Type": "application/json", // Optional, but good practice
                    },
                }
            );
    
            console.log("User successfully exited the group:", response.data);
    
            // Perform further actions, such as updating the UI
            // Example: Redirect or update the group chat list
        } catch (error) {
            console.error(
                "Error exiting the group:",
                error.response?.data?.message || error.message
            );
            setError("Failed to exit the group.");
        }
    };

    const handleClearChat = async () => {
        try {
            // Retrieve the token from localStorage using the correct key
            const token = localStorage.getItem(tokenKey); // Ensure the key matches your implementation
    
            // Validate token presence
            if (!token) {
                console.error("Token not found in localStorage.");
                setError("User not authenticated.");
                return;
            }
    
            // Send DELETE request to clear chat
            const response = await axios.delete(
                `http://localhost:4000/ClearChat/${chatId}`, // Endpoint with chatId in URL
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the correct token

                    },
                }
            );
    
            console.log("Chat successfully cleared:", response.data);
    
            // Update UI or take further actions after clearing the chat
            // Example: Notify user or refresh chat list
            setSuccess("Chat cleared successfully.");
        } catch (error) {
            console.error(
                "Error while clearing the chat:",
                error.response?.data?.message || error.message
            );
            setError(error.response?.data?.message || "Failed to clear the chat.");
        }
    };
    
      

    useEffect(() => {
        const fetchChatDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/chatDetails/${chatId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsGroupChat(response.data.isGroupChat);
            } catch (err) {
                console.error('Error fetching chat details:', err);
            }
        };

        fetchChatDetails();
    }, [chatId, token]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', { _id: userId });

        socket.on('connected', () => console.log('Socket connected.'));
        socket.on('message received', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        fetchMessages();

        return () => {
            socket.disconnect();
        };
    }, [chatId, userId, receiver]);

    useEffect(() => {
        if (messages.length > 0) {
            const firstMessageFromReceiver = messages.find(
                (msg) => msg.sender._id === receiver
            );
            if (firstMessageFromReceiver) {
                setReceiverName(firstMessageFromReceiver.sender.name);
            } else {
                setReceiverName('User');
            }
        }
    }, [messages, receiver]);

    return (
        <div className={`ch-MainContainer flex flex-col w-full h-full `}>
            {/* <div className="ch-header m-2 px-2 py-2 rounded-[15px] bg-white flex justify-between">
                <div className="flex items-center">
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                    <span className="font-extrabold">{receiverName}</span>
                </div>
                <div>
                    <IconButton onClick={handleMenuClick}>
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                toggleProfileVisibility();
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </div> */}
            <div className={`ch-header m-2 px-2 py-2 rounded-[15px] bg-white flex justify-between ${lightTheme ? '' : 'dark'}`} >
    <div className="flex items-center">
        <IconButton>
            <AccountCircleIcon className={`${lightTheme ? '' : 'dark'}`}/>
        </IconButton>
        <span className="font-extrabold">{receiverName}</span>
    </div>
    <div>
        <IconButton onClick={handleMenuClick}>
            <SettingsIcon />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            {!isGroupChat && (
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        toggleProfileVisibility();
                    }}
                >
                    Profile
                </MenuItem>
            )}
            {isGroupChat && (
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        handleGroupExit();
                    }}
                >
                    Group Exit
                </MenuItem>
            )}
            <MenuItem onClick={()=>{handleMenuClose();handleClearChat()}}>Clear Chat</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
  
        </Menu>
    </div>
</div>


            <div className={`ch-chat m-2 px-3 py-3 rounded-[15px] bg-white h-11/12 flex-1 flex flex-row overflow-hidden ${lightTheme ? '' : 'dark'}` }>
                <div className={`flex-1 flex flex-col  overflow-y-auto
            [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300 ${isProfileVisible ? 'w-3/4' : 'w-full'}`}>
                        <div>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
           
        </div>
                    {isLoading && <p>Loading...</p>}
                    {error && <p className="error-text">{error}</p>}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.sender._id === userId ? 'justify-end' : 'justify-start'
                            } items-start p-2`}
                        >
                            {msg.sender._id === userId ? (
                                <SelfContainerSection message={msg.content} />
                            ) : (
                                <GetMessageSection
                                    content={msg.content}
                                    name={msg.sender.name}
                                    time={new Date(msg.updatedAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {isProfileVisible && (
                    <div className="w-1/3 bg-gray-100 p-4 border-l   rounded-[15px] overflow-y-auto
            [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <div className='flex justify-between items-center   '>
                            <div><h2 className="font-bold text-lg">Profile</h2></div>
                       
                            <div>
                                <button 
                                    onClick={toggleProfileVisibility} className=" p-3 pt-1  text-black rounded">
                                    x
                                </button>
                            </div>
                        </div>
                        <>
  
                        <div className="bg-gray-900 text-white rounded-3xl p-6 w-full ">
                <div className="relative ">
                    <img
                    alt="Profile picture of Josef Rollins"
                    className="rounded-3xl w-1/4"
                    height={300}
                    src="https://storage.googleapis.com/a1aa/image/AZeqJ0tQTIVfBUcCsrdIwliGT815XQe9Yel21SrzvC2tuW4PB.jpg"
                    width={300}
                    />
                    <div className="absolute top-4 left-4">
                    <i className="fas fa-arrow-left text-white text-xl"></i>
                    </div>
                    <div className="absolute top-4 right-4">
                    <i className="fas fa-ellipsis-h text-white text-xl"></i>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold">{receiverName}</h2>
                    <div className="flex items-center justify-center mt-1">
                    <span className="text-green-500 text-sm">•</span>
                    </div>
                </div>
                <div className="flex justify-around mt-4">
                    <button className="bg-purple-600 p-3 rounded-full">
                    <i className="fas fa-phone-alt text-white"></i>
                    </button>
                    <button className="bg-purple-600 p-3 rounded-full">
                    <i className="fas fa-video text-white"></i>
                    </button>
                    <button className="bg-purple-600 p-3 rounded-full">
                    <i className="fas fa-comment text-white"></i>
                    </button>
                </div>
                <div className="mt-6">
                    <h3 className="text-sm text-purple-400">Common Groups</h3>
                    <div className="mt-2">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                        <img
                            alt="Gamer's Clan group icon"
                            className="rounded-full w-10 h-10"
                            height={40}
                            src="https://storage.googleapis.com/a1aa/image/feKgRWnnnDlNxErydDPmyhJV9ydEzTjAqtsGODzzUjYvrFenA.jpg"
                            width={40}
                        />
                        <span className="ml-3 text-white">Gamer's Clan</span>
                        </div>
                        <i className="fas fa-chevron-right text-gray-400"></i>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                        <img
                            alt="Nintendo Switch group icon"
                            className="rounded-full w-10 h-10"
                            height={40}
                            src="https://storage.googleapis.com/a1aa/image/erVUuGafIvhTYUjipnjWL9b6WlbNsfbvzNpcHXJPwe83uW4PB.jpg"
                            width={40}
                        />
                        <span className="ml-3 text-white">Nintendo Switch</span>
                        </div>
                        <i className="fas fa-chevron-right text-gray-400"></i>
                    </div>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="w-full bg-red-600 py-3 rounded-full text-center text-white">
                    <i className="fas fa-ban mr-2"></i>
                    Block Josef
                    </button>
                </div>
                </div>

</>

                    </div>
                )}
            </div>

            <div className={`ch-footer m-2 px-2 py-2 rounded-[15px] bg-white flex justify-between ${lightTheme ? '' : 'dark'}`}>
                <input
                    placeholder="Type Message Here"
                    className="px-2 py-2 border-0 outline-0 bg-transparent w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton onClick={sendMessage}>
                    <SendIcon className={`${lightTheme ? '' : 'dark'}`} />
                </IconButton>
            </div>
        </div>
    );
}

export default ChatArea;
