

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelfContainerSection from '../SelfContainerSection/SelfContainerSection';
import GetMessageSection from '../GetMessageSection/GetMessageSection';
import SendIcon from '@mui/icons-material/Send';
import '../ChatArea/ChatArea.css';
import { useSelector } from 'react-redux';
import '../SideBar/SideBar.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function ChatArea() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const tokenKey = params.get('login');
    const receiver = params.get('receiver');
    let chatId = params.get('chatId')
    const token = localStorage.getItem(tokenKey);

    const lightTheme = useSelector((state) => state.themeKey.themeKey);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverName, setReceiverName] = useState('User'); // Default name
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const messagesEndRef = useRef(null); // For auto-scrolling

    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Fetch receiver's name
    const fetchReceiverName = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:4000/fetchUsers/${receiver}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReceiverName(response.data.name);
        } catch (error) {
            setError('Failed to fetch receiver name.');
            console.error('Error fetching receiver name:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch messages
    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:4000/allMessages/${chatId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data);
            scrollToBottom(); // Scroll to the bottom after fetching messages
        } catch (error) {
            setError('Failed to fetch messages.');
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Send a message
    const sendMessage = async () => {
        if (!message.trim()) return; // Do not send empty messages

        try {
            const response = await axios.post(
                `http://localhost:4000/sendMessage/${userId}/${receiver}`,
                { content: message },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessages((prevMessages) => [...prevMessages, response.data]);
            setMessage(''); // Clear the input field
            scrollToBottom(); // Scroll to the bottom after sending a message
        } catch (error) {
            setError('Failed to send message.');
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchReceiverName();

        // Cleanup (if necessary for unmounting)
        return () => {
            setMessages([]);
            setReceiverName('User');
        };
    }, []);

    return (
        <div className={`ch-MainContainer flex flex-col w-full h-full ${lightTheme ? '' : 'dark'}`}>
            {/* Chat Header */}
            <div className="ch-header m-2 px-2 py-2 rounded-[15px] bg-white flex justify-between">
                <div className="flex items-center">
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                    <span className="font-extrabold">{receiverName}</span>
                </div>
                <div>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="ch-chat m-2 px-3 py-3 rounded-[15px] bg-white h-11/12 flex-1 flex flex-col overflow-y-auto">
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
                            <GetMessageSection message={msg.content} />
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Footer */}
            <div className="ch-footer m-2 px-2 py-2 rounded-[15px] bg-white flex justify-between">
                <input
                    placeholder="Type Message Here"
                    className="px-2 py-2 border-0 outline-0 bg-transparent w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton onClick={sendMessage}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default ChatArea;
