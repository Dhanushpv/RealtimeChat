
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
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

    // const sendMessage = async () => {
    //     if (!message.trim()) return;

    //     try {
    //         const response = await axios.post(
    //             `http://localhost:4000/sendMessage/${userId}/${receiver}`,
    //             { content: message },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );
    //         setMessages((prevMessages) => [...prevMessages, response.data]);
    //         setMessage('');
    //         scrollToBottom();
    //         socket.emit('new message', response.data);
    //     } catch (err) {
    //         setError('Failed to send message.');
    //         console.error(err);
    //     }
    // };

    const sendMessage = async () => {
        if (!message.trim()) return;
    
        try {
            let response;
            // Check if it's a group chat or one-to-one chat
            if (isGroupChat) {  // Using isGroupChat flag
                // Call the group message endpoint
                response = await axios.post(
                    `http://localhost:4000/sendGroupMessage/${chatId}/${userId}`,  // Group message endpoint
                    { content: message },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // Call the one-to-one message endpoint
                response = await axios.post(
                    `http://localhost:4000/sendMessage/${userId}/${receiver}`,  // One-on-one message endpoint
                    { content: message },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
    
            // Update the state with the new message
            setMessages((prevMessages) => [...prevMessages, response.data]);
            setMessage('');  // Clear message input
            scrollToBottom();  // Scroll to the latest message
    
            // Emit the new message to the appropriate room or chat
            socket.emit('new message', response.data);  // Send to group or receiver
        
        } catch (err) {
            setError('Failed to send message.');
            console.error(err);
        }
    };
    
    useEffect(() => {
        const fetchChatDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/chatDetails/${chatId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsGroupChat(response.data.isGroupChat);  // Set flag from server response
            } catch (err) {
                console.error("Error fetching chat details:", err);
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
                setReceiverName("User"); // Fallback if no message from the receiver yet
            }
        }
    }, [messages, receiver]);

    return (
        <div className={`ch-MainContainer flex flex-col w-full h-full ${lightTheme ? '' : 'dark'}`}>
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
                            <GetMessageSection 
                            content={msg.content} 
                            name={msg.sender.name} 
                            time={new Date(msg.updatedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })} 
                          />
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

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
