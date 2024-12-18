let User = require('../db/models/users');
let Usertype = require('../db/models/usertypes');
let Message =require('../db/models/messageModel')

const { success_function, error_function } = require('../util/Reaponsehandler');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
let Chat = require('../db/models/chatModel');

const asyncHandler = require("express-async-handler");


exports.registerUser = async function (req, res) {
    try {
        let body = req.body;
        console.log("body", body);
        let Password = req.body.password;

        // If usertype is not provided, default it to "User"
        body.usertypes = body.usertypes || "Users";

        // Find user type by name
        let usertype = await Usertype.findOne({ usertypes: body.usertypes });
        if (!usertype) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Invalid user type"
            });
        }

        console.log("user type", usertype);
        let id = usertype._id; // Get the ObjectId
        console.log("id", id);

        // Assign the ObjectId to the usertype field
        body.usertype = id;

        let salt = bcrypt.genSaltSync(10);
        let hashedpasword = bcrypt.hashSync(Password, salt);
        console.log("password : ", hashedpasword);

        let data = {
            name: body.name,
            email: body.email,
            phone_no: body.phone_no,
            password: hashedpasword,
            usertypes: body.usertype
        };

        // Check if the email already exists
        let existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Email already exists"
            });
        }

        // Create the new user with the correct usertype ObjectId
        let userData = await User.create(data);
        console.log("userData", userData);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "User successfully added.",
            data: userData
        });
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "Error adding user"
        });
        res.status(response.statuscode).send(response);
        return;
    }
};
 
// exports.sendMessage = async function (req, res) {
//     const { content, reciever } = req.body;  // Extract message content and receiver's ID from request body
//     const sender = req.params.sender;  // Extract sender ID from route parameters
  
//     // Validate input
//     if (!content || !reciever || !sender) {
//       return res.status(400).json({ error: "Content, receiverId, and senderId are required" });
//     }
  
//     // Find the receiver user by ID
//     const receiver = await User.findById(reciever);
//     if (!receiver) {
//       return res.status(404).json({ error: "Receiver user not found" });
//     }
  
//     // Check if a chat already exists between the sender and receiver
//     let chat = await Chat.findOne({
//       users: { $all: [sender, reciever] }
//     });
  
//     // If no chat exists, create a new chat
//     if (!chat) {
//       chat = await Chat.create({
//         users: [sender, reciever],
//         isGroupChat: false,  // Default to false as it's a 1-to-1 chat
//       });
//     }
  
//     // Create new message object
//     const newMessage = {
//       sender: sender,  // Using sender from the route parameter
//       content: content,
//       chat: chat._id,  // The message is associated with the chat
//       reciever: reciever,  // Add receiver to the message (updated to match schema)
//     };
  
//     try {
//       // Create a new message in the database
//       let message = await Message.create(newMessage);
  
//       // Populate sender and receiver fields
//       message = await message.populate("sender", "name pic");
//       message = await message.populate("reciever", "name pic");  // Populating receiver field (updated to match schema)
//       message = await message.populate("chat");
  
//       // Populate the users in the chat
//       message = await User.populate(message, {
//         path: "chat.users",
//         select: "name email",
//       });
  
//       // Update the chat with the latest message
//       await Chat.findByIdAndUpdate(chat._id, { latestMessage: message });
  
//       // Send the populated message as response
//       res.json(message);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// exports.postMessage = async function (req, res) {

//     const { content, chatId } = req.body;  // Extract message content and chat ID from request body

//     // Validate input
//     if (!content || !chatId) {
//       console.log("Invalid data passed into request");
//       return res.status(400).json({ error: "Content and chatId are required" });
//     }
  
//     // Find the chat by ID
//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" });
//     }
//     console.log(chat)
  
//     // Determine the receiver by excluding the sender from the chat users
//     const receiver = chat.users.find(user => user._id.toString() !== req.user._id.toString());
  
//     if (!receiver) {
//       return res.status(404).json({ error: "Receiver not found" });
//     }
  
//     // Create new message object
//     const newMessage = {
//       sender: req.user._id,  // Get sender ID from authenticated user
//       content: content,
//       chat: chatId,  // The message is associated with a chat
//       receiver: receiver._id,  // Add receiver to the message
//     };
  
//     try {
//       // Create a new message in the database
//       let message = await Message.create(newMessage);
  
//       // Populate the sender and receiver fields
//       message = await message.populate("sender", "name pic");
//       message = await message.populate("receiver", "name pic"); // Populate receiver's information
//       message = await message.populate("chat");
  
//       // Populate the users in the chat
//       message = await User.populate(message, {
//         path: "chat.users",
//         select: "name email",
//       });
  
//       // Update the chat with the latest message
//       await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
  
//       // Send the populated message as response
//       res.json(message);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }

// }

exports.sendMessage = async function (req, res) {
  const { content } = req.body;  // Extract message content from the request body
  const sender = req.params.sender;  // Extract sender ID from the route parameters
  const reciever = req.params.reciever;  // Extract receiver ID from the route parameters

  // Validate input
  if (!content || !reciever || !sender) {
    return res.status(400).json({ error: "Content, receiverId, and senderId are required" });
  }

  // Find the receiver user by ID
  const receiverUser = await User.findById(reciever);
  if (!receiverUser) {
    return res.status(404).json({ error: "Receiver user not found" });
  }

  // Check if a chat already exists between the sender and receiver
  let chat = await Chat.findOne({
    users: { $all: [sender, reciever] }
  });

  // If no chat exists, create a new chat
  if (!chat) {
    chat = await Chat.create({
      users: [sender, reciever],
      isGroupChat: false,  // Default to false as it's a 1-to-1 chat
    });
  }

  // Create new message object
  const newMessage = {
    sender: sender,  // Using sender from the route parameter
    content: content,
    chat: chat._id,  // The message is associated with the chat
    reciever: reciever,  // Add receiver to the message (updated to match schema)
  };

  try {
    // Create a new message in the database
    let message = await Message.create(newMessage);

    // Populate sender and receiver fields
    message = await message.populate("sender", "name pic");
    message = await message.populate("reciever", "name pic");  // Populating receiver field (updated to match schema)
    message = await message.populate("chat");

    // Populate the users in the chat
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    // Update the chat with the latest message
    await Chat.findByIdAndUpdate(chat._id, { latestMessage: message });

    // Send the populated message as response
    res.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.allMessages =async function (req, res) {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("reciever")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

exports.accessChat = asyncHandler(async (req, res) => {
  console.log("Request parameters:", req.params);
  console.log("User ID:", req.user ? req.user.id : "No user");
  const { userId } = req.params;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      console.log(FullChat)
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

exports.createGroupChat = asyncHandler(async (req, res) => {
  const { users, chatName } = req.body;

  // Validate input
  if (!users || !chatName) {
    return res.status(400).json({ message: "Data is insufficient" });
  }

  try {
    // Ensure `users` is an array of valid ObjectIds
    const parsedUsers = Array.isArray(users) ? users : JSON.parse(users);

    // Validate that `parsedUsers` is a non-empty array
    if (!Array.isArray(parsedUsers) || parsedUsers.length === 0) {
      return res.status(400).json({ message: "Users array is empty or invalid" });
    }

    // Convert `req.user` to string and ensure it's included
    const currentUser = req.user._id.toString();
    const userIds = parsedUsers.map((u) => u.toString());
    userIds.push(currentUser);

    // Remove duplicates and ensure all users are valid ObjectIds
    const uniqueUsers = [...new Set(userIds)];

    // Create the group chat
    const groupChat = await Chat.create({
      chatName: chatName,
      users: uniqueUsers,
      isGroupChat: true,
      groupAdmin: currentUser,
    });

    // Populate the created group chat with user details
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password") // Exclude password from populated users
      .populate("groupAdmin", "-password"); // Exclude password from group admin

    // Send the response
    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error creating group chat:", error.message);
    res.status(500).json({ message: "Failed to create group chat", error: error.message });
  }
});

exports.fetchGroups = asyncHandler(async (req, res) => {
  try {
    const allGroups = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(allGroups);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

exports.fetchChats = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const chats = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
      console.log("chats",chats)

    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "users.name uers.email",
    });
    console.log("populatedChats",populatedChats)

    res.status(200).send(populatedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

exports.groupExit = asyncHandler(async (req, res) => {
  const { chatId } = req.body; // chatId comes from the request body
  const { userId } = req.params; // userId comes from the URL parameters

  // Check if the requester is an admin (optional logic for your app)
  // You can add additional logic here to check if the user is an admin, 
  // based on your application's requirements.

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId }, // Remove the user from the chat's users array
    },
    {
      new: true, // Return the updated chat
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed); // Return the updated chat details
  }
});

exports.fetchAllUsersController = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});





