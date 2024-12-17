// const User = require("../db/models/users");
// const Usertype = require("../db/models/usertypes");
// const Chat = require("../db/models/chatModel");

// const { success_function, error_function } = require("../util/Reaponsehandler");



// exports.accessChat = async function (req, res) {
//   const { userId } = req.body; // Extract userId from req.body

//   if (!userId) {
//     return error_function(res, 400, "User ID is required"); // Ensure userId is provided
//   }

//   try {
//     // Check if a one-on-one chat exists
//     let chat = await Chat.findOne({
//       isGroupChat: false,
//       users: { $all: [req.user._id, userId] }, // Find a chat involving both users
//     })
//       .populate("users", "-password") // Populate user details without the password
//       .populate("latestMessage");

//     if (chat) {
//       // Populate the sender details of the latest message
//       chat = await User.populate(chat, {
//         path: "latestMessage.sender",
//         select: "name email",
//       });

//       return success_function(res, 200, "Chat found", chat);
//     }

//     // If chat doesn't exist, create a new one
//     const newChatData = {
//       chatName: "sender", // Placeholder name for one-on-one chats
//       isGroupChat: false,
//       users: [req.user._id, userId],
//     };

//     const newChat = await Chat.create(newChatData);

//     const fullChat = await Chat.findById(newChat._id)
//       .populate("users", "-password");

//     return success_function(res, 201, "New chat created", fullChat);
//   } catch (error) {
//     console.error("Error in accessing chat:", error); // Log the error for debugging
//     return error_function(res, 500, "Server error");
//   }
// };


// const asyncHandler = require("express-async-handler");
// const Chat = require("../db/models/chatModel");
// const User = require("../db/models/users");

// exports.accessChat = asyncHandler(async (req, res) => {
//   console.log("Request body:", req.body);
//   console.log("User ID:", req.user ? req.user._id : "No user");
//   const { userId } = req.body;

//   if (!userId) {
//     console.log("UserId param not sent with request");
//     return res.sendStatus(400);
//   }

//   var isChat = await Chat.find({
//     isGroupChat: false,
//     $and: [
//       { users: { $elemMatch: { $eq: req.user._id } } },
//       { users: { $elemMatch: { $eq: userId } } },
//     ],
//   })
//     .populate("users", "-password")
//     .populate("latestMessage");

//   isChat = await User.populate(isChat, {
//     path: "latestMessage.sender",
//     select: "name email",
//   });

//   if (isChat.length > 0) {
//     res.send(isChat[0]);
//   } else {
//     var chatData = {
//       chatName: "sender",
//       isGroupChat: false,
//       users: [req.user._id, userId],
//     };

//     try {
//       const createdChat = await Chat.create(chatData);
//       const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
//         "users",
//         "-password"
//       );
//       res.status(200).json(FullChat);
//     } catch (error) {
//       res.status(400);
//       throw new Error(error.message);
//     }
//   }
// });