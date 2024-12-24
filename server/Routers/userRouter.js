// const express = require('express');
// const router = express.Router();
// const userController = require('../Controllers/userController');
// const accessControl =require('../util/accessControl').accessControl
// const protect= require('../util/authMiddleware')
// // const upload = require('../utli/uploads');

// function  setAccessControl(access_types){
//     return(req,res,next)=>{
//         accessControl(access_types,req,res,next);
//     }

// }

// router.post('/user',userController.registerUser);
// router.post('/postMessage/:id',userController.postMessage);
// router.post('/sendMessage/:sender',userController.sendMessage);
// router.get('/allMessages/:chatId',userController.allMessages);
// router.post('/accessChat/:userId',protect,userController.accessChat);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const accessControl = require('../util/accessControl').accessControl;
const {protect} = require('../util/authMiddleware');

// Middleware for dynamic access control
function setAccessControl(access_types) {
  return (req, res, next) => {
    accessControl(access_types, req, res, next);
  };
}

// Routes

// Register a new user
router.post('/user', userController.registerUser);

// Post a message (requires :id for reference)
// router.post('/postMessage/:id', userController.postMessage);

// Send a message (requires :sender as a parameter)
router.post('/sendMessage/:sender/:reciever', userController.sendMessage);

// Retrieve all messages for a specific chat (requires :chatId)
router.get('/allMessages/:chatId', userController.allMessages);

// Access or create a one-on-one chat (requires authentication and :userId)
router.post('/accessChat/:userId', protect, userController.accessChat);

router.post('/createGroupChat',protect, userController.createGroupChat);

router.get('/fetchGroups',protect, userController.fetchGroups);

router.get('/fetchChats/:userId',protect, userController.fetchChats);

router.put('/groupExit/:userId',protect, userController.groupExit);

router.get('/fetchUsers',protect, userController.fetchAllUsersController);

router.put('/addselfgroup/:chatId/:userId',protect, userController.addselfgroup);

router.post('/sendGroupMessage/:chatId/:sender',protect, userController.sendGroupMessage);

router.get('/chatDetails/:chatId',protect, userController.chatDetails);





module.exports = router;
