const express = require('express');
const router = express.Router();
const ChatController = require('../Controllers/ChatController')
const accessControl =require('../util/accessControl').accessControl
// const upload = require('../utli/uploads');

function  setAccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next);
    }

}

router.post('/asd',ChatController.accessChat);


module.exports = router;