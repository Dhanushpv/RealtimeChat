const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const accessControl =require('../util/accessControl').accessControl
// const upload = require('../utli/uploads');

function  setAccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next);
    }
}

router.post('/login',authController.login);


module.exports = router;