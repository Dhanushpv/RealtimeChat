const mongoose =require('mongoose')

let userSchema = new mongoose.Schema({
    usertypes :{
        type : String
    }

});

const UserType = mongoose.model('usertypes', userSchema);

module.exports = UserType;