const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob:{
        type: Date
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    verified:{
        type: Boolean
    },
    division:{
        type: String
        },
    district:{
        type: String
        
    },
    city:{
        type: String
    },
    address:{
        type: String
    },

});
const users = new mongoose.model("users",UserSchema);


module.exports = users;