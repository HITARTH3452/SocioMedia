import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName : {
        type : String,
        require : true,
        min : 5,
        max : 50
    },
    lasttName : {
        type : String,
        require : true,
        min : 5,
        max : 50
    },
    email : {
        type : String,
        require : true,
        unique : true,
        min : 5,
        max : 50
    },
    password : {
        type : String,
        require : true,
        min : 5,
        max : 50
    },
    password : {
        type : String,
        require : true,
        min : 5,
    },
    pictuePath : {
        type : String,
        default : "",
    },
    friends : {
        type : Array,
        default : []
    },
    location : String,
    occupation : String,
    viewedProfile : Number,
    impressions : Number,
} , { timestamps : true})

const User = mongoose.model("User" , UserSchema);
export default User;