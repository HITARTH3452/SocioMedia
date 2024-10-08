import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId : {
            type : String,
            requires : true,
        },
        location : String,
        description : String,
        picturePath : String,
        userPicturePath : String,
        likes: {
            type : Map,
            of : Boolean
        },
        comment : {
            types : Array,
            default : []
        }
    },
    {timestamps : true}
);

const Post = mongoose.model("Post" , postSchema);

export default Post;