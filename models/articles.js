import mongoose from "mongoose";
import user from "../models/user.js";


// articles  schema
const articlesSchema = mongoose.Schema({
    date: { type: String, default: new Date() },
    img: 
    {
        type: String,
    },
    title: {type:String, required:false},
      author:String,
      articleBody:String,
    cloudinary_id: {
        String,
    },
     likes: [{ text: String, date: {type:String, default: new Date()}},{user} ],
    comments: [ { text: String, date: { type: String, default: new Date() } }, { user } ]
});

const articles =mongoose.model('articles', articlesSchema); //convert to model named Tea
export default articles; //export for controller use

