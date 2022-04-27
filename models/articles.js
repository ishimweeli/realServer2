import mongoose from "mongoose";
import user from "../models/user.js";


// articles  schema
const articlesSchema = mongoose.Schema({

    img: 
    {
        data: Buffer,
        contentType: String
    },
    title: {type:String, required:false},
      author:String,
      articleBody:String,
   
     likes: [{ text: String, date: {type:String, default: new Date()}},{user} ],
    comments: [{ text: String, date: {type:String, default: new Date()} }]
});

const articles =mongoose.model('articles', articlesSchema); //convert to model named Tea
export default articles; //export for controller use

