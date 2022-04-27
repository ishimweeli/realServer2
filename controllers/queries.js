
// //import queries model
// import queries from '../models/queries.js';
// import findOne from "express";
// import find from "express";
// import * as dotenv from 'dotenv';
// dotenv.config();

// //GET all queries
// const getAllQueries = (req, res) => {
//     find({}, (err, data)=>{
//         if (err){
//             return res.json({Error: err});
//         }
//         return res.json(data);
//     })
// };

// // POST queries
// const newQueries = (req, res) => {
//     //check if the query name already exists in db
//     findOne({ name: req.body.name }, (err, data) => {

//         //if query not in db, add it
//         if (!data) {
//             //create a new tea object using the Tea model and req.body
//             const newQueries = new queries({
//                 name:req.body.name,
//                 email:req.body.email,
//                 message:req.body.message,
               
                
//             })

//             // save this object to database
//             newQueries.save((err, data)=>{
//                 if(err) return res.json({Error: err});
//                 return res.json(data);
//             })
//         //if there's an error or the tea is in db, return a message         
//         }else{
//             if(err) return res.json(`Something went wrong, please try again. ${err}`);
//             return res.json({message:"query already exists"});
//         }
//     })    
// };


// //export controller functions
// export default {
//     getAllQueries, 
//     newQueries,
    
//  };