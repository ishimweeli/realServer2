

// import articles from '../models/articles.js';

// //GET all queries


// //POST queries




// //GET '//:name'
// // const getOneArticle = 

// //DELETE 1 article
// // const deleteOneArticle = (req, res) => {
// //     let title = req.params.title; 

// //     articles.deleteOne({title:title}, (err, data) => {
// //     //if there's nothing to delete return a message
// //     if( data.deletedCount == 0) return res.json({message: "article doesn't exist."});
// //     //else if there's an error, return the err message
// //     else if (err) return res.json(`Something went wrong, please try again. ${err}`);
// //     //else, return the success message
// //     else return res.json({message: "article deleted."});
// //     });
// // };

// //POST 1 article comment
// const newComment = (req, res) => {
//     let title = req.params.title; 
//     let newComment = req.body.comments; //get the comment
//     //create a comment object to push
//     const comments = {
//         text: newComment,
//         date: new Date()
//     }
//     //find the article object
//     articles.findOne({title:title}, (err, data) => {
//         if(err || !data || !newComment) {
//             return res.json({message: "article doesn't exist."});
//         }
//         else {
//             //add comment to comments array of the  object
//             data.comments.push(comments);
//             //save changes to db
//             data.save(err => {
//                 if (err) { 
//                 return res.json({message: "Comment failed to add.", error:err});
//                 }
//                 return res.json(data);
//             })  
//         } 
//     })
//   };
  
// //POST 1 article comment
// const likes= (req, res) => {
//     let title = req.params.title; //get the tea to add the comment in
//     let newLikes = req.body.likes; //get the comment
//     //create a comment object to push
//     const like = {
//         text: newLikes,
//         date: new Date()
//     }
//     //find the article object
//     articles.findOne({title:title}, (err, data) => {
//         if(err || !data || !newComment) {
//             return res.json({message: "article doesn't exist."});
//         }
//         else {
//             //add comment to comments array of the  object
//             data.likes.push(like);
//             //save changes to db
//             data.save(err => {
//                 if (err) { 
//                 return res.json({message: "Comment failed to add.", error:err});
//                 }
//                 return res.json(data);
//             })  
//         } 
//     })
//   };
  

  
//   const newUpdates=(req, res) => {
//     console.log(req.params._id);
//        articles.findByIdAndUpdate({_id:req.params._id},{
//        $set: {
//         img:req.body.img,
//         title:req.body.title,
//         author:req.body.author,
//         articleBody:req.body.articleBody,
//        }
//     }).then (result=>{
//         res.status(200).json({updated_articles:result})
    
//     }).catch(err=>{
//         console.error(err);
//         res.status(500).json({error:err})
//     })
//     };
// //export controller functions {
//     export default {
//      getAllArticles, 
//     newArticles,
//     getOneArticle,
//    deleteOneArticle,
//     newComment,
//     likes,
//     newUpdates,
    
// };
    

