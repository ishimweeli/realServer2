import { default as express } from 'express';
import articles from '../models/articles.js';

const router = express.Router();

import auth1 from "../middleware/userAuth.js";
import multer from "multer";


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 * 
 *   schemas:
 *     articles:
 *       type: object
 *       required:
 *         -image
 *         -title
 *         - author
 *         - articleBody
 *       properties:
 *         img:
 *           type: string
 *           description: valid img
 *         title:
 *           type: string
 *           description: valid name  
 *         author:
 *           type: string
 *           description: valid author 
 *          
 *         articleBody:
 *           type: string
 *       example:
 *         img: title-img
 *         title: breaking news
 *         author: ishimweeli
 *         articleBody: hello how are you
 */
/**
  * @swagger
  * tags:
  *   name:  articles
  *   description: article posting account
  */
/**
 * @swagger
 * /articles:
 *   post:
 *     summary: articles
 *     tags: [articles ]
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/articles'
 *     responses:
 *       200:
 *         description: go to login page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/articles'
 *       500:
 *         description: Some server error
 */
router.post("/articles", auth1, (req, res) => {
    //check if the query name already exists in db
    articles.findOne({ title: req.body.title }, (err, data) => {

        //if query not in db, add it
        if (!data) {
            //create a new tea object using the Tea model and req.body
            const article = new articles({
                img:req.body.img,
                title:req.body.title,
                author: req.body.author,
                articleBody:req.body.articleBody
                
            })

            // save this object to database
            article.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the tea is in db, return a message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"article already exists"});
        }
    })    
});


    
// router.post('/articles',auth1,newArticles);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     articles:
 *       type: object
 *       required:
 *         
 *         -title:
 *         - author
 *         - articleBody
 *       properties:
 *  
 *         title:
 *           type: string
 *           description: valid name  
 *         author:
 *           type: string
 *           description: valid email 
 *          
 *         articleBody:
 *           type: string
 *       example:
 *         title: ishimwe eliab
 *         author: ishimweeli@gmail.com
 *         articleBody: hello how are you
 */
/**
  * @swagger
  * tags:
  *   name:  articles
  *   description: get articles account
  */
/**
 * @swagger
 * /articles:
 *   get:
 *     summary: get articles
 *     tags: [articles]
 *     
 *     responseBody:
 *       required: required
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/articles'
 *       
 *       
 *     responses:
 *       200:
 *         description: go to get articles page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/articles'
 *       500:
 *         description: Some server error
 */
router.get('/articles',(req,res) => {
    articles.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
});

/**
 * @swagger
 * /articles/{id}:
 *  get:
 *    summary: get articles by its id
 *    
 *    tags: [articles]
 *    
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The articles id
 *    responseBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/articles'
 *    responses:
 *      200:
 *        description: The article by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/articles'
 *      404:
 *        description: The article was not found was not found
 *      500:
 *        description: Some error happened
 */

router.get('/articles/:_id', (req, res) => {
    let _id = req.params._id; //get the tea name

    //find the specific tea with that name
    articles.findOne({_id:_id}, (err, data) => {
    if(err || !data) {
        return res.json({message: "article doesn't exist."});
    }
    else return res.json(data); //return the tea object if found
    });
}
);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     queries:
 *       type: object
 *       
 *      
 */
/**
  * @swagger
  * tags:
  *   name:  articles
  *   description: delete articles
  */
/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: delete articles
 *     tags: [articles ]
 * 
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *     responseBody:
 *       required: true
 *       content:
 *         application/json:
 *        
 *           schema:
 *             $ref: '#/components/schemas/queries'
 *     responses:
 *       200:
 *         description: go to login page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/queries'
 *       500:
 *         description: Some server error
 */
 router.delete('/articles/:_id', auth1,(req, res) => {
    let _id = req.params._id; 

    articles.deleteOne({_id:_id}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "article doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "article deleted."});
    });
}
);
 
/**
 * @swagger
 * /articles/{id}:
 *  post:
 *    summary: comments on  articles by its id
 *    
 *    tags: [articles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The articles id comments
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/articles'
 *    responses:
 *      200:
 *        description: The article like 
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/articles'
 *      404:
 *        description: The article was not found was not found
 *      500:
 *        description: Some error happened
 */
 router.post('/articles/:_id', (req, res) => {
    let _id = req.params._id; 
    let newComment = req.body.comments; //get the comment
    //create a comment object to push
    const comments = {
        text: newComment,
        date: new Date()
    }
    //find the article object
    articles.findOne({_id:req.params._id}, (err, data) => {
        if(err || !data || !newComment) {
            return res.json({message: "article doesn't exist."});
        }
        else {
            //add comment to comments array of the  object
            data.comments.push(comments);
            //save changes to db
            data.save(err => {
                if (err) { 
                return res.json({message: "Comment failed to add.", error:err});
                }
                return res.json(data);
            })  
        } 
    })
  }
);
  

/**
 * @swagger
 * /likes/{id}:
 *  post:
 *    summary: like  articles by its id
 *    
 *    tags: [likes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The articles id like
 *    responseBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/articles'
 *    responses:
 *      200:
 *        description: The article like 
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/articles'
 *      404:
 *        description: The article was not found was not found
 *      500:
 *        description: Some error happened
 */

router.post('/likes/:_id', (req, res) => {
    let _id = req.params._id; //get the tea to add the comment in
    let newLikes = req.body.likes; //get the comment
    //create a comment object to push
    const like = {
        text: newLikes,
        date: new Date()
    }
    //find the article object
    articles.findOne({_id:req.params._id}, (err, data) => {
        if(err || !data ) {
            return res.json({message: "article doesn't exist."});
        }
        else {
            //add comment to comments array of the  object
            data.likes.push(like);
            //save changes to db
            data.save(err => {
                if (err) { 
                return res.json({message: "Comment failed to add.", error:err});
                }
                return res.json(data);
            })  
        } 
    })
  }
  
);
/**
 * @swagger
 * /update/{id}:
 *  put:
 *    summary: get articles by its id
 *    
 *    tags: [update]
 *    security:
 *      - ApiKeyAuth: []   
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: false
 *        description: updateThe articles id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/articles'
 *    responses:
 *      200:
 *        description: update The article by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/articles'
 *      404:
 *        description: The article was not found was not found
 *      500:
 *        description: Some error happened
 */


router.put('/update/:_id',auth1,(req, res) => {
    console.log(req.params._id);
       articles.findByIdAndUpdate({_id:req.params._id},{
       $set: {
        img:req.body.img,
        title:req.body.title,
        author:req.body.author,
        articleBody:req.body.articleBody,
       }
    }).then (result=>{
        res.status(200).json({updated_articles:result})
    
    }).catch(err=>{
        console.error(err);
        res.status(500).json({error:err})
    })
    });

export default router;