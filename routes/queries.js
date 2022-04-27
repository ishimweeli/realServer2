import { Router } from 'express';
const router = Router();
//import queries model
import queries from '../models/queries.js';
import * as dotenv from 'dotenv';
dotenv.config();
import auth1 from "../middleware/userAuth.js";
import queriesValidator from "../joiValidator/queriesValidator.js"
import multer from 'multer';
const upload = multer();

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
 *       required:
 *         
 *         -name:
 *         - email
 *         - password
 *       properties:
 *  
 *         name:
 *           type: string
 *           description: valid name  
 *         email:
 *           type: string
 *           description: valid email 
 *          
 *         message:
 *           type: string
 *       example:
 *         name: ishimwe eliab
 *         email: ishimweeli@gmail.com
 *         message: hello how are you
 */
/**
  * @swagger
  * tags:
  *   name:  queries
  *   description: login account
  */
/**
 * @swagger
 * /queries:
 *   post:
 *     summary: queries
 *     tags: [queries ]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.post("/queries", upload.none(),(req, res) => {
    //check if the query name already exists in db
    queries.findOne({ name: req.body.name },(err, data) => {

        //if query not in db, add it 
        if (!data) {
            //create a new tea object using the Tea model and req.body
            const result =queriesValidator.validate(req.body)
            console.log(result) 
            const query = new queries({
                name:req.body.name,
                email:req.body.email,
                message:req.body.message,
                  
            })
            
            // save this object to database
            query.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the tea is in db, return a message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"query already exists"});
        }
    })    
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 * 
 *   
 *   schemas:
 *     queries:
 *       type: object
 *       required:
 *         
 *         -name:
 *         - email
 *         - password
 *       properties:
 *  
 *         name:
 *           type: string
 *           description: valid name  
 *         email:
 *           type: string
 *           description: valid email 
 *          
 *         message:
 *           type: string
 *       example:
 *         name: ishimwe eliab
 *         email: ishimweeli@gmail.com
 *         message: hello how are you
 */
/**
  * @swagger
  * tags:
  *   name:  queries
  *   description: get queries account
  */
/**
 * @swagger
 * /queries:
 *   get:
 *     summary: get queries
 *     tags: [queries ]
 *     security:
 *      - ApiKeyAuth: []
 *     responseBody:
 *       required: required
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/queries'
 *       
 *       
 *     responses:
 *       200:
 *         description: go to get queries page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/queries'
 *       500:
 *         description: Some server error
 */
router.get('/queries', auth1,(req, res) => {
    queries.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
});




export default router;
