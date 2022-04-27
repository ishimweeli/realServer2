
import express from 'express';

import * as dotenv from 'dotenv';


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from "../models/user.js";
import userValidate from "../joiValidator/user.vlidator.js"
import loginValidate from "../joiValidator/loginValidator.js"

const router = express.Router();
dotenv.config();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         -first_name:
 *         -last_name:
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: valid name
 *         last_name:
 *           type: string
 *           description: valid name  
 *         email:
 *           type: string
 *           description: valid email 
 *          
 *         password:
 *           type: string
 *       example:
 *         first_name: el
 *         last_name: ish
 *         email: ishimweeli@gmail.com
 *         password: 12345678
 */
/**
  * @swagger
  * tags:
  *   name:  register
  *   description: login account
  */
/**
 * @swagger
 * /register:
 *   post:
 *     summary: register
 *     tags: [register ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: go to register
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user.'
 *       500:
 *         description: Some server error
 */
router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
      const result = await userValidate.validateAsync(req.body)
      console.log(result)
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
      const oldUser = await user.findOne({ email: req.body.email });
      
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      
      // console.log(oldUser);

      const encryptedPassword = await bcrypt.hash(password, 10);

      const  returnedUser = await user.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
      // Create token
      const token = jwt.sign(
        { user_id: returnedUser._id, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      returnedUser.token = token;
        res.status(201).json(returnedUser);
    } catch (err) {
      if (err.isJoi===true) res.json(err)//err.status=422
      console.log(err);
    }
    // Our register logic ends here
  }
  
  // ...



  // ...
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
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: valid email 
 *         password:
 *           type: string
 *       example:
 *         email: ishimweeli@gmail.com
 *         password: 12345678
 */
/**
  * @swagger
  * tags:
  *   name:  login
  *   description: login account
  */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login
 *     tags: [Login ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: go to login page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/login'
 *       500:
 *         description: Some server error
 */

router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
      const result = await loginValidate.validateAsync(req.body)
      console.log(result)
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      
      const users= await user.findOne({email});
      // console.log("the user we have is:", users)
      const theUserPswd = await bcrypt.compare(password, users.password); 

      
      if (!(users && theUserPswd)) res.status(400).send("Invalid Credentials");
        // Create token
        const token = jwt.sign(
          { user_id: users._id, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "2h",
          }
        );
  // console.log("the token created is here;", token)
        // save user token
        users.token = token;
          res.status(200).json(users);
      
    } catch (err) {
      if (err.isJoi===true) res.json(err)
      console.log(err);
    }
    // Our register logic ends here
  });
  
  // ...);


export default router;
   