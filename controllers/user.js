// //import tea model
// // importing user context
// import findOne from "../models/user.js";
// import  create from "../models/user.js";
// import * as dotenv from 'dotenv';
// dotenv.config();
// import hash from 'bcryptjs';
// import compare from 'bcryptjs';
// import  sign  from 'jsonwebtoken';
// // const auth = require("../middleware/authServer");

// const register= async (req, res) => {

//     // Our register logic starts here
//     try {
//       // Get user input
//       const { first_name, last_name, email, password } = req.body;
  
//       // Validate user input
//       if (!(email && password && first_name && last_name)) {
//         res.status(400).send("All input is required");
//       }
  
//       // check if user already exist
//       // Validate if user exist in our database
//       const oldUser = await findOne({ email });
  
//       if (oldUser) {
//         return res.status(409).send("User Already Exist. Please Login");
//       }
  
//       //Encrypt user password
//     //    const password = await req.body.password;
//       encryptedPassword = await hash(password, 10);
  
//       // Create user in our database
//       const user = await create({
//         first_name,
//         last_name,
//         email: email.toLowerCase(), // sanitize: convert email to lowercase
//         password: encryptedPassword,
//       });
  
//       // Create token
//       const token = sign(
//         { user_id: user._id, email },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//           expiresIn: "2h",
//         }
//       );
//       // save user token
//       user.token = token;
  
//       // return new user
//       res.status(201).json(user);
//     } catch (err) {
//       console.log(err);
//     }
//     // Our register logic ends here
//   };
  
//   // ...



//   // ...

// const login= async (req, res) => {

//     // Our login logic starts here
//     try {
//       // Get user input
//       const { email, password } = req.body;
  
//       // Validate user input
//       if (!(email && password)) {
//         res.status(400).send("All input is required");
//       }
//       // Validate if user exist in our database
//       const user = await findOne({ email });
  
//       if (user && (await compare(password, user.password))) {
//         // Create token
//         const token = sign(
//           { user_id: user._id, email },
//           process.env.ACCESS_TOKEN_SECRET,
//           {
//             expiresIn: "2h",
//           }
//         );
  
//         // save user token
//         user.token = token;
  
//         // user
//         res.status(200).json(user);
//       }
//       res.status(400).send("Invalid Credentials");
//     } catch (err) {
//       console.log(err);
//     }
//     // Our register logic ends here
//   };
  
//   // ...
// export default {
//     register,
//     login
// }
