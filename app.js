import express, { json } from 'express';
import routes from './routes/queries.js';
import routes1 from './routes/article.js'; 
import routes2 from './routes/user.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
const app = express();
import yaml from 'yamljs'
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"My Brand API",
            version:"1.0.0",
            description:" my personal portfolio api access it by clicking on this "
        },
        servers:[{
            url: "https://fast-garden-04062.herokuapp.com",


            
            
        } ],   
    },
    apis:["./routes/*.js"]
}

// app.use(cors)
const specs=swaggerJsDoc(options)
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))


// import the routes
import * as dotenv from 'dotenv';
dotenv.config();

app.use(json());

app.use(cors());
app.options('*', cors());
app.enable('trust proxy');

app.use('/', routes);
app.use('/', routes2);
app.use('/', routes1);






 //to use the routes
 
 //import mongoose

import  mongoose from "mongoose";

 //establish connection to database
 mongoose.connect(
    process.env.MONGODB_URI,
     {useUnifiedTopology: true, useNewUrlParser: true},
     (err) => {
         if (err) return console.log("Error: ", err);
         console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
     }
 );
 
 

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
export default listener;