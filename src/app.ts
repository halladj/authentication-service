import express from "express"; 
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {Authenticate} from "./middleware/auth";
import {monitoringController, createUserController, verificationController} from "./controllers/user";
dotenv.config()


const app = express()


let MONGO_URL:string;
if ( process.env.MONGO_URL !== undefined){
  MONGO_URL = process.env.MONGO_URL;
}else{
  MONGO_URL = "";
}

mongoose.connect(MONGO_URL)
  .then(  ()     => console.log("DataBase Connected Successfully...."))
  .catch( (err)  => console.log("error can not connect "+ err));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 

app.get('/', (req, res) => {

  res.status(200);
  res.send("thank you all");
} );
app.post('/user', createUserController);
app.post('/verify', verificationController);

// Protected route.
app.post('/monitoring', [Authenticate, monitoringController]);


var port = process.env.PORT || '3000'
app.listen(port, ()=> {
    console.log('Server listening on port', port)
});
