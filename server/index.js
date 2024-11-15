import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config(); //to load enviornment variables from .env file

const app = express(); //crate the instance for express
const PORT = "3000"; //Declared the PORT on which backend will run

//Connect our backend with MongoDB database
mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => console.log(error.message))

app.get("/", (req,res) => {
    res.send("Hello")
})

//Establish the connection on PORT: 3000
app.listen(PORT, (req,res) => {
    console.log(`The server is running on PORT ${PORT}`);
})