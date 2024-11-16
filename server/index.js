import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"

dotenv.config(); //to load enviornment variables from .env file

const app = express(); //crate the instance for express
const PORT = "3000"; //Declared the PORT on which backend will run

app.use(express.json())

//Connect our backend with MongoDB database
mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => console.log(error.message))

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter); //Authentication endpoint

//Handling errors using the Middleware
app.use((err, req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

//Established the connection on PORT: 3000
app.listen(PORT, (req,res) => {
    console.log(`The server is running on PORT ${PORT}`);
})