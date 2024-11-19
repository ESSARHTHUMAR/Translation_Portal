import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import fileRouter from "./routes/file.route.js"
import cors from "cors";
import path from "path"



dotenv.config(); //to load enviornment variables from .env file

const app = express(); //crate the instance for express
const PORT = "3000"; //Declared the PORT on which backend will run

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json())
app.use(cookieParser()); // To parse cookies

//Connect our backend with MongoDB database
mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => console.log(error.message))

const __dirname = path.resolve()

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter); //Authentication endpoint
app.use("/api", fileRouter);

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

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