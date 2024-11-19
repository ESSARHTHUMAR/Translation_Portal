import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import errorHandler from "../utils/error.js"

const authController = async (req, res, next) => {
  const { username, email, password, role } = req.body; //Get data from the frontend
  const hashedPassword = bcryptjs.hashSync(password, 10); //Convert password into encrypted form
  const newUser = new User({ username, email, password: hashedPassword, role }); //New user created with the data provided by the user

  try {
    await newUser.save(); //Save new user to the DB
    res.status(201).json("User created succesfully!");
  } catch (error) {
    next(error); 
  }
};

//Verify user credentials from Sign in page
export const signIn = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const validUser = await User.findOne({email})
    if(!validUser){
      return next(errorHandler(404, "User not found!"))
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);//Decrypt password and compare
    if(!validPassword){
      return next(errorHandler(401, "Wrong credentials!"))
    }
    const token = jwt.sign({ id: validUser._id}, process.env.JWT_KEY); //Create cookie
    const {password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, {httpOnly:true}).status(200).json({...rest, token})
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!')
  } catch (error) {
    next(error)
  }
}

export default authController;
