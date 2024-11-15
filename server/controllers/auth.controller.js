import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const authController = async (req, res) => {
  const { username, email, password, role } = req.body; //Get data from the frontend
  const hashedPassword = bcryptjs.hashSync(password, 10); //Convert password into encrypted form
  const newUser = new User({ username, email, password: hashedPassword, role }); //New user created with the data provided by the user

  try {
    await newUser.save(); //Save new user to the DB
    res.status(201).json("User created succesfully!");
  } catch (error) {
    res.status(500).json(error.message); 
  }
};

export default authController;
