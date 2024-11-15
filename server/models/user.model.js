import mongoose from "mongoose"

//Created User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        required: true,
        default: "customer"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true}) // To add timestamp when new user created & if user update any data

//Created User Model
const User = mongoose.model('User', userSchema);

export default User;