import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import User from "../models/users.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async  (req, res, next)=>{
    try {
        const {name, email, password}= req.body;
        if(!name){
            throw new Error("name is required");
        }
        if (!email) {
            throw new Error("Email is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }

        const hashPass = await hashPassword(password);
        const user = await User.create({name, email, password: hashPass})
        res.status(201).json({message: "User created successfully", user});
    } catch (error) {
        res.status(500).json({
            message:error?.message || "Internal server error"
        })
        next(error);
    }
}

export const loginUser = async  (req, res, next)=>{
    try {
        const {email, password} = req.body;
        if (!email) {
            throw new Error("Email is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }

        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found");
        }

        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            throw new Error("Invalid credentials");
        }

        const accessToken  = generateToken(
            {
            id: user._id,
            name: user.name,
            email: user.email
            }
        );
        res.status(200).json({
            message: "Login successful", 
            data: user,
            accessToken: accessToken});

    } catch (error) {
        res.status(500).json({
            message:error?.message || "Internal server error"
        })
        next(error);
    }
}

export const getUserDetails = async  (req, res, next)=>{
    try {
        const id = req.user?._id || req.user?.id;

        if (!id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User details retrieved successfully", 
            data: user});
    } catch (error) {
        next(error);
    }
    
}