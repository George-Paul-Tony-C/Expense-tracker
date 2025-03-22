const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10h" });
};

// Register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password , profileImageUrl } = req.body;
    

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl, // Store the image URL here
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};


// Login user (for now, just a placeholder)
exports.loginUser = async (req, res) => {
    const {email , password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message : "All fields are required"});
    }

    try {
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({ message : "Invalid Credentials"});
        }

        res.status(200).json({
            id : user._id,
            user,
            token : generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Error logingin user", error: error.message });
    }
};

// Get user info (for now, just a placeholder)
exports.getUserInfo = async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message : "Error getting user Info" , error : error.message});
    }
};
