const express = require("express");
const { protect } = require('../middleware/authMiddleware.js');
const { registerUser, loginUser, getUserInfo } = require("../controllers/authControllers.js");
const upload = require("../middleware/uploadMiddleware.js");
const { models } = require("mongoose");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user info (for now, this is just a placeholder route)
router.get("/getUser", protect, getUserInfo);

// Image upload route
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({ imageUrl });
});

module.exports = router;
