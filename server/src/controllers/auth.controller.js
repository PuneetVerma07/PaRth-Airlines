const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. SIGNUP LOGIC
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check agar user pehle se exist karta hai
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Password Hash karna (Security requirement)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // New User create karna
        user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        // after signup, also generate a token so frontend can log user in immediately
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, role: user.role },
            token,
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// 2. LOGIN LOGIC
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User check karna
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // Password match karna
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // JWT Token generate karna (Authentication & Authorization)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};