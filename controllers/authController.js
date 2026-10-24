const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

const register = async (req, res) => {
    try {
        // 1. Get data from request body
        const {
            name,
            email,
            password
        } = req.body;

        // 2. Check whether user already exists
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // 3. Convert password into hashed password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // 4. Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Send response
        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= LOGIN =================

const login = async (req, res) => {
    try {
        // 1. Get email and password
        const {
            email,
            password
        } = req.body;

        // 2. Find user using email
        const user =
            await User.findOne({ email });

        // 3. If user doesn't exist
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 4. Compare entered password
        //    with hashed password in database
        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        // 5. If password is incorrect
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 6. Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // 7. Send token to client
        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= EXPORT =================

module.exports = {
    register,
    login
};