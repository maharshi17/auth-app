import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import { validationResult } from 'express-validator'

// @desc   Register new user
// @route  POST /api/auth/signup
// @access Public
export const signup = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    const { firstName, lastName, username, email, password } = req.body

    try {
        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return res.status(400).json({ message: "Email or Username already taken." })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        })

        // Generate token
        const token = generateToken(newUser._id)

        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            email: newUser.email,
            token,
        })
    } catch (error) {
        console.log("Signup error: ", error.message)
        res.status(500).json({ message: "Server error" })
    }
} 

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Find user by email
        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" })

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" })

        // Generate token
        const token = generateToken(user._id)

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            token,
        })
    } catch (error) {
        console.error("Login error:", error.message)
        res.status(500).json({ message: "Server error" })
    }
}