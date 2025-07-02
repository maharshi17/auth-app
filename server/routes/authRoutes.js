import express from 'express'
import { signup, login } from '../controllers/authController.js'
import { body } from 'express-validator'

const router = express.Router()

// Sign up route
router.post(
    '/signup', 
    [
        body('firstName', 'First Name is required').notEmpty(),
        body('lastName', 'Last Name is required').notEmpty(),
        body('username', 'Username is required').notEmpty(),
        body('email', 'Please enter a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Passwords do not match")
            return true
        })
    ], signup
)

// Login route
router.post('/login', login)

export default router