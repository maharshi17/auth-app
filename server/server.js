import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connectDB()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})