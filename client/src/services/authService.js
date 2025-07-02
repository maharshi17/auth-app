import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

// Sign up
export const signupUser = async (formData) => {
    const response = await axios.post(`${API_URL}/signup`, formData)
    return response.data
}

// Login
export const loginUser = async (formData) => {
    const response = await axios.post(`${API_URL}/login`, formData)
    return response.data
}