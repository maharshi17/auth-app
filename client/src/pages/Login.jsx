import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const userData = await loginUser(formData)
            login(userData, userData.token)
            navigate('/home')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
    }


     return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-6 bg-white rounded shadow'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>

                {error && (
                    <p className='mb-4 text-red-500 font-medium'>{error}</p>
                )}

                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full mb-3 px-3 py-2 border border-gray-300 rounded'
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full mb-4 px-3 py-2 border border-gray-300 rounded'
                    required
                />

                <button
                    type='submit'
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer'
                >
                    Log In
                </button>

            </form>
        </div>
    )
}

export default Login