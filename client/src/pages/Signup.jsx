import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const userData = await signupUser(formData)
            login(userData, userData.token)
            navigate('/home')
        } catch (err) {
            setError(err.response?.data?.message || 'Sign up failed')
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-6 bg-white rounded shadow'>
                <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

                {error && (
                    <div className='mb-4 text-red-500 font-medium'>{error}</div>
                )}

                {['firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword'].map((field, idx) => (
                    <input
                        key={idx}
                        type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                        name={field}
                        placeholder={field.replace(/([A-Z])/g, " $1")}
                        value={formData[field]}
                        onChange={handleChange}
                        className='w-full mb-3 px-3 py-2 border border-gray-300 rounded'
                        required
                    />
                ))}

                <button 
                    type='submit'
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer'
                >
                    Create Account
                </button>

                <p className='mt-4 text-center text-sm text-gray-600'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-blue-600 hover:underline font-medium'>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup