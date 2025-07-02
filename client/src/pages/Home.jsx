import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
            <div className='bg-white p-6 rounded shadow-md text-center'>
                <h2 className='text-2xl font-bold mb-2'>
                    Welcome, {user?.username}!
                </h2>
                <p className='text-gray-600 mb-4'>You're now logged in!</p>
                <button 
                    onClick={handleLogout}
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer'>
                        Logout
                </button>
            </div>
        </div>
    )
}

export default Home