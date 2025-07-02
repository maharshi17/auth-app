import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicRoute = ({ children }) => {
    const { token } = useAuth()

    return token ? <Navigate to='/home' /> : children
}

export default PublicRoute