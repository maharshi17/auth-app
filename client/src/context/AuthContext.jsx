import { createContext, useContext, useState } from 'react'

// Create the context
const AuthContext = createContext()

// Provider component
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => 
        localStorage.getItem('authUser')
            ? JSON.parse(localStorage.getItem('authUser'))
            : null
    )
    const [token, setToken] = useState(() =>
        localStorage.getItem("authToken") || null
    )

    // Handle login
    const login = (userData, jwtToken) => {
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem('authUser', JSON.stringify(userData))
        localStorage.setItem('authToken', jwtToken)
    }

    // Handle logout
    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('authUser')
        localStorage.removeItem('authToken')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext)