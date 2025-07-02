import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

function App() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/signup' element={<Signup/>} />
        <Route 
          path='/login' 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          } 
        />
        <Route 
          path='/home' 
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App