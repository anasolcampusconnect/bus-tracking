import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Driver from './pages/Driver'
import Parent from './pages/Parent'
import Tracking from './pages/Tracking'
import Login from './pages/Login'
import AuthProvider, { useAuth } from './context/AuthContext'

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth()

  if (!user) return <Navigate to='/' />
  if (allowedRole && user.role !== allowedRole) return <Navigate to='/' />
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Login />} />
          
          <Route path='/admin' element={
            <ProtectedRoute allowedRole='admin'>
              <Admin />
            </ProtectedRoute>
          } />
          
          <Route path='/driver' element={
            <ProtectedRoute allowedRole='driver'>
              <Driver />
            </ProtectedRoute>
          } />
          
          <Route path='/parent' element={
            <ProtectedRoute allowedRole='parent'>
              <Parent />
            </ProtectedRoute>
          } />
          
          <Route path='/tracking/:id' element={
            <ProtectedRoute allowedRole='admin'>
              <Tracking />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App