import { createContext, useState, useEffect, useContext } from 'react'

// 1. Create the context (internal only, no export)
const AuthContext = createContext()

// 2. EXPORT the custom hook so other files can use it
export const useAuth = () => {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  // Check local storage when the app first loads
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('eduTrackUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Whenever the user logs in or logs out, update local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('eduTrackUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('eduTrackUser')
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider