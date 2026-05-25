import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email) return setError('Please enter your username/email.')
    if (!password) return setError('Please enter your password.')

    // Demo Routing Logic based on Email input
    let role = 'parent'
    if (email.toLowerCase().includes('admin')) role = 'admin'
    else if (email.toLowerCase().includes('driver')) role = 'driver'

    setUser({ role: role })
    navigate(`/${role}`)
  }

  return (
    <div className="h-screen w-full flex bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* LEFT SIDE - Full Background Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between overflow-hidden">
        
        {/* Background Image - Using a highly reliable direct URL */}
        <img 
          src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1515090126402-412767077977?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          }}
        />

        {/* Premium Gradient Overlay (Slate to Emerald) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-emerald-950/70"></div>

        {/* Top Text Content */}
        <div className="p-10 xl:p-14 z-10 relative mt-4">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-lg">
            SCHOOL BUS <br />
            <span className="text-emerald-400">TRACKING SYSTEM</span>
          </h1>
          <div className="w-16 h-1.5 bg-emerald-500 mb-6 rounded-full shadow-lg shadow-emerald-500/30"></div>
          <p className="text-slate-300 text-lg max-w-md font-medium leading-relaxed">
            Real-time tracking for safe, secure and smarter school transportation.
          </p>
        </div>

        {/* Bottom Features Banner (Glassmorphism) */}
        <div className="relative z-10 p-10 xl:p-14 mb-4">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 border border-white/10 shadow-2xl">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white tracking-wide">Live Tracking</p>
                <p className="text-xs text-slate-400 mt-0.5">Track buses in real-time</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white tracking-wide">Safe & Secure</p>
                <p className="text-xs text-slate-400 mt-0.5">Ensuring child safety</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white tracking-wide">Instant Alerts</p>
                <p className="text-xs text-slate-400 mt-0.5">Pickup & drop notices</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-10 relative">
        
        {/* Form Container */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-10 sm:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-slate-100">
            
            {/* Form Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 border border-emerald-100 shadow-sm">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Welcome Back!</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Login to continue to your account</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 border border-red-100 text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Username Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400 font-medium"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400 font-medium"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-emerald-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 font-medium cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_8px_20px_0_rgba(5,150,105,0.3)] active:scale-[0.98] mt-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </button>

            </form>

            {/* Bottom Register Link */}
            <p className="mt-10 text-center text-sm text-slate-500 font-medium">
              Don't have an account? <a href="#" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">Contact Administrator</a>
            </p>

          </div>
        </div>

        {/* Global Footer */}
        <div className="pb-2 text-center">
          <p className="text-xs text-slate-400 font-medium">
            © 2026 School Bus Tracking System. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login