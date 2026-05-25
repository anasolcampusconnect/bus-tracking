import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, setUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const parentNotifications = [
    { id: 1, text: "🚨 Just Now: Bus TS09AB1234 has started.", time: "Just now", unread: true },
    { id: 2, text: "📍 Alert: Bus crossed Jubilee Hills.", time: "5 mins ago", unread: true },
    { id: 3, text: "✅ Yesterday's Evening Drop completed.", time: "1 day ago", unread: false }
  ]

  if (location.pathname === '/') {
    return null
  }

  const handleLogout = () => {
    setUser(null)
    setShowNotifications(false)
    setShowProfileDropdown(false)
    navigate('/')
  }

  return (
    <div className='bg-white border-b border-slate-200 px-6 sm:px-10 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50 font-sans'>
      <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate(`/${user?.role}`)}>
        <div className='w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30'>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <h1 className='text-2xl font-extrabold text-slate-800 tracking-tight'>
          Edu<span className='text-emerald-500'>Track</span>
        </h1>
      </div>

      {user && (
        <div className='flex items-center gap-5 relative'>
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfileDropdown(false); }}
            className={`relative p-2 transition-colors rounded-full ${showNotifications ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-500'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className='absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white'></span>
          </button>

          {showNotifications && (
            <div className="absolute right-14 top-12 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="font-extrabold text-slate-800 text-sm">Latest Alerts</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {parentNotifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer relative ${n.unread ? 'bg-emerald-50/30' : ''}`}>
                    {n.unread && <span className="absolute left-1.5 top-5 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>}
                    <p className="text-xs font-semibold text-slate-700 leading-normal">{n.text}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='flex items-center gap-3 pl-4 border-l border-slate-200 relative'>
            <div 
              className='hidden sm:block text-right select-none cursor-pointer'
              onClick={() => { setShowProfileDropdown(!showProfileDropdown); setShowNotifications(false); }}
            >
              <p className='text-sm font-bold text-slate-700 capitalize'>{user.role} Panel</p>
            </div>
            
            <img 
              src={`https://ui-avatars.com/api/?name=${user.role}&background=10b981&color=fff&bold=true`} 
              alt="Profile" 
              className='w-10 h-10 rounded-full border-2 border-emerald-100 shadow-sm cursor-pointer hover:border-emerald-400 transition-all'
              onClick={() => { setShowProfileDropdown(!showProfileDropdown); setShowNotifications(false); }}
            />

            {showProfileDropdown && (
              <div className="absolute right-0 top-14 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1.5">
                <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-3.5 text-sm text-red-600 hover:bg-red-50 font-extrabold transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar