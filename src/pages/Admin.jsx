import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import BusCard from '../components/BusCard'
import DriverCard from '../components/DriverCard'
import StudentCard from '../components/StudentCard'
import RouteCard from '../components/RouteCard'

import { buses as initialBuses } from '../data/buses'

const initialDrivers = [
  { id: 1, name: 'Ramesh Kumar', phone: '+91 9876543210', license: 'TS09 2012004567', experience: '5 Years', busAssigned: 'TS09AB1234', status: 'Active' },
  { id: 2, name: 'Suresh Reddy', phone: '+91 9876543211', license: 'TS07 2015008912', experience: '3 Years', busAssigned: 'TS09CD5678', status: 'On Leave' },
  { id: 3, name: 'Mahesh Babu', phone: '+91 9876543212', license: 'TS08 2018001234', experience: '8 Years', busAssigned: 'TS09EF9012', status: 'Active' },
]

const initialStudents = [
  { id: 1, name: 'Rahul Sharma', grade: '10th Grade', email: 'rahul.s@example.com', busAssigned: 'TS09AB1234', parentPhone: '+91 9876500001', address: 'Banjara Hills, Hyd', status: 'Active' },
  { id: 2, name: 'Priya Patel', grade: '8th Grade', email: 'priya.p@example.com', busAssigned: 'TS09CD5678', parentPhone: '+91 9876500002', address: 'Jubilee Hills, Hyd', status: 'Active' },
  { id: 3, name: 'Arjun Reddy', grade: '12th Grade', email: 'arjun.r@example.com', busAssigned: 'TS09AB1234', parentPhone: '+91 9876500003', address: 'Madhapur, Hyd', status: 'Inactive' },
]

const initialRoutes = [
  { id: 1, routeName: 'Route 01 - Banjara Hills', startPoint: 'School Campus', endPoint: 'Banjara Hills Rd No 12', stops: 8, busAssigned: 'TS09AB1234', status: 'Active' },
  { id: 2, name: 'Route 02 - Jubilee Hills', routeName: 'Route 02 - Jubilee Hills', startPoint: 'School Campus', endPoint: 'Jubilee Hills Checkpost', stops: 5, busAssigned: 'TS09CD5678', status: 'Active' },
  { id: 3, name: 'Route 03 - Madhapur', routeName: 'Route 03 - Madhapur', startPoint: 'School Campus', endPoint: 'Madhapur IT Park', stops: 12, busAssigned: 'TS09EF9012', status: 'Active' },
]

function Admin() {
  const [activeMenu, setActiveMenu] = useState('Buses')
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  // --- SHARED STATE ---
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  // --- COMPONENT STATES ---
  const [busList, setBusList] = useState(initialBuses)
  const [busFormData, setBusFormData] = useState({ busNumber: '', driver: '', students: '', status: 'Idle' })

  const [driverList, setDriverList] = useState(initialDrivers)
  const [driverFormData, setDriverFormData] = useState({ name: '', phone: '', license: '', experience: '', busAssigned: '', status: 'Active' })

  const [studentList, setStudentList] = useState(initialStudents)
  const [studentFormData, setStudentFormData] = useState({ name: '', grade: '', email: '', busAssigned: '', parentPhone: '', address: '', status: 'Active' })

  const [routeList, setRouteList] = useState(initialRoutes)
  const [routeFormData, setRouteFormData] = useState({ routeName: '', startPoint: '', endPoint: '', stops: '', busAssigned: '', status: 'Active' })

  // --- SETTINGS STATE ---
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true })
  
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  
  // NEW: State to track password visibility for each field
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false })

  const menuItems = [
    { name: 'Buses', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { name: 'Drivers', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Students', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
    { name: 'Routes', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ]

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  // Helper to toggle specific password field visibility
  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
  }

  // --- PASSWORD UPDATE HANDLER ---
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert("New passwords do not match!");
      return;
    }
    // Mock API call to change password
    alert("Password successfully updated!");
    setPasswordForm({ current: '', new: '', confirm: '' }); // Clear form on success
  }

  // --- MODAL TRIGGERS ---
  const handleOpenAddModal = () => {
    setIsEditing(false)
    setEditId(null)
    if (activeMenu === 'Buses') setBusFormData({ busNumber: '', driver: '', students: '', status: 'Idle' })
    if (activeMenu === 'Drivers') setDriverFormData({ name: '', phone: '', license: '', experience: '', busAssigned: '', status: 'Active' })
    if (activeMenu === 'Students') setStudentFormData({ name: '', grade: '', email: '', busAssigned: '', parentPhone: '', address: '', status: 'Active' })
    if (activeMenu === 'Routes') setRouteFormData({ routeName: '', startPoint: '', endPoint: '', stops: '', busAssigned: '', status: 'Active' })
    setShowModal(true)
  }

  const handleEditBusClick = (bus) => {
    setIsEditing(true); setEditId(bus.id); setBusFormData({ busNumber: bus.busNumber, driver: bus.driver, students: bus.students, status: bus.status })
    setShowModal(true)
  }

  const handleEditDriverClick = (driver) => {
    setIsEditing(true); setEditId(driver.id); 
    setDriverFormData({ name: driver.name, phone: driver.phone, license: driver.license, experience: driver.experience, busAssigned: driver.busAssigned || '', status: driver.status })
    setShowModal(true)
  }

  const handleEditStudentClick = (student) => {
    setIsEditing(true); setEditId(student.id); 
    setStudentFormData({ name: student.name, grade: student.grade, email: student.email || '', busAssigned: student.busAssigned, parentPhone: student.parentPhone, address: student.address, status: student.status })
    setShowModal(true)
  }

  const handleEditRouteClick = (route) => {
    setIsEditing(true); setEditId(route.id);
    setRouteFormData({ routeName: route.routeName, startPoint: route.startPoint, endPoint: route.endPoint, stops: route.stops, busAssigned: route.busAssigned || '', status: route.status })
    setShowModal(true)
  }

  // --- SAVE FORM DATA ---
  const handleSave = (e) => {
    e.preventDefault()

    if (activeMenu === 'Buses') {
      if (!busFormData.busNumber || !busFormData.driver) return
      if (isEditing) {
        setBusList(busList.map((bus) => bus.id === editId ? { ...bus, ...busFormData, students: Number(busFormData.students) } : bus))
      } else {
        const busToAdd = { id: Date.now(), ...busFormData, students: Number(busFormData.students) || 0, image: 'https://images.pexels.com/photos/3468153/pexels-photo-3468153.jpeg?auto=compress&cs=tinysrgb&w=800', route: [[17.385044, 78.486671], [17.387044, 78.488671]] }
        setBusList([busToAdd, ...busList])
      }
    } else if (activeMenu === 'Drivers') {
      if (!driverFormData.name || !driverFormData.phone) return
      if (isEditing) {
        setDriverList(driverList.map((driver) => driver.id === editId ? { ...driver, ...driverFormData } : driver))
      } else {
        setDriverList([{ id: Date.now(), ...driverFormData }, ...driverList])
      }
    } else if (activeMenu === 'Students') {
      if (!studentFormData.name || !studentFormData.parentPhone) return
      if (isEditing) {
        setStudentList(studentList.map((student) => student.id === editId ? { ...student, ...studentFormData } : student))
      } else {
        setStudentList([{ id: Date.now(), ...studentFormData }, ...studentList])
      }
    } else if (activeMenu === 'Routes') {
      if (!routeFormData.routeName || !routeFormData.startPoint) return
      if (isEditing) {
        setRouteList(routeList.map((route) => route.id === editId ? { ...route, ...routeFormData, stops: Number(routeFormData.stops) } : route))
      } else {
        setRouteList([{ id: Date.now(), ...routeFormData, stops: Number(routeFormData.stops) || 0 }, ...routeList])
      }
    }

    setShowModal(false)
  }

  // --- SEARCH FILTER LOGIC ---
  const filteredBuses = busList.filter((bus) => bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) || bus.driver.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredDrivers = driverList.filter((driver) => driver.name.toLowerCase().includes(searchQuery.toLowerCase()) || driver.license.toLowerCase().includes(searchQuery.toLowerCase()) || driver.phone.includes(searchQuery) || (driver.busAssigned && driver.busAssigned.toLowerCase().includes(searchQuery.toLowerCase())))
  const filteredStudents = studentList.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.busAssigned.toLowerCase().includes(searchQuery.toLowerCase()) || student.parentPhone.includes(searchQuery) || (student.email && student.email.toLowerCase().includes(searchQuery.toLowerCase())))
  const filteredRoutes = routeList.filter((route) => route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) || route.startPoint.toLowerCase().includes(searchQuery.toLowerCase()) || route.endPoint.toLowerCase().includes(searchQuery.toLowerCase()) || (route.busAssigned && route.busAssigned.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <div className='flex h-[calc(100vh-73px)] bg-slate-50 relative'>
      
      {/* LEFT SIDEBAR */}
      <div className='w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col border-r border-slate-800'>
        <div className='p-6 border-b border-slate-800 mt-2'>
          <h2 className='text-xs font-black text-slate-500 uppercase tracking-widest'>Admin Menu</h2>
        </div>
        
        <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => { setActiveMenu(item.name); setSearchQuery('') }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold ${
                activeMenu === item.name 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                {item.name === 'Settings' && <circle cx="12" cy="12" r="3" />}
              </svg>
              {item.name}
            </button>
          ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className='p-4 border-t border-slate-800'>
          <button onClick={handleLogout} className='w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className='flex-1 p-8 xl:p-12 overflow-y-auto'>
        
        {/* Dynamic Header */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900'>
              {activeMenu === 'Settings' ? 'System Settings' : `Manage ${activeMenu}`}
            </h1>
            <p className='text-slate-500 font-medium mt-1'>
              {activeMenu === 'Settings' 
                ? 'Manage your preferences and system configurations.' 
                : `Overview of all active ${activeMenu.toLowerCase()} in the system.`}
            </p>
          </div>
          
          {/* SEARCH BAR & ADD BUTTON */}
          {(activeMenu === 'Buses' || activeMenu === 'Drivers' || activeMenu === 'Students' || activeMenu === 'Routes') && (
            <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
              <input 
                type="text"
                placeholder={`Search ${activeMenu.toLowerCase()}...`}
                className='px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm font-medium text-slate-700 w-full sm:w-60 shadow-sm'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={handleOpenAddModal}
                className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-emerald-600/30 active:scale-95 flex items-center gap-2 text-sm whitespace-nowrap justify-center'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Add New {activeMenu.slice(0, -1)}
              </button>
            </div>
          )}
        </div>

        {/* --- DYNAMIC TAB RENDER BRANCHES --- */}
        {activeMenu === 'Buses' ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
            {filteredBuses.map((bus) => <BusCard key={bus.id} bus={bus} onEdit={() => handleEditBusClick(bus)} />)}
          </div>
        ) : activeMenu === 'Drivers' ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
            {filteredDrivers.map((driver) => <DriverCard key={driver.id} driver={driver} onEdit={() => handleEditDriverClick(driver)} />)}
          </div>
        ) : activeMenu === 'Students' ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
            {filteredStudents.map((student) => <StudentCard key={student.id} student={student} onEdit={() => handleEditStudentClick(student)} />)}
          </div>
        ) : activeMenu === 'Routes' ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
            {filteredRoutes.map((route) => <RouteCard key={route.id} route={route} onEdit={() => handleEditRouteClick(route)} />)}
          </div>
        ) : activeMenu === 'Settings' ? (
          
          /* --- SETTINGS PAGE UI --- */
          <div className="max-w-4xl space-y-8 pb-10">
            
            {/* Profile Settings */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20 pointer-events-none"></div>
              
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Administrator Profile
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center relative z-10">
                 <div className="w-24 h-24 rounded-2xl bg-emerald-100 border-4 border-white shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                   <img src={`https://ui-avatars.com/api/?name=${user?.role || 'Admin'}&background=10b981&color=fff&size=150`} alt="Admin" />
                 </div>
                 <div className="flex-1 space-y-5 w-full">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Full Name</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" defaultValue="System Administrator" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Email Address</label>
                        <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" defaultValue="admin@edutrack.com" />
                      </div>
                   </div>
                   <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95 text-sm">Save Changes</button>
                 </div>
              </div>
            </div>

            {/* SECURITY SETTINGS (WITH SHOW/HIDE PASSWORD) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Security & Password
              </h2>
              
              <form onSubmit={handlePasswordUpdate} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword.current ? 'text' : 'password'} required
                      className="w-full sm:w-1/2 bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" 
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                    />
                    <button type="button" onClick={() => toggleVisibility('current')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 sm:right-[calc(50%+1rem)] transition-colors">
                      {showPassword.current 
                        ? <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        : <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      }
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-1.5 uppercase tracking-wide">New Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword.new ? 'text' : 'password'} required minLength={6}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" 
                        value={passwordForm.new}
                        onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                      />
                      <button type="button" onClick={() => toggleVisibility('new')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPassword.new 
                          ? <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          : <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        }
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword.confirm ? 'text' : 'password'} required minLength={6}
                        className={`w-full bg-slate-50 border rounded-xl pl-4 pr-12 py-3 text-slate-800 font-medium outline-none transition-all focus:bg-white ${
                          passwordForm.confirm && passwordForm.new !== passwordForm.confirm ? 'border-red-400 focus:ring-2 focus:ring-red-500' : 'border-slate-200 focus:ring-2 focus:ring-emerald-500'
                        }`}
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                      />
                      <button type="button" onClick={() => toggleVisibility('confirm')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPassword.confirm 
                          ? <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          : <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        }
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95 text-sm">
                  Update Password
                </button>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                System Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-800">Email Alerts</h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Receive daily summary reports via email.</p>
                  </div>
                  <button onClick={() => setNotifications({...notifications, email: !notifications.email})} className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${notifications.email ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${notifications.email ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-800">SMS Alerts</h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Critical alerts directly to your registered phone.</p>
                  </div>
                  <button onClick={() => setNotifications({...notifications, sms: !notifications.sms})} className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${notifications.sms ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${notifications.sms ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* App Info Footer */}
            <div className="text-center pt-8 border-t border-slate-200">
               <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">EduTrack System v1.0.4</p>
               <p className="text-slate-400 text-xs mt-2">© 2026 EduTrack Software Solutions.</p>
            </div>

          </div>

        ) : null}

      </div>

      {/* --- DYNAMIC COMBINED MODAL (Buses, Drivers, Students, Routes) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {isEditing ? `Edit ${activeMenu.slice(0, -1)}` : `Add New ${activeMenu.slice(0, -1)}`}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              
              {/* BUS FORMS */}
              {activeMenu === 'Buses' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bus Number</label>
                    <input type="text" required placeholder="e.g. TS09AB1234" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={busFormData.busNumber} onChange={(e) => setBusFormData({...busFormData, busNumber: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Driver Name</label>
                    <input type="text" required placeholder="e.g. Ramesh Kumar" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={busFormData.driver} onChange={(e) => setBusFormData({...busFormData, driver: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Students</label>
                    <input type="number" required placeholder="e.g. 45" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={busFormData.students} onChange={(e) => setBusFormData({...busFormData, students: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={busFormData.status} onChange={(e) => setBusFormData({...busFormData, status: e.target.value})}>
                      <option value="Idle">Idle</option><option value="Running">Running</option><option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </>
              )}

              {/* DRIVER FORMS */}
              {activeMenu === 'Drivers' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Driver Name</label>
                    <input type="text" required placeholder="e.g. Ramesh Kumar" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={driverFormData.name} onChange={(e) => setDriverFormData({...driverFormData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input type="text" required placeholder="e.g. +91 9876543210" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={driverFormData.phone} onChange={(e) => setDriverFormData({...driverFormData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">License Number</label>
                    <input type="text" required placeholder="e.g. TS09 2012004567" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={driverFormData.license} onChange={(e) => setDriverFormData({...driverFormData, license: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                    <input type="text" required placeholder="e.g. 5 Years" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={driverFormData.experience} onChange={(e) => setDriverFormData({...driverFormData, experience: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Bus No</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={driverFormData.busAssigned} onChange={(e) => setDriverFormData({...driverFormData, busAssigned: e.target.value})}>
                      <option value="" disabled>Select a Bus</option>
                      {busList.map(bus => {
                        const routeMatch = routeList.find(r => r.busAssigned === bus.busNumber);
                        return <option key={bus.id} value={bus.busNumber}>{bus.busNumber} {routeMatch ? `(${routeMatch.routeName})` : ''}</option>
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={driverFormData.status} onChange={(e) => setDriverFormData({...driverFormData, status: e.target.value})}>
                      <option value="Active">Active</option><option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </>
              )}

              {/* STUDENT FORMS */}
              {activeMenu === 'Students' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
                    <input type="text" required placeholder="e.g. Rahul Sharma" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={studentFormData.name} onChange={(e) => setStudentFormData({...studentFormData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade / Class</label>
                    <input type="text" required placeholder="e.g. 10th Grade" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={studentFormData.grade} onChange={(e) => setStudentFormData({...studentFormData, grade: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Bus No</label>
                    <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={studentFormData.busAssigned} onChange={(e) => setStudentFormData({...studentFormData, busAssigned: e.target.value})}>
                      <option value="" disabled>Select a Bus</option>
                      {busList.map(bus => {
                        const routeMatch = routeList.find(r => r.busAssigned === bus.busNumber);
                        return <option key={bus.id} value={bus.busNumber}>{bus.busNumber} {routeMatch ? `(${routeMatch.routeName})` : ''}</option>
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" required placeholder="e.g. student@email.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={studentFormData.email} onChange={(e) => setStudentFormData({...studentFormData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Parent Phone</label>
                    <input type="text" required placeholder="e.g. +91 9876500001" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={studentFormData.parentPhone} onChange={(e) => setStudentFormData({...studentFormData, parentPhone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <input type="text" required placeholder="e.g. Banjara Hills, Hyd" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={studentFormData.address} onChange={(e) => setStudentFormData({...studentFormData, address: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={studentFormData.status} onChange={(e) => setStudentFormData({...studentFormData, status: e.target.value})}>
                      <option value="Active">Active</option><option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              {/* ROUTES FORMS */}
              {activeMenu === 'Routes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Route Name</label>
                    <input type="text" required placeholder="e.g. Route 01 - Banjara Hills" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={routeFormData.routeName} onChange={(e) => setRouteFormData({...routeFormData, routeName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Point</label>
                    <input type="text" required placeholder="e.g. School Campus" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={routeFormData.startPoint} onChange={(e) => setRouteFormData({...routeFormData, startPoint: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Point</label>
                    <input type="text" required placeholder="e.g. Banjara Hills Rd No 12" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={routeFormData.endPoint} onChange={(e) => setRouteFormData({...routeFormData, endPoint: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Stops</label>
                    <input type="number" required placeholder="e.g. 8" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={routeFormData.stops} onChange={(e) => setRouteFormData({...routeFormData, stops: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Bus No</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={routeFormData.busAssigned} onChange={(e) => setRouteFormData({...routeFormData, busAssigned: e.target.value})}>
                      <option value="" disabled>Select a Bus (Optional)</option>
                      {busList.map(bus => <option key={bus.id} value={bus.busNumber}>{bus.busNumber}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" value={routeFormData.status} onChange={(e) => setRouteFormData({...routeFormData, status: e.target.value})}>
                      <option value="Active">Active</option><option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30">
                  {isEditing ? 'Update Info' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Admin