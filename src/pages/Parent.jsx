import { useEffect, useState } from 'react'
import { buses } from '../data/buses'
import BusMap from '../components/BusMap'

function Parent() {
  const bus = buses[0]
  const [currentSession, setCurrentSession] = useState('morning')
  const [tripStatus, setTripStatus] = useState('moving') // 'moving' or 'dropped'

  useEffect(() => {
    const currentHour = new Date().getHours()
    setCurrentSession(currentHour < 12 ? 'morning' : 'evening')
  }, [])

  const handleDropReached = () => setTripStatus('dropped')

  return (
    <div className='min-h-[calc(100vh-73px)] bg-[#F8FAFC] p-6 lg:p-10 font-sans overflow-y-auto'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Parent Dashboard</h1>
            <p className='text-slate-500 font-medium mt-1'>Live tracking and automated telemetry session analytics.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs font-bold shadow-md">
            <span>Shift:</span>
            <span className={currentSession === 'morning' ? 'text-amber-400' : 'text-emerald-400'}>
              {currentSession === 'morning' ? '☀️ Morning Pickup' : '🌙 Evening Drop'}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          <div className='space-y-6'>
            <div className='bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.03)] border border-slate-100 relative overflow-hidden'>
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/60 rounded-bl-[80px] -z-0"></div>
              <div className='relative z-10'>
                <div className='flex items-center gap-4 mb-6'>
                  <img src="https://ui-avatars.com/api/?name=Rahul+Kumar&background=10b981&color=fff&rounded=true&bold=true&size=64" alt="Profile" className='w-14 h-14 shadow-sm border-2 border-white' />
                  <div>
                    <h2 className='text-lg font-bold text-slate-800'>Rahul Kumar</h2>
                    <p className='text-xs font-bold text-emerald-600 uppercase tracking-wide'>Grade V - Sec A</p>
                  </div>
                </div>
                <div className='bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-xl'>
                  <div>
                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Driver Name</p>
                    <p className='font-bold text-base mt-1 tracking-wide text-emerald-400'>{bus.driver}</p>
                  </div>
                  <div className='h-px bg-slate-800 w-full'></div>
                  <div>
                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Assigned Stop</p>
                    <p className='font-bold text-base mt-1.5 tracking-wide'>Kondapur X Roads, Hyderabad</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <a href={`tel:+919999999999`} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-3 rounded-xl text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center">Call Driver</a>
                  <a href={`tel:+918888888888`} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white py-3 px-3 rounded-xl text-[11px] font-extrabold shadow-md active:scale-95 transition-all text-center">Call School</a>
                </div>
              </div>
            </div>

            {/* Timeline UI Update */}
            <div className='bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.02)] border border-slate-100'>
              <h3 className='text-sm font-bold text-slate-800 mb-5 flex items-center gap-2'>
                {tripStatus === 'moving' ? <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span> : <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                Trip Tracking Updates
              </h3>
              <div className='relative border-l-2 border-slate-100 ml-3 space-y-6'>
                <div className='relative pl-6'><span className='absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm'></span><p className='text-xs font-bold text-slate-800'>Bus started at 7:15 AM</p></div>
                <div className='relative pl-6'><span className='absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm'></span><p className='text-xs font-bold text-slate-800'>Junction crossed at 7:30 AM</p></div>
                {tripStatus === 'moving' && <div className='relative pl-6'><span className='absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-sm ring-4 ring-amber-50 animate-pulse'></span><p className='text-xs font-bold text-slate-800'>Approaching Drop Point (ETA: 6 mins)</p></div>}
                {tripStatus === 'dropped' && <div className='relative pl-6'><span className='absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm ring-4 ring-blue-50'></span><p className='text-xs font-bold text-blue-600'>✅ Dropped your child</p></div>}
              </div>
            </div>
          </div>

          <div className='lg:col-span-2 bg-white rounded-[2rem] p-4 sm:p-5 shadow-[0_8px_30px_rgba(15,23,42,0.03)] border border-slate-100 flex flex-col h-[700px]'>
            <div className='flex justify-between items-center mb-4 px-2 pt-1 shrink-0'>
              <h2 className='text-lg font-bold text-slate-800'>🎯 Live Tracking</h2>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-extrabold ${tripStatus === 'dropped' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                <span>{tripStatus === 'dropped' ? 'Task Completed' : 'Active Tracking'}</span>
              </div>
            </div>
            <div className='relative flex-grow w-full rounded-2xl overflow-hidden border border-slate-200 bg-[#E5E7EB] shadow-inner'>
              <BusMap route={bus.route} onDropReached={handleDropReached} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Parent