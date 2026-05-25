import { useNavigate } from 'react-router-dom'

function BusCard({ bus, onEdit }) {
  const navigate = useNavigate()

  const getStatusColor = (status) => {
    if (status === 'Running') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    if (status === 'Idle') return 'bg-amber-100 text-amber-700 border-amber-200'
    return 'bg-red-100 text-red-700 border-red-200'
  }

  // Check if tracking should be active
  const isTrackingAvailable = bus.status === 'Running';

  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col'>
      
      <div className='h-48 overflow-hidden relative'>
        <img 
          src={bus.image} 
          alt={bus.busNumber} 
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent'></div>
        
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(bus.status)}`}>
          {bus.status}
        </div>

        <div className='absolute bottom-4 left-4'>
          <h2 className='text-2xl font-extrabold text-white tracking-wide shadow-black drop-shadow-md'>
            {bus.busNumber}
          </h2>
        </div>
      </div>

      <div className='p-6 flex-grow flex flex-col justify-between'>
        <div className='space-y-3 mb-6'>
          <div className='flex items-center gap-3 text-slate-600'>
            <div className='w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Driver</p>
              <p className='font-bold text-slate-800'>{bus.driver}</p>
            </div>
          </div>

          <div className='flex items-center gap-3 text-slate-600'>
            <div className='w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Students</p>
              <p className='font-bold text-slate-800'>{bus.students} Assigned</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-3'>
          
          {/* CONDITIONALLY STYLED & DISABLED TRACKING BUTTON */}
          <button
            onClick={() => isTrackingAvailable && navigate(`/tracking/${bus.id}`)}
            disabled={!isTrackingAvailable}
            className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              isTrackingAvailable 
                ? 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 shadow-sm cursor-pointer' 
                : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed opacity-70'
            }`}
            title={!isTrackingAvailable ? 'Tracking is only available when running' : ''}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Tracking
          </button>
          
          {/* EDIT BUTTON (Always available) */}
          <button
            onClick={onEdit}
            className='bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 hover:border-slate-300 px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center'
            title="Edit Bus Details"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default BusCard