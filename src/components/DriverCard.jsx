function DriverCard({ driver, onEdit }) {
  return (
    <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group'>
      <div>
        <div className='flex justify-between items-start mb-4'>
          {/* Avatar holding the first character of driver name */}
          <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-100'>
            {driver.name ? driver.name.charAt(0) : 'D'}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            driver.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {driver.status}
          </span>
        </div>
        
        <h3 className='font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors'>
          {driver.name}
        </h3>
        
        <div className='space-y-1.5 mt-4 text-sm text-slate-500 font-medium'>
          <p className='flex items-center gap-2'>
            <span className='text-slate-400 font-bold text-xs uppercase w-16'>Phone:</span> 
            <span className='text-slate-700'>{driver.phone}</span>
          </p>
          <p className='flex items-center gap-2'>
            <span className='text-slate-400 font-bold text-xs uppercase w-16'>License:</span> 
            <span className='text-slate-700 font-mono'>{driver.license}</span>
          </p>
          <p className='flex items-center gap-2'>
            <span className='text-slate-400 font-bold text-xs uppercase w-16'>Exp:</span> 
            <span className='text-slate-700'>{driver.experience}</span>
          </p>
          {/* NEW ASSIGNED BUS FIELD */}
          <p className='flex items-center gap-2 mt-2 pt-2 border-t border-slate-100'>
            <span className='text-slate-400 font-bold text-xs uppercase w-16'>Bus:</span> 
            <span className='text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100'>
              {driver.busAssigned || 'Unassigned'}
            </span>
          </p>
        </div>
      </div>

      <button 
        onClick={onEdit}
        className='mt-6 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-1.5'
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit Profile
      </button>
    </div>
  )
}

export default DriverCard