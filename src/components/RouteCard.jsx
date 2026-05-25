function RouteCard({ route, onEdit }) {
  return (
    <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden'>
      
      {/* Decorative background element */}
      <div className='absolute -right-6 -top-6 w-24 h-24 bg-violet-50 rounded-full blur-2xl opacity-60 pointer-events-none'></div>

      <div className='relative z-10'>
        <div className='flex justify-between items-start mb-4'>
          <div className='w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold border border-violet-100'>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            route.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {route.status}
          </span>
        </div>
        
        <h3 className='font-bold text-slate-800 text-lg group-hover:text-violet-600 transition-colors'>
          {route.routeName}
        </h3>
        
        <div className='space-y-3 mt-5 text-sm text-slate-500 font-medium'>
          
          {/* Timeline-style Start and End points */}
          <div className='relative pl-4 border-l-2 border-violet-200 space-y-3'>
            <div className='relative'>
              <div className='absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-white border-2 border-violet-500 rounded-full'></div>
              <p className='text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5'>Start Point</p>
              <p className='text-slate-700'>{route.startPoint}</p>
            </div>
            <div className='relative'>
              <div className='absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-violet-500 rounded-full'></div>
              <p className='text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5'>End Point</p>
              <p className='text-slate-700'>{route.endPoint}</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100'>
            <div>
              <p className='text-xs text-slate-400 font-bold uppercase tracking-wider mb-1'>Total Stops</p>
              <p className='text-slate-700 font-bold text-lg'>{route.stops}</p>
            </div>
            <div>
              <p className='text-xs text-slate-400 font-bold uppercase tracking-wider mb-1'>Assigned Bus</p>
              <span className='inline-block text-violet-700 font-bold bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100'>
                {route.busAssigned || 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onEdit}
        className='mt-6 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-1.5 z-10'
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit Route
      </button>
    </div>
  )
}

export default RouteCard