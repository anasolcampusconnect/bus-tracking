function StudentCard({ student, onEdit }) {
  return (
    <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group'>
      <div>
        <div className='flex justify-between items-start mb-4'>
          <div className='w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-100'>
            {student.name ? student.name.charAt(0) : 'S'}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {student.status}
          </span>
        </div>
        
        <h3 className='font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors'>
          {student.name}
        </h3>
        <p className='text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide'>
          Grade: {student.grade}
        </p>
        
        <div className='space-y-2 mt-5 text-sm text-slate-500 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100'>
          <p className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            <span className='text-slate-700 font-bold'>{student.busAssigned}</span>
          </p>
          <p className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <span className='text-slate-700'>{student.parentPhone}</span>
          </p>
          {/* NEW EMAIL FIELD */}
          <p className='flex items-center gap-2 overflow-hidden text-ellipsis'>
             <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span className='text-slate-700 truncate'>{student.email || 'No email provided'}</span>
          </p>
          <p className='flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis'>
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className='text-slate-700 truncate'>{student.address}</span>
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
        Edit Details
      </button>
    </div>
  )
}

export default StudentCard