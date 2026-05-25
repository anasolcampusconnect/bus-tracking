import React, { useState, useEffect, useRef } from 'react';

function Driver() {
  // --- STATE MANAGEMENT ---
  const [tripStatus, setTripStatus] = useState('Not Started'); // 'Not Started', 'Running', 'Paused', 'Completed'
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  
  // Real-time bus progress tracking state (0 to 100 percent)
  const [busProgress, setBusProgress] = useState(0); 
  const progressIntervalRef = useRef(null);

  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul', stop: 'Stop 1 (Miyapur)', status: 'Pending' },
    { id: 2, name: 'Anjali', stop: 'Stop 2 (Kukatpally)', status: 'Pending' },
    { id: 3, name: 'Vikram', stop: 'Stop 3 (Ameerpet)', status: 'Pending' },
  ]);

  const routeStops = [
    { name: 'Madhapur (Start)', percentage: 0 },
    { name: 'Miyapur', percentage: 25 },
    { name: 'Kukatpally', percentage: 50 },
    { name: 'Ameerpet', percentage: 75 },
    { name: 'School (Hitech City)', percentage: 100 }
  ];

  // --- ENGINE TRIP SIMULATION CONTROLLERS ---
  const handleStartTrip = () => {
    // RE-START LOGIC: If completed or fresh start, reset to Madhapur (0%)
    if (tripStatus === 'Completed' || tripStatus === 'Not Started') {
      setBusProgress(0);
    }
    
    setTripStatus('Running');
    setIsLiveTracking(true);

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    // Very fine-grained steps (0.1% updates) every 30ms for maximum fluid frame rates
    progressIntervalRef.current = setInterval(() => {
      setBusProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressIntervalRef.current);
          setTripStatus('Completed');
          setIsLiveTracking(false);
          return 100;
        }
        return prevProgress + 0.15; // Decreased step size for pure fluid micro-movements
      });
    }, 30);
  };

  const handlePauseTrip = () => {
    setTripStatus('Paused');
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handleEndTrip = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setTripStatus('Completed');
    setBusProgress(100); 
    setIsLiveTracking(false);
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleStudentStatus = (id, newStatus) => {
    setStudents(prev =>
      prev.map(student => (student.id === id ? { ...student, status: newStatus } : student))
    );
  };

  return (
    <div className='min-h-screen bg-gray-100 p-4 md:p-8 font-sans'>
      <div className='max-w-8xl mx-auto space-y-6'>
        
        {/* ================= HEADER & PROFILE ================= */}
        <header className='bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h1 className='text-3xl font-black text-gray-800 tracking-tight'>Driver Dashboard</h1>
            <p className='text-gray-500 text-sm mt-1'>Real-time School Bus Management System</p>
          </div>
          <div className='flex flex-wrap gap-4 text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 w-full md:w-auto'>
            <div>👤 <span className='text-gray-500'>Driver:</span> <strong className='text-gray-900'>Ramesh</strong></div>
            <div className='hidden md:block text-gray-300'>|</div>
            <div>🚌 <span className='text-gray-500'>Bus No:</span> <strong className='text-gray-900'>TS09AB1234</strong></div>
            <div className='hidden md:block text-gray-300'>|</div>
            <div>📍 <span className='text-gray-500'>Route:</span> <strong className='text-gray-900'>Route 44 - Madhapur Express</strong></div>
          </div>
        </header>

        {/* ================= MAIN INTERACTIVE GRID ================= */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          
          {/* LEFT: CONTROLS & TRIP STATUS */}
          <section className='bg-white shadow-md rounded-xl p-6 flex flex-col justify-between border border-gray-100'>
            <div>
              <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                ⚙️ Trip Control Tower
              </h2>
              
              <div className='mb-6 p-4 rounded-xl border flex justify-between items-center bg-gradient-to-r from-gray-50 to-white'>
                <div>
                  <p className='text-xs text-gray-400 uppercase font-semibold tracking-wider'>Current Status</p>
                  <span className={`inline-block px-3 py-1 mt-1 text-xs font-bold rounded-full border ${
                    tripStatus === 'Running' ? 'bg-green-100 text-green-800 border-green-300' :
                    tripStatus === 'Paused' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                    tripStatus === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                    'bg-gray-100 text-gray-800 border-gray-300'
                  }`}>
                    {tripStatus}
                  </span>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-gray-400 uppercase font-semibold tracking-wider'>Live Tracking</p>
                  <span className={`inline-block text-xs font-bold mt-1 ${isLiveTracking ? 'text-green-600 animate-pulse' : 'text-gray-400'}`}>
                    ● {isLiveTracking ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className='space-y-3'>
                <button 
                  onClick={handleStartTrip}
                  disabled={tripStatus === 'Running'}
                  className='w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2'
                >
                  ▶️ {tripStatus === 'Completed' || tripStatus === 'Not Started' ? 'Start Trip' : 'Resume Trip'}
                </button>

                <button 
                  onClick={handlePauseTrip}
                  disabled={tripStatus !== 'Running'}
                  className='w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2'
                >
                  ⏸ Pause Trip
                </button>

                <button 
                  onClick={handleEndTrip}
                  disabled={tripStatus === 'Not Started' || tripStatus === 'Completed'}
                  className='w-full bg-slate-800 hover:bg-slate-900 disabled:bg-gray-300 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2'
                >
                  ⏹ End Trip
                </button>
              </div>
            </div>

            <div className='mt-8 pt-6 border-t border-gray-100'>
              <button 
                onClick={() => alert('🚨 SOS Signal transmitted!')}
                className='w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-xl shadow-lg tracking-wider transition duration-150 animate-bounce'
              >
                🚨 EMERGENCY ALERT (SOS)
              </button>
            </div>
          </section>

          {/* RIGHT (SPAN 2): VISUAL MAP ROUTE & STUDENT LIST */}
          <div className='md:col-span-2 space-y-6'>
            
            {/* ================= LIVE ROUTE MAP SCREEN ================= */}
            <section className='bg-white shadow-md rounded-xl p-6 border border-gray-100 relative overflow-hidden'>
              <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                🗺️ Live Route Progress Line
              </h2>
              
              <div className='bg-slate-900 rounded-xl p-4 text-white text-xs mb-6 flex items-center justify-between border border-slate-700'>
                <span className='flex items-center gap-2 text-slate-300'>
                  <span className={`w-2 h-2 rounded-full bg-green-500 ${tripStatus === 'Running' ? 'animate-ping' : ''}`}></span>
                  Google Maps Simulation: <strong className="text-amber-400 uppercase">{tripStatus}</strong>
                </span>
                <span className='text-slate-400 font-mono'>Progress: <b>{Math.round(busProgress)}%</b></span>
              </div>

              {/* Progress Line Graph Container */}
              <div className='relative px-12 py-12 bg-gray-50 rounded-xl select-none'>
                
                {/* ================= ZERO-JUMP SMOOTH REALTIME BUS ================= */}
                <div 
                  className="absolute top-[48px] text-2xl z-30 transform -translate-x-1/2"
                  style={{
                    /* Calc logic matches exact track line coordinates without any jumps */
                    left: `calc(${busProgress}% + (40px - ${busProgress * 0.8}px))`,
                    /* Animation attribute completely flattened out to keep it strictly on a straight horizontal line */
                    animation: 'none' 
                  }}
                >
              <div className="relative flex flex-col items-center">
    {/* Status Badge Over moving Bus */}
    <span className={`text-[10px] px-2 py-0.5 rounded absolute -top-7 whitespace-nowrap shadow-md text-white font-bold transition-all ${
      tripStatus === 'Running' ? 'bg-green-600' : 'bg-slate-800'
    }`}>
      {tripStatus === 'Not Started' ? '📍 Madhapur' : 
       tripStatus === 'Running' ? '🚚 Moving...' : 
       tripStatus === 'Paused' ? '⏸️ Paused' : '🏫 Arrived'}
    </span>
    🚌
  </div>
                </div>

                {/* Visual Layout Stops Track */}
                <div className='relative flex justify-between items-center z-10'>
                  {routeStops.map((stop, index) => {
                    let circleColor = 'border-blue-500 bg-white text-blue-600'; 
                    let textColor = 'text-gray-500';

                    if (busProgress >= stop.percentage) {
                      circleColor = 'bg-green-600 border-green-600 text-white';
                      textColor = 'text-green-700 font-semibold';
                    } else if (tripStatus === 'Running' && busProgress > (stop.percentage - 25)) {
                      circleColor = 'bg-amber-400 border-amber-400 text-white ring-4 ring-amber-200 animate-pulse';
                      textColor = 'text-amber-600 font-bold';
                    }

                    return (
                      <div key={index} className='flex flex-col items-center relative z-10 w-20'>
                        <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold text-sm shadow transition-all ${circleColor}`}>
                          {index === routeStops.length - 1 ? '🏫' : index + 1}
                        </div>
                        <span className={`text-xs mt-2 text-center whitespace-nowrap ${textColor}`}>
                          {stop.name.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Track Horizontal Connector Progress Bar */}
                <div className='absolute left-12 right-12 top-[68px] h-1.5 bg-gray-200 -z-0 rounded'>
                  <div 
                    className="h-full bg-green-500" 
                    style={{ 
                      width: `${busProgress}%`
                    }}
                  />
                </div>
              </div>

              <div className='flex gap-4 mt-4 text-xs justify-center text-gray-500 font-medium'>
                <span className='flex items-center gap-1'><span className='w-2.5 h-2.5 rounded-full bg-green-600 inline-block'></span> Passed / Completed</span>
                <span className='flex items-center gap-1'><span className='w-2.5 h-2.5 rounded-full bg-amber-400 inline-block'></span> Incoming Next Stop</span>
              </div>
            </section>

            {/* ================= STUDENT PICKUP SCREEN ================= */}
            <section className='bg-white shadow-md rounded-xl p-6 border border-gray-100'>
              <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                📋 Student Boarding Ledger
              </h2>
              <div className='overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider'>
                      <th className='p-4'>Student</th>
                      <th className='p-4'>Designated Stop</th>
                      <th className='p-4'>Status</th>
                      <th className='p-4 text-right'>Driver Log Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-100 text-sm'>
                    {students.map((student) => (
                      <tr key={student.id} className='hover:bg-gray-50/70'>
                        <td className='p-4 font-semibold text-gray-900'>{student.name}</td>
                        <td className='p-4 text-gray-500'>{student.stop}</td>
                        <td className='p-4'>
                          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${
                            student.status === 'Picked' ? 'bg-green-100 text-green-800' :
                            student.status === 'Absent' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className='p-4 text-right'>
                          <div className='flex gap-1.5 justify-end'>
                            <button onClick={() => handleStudentStatus(student.id, 'Picked')} className='bg-white hover:bg-green-50 text-green-600 border border-green-200 py-1 px-2.5 rounded-lg text-xs font-medium shadow-sm'>✅ Picked</button>
                            <button onClick={() => handleStudentStatus(student.id, 'Absent')} className='bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 py-1 px-2.5 rounded-lg text-xs font-medium shadow-sm'>❌ Absent</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Driver;