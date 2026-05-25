import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'

// 1. Start (School) Marker - Orange
const schoolIcon = L.divIcon({
  html: `<div style="background-color: #F59E0B; padding: 6px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 20px; height: 20px; color: white;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
        </div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
})

// 2. Parent Stop (Drop Point) - Blue
const parentStopIcon = L.divIcon({
  html: `<div style="background-color: #3B82F6; padding: 6px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; z-index: 500;">
          <svg style="width: 20px; height: 20px; color: white;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        </div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
})

// 3. End Terminal (Bus Depot) - Slate/Gray
const terminalIcon = L.divIcon({
  html: `<div style="background-color: #64748B; padding: 6px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 16px; height: 16px; color: white;" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8l-7 5-7-5M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

// 4. Smooth 3D Bus Generator
const getBusIcon = (angle) => L.divIcon({
  html: `
    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" 
           style="width: 36px; height: 72px; filter: drop-shadow(0px 8px 6px rgba(0,0,0,0.4)); transform: rotate(${angle}deg); transition: transform 0.5s ease;">
        <rect x="15" y="10" width="70" height="180" rx="15" fill="#F59E0B" stroke="#B45309" stroke-width="3"/>
        <rect x="20" y="30" width="60" height="25" rx="5" fill="#1E293B"/> 
        <rect x="20" y="160" width="60" height="15" rx="3" fill="#1E293B"/>
        <rect x="16" y="65" width="4" height="85" fill="#334155"/>
        <rect x="80" y="65" width="4" height="85" fill="#334155"/>
        <circle cx="28" cy="16" r="5" fill="#FEF08A"/>
        <circle cx="72" cy="16" r="5" fill="#FEF08A"/>
        <rect x="22" y="185" width="15" height="5" fill="#EF4444" rx="2"/>
        <rect x="63" y="185" width="15" height="5" fill="#EF4444" rx="2"/>
        <rect x="35" y="80" width="30" height="40" rx="5" fill="#FCD34D" stroke="#D97706" stroke-width="2"/>
      </svg>
    </div>
  `,
  className: '', 
  iconSize: [36, 72],
  iconAnchor: [18, 36], 
  popupAnchor: [0, -36]
})

const calculateBearing = (start, end) => {
  const lat1 = start[0] * (Math.PI / 180);
  const lon1 = start[1] * (Math.PI / 180);
  const lat2 = end[0] * (Math.PI / 180);
  const lon2 = end[1] * (Math.PI / 180);
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return ((Math.atan2(y, x) * (180 / Math.PI)) + 360) % 360;
};

function BusMap({ route, onDropReached, onTripEnded }) {
  const [targetIndex, setTargetIndex] = useState(1);
  const [displayPos, setDisplayPos] = useState(route[0]);
  const [busAngle, setBusAngle] = useState(0);

  // Set parent drop point at 70% of the route length
  const parentDropIndex = Math.floor(route.length * 0.7); 
  const [notifiedDrop, setNotifiedDrop] = useState(false);
  const [notifiedEnd, setNotifiedEnd] = useState(false);

  useEffect(() => {
    if (!route || route.length === 0) return;

    // 1. Check if Parent Drop Point Crossed
    if (targetIndex > parentDropIndex && !notifiedDrop) {
      setNotifiedDrop(true);
      if (onDropReached) onDropReached();
    }

    // 2. Check if Entire Route Completed
    if (targetIndex >= route.length) {
      if (!notifiedEnd) {
        setNotifiedEnd(true);
        if (onTripEnded) onTripEnded();
      }
      return; 
    }

    const start = route[targetIndex - 1];
    const end = route[targetIndex];

    setBusAngle(calculateBearing(start, end));

    // Demo Kosam 8 Seconds pettanu (Very Slow & Smooth)
    const duration = 8000; 
    const startTime = performance.now();
    let animationFrame;

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // No-shake interpolation calculation
      const currentLat = start[0] + (end[0] - start[0]) * progress;
      const currentLng = start[1] + (end[1] - start[1]) * progress;
      
      setDisplayPos([currentLat, currentLng]);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTargetIndex((prev) => prev + 1); 
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [targetIndex, route, notifiedDrop, notifiedEnd, onDropReached, onTripEnded, parentDropIndex]);

  if (!route || route.length === 0) return null

  const schoolPosition = route[0];
  const parentPosition = route[parentDropIndex]; // Child's Stop
  const terminalPosition = route[route.length - 1]; // Final Stop

  return (
    <MapContainer
      center={parentPosition} // Focus map around the parent point
      zoom={15}
      style={{ height: '100%', width: '100%', position: 'absolute', inset: 0, zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; Carto'
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      />
      
      {/* Route Path */}
      <Polyline positions={route} color="#10B981" weight={6} opacity={0.6} lineCap="round" />
      
      {/* Map Points */}
      <Marker position={schoolPosition} icon={schoolIcon} />
      <Marker position={parentPosition} icon={parentStopIcon} zIndexOffset={500} />
      <Marker position={terminalPosition} icon={terminalIcon} />
      
      {/* Live Bus (Highest Z-Index) */}
      <Marker position={displayPos} icon={getBusIcon(busAngle)} zIndexOffset={1000}>
        <Popup>
          <div className="text-center font-sans">
            <strong className="text-emerald-600 font-bold text-sm block">
              {notifiedEnd ? 'Trip Completed' : notifiedDrop ? 'Child Dropped' : 'Live Tracking'}
            </strong>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default BusMap