import { useParams } from 'react-router-dom'
import { buses } from '../data/buses'
import BusMap from '../components/BusMap'

function Tracking() {
  const { id } = useParams()

  const bus = buses.find((b) => b.id === Number(id))

  return (
    <div className='p-10'>
      <h1 className='text-3xl font-bold mb-6'>Live Bus Tracking</h1>

      <div className='bg-white p-5 rounded-xl shadow-lg mb-5'>
        <p className='text-lg'>Bus Number: {bus.busNumber}</p>
        <p>Driver: {bus.driver}</p>
        <p>Status: Running</p>
        <p>ETA: 3 mins</p>
      </div>

      <BusMap route={bus.route} />
    </div>
  )
}

export default Tracking