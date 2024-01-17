/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import './App.css'
import useDeviceOrientation from './hooks/useDeviceOrientation'
import useLocation from './hooks/useLocation'

const App = () => {
  const { devicePermission, requestDevicePermission, orientationData } = useDeviceOrientation()
  const { locations, myCoordinates, getDistance, getDirection } = useLocation()
  const [destinationIndex, setDestinationIndex] = useState(0)

  return (
    <div className="App">
      {devicePermission.status === 'pending' ? (
        <div className="tap_wrapper" onClick={requestDevicePermission}><h1>AvoGuide!</h1></div>
      ) :
        (

          <>
            <div className="wrapper compass_wrapper">

              <img className="compass" src="/compass.png" alt="compass" style={{ transform: `rotate(${360 - orientationData.webkitCompassHeading}deg)` }} />
            </div>

            <div className="wrapper arrow_wrapper">
              {Object.keys(myCoordinates).length ?
                (
                  <>
                    <img className="arrow" src="/arrow.webp" alt="arrow" style={{ transform: `rotate(${360 + getDirection(locations[destinationIndex].coordinates) - orientationData.webkitCompassHeading}deg)` }} />
                  </>
                )
                : "Getting your location..."
              }
            </div>
            <div className="wrapper input_wrapper">
              {Object.keys(myCoordinates).length ?
                <h3>{getDistance(locations[destinationIndex].coordinates).toLocaleString()} meter</h3>
                : null

              }
              <select value={destinationIndex} onChange={(event) => setDestinationIndex(event.target.value)}>
                {locations.map((location, index) => {
                  return <option value={index}>{location.selection}</option>
                }
                )}
              </select>
            </div>
          </>
        )
      }

    </div >

  )
}

export default App
