/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import './App.css'
import useDeviceOrientation from './hooks/useDeviceOrientation'
import useLocation from './hooks/useLocation'

const App = () => {
  const { devicePermission, requestDevicePermission, orientationData } = useDeviceOrientation()
  const { locations, myCoordinates, getDistance, getDirection } = useLocation()
  const [destinationIndex, setDestinationIndex] = useState(0)

  useState(() => {
    if (localStorage.getItem('avoguide') && locations.length < destinationIndex) {
      setDestinationIndex(localStorage.getItem('avoguide'))
    }
  }, [])

  return (
    <div className="App">
      {devicePermission.status === 'pending' ? (
        <div className="tap_wrapper" onClick={requestDevicePermission}>
          <h1>Avo<span className="h1-part">Guide</span></h1>
          <label className="signature">@Anders Nørrelykke</label>
        </div>
      ) :
        (

          <>
            <div className="wrapper compass_wrapper">

              <img className="compass" src="/compass.png" alt="compass" style={{ transform: `rotate(${360 - orientationData.heading}deg)` }} />
            </div>

            <div className="wrapper arrow_wrapper">
              {Object.keys(orientationData).length && Object.keys(myCoordinates) && locations[destinationIndex] && devicePermission.status === 'pending' ? "Henter kompas-data..." : devicePermission.status === 'denied' || devicePermission.status === 'unavailable' ? 'Din enhed har ikke adgang til iOS-kompas-data - prøv på din telefon!' :
                <img className="arrow" src="/arrow.webp" alt="arrow" style={{ transform: `rotate(${360 + getDirection(locations[destinationIndex]?.coordinates) - orientationData.heading}deg)` }} />
              }
            </div>
            <div className="wrapper input_wrapper">
              {Object.keys(myCoordinates).length && locations[destinationIndex]?.coordinates ?
                <h3>{getDistance(locations[destinationIndex]?.coordinates).toLocaleString('da-DK')} meter</h3>
                : null
              }
              {locations && destinationIndex !== undefined && locations[destinationIndex] ? <h4>{locations[destinationIndex].name}</h4> : null}
              <select value={destinationIndex} onChange={(event) => {
                localStorage.setItem('avoguide', event.target.value)
                setDestinationIndex(event.target.value)
              }}>
                {locations.map((location, index) => {
                  return <option key={index} value={index}>{location.name}</option>
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
