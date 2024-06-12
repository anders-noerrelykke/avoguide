import React, { useEffect, useState } from 'react'
import './App.css'
import useDeviceOrientation from './hooks/useDeviceOrientation'
import useLocation from './hooks/useLocation'
import Compass from './components/Compass'

const App = () => {
  const { devicePermission, requestDevicePermission, orientationData } =
    useDeviceOrientation()
  const { locations, myCoordinates, getDistance, getDirection } = useLocation()
  const [destinationIndex, setDestinationIndex] = useState(0)

  useEffect((): void => {
    if (
      localStorage.getItem('cocktail_compass') &&
      locations.length < destinationIndex
    ) {
      setDestinationIndex(Number(localStorage.getItem('cocktail_compass')))
    }
  }, [destinationIndex, locations.length])

  return (
    <div className="App">
      {devicePermission.status === 'awaiting' ? (
        <div
          className="tap_wrapper p-10 m-10"
          onClick={requestDevicePermission}
        >
          <h1>Cocktail</h1>
          <h2 className="h1-part">Kompasset</h2>
          <label className="signature">@Anders Nørrelykke</label>
        </div>
      ) : (
        <>
          <Compass orientationData={orientationData} />
          <div className="wrapper arrow_wrapper">
            {devicePermission.status === 'denied' ||
            devicePermission.status === 'unavailable' ? (
              'Din enhed har ikke adgang til iOS-kompas-data - prøv på din telefon!'
            ) : devicePermission.status === 'granted' &&
              Object.keys(orientationData).length &&
              Object.keys(myCoordinates) &&
              locations[destinationIndex] ? (
              <img
                className="arrow"
                src="/arrow.webp"
                alt="arrow"
                style={{
                  transform: `rotate(${360 + getDirection(locations[destinationIndex]?.coordinates) - orientationData.heading}deg)`,
                }}
              />
            ) : (
              'Henter kompas-data...'
            )}
          </div>
          <div className="wrapper input_wrapper">
            {Object.keys(myCoordinates).length &&
            locations[destinationIndex]?.coordinates ? (
              <h3>
                {getDistance(
                  locations[destinationIndex]?.coordinates
                ).toLocaleString('da-DK')}{' '}
                meter
              </h3>
            ) : null}
            {locations &&
            destinationIndex !== undefined &&
            locations[destinationIndex] ? (
              <h4>{locations[destinationIndex].name}</h4>
            ) : null}
            <select
              value={destinationIndex}
              onChange={(event) => {
                localStorage.setItem('cocktail_compass', event.target.value)
                setDestinationIndex(Number(event.target.value))
              }}
            >
              {locations.map((location, index) => {
                return (
                  <option key={index} value={index}>
                    {location.name}
                  </option>
                )
              })}
            </select>
          </div>
        </>
      )}
    </div>
  )
}

export default App
