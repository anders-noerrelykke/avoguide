import { useState } from "react"
import { getGreatCircleBearing, getDistance as getGeolibDistance } from 'geolib'
import locations from '../locations.json'

const useLocation = () => {
  const [myCoordinates, setMyCoordinates] = useState({

  })

  const getDistance = (targetCoordinates) => {
    return getGeolibDistance(myCoordinates, targetCoordinates)
  }

  const getDirection = (targetCoordinates) => {
    const direction = getGreatCircleBearing(myCoordinates, targetCoordinates)
    console.log(direction)
    return getGreatCircleBearing(myCoordinates, targetCoordinates)
  }

  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
      setMyCoordinates({ latitude, longitude })
    }, _err => { }, { enableHighAccuracy: true })
  }
  return { myCoordinates, getDistance, getDirection, locations }
}

export default useLocation