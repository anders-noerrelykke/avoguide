import { useState } from 'react'
import { getGreatCircleBearing, getDistance as getGeolibDistance } from 'geolib'
import { Coordinates } from '../utils/types'
import locations from '../locations.json'

const useLocation = () => {
  const [myCoordinates, setMyCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  })

  const getDistance = (targetCoordinates): number => {
    return getGeolibDistance(myCoordinates, targetCoordinates)
  }

  const getDirection = (targetCoordinates): number => {
    return getGreatCircleBearing(myCoordinates, targetCoordinates)
  }

  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        setMyCoordinates({ latitude, longitude })
      },
      (_err) => {},
      { enableHighAccuracy: true }
    )
  }
  return { myCoordinates, getDistance, getDirection, locations }
}

export default useLocation
