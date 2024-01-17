import { useState } from "react"

const useDeviceOrientation = () => {
  const [devicePermission, setDevicePermission] = useState({ status: 'pending', message: 'Awaiting permission...' })
  const [orientationData, setOrientationData] = useState({})

  const requestDevicePermission = async () => {
    if (window.DeviceOrientationEvent && window.DeviceOrientationEvent.requestPermission) {
      window.DeviceOrientationEvent.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setDevicePermission({ status: 'granted', message: "Permission granted" })
          // window.removeEventListener('click', clickEventListener)
          window.addEventListener('deviceorientation', orientationEventListener, true)
        } else {
          setDevicePermission({ status: 'denied', message: "Permission not granted" })
        }
      })
    } else {
      setDevicePermission({ status: 'unavailable', message: "Device doesn't support compass" })
    }
  }

  const orientationEventListener = (e) => {
    setOrientationData({ alpha: e.alpha, beta: e.beta, gamma: e.gamma, webkitCompassAccuracy: e.webkitCompassAccuracy, webkitCompassHeading: e.webkitCompassHeading })
  }

  return { devicePermission, requestDevicePermission, orientationData }
}

export default useDeviceOrientation