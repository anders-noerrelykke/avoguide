import { useState } from 'react'
import { getOS } from '../utils/utils'
import {
  DevicePermission,
  DeviceStatus,
  DeviceMessage,
  DeviceOrientation,
} from '../utils/types'

const isRequestPermissionSupported = (
  obj: any
): obj is { requestPermission: () => Promise<string> } => {
  return 'requestPermission' in obj
}

const useDeviceOrientation = () => {
  const [devicePermission, setDevicePermission] = useState<DevicePermission>({
    status: DeviceStatus.awaiting,
    message: DeviceMessage.awaiting,
  })
  const [orientationData, setOrientationData] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
    accuracy: null,
    heading: null,
  })

  const requestDevicePermission = async () => {
    if (
      getOS() === 'iOS' &&
      isRequestPermissionSupported(window.DeviceOrientationEvent) &&
      window.DeviceOrientationEvent.requestPermission
    ) {
      window.DeviceOrientationEvent.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setDevicePermission({
            status: DeviceStatus.granted,
            message: DeviceMessage.granted,
          })
          window.addEventListener(
            'deviceorientation',
            orientationEventListener,
            true
          )
        } else {
          setDevicePermission({
            status: DeviceStatus.denied,
            message: DeviceMessage.denied,
          })
        }
      })
    } else {
      setDevicePermission({
        status: DeviceStatus.unavailable,
        message: DeviceMessage.unavailable,
      })
    }
  }

  const orientationEventListener = (e) => {
    setOrientationData({
      alpha: e.alpha,
      beta: e.beta,
      gamma: e.gamma,
      accuracy: e.webkitCompassAccuracy,
      heading: e.webkitCompassHeading,
    })
  }

  return { devicePermission, requestDevicePermission, orientationData }
}

export default useDeviceOrientation
