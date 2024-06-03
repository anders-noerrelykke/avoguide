export type Coordinates = {
  latitude: number
  longitude: number
}

export type DeviceOrientation = {
  alpha: number
  beta: number
  gamma: number
  accuracy: number
  heading: number
}

export enum DeviceStatus {
  awaiting = 'awaiting',
  denied = 'denied',
  granted = 'granted',
  unavailable = 'unavailable',
}

export enum DeviceMessage {
  awaiting = 'Awaiting permission...',
  denied = 'Permission denied',
  granted = 'Permission granted',
  unavailable = "Device doesn't support compass",
}

export type DevicePermission = {
  status: DeviceStatus
  message: DeviceMessage
}
