export const getCompassAccuracyPercentage = (errorDegrees) => {
  return ((1 - (errorDegrees / 360)) * 100).toFixed(2)
}

export const getDeviceOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const osExpressions = {
    "Windows Phone": /windows phone/i,
    "Android": /android/i,
    "iOS": /iPad|iPhone|iPod/
  }
  Object.entries(osExpressions).forEach(([os, expression]) => {
    if (expression.test(userAgent)) {
      return os
    }
  })
  return "unknown"
}