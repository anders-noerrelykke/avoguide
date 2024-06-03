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

export const getOS = () => {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = 'Unknown OS'

  if (macosPlatforms.includes(platform)) {
    os = 'Mac OS'
  } else if (iosPlatforms.includes(platform)) {
    os = 'iOS'
  } else if (windowsPlatforms.includes(platform)) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}