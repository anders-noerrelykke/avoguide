export const getCompassAccuracyPercentage = (errorDegrees) => {
  return ((1 - (errorDegrees / 360)) * 100).toFixed(2)
}