import React from 'react'

const Compass = ({ orientationData }) => {
  return (
    <div className="wrapper compass_wrapper">
      <img
        className="compass"
        src="/compass.png"
        alt="compass"
        style={{
          transform: `rotate(${orientationData.heading ? 360 - orientationData.heading : 360}deg)`,
        }}
      />
    </div>
  )
}

export default Compass
