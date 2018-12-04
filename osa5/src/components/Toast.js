import React from 'react'

const Toast = ({text}) =>
  text !== '' && (
    <div style={{border: '2px solid black', padding: '10px'}}>
      {text}
    </div>
  )

export default Toast
