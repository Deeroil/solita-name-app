import React from 'react'

const Button = ({ onClick, label }) => {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  )
}

export default Button