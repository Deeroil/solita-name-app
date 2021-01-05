import React from 'react'

const Name = ({ obj }) => {

  return (
    <div style={{ color: 'darkcyan' }}>
      {obj.name}: {obj.amount}
    </div>
  )
}

export default Name