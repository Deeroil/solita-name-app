import React from 'react'

const Name = ({ obj }) => {
  return (
    <div>
       {obj.name}: {obj.amount}
    </div>
  )
}

export default Name