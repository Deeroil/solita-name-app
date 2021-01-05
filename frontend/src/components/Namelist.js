import React from 'react'
import Name from './Name'

const Namelist = ({ list }) => {
  return (
    <div>
      Names:
      {list.map(n => <div key={n.name}> <Name obj={n} /> </div>)}
    </div>
  )
}

export default Namelist