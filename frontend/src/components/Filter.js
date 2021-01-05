import React from 'react'

const Filter = ({ setNewFilter }) => {
  
  //filter is trimmed and uppercase
  const handleFilterChange = (event) => {
    const filter = event.target.value.trim().toUpperCase()
    
    if (!filter) setNewFilter('')
    else setNewFilter(filter)
  }

  return (
    <div>
      filter names:
      <input onChange={handleFilterChange} />
    </div>
  )
}

export default Filter