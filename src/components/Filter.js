import React from 'react'

const Filter = ({ setNewFilter }) => {

  //filter is trimmed and uppercase
  const handleFilterChange = (event) => {
    const filter = event.target.value.trim().toUpperCase()
    console.log('Filter in Filter:', filter)
    if (!filter) {
      setNewFilter('')
      console.log('newFilter set to none')
    } else {
      setNewFilter(filter)
      console.log('newFilter has value')
    }
  }

  return (
    <div>
      filter names: {/** hmm eiku nyt tää on tosi spesifi. otetaanks toi tosta ulos :D */}
      <input onChange={handleFilterChange} />
    </div>
  )
}

export default Filter