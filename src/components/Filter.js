import React from 'react'

const Filter = ({ setShowAll, setNewFilter }) => {
    //uuuhhh poistin sen show/showAll staten :DDD :DDD nooh
    const handleFilterChange = (event) => {
      if (event.target.value === null) {
        //setShowAll(true)
        //lol onks tyhjä string epänull :DDDD
        console.log('filter value no-no')
      } else {
        setNewFilter(event.target.value)
        //setShowAll(false)
        console.log('filter:', event.target.value)
      }
    }
  
    return (
      <div>
        filter names: {/** hmm eiku nyt tää on tosi spesifi. otetaans toi tosta ulos :D */}
        <input onChange={handleFilterChange} />
      </div>
    )
  }

  export default Filter