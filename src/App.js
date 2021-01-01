import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import Filter from './components/Filter'
import nameService from './services/names'

const App = () => {
  const [names, setNames] = useState([])
  //sinänsä tätä ei muokata e__e joten se vois olla vaan lista.
  //mut entä sit ööhm hmm nii ne rajatut joo
  const [newFilter, setNewFilter] = useState('')
  //const [filtered, setFiltered] = useState([])
  const [show, setShow] = useState([])
  

  useEffect(() => {
    const getNames = async () => {
      const namesJSON = await nameService.getAll()
      // console.log('namesJSON', namesJSON, 'namesJSON:', typeof namesJSON)
      setNames(namesJSON)
    }
    getNames()
  }, [])

  useEffect(() => {
    filterList(names)
  }, [newFilter])

  //vai myös dependencyks tälle setNewFilter..???
  // useEffect(() => {
  //   console.log('filter useEffect löggöys')
  //   //emt haluunks... jotain... hmm.
  // }, [newFilter])

  //vai haluunko että tää vaan suoraa sorttaa _kaikki_, eikä annettua listaa
  const sortByPopularity = (list) => {
    //slice to make a new array / deep copy
    // const sorted = names.slice().sort((a, b) => b.amount - a.amount)
    //setNames(sorted) //hmm tää on ehkä turhaa. joo. hmm.
    const sorted = list.slice().sort((a, b) => b.amount - a.amount)
    setShow(sorted)
  }

  const sortAlphabet = (list) => {
    //const sorted = names.slice().sort((a, b) => (a.name > b.name) ? 1 : -1)
    //setNames(sorted) //hmm tää on ehkä turhaa. joo. hmm.
    const sorted = list.slice().sort((a, b) => (a.name > b.name) ? 1 : -1)
    setShow(sorted)
  }

  //jostain syystä kun laitoin totalAmount(list) niin se clogas tän myös muista napeista .__.
  const totalAmount = (list) => {
    console.log('total amount', list.reduce((sum, a) => sum + a.amount, 0))
  }

  //voishan sen hakea suoraan apista mutta blää miks ihmeessä
  // const findAmount = (str) => {
  //   //joka updatella...
  //   //jos löytyy: jos löytyy monta: jos löytyy osa
  //   const found = names.filter(n => n.includes(str))

  //   if (found.length === 1) {
  //     setFiltered(found.amount) //koska lol tehtävänanto I guess
  //   } else if (found.length > 1) {
  //     setFiltered(found)
  //   } else {
  //     setFiltered('No-one matched criteria')
  //   }
  // }

  const filterList = (list) => {
    //haluunks tarkistaa täällä jo newFilterin pituuden :--D vois vaa.. kadota.. emt
    if (newFilter.length == 0) {
      return
    }

    //ÄÄÄÄÄÄ miten asioita saa luettavaksi oh god
    const filtered = list
      .filter(o => o.name
          .trim()
          .toUpperCase()
          .startsWith(
            newFilter
              .trim()
              .toUpperCase()
          )
      )

    console.log('filterList, filtered: ', filtered)

    if (filtered.length === 0 || filtered == null) {
      setShow(formNameList(names))
      return
    }

    setShow(filtered)
    
    //lol ei sillä oo väliä jos vaan tarkistan lopuksi vaikka että onks se yksi vai enemmän.
    // if (filtered.length === 1) {
    //   setShow(
    //     // <div>Amount of {filtered.name}s: {list.amount}</div>
    //   )
    // } else {
    //   setShow(filtered)
    // }    
  }

  //tää oli aiemmin "names.map(blabla)" mut ehkä tää ois kivempi näin :D
  //ainakin jos otan names vaan listaksi eikä usestate...? hm
  const formNameList = (list) => {
    return (
      <div>
        {list.map(n => <div key={n.name}> <Name obj={n} /> </div>)}
      </div>
    )
  }

  return (
    <div>
      <h3>Solita Name App</h3>
      <div>
        show amount of..
        <button onClick={() => totalAmount(names)}>everyone</button>
      </div>
      <div>
        sort by...
        <button onClick={() => sortByPopularity(names)}>Popularity</button>
        <button onClick={() => sortAlphabet(names)}>Alphabet</button>
      </div>
      <Filter setNewFilter={setNewFilter} />
      <div>
        <b>Names:</b>
        {/* joojoo mä teen tälle vielä jotain */}
        {(show.length > 1) ? formNameList(show) : <div> emt </div> }
      </div>
      {/* ok nää on jotenkin hassusti :DD tietty. Kun tota toista päivitetään jäljessä */}
    </div>
  )
}

export default App