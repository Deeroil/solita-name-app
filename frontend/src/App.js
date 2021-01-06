import React, { useState, useEffect } from 'react'
import Namelist from './components/Namelist'
import Filter from './components/Filter'
import Button from './components/Button'
import nameService from './services/names'

/** Problems:
 *    * kun nappia painetaan, haluanko tyhjentää inputin sisällön? 
 */

const App = () => {
  const [allNames, setAllNames] = useState([])
  const [newFilter, setNewFilter] = useState('')
  //oisko joku muu nimi? nää on filtered or sorted
  //namesList? hmm
  const [shownNames, setShownNames] = useState([])
  const [totalVisible, setTotalVisible] = useState(false)

  useEffect(() => {
    const getNames = async () => {
      const namesJSON = await nameService.getAll()
      setAllNames(namesJSON)
    }
    getNames()
  }, [])

  useEffect(() => {
    filterList(allNames)
  }, [newFilter, allNames])

  //kinda duplicatey, but makes the code more readable
  const sortByPopularity = () => {
    setTotalVisible(false)
    //slice to make a new array / deep copy
    const sorted = allNames.slice().sort((a, b) => b.amount - a.amount)
    setShownNames(sorted)
  }

  const sortAlphabet = () => {
    setTotalVisible(false)
    const sorted = allNames.slice().sort((a, b) => (a.name > b.name) ? 1 : -1)
    setShownNames(sorted)
  }

  const totalAmount = () => allNames.reduce((sum, a) => sum + a.amount, 0)

  const filterList = (list) => {
    setTotalVisible(false)

    const filtered = list
      .filter(o => o.name
        .trim()
        .toUpperCase()
        .startsWith(newFilter)
      )

    if (newFilter.length === 0 || filtered.size === 0) {
      setShownNames('')
      return
    }

    setShownNames(filtered)
  }

  //tried to avoid undefined with ternary, but then remembered conditional chaining! yaay!
  //wanted to name firstRes only or last result, but it's the first in index
  const showsLengthIsOne = (shownNames.length === 1)
  const firstResult = shownNames[0]
  const firstNameEqualsFilter = firstResult?.name.toUpperCase() === newFilter

  const showResults = () => {
    //if shownNames has one item and it's equal to newFilter
    if (showsLengthIsOne && firstNameEqualsFilter) return <div> There are {firstResult.amount} {firstResult.name}s in Solita </div>

    else if (shownNames.length >= 1) return <Namelist list={shownNames} />

    else if (totalVisible) return <div> total amount: {totalAmount()} </div>

    else return <div> nothing here, interact to see data </div>
  }

  const handleTotalVisibility = () => {
    setShownNames([])
    setTotalVisible(true)
  }

  return (
    <div>
      <h3>Solita Name App</h3>
      <div>
        Sort by...
        <Button onClick={sortByPopularity} label={'Popular'} />
        <Button onClick={sortAlphabet} label={'Alphabet'} />
      </div>
      Show...
      <Button onClick={handleTotalVisibility} label={'Total amount'} />
      <Filter setNewFilter={setNewFilter} />
      {showResults()}
    </div>
  )
}

export default App