import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import Filter from './components/Filter'
import Button from './components/Button'
import nameService from './services/names'

/** Problems:
 *    Filtered names aren't shown unless you first press a sort button
 *    getAmount doesn't work
 *    ---> everyone-button renders total amount only if first sorted
 */

const App = () => {
  const [names, setNames] = useState([])
  const [newFilter, setNewFilter] = useState('')
  //uh oisko joku muu nimi ööhm. nää on filtered or sorted .--.
  //namesList? ööhhmm
  const [show, setShow] = useState([])
  // hmmm miten saisin sen Total tohon Names-listailun tilalle sit halutessani??
  
  //haluunko tän kuitenkin vaa laskea aina getAmountilla tjsp :--D
  const [amount, setAmount] = useState(0)

  const [showNames, setShowNames] = useState(false)
  const [showAmount, setShowAmount] = useState(false)

  useEffect(() => {
    const getNames = async () => {
      const namesJSON = await nameService.getAll()
      setNames(namesJSON)
      console.log('names set')
    }
    getNames()
  }, [])

  useEffect(() => {
    filterList(names)
    setShowNames(true)
  }, [newFilter, names])

  //vai haluunko että tää vaan suoraa sorttaa _kaikki_, eikä annettua listaa
  //haluunko että nää return sorted vai suoraan asettaa? Haluunko nimetä uusiksi?


  //kauheesti toistoa....
  const sortByPopularity = (list) => {
    setShowNames(true)
    setShowAmount(false)
    //slice to make a new array / deep copy
    const sorted = list.slice().sort((a, b) => b.amount - a.amount)
    setShow(sorted)
  }

  const sortAlphabet = (list) => {
    setShowNames(true)
    setShowAmount(false)
    const sorted = list.slice().sort((a, b) => (a.name > b.name) ? 1 : -1)
    setShow(sorted)
  }

  //jostain syystä kun laitoin totalAmount(list) niin se clogas tän
  //myös muista napeista .__.
  // => Dento selitti: se kutsuttiin joka renderöinnillä kai?
  const totalAmount = (list) => {
    console.log('total amount', list.reduce((sum, a) => sum + a.amount, 0))
  }

  //pff onks ihan hölmöä jos nää on vaan yksi funktio e____e ööhm..
  //no sen voi pilkkoo sit
  //tätä pitää kyl kans hioo, ainakin ton booleanhässäkän kaa.
  const getAmount = (obj) => {
    //setShowAmount(true)
    //setShowNames(false)
    //if obj has amount field, it's probably just one obj

    console.log('getAmount obj:', obj)
    console.log('getAmount obj.len:', obj.length)
    if (obj.amount) {
      return obj.amount
      //setAmount(obj.amount)
    }
    //otherwise it should be a list of names, return total amount
    if (obj.length > 0) {
      //return obj.reduce((sum, a) => sum + a.amount, 0)
      const total = obj.reduce((sum, a) => sum + a.amount, 0)
      //setAmount(total)
      console.log('total', total)
      return total
    }
    console.log('RIP getAmount... obj:', obj )
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

  //HÄÄH onks siinä järkeä että tää on näin mini :DD
  const formAmount = (obj) => {
    return (
      <div>
        {getAmount(obj)}
      </div>
    )
  }
 
  const filterList = (list) => {
    //haluunks tarkistaa täällä jo newFilterin pituuden..??
    const filtered = list
      .filter(o => o.name
        .trim()
        .toUpperCase()
        .startsWith(newFilter)
      )
    console.log('filterList, filtered: ', filtered, typeof filtered)

    if (newFilter.length === 0 || filtered.size === 0) {
      setShow('')
      console.log('filter and show are empty')
      return
    }

    setShow(filtered)

    if (filtered.length === 1) {
      setShowAmount(true)
      setShowNames(false)
      console.log('Filtered size == 1, showAmount is true, showNames false')
    }
  }

  const formNameList = (list) => {
    return (
      <div>
        <b>Names:</b>
        {list.map(n => <div key={n.name}> <Name obj={n} /> </div>)}
      </div>
    )
  }

  const showStuff = () => {
    return (
      <div>
        {(show.length > 1) ? formNameList(show)
          : (show.length === 1) ? <div> {getAmount(show)} </div> /*<div> Amount of {show[0].name}s is {show[0].amount}</div>**/
            : <div>show.length is {show.length}</div>}
      </div>
    )
  }

  const showConditionally = () => {
    if ((!showNames && !showAmount) || !show) {
      return null
    }

    //filter has only one result
    if (showAmount && show.length === 1) {
      console.log('showAmount true, show.len === 1', show)
      //showNameAmount()
      console.log('show[0].amount', show[0].amount)
      setAmount(getAmount(show[0]))
      setShowNames(false)
      setShowAmount(true)
      return (
        <div>Amount: {amount}</div>
      )
    }

    //must be total amount, because more than 1 result in show
    if (showAmount) {
      return (
        <div>
        <b>Total amount:</b> {amount}
        </div>
      )
    }

    //wait miks tässä on names :DDD
    if (showNames && names) {
      console.log('shownames: true, show formNameList:', show)
      return formNameList(show)
    } 
    console.log('RIP conditional rendering...')
  }

  //aaaaaa nyt se re-renderöi vittuna :DD
  const showNameAmount = () => {
    //if (show.length === 1) {
      setAmount(getAmount(show))
      setShowNames(false)
      setShowAmount(true)
    //}
    //console.log('oops showNameAmount() didnt work')
  }

  const showTotalAmount = () => {
    setAmount(getAmount(names))
    setShowNames(false)
    setShowAmount(true)
  }

  return (
    <div>
      <h3>Solita Name App</h3>
      <div>
        show amount of..
        <button onClick={() => showTotalAmount()}>everyone</button>
        {/* --> setShowAmount(true), setShowNames(false),  */}
        {/* <button onClick={() => totalAmount(names)}>everyone</button> */}
      </div>
      <div>
        sort by...
        {/* <Button onClick={() => sortByPopularity(names)} label={'Popularity'} /> */}
        <button onClick={() => sortByPopularity(names)}>Popularity</button>
        <button onClick={() => sortAlphabet(names)}>Alphabet</button>
      </div>
      <Filter setNewFilter={setNewFilter} />
      <div>{showConditionally()}</div>
      {/* ok nää on jotenkin hassusti :DD tietty. Kun tota toista päivitetään jäljessä */}
    </div>
  )
}

export default App