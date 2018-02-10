import React from 'react'
import Station from './Station'
import data from '../data/stops.json'

export default function StationList(props) {

  const metroStations = [
    {
    	"name": "Astor Pl",
    	"line": ["4", "6"]
    }, {
    	"name": "Canal St",
    	"line": ["4", "6"]
    }, {
    	"name": "50th St",
    	"line": ["1", "2"]
    }
  ]

  const arrayToObject = (array, keyField) =>
     array.reduce((obj, item) => {
       obj[item[keyField]] = item
       return obj
     }, {})

  const metro = arrayToObject(data, "name")
  // console.log(metroObject["50th St"].line[0])


  return(
      data.map(metro => {
            return (
              <Station key={metro.line} name={metro.name} line={metro.line} />
            )
          })
  )
}
