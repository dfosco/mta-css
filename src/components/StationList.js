import React from 'react'
import Station from './Station'
import data from '../data/stops.json'

export default function StationList(props) {

  const arrayToObject = (array, keyField) =>
     array.reduce((obj, item) => {
       obj[item[keyField]] = item
       return obj
     }, {})

  const metro = arrayToObject(data, name)

  return(
      data.map(metro => {
            return (
              <Station key={`${metro.line}_${metro.name}`} name={metro.name} line={metro.line} />
            )
          })
  )
}
