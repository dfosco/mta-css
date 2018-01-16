import React from 'react'
import Station from './Station'
import data from '../data/stops.json'

export default function StationList(props) {

  return(
    data.map(data => {
      return (
        <Station key={data.line} name={data.name} line={data.line} />
      )
    })
  )
}
