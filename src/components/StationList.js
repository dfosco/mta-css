import React, { Component } from 'react'
import Station from './Station'
import data from '../data/stops.json'
import arrayToObject from '../utils/arrayToObject.js'
import compare from '../utils/sortData.js'

class StationList extends Component {

  render(props) {
    let sortedData = data.sort(compare);
    const metro = arrayToObject(sortedData, "name")

    return (
      data.map(metro => {
          return (
            <Station key={`${metro.line}_${metro.name}`} name={metro.name} line={metro.line} />
          )
      })
    );
  }
}

export default StationList
