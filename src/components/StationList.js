import React, { Component } from 'react'
import Station from './Station'
import data from '../data/stops.json'

class StationList extends Component {

  render(props) {
    function compare(a,b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }

    let sortedData = data.sort(compare);

    const arrayToObject = (array, keyField) =>
       array.reduce((obj, item) => {
         obj[item[keyField]] = item
         return obj
       }, {})

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
