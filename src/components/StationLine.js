import React from 'react'
import lines from '../data/lines.json'
import arrayToObject from '../utils/arrayToObject.js'

export default function StationLine(props) {
  const chips = arrayToObject(lines, "line")

  return (
    lines.map(chips => {
      if (chips.line === props.line) {
        return (
          <span style={{ backgroundColor: chips.color, color: chips.letter }} className="stationLine dib helvetica br-pill pa2 h1 w1 tc lh-solid">{props.children}</span>
        )
      }
    })
  )
}
