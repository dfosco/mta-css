import React, { /* PropTypes */ } from 'react'
import lines from '../data/lines.json'

export default function StationLine(props) {
  return (
    <span style={{ backgroundColor: props.color, color: props.letter }} className="stationLine dib helvetica br-pill pa2 h1 w1 tc lh-solid">{props.children}</span>
  )
}

// StationLine.propTypes = {
//
// }
