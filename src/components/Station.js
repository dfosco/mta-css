import React from 'react'
import data from '../data/stops.json'
import chips from '../data/lines.json'
import StationLine from './StationLine'

export default function Station(props) {
  // chips.map(chip => {
  //   return (
  //     <StationLine color={'#EC2C2E'} letter={'#ffffff'} key={line}>{line}</StationLine>
  //   )
  // })

  // chips.forEach(function(chip) {
  const stationChip = chips.name
  console.log(chips.name);
  // });

  return (
    <section className="bg-near-black pa2 grow-1 basis-content ma1">
      <div className="h-line nl2 nr2 bg-white"></div>
      <span className="dib white helvetica f2 fw5 mb1">{props.name}</span>
      <div className="w-100">
        {
          props.line.map(line => {
            return (
              <StationLine color={'#EC2C2E'} letter={'#ffffff'} key={line}>{line}</StationLine>
            )
          })
        }
      </div>
    </section>
  )
}
