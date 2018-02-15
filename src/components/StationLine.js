import React from 'react'
import lines from '../data/lines.json'
import arrayToObject from '../utils/arrayToObject.js'

export default function StationLine(props) {
  const chips = arrayToObject(lines, "line")

  let isNum = "6.835"

  if (props.children.match(/^(2|3|5|6|7|8|9|J)$/)) {
    isNum = "8"
  } else if (props.children.match(/^(1|4|F|L|A|E|R|Z|S)$/)) {
    isNum = "7.5"
  } else if (props.children.match(/^(R)$/)) {
    isNum = "7"
  } else if (props.children.match(/^(N)$/)) {
    isNum = "6.5"
  } else if (props.children.match(/^(Q)$/)) {
    isNum = "6"
  } else if (props.children.match(/^(M)$/)) {
    isNum = "5"
  } else if (props.children.match(/^(W)$/)) {
    isNum = "4.5"
  }

  return (
    lines.map(chips => {
      if (chips.line === props.line) {
        return (
          <React.Fragment>
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd"><circle fill={chips.color} cx="13" cy="13" r="13"/>
                <text fontFamily="Helvetica" fontSize="18" fontWeight="400" fill={chips.letter}>
                  <tspan x={ isNum } y="19">{props.children}</tspan>
                </text>
              </g>
            </svg>
          </React.Fragment>
        )
      }
    })
  )
}
