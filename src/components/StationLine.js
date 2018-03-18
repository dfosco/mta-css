import React from 'react'
import lines from '../data/lines.json'
import arrayToObject from '../utils/arrayToObject.js'

export default function StationLine(props) {
  const chips = arrayToObject(lines, "line")

  let propX = "6.835"

  if (props.children.match(/^(2|3|5|6|7|8|9|J)$/)) {
    propX = "8"
  } else if (props.children.match(/^(1|4|F|L|A|E|R|Z|S)$/)) {
    propX = "7.5"
  } else if (props.children.match(/^(R)$/)) {
    propX = "7"
  } else if (props.children.match(/^(N)$/)) {
    propX = "6.5"
  } else if (props.children.match(/^(Q)$/)) {
    propX = "6"
  } else if (props.children.match(/^(M)$/)) {
    propX = "5"
  } else if (props.children.match(/^(W)$/)) {
    propX = "4.5"
  }

  return (
    lines.map(chips => {
      if (chips.line === props.line) {
        return (
          <React.Fragment>
            <svg className={ props.large ? 'scale-1-4 pl-6px pt-6px' : '' } width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd"><circle fill={chips.color} cx="13" cy="13" r="13"/>
                <text fontFamily="Helvetica" fontSize={ props.large ? '16' : '18'} fontWeight="400" fill={chips.letter}>
                  <tspan x={ propX } y="19">{props.children}</tspan>
                </text>
              </g>
            </svg>
          </React.Fragment>
        )
      }
    })
  )
}
