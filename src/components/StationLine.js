import React from 'react'
import lines from '../data/lines.json'
import arrayToObject from '../utils/arrayToObject.js'

export default function StationLine(props) {
  const chips = arrayToObject(lines, "line")

  return (
    lines.map(chips => {
      let isNum = false
      if (props.children === "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9") {
        isNum = true
      }

      if (chips.line === props.line) {
        console.log("isNum: ", isNum)
        return (
          <React.Fragment>
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd"><circle fill={chips.color} cx="13" cy="13" r="13"/>
                <text fontFamily="Helvetica Neue" fontSize="18" fontWeight="400" fill={chips.letter}>
                  <tspan x={ isNum ? "8" : "6.835"} y="19">{props.children}</tspan>
                </text>
              </g>
            </svg>
          </React.Fragment>
        )
      }
    })
  )
}
