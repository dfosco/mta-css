import React from 'react'
import data from '../data/stops.json'

export default function Station(props) {
  return (
    <section className="bg-near-black pa2">
      <div className="h-line nl2 nr2 bg-white"></div>
      <span className="dib white helvetica f2 fw5 mb1">{props.name}</span>
      <div className="w-100">
        <span className="dib white helvetica bg-green br-pill pa2 h1 w1 tc lh-solid">{props.line}</span>
      </div>
    </section>
  )
}
