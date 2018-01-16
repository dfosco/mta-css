import React, { Component } from 'react'
import tachyons from 'tachyons'
import './app.css'

class App extends Component {
  render () {
    return (
      <main className="vh-100 bg-white pa3 ph5-ns pv4-ns">
          <header className="vh-10 justify-between mb5">
            <h1 className="black helvetica fw6 f2 dib">New York City Subway <span className="f5 black-60">WIP</span></h1>
          </header>
          <div className="vh-80 flex justify-start items-start">
            <section className="bg-near-black pa2">
              <div className="h-line nl2 nr2 bg-white"></div>
              <span className="dib white helvetica f2 fw5 mb1">Flushing Av</span>
              <div className="w-100">
                <span className="dib white helvetica bg-green br-pill pa2 h1 w1 tc lh-solid">G</span>
              </div>
            </section>

            <section className="bg-near-black pa2">
              <div className="h-line nl2 nr2 bg-white"></div>
              <span className="dib white helvetica f2 fw5 mb1">Van Siclen Av</span>
              <div className="w-100">
                <span className="dib white helvetica bg-brown br-pill pa2 h1 w1 tc lh-solid">J</span>
                <span className="dib white helvetica bg-brown br-pill pa2 h1 w1 tc lh-solid">Z</span>
              </div>
            </section>
          </div>
          <footer className="vh-10 lh-copy helvetica f6 fw5 flex flex-row-ns flex-column justify-between">
            <p className="db ma0 w-100 w-50-ns mb3 mb0-ns">Inspired by <a className="link no-underline blue" target="_blank" rel="noopener" href="https://www.kickstarter.com/projects/nycsubway/the-new-york-city-subway-468-stations-1-poster">The New York City Subway</a> poster <br className="dn db-ns"/> and the <a className="link no-underline blue" target="_blank" rel="noopener" href="https://standardsmanual.com/products/nyctacompactedition">NYC Transit Authority Graphics Standards Manual</a></p>
            <p className="db ma0 w-100 w-50-ns mb3 mb0-ns tl tr-ns">A thing by <a href="https://twitter.com/dfosco" target="_blank" rel="noopener" className="link no-underline blue">@dfosco</a></p>
          </footer>
      </main>
    )
  }
}

export default App
