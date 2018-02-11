import React, { Component } from 'react'
import { Head } from 'react-static'
import StationList from './components/StationList'
import favicon32 from "./img/favicon-32x32.png"
import favicon16 from "./img/favicon-16x16.png"
import tachyons from 'tachyons'
import './app.css'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
          <title>New York City Transit Authority</title>
        </Head>
        <div className="flex flex-column justify-between bg-white pa3 ph5-ns pv4-ns">
            <header className="justify-between mb3">
              <h1 className="black helvetica fw6 f2 dib">New York City Subway <span className="f5 black-60">WIP</span></h1>
            </header>
            <main className="flex flex-wrap justify-start items-start">
              <StationList />
            </main>
            <footer className="mt5 lh-copy helvetica f6 fw5 flex flex-row-ns flex-column justify-between">
              <p className="db ma0 w-100 w-50-ns mb3 mb0-ns">Inspired by <a className="link no-underline blue" target="_blank" rel="noopener" href="https://www.kickstarter.com/projects/nycsubway/the-new-york-city-subway-468-stations-1-poster">The New York City Subway</a> poster <br className="dn db-ns"/> and the <a className="link no-underline blue" target="_blank" rel="noopener" href="https://standardsmanual.com/products/nyctacompactedition">NYC Transit Authority Graphics Standards Manual</a></p>
              <p className="db ma0 w-100 w-50-ns mb3 mb0-ns tl tr-ns">A thing by <a href="https://twitter.com/dfosco" target="_blank" rel="noopener" className="link no-underline blue">@dfosco</a></p>
            </footer>
        </div>
      </React.Fragment>
    )
  }
}

export default App
