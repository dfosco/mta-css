import React, { Component } from 'react'
import { Head } from 'react-static'
import StationList from './components/StationList'
import StationLine from './components/StationLine'
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
          <meta property="og:title" content="NYC Subway CSS" />
          <meta name="description" content="A love letter to the NYC Subway in CSS" />
          <meta property="og:image" content="path/to/image.jpg" />

          <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
          <title>NYC Subway CSS</title>
        </Head>
        <div className="flex flex-column justify-between bg-white pa3 ph5-l pv4-l">
            <header className="justify-between mb3">
              <div className="flex flex-wrap items-center">
                <h1 className="black fw6 f2 dib mb0 mb3-l">
                  New York City Subway
                </h1>
                <div className="flex items-center mt2 mb3 w-100 w-auto-l ml2-l mb0-l dib-l">
                  <StationLine large line="4">C</StationLine>
                  <StationLine large line="1">S</StationLine>
                  <StationLine large line="A">S</StationLine>
                </div>
              </div>
              <div className="mt3 mb0 lh-copy f6 fw5 flex flex-wrap flex-row-ns flex-column items-end justify-between">
                <p className="db ma0 w-100 w-60-l mb3 mb0-l">Inspired by <a className="link no-underline blue" target="_blank" rel="noopener noreferrer" href="https://www.kickstarter.com/projects/nycsubway/the-new-york-city-subway-468-stations-1-poster">The New York City Subway</a> poster <br className="dn db-ns"/> and the <a className="link no-underline blue" target="_blank" rel="noopener" href="https://standardsmanual.com/products/nyctacompactedition">NYC Transit Authority Graphics Standards Manual</a>.</p>
                <p className="db ma0 w-100 w-40-l mb0 tl tr-l">
                  A love letter to the NYC subway and its signs, by <a href="https://twitter.com/dfosco" target="_blank" rel="noopener noreferrer" className="link no-underline blue">@dfosco</a>.
                </p>
              </div>
            </header>
            <main className="flex flex-wrap justify-start items-start na1">
              <StationList />
            </main>
            <footer className="w-100">
              <p className="db mt4 mb0 tc helvetica f6 fw7 near-black">No rights reserved :P</p>
            </footer>
        </div>
      </React.Fragment>
    )
  }
}

export default App
