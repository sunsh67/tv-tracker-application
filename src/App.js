import React, { Component } from 'react'
import Dashboard from './Dashboard'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className="App">
        <div className="logo">Tv Tracker</div>
        <Dashboard/>
      </div>
    )
  }
}

export default App
