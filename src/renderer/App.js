import React, { Component } from 'react'
import TaskList from './TaskList'
import './App.css'

class App extends Component {

  render() {

    return (
      <div>
        Terve tuloa tämän sovelluksen koti sivuille!! TERVE TULLOO VAAN KAEKKI!!!
        <TaskList />
      </div>
    )
  }
}

export default App;