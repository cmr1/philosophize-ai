import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Loader from './Loader'
import './App.css'
import api from './lib/api'

const defaultState = {
  message: ''
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.loadMessage = this.loadMessage.bind(this)
  }

  componentDidMount() {
    this.loadMessage()
  }

  loadMessage(e) {
    api.get('message')
      .then(({ data }) => {
        this.setState(data)
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <Loader />
        <header className="App-header">
          <h1>philosophize.ai</h1>

          {
            this.state.message.trim() !== '' && (
              <p>{this.state.message}</p>
            )
          }

          <p style={{ cursor: 'pointer', fontSize: '13px' }}>
            <span onClick={this.loadMessage}>
              [reload]
            </span>
          </p>
        </header>
      </div>
    )
  }
}

export default App
