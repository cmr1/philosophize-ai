import React, { Component } from 'react'
import Loader from './Loader'
import './App.css'
import api from './lib/api'
import FontAwesome from 'react-fontawesome'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

const defaultState = {
  loading: false,
  template: 'This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.',
  message: '',
  actions: [],
  errors: []
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = defaultState

    this.minReqTime = 500
    this.maxReqTime = 2000

    this.addAction = this.addAction.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.loadMessage = this.loadMessage.bind(this)
    this.submitTemplate = this.submitTemplate.bind(this)
  }

  componentDidMount () {
    this.loadMessage()
  }

  addAction (action) {
    this.updateTemplate(`${this.state.template} {{ ${action} }}`)
  }

  updateMessage (message) {
    this.setState({ message })
  }

  updateTemplate (template) {
    this.setState({ template })
  }

  loadMessage (e) {
    this.setState({ loading: true })

    const randReqTime = Math.random() * (this.maxReqTime - this.minReqTime) + this.minReqTime

    api.get('messages/generate')
      .then(({ data }) => {
        setTimeout(() => {
          this.setState({ message: data.body })
          this.setState({ loading: false })
        }, randReqTime)
      })
      .catch(console.error)
  }

  submitTemplate (e) {
    e.preventDefault()

    const body = {
      template: this.state.template
    }

    console.log('submitting template', body)

    // this.setState({ loading: true })

    // api.post('templates', body)
    //   .then(({ data }) => {
    //     console.log('created template!', data)
    //     this.setState({ loading: false })
    //   })
    //   .catch(console.error)
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <Container>
            <h1>
              philosophize.ai
              &nbsp;
              {
                !this.state.loading && (
                  <FontAwesome
                    name='undo'
                    style={{ cursor: 'pointer' }}
                    className='small text-success'
                    onClick={this.loadMessage}
                  />
                )
              }
            </h1>
            {
              this.state.loading ? (
                <Loader loading={this.state.loading} />
              ) : (
                <Row>
                  <Col xs='12' sm='12'>
                    <pre className='App-message'>
                      {this.state.message}
                    </pre>
                  </Col>
                </Row>
              )
            }
          </Container>
        </header>
      </div>
    )
  }
}

export default App
