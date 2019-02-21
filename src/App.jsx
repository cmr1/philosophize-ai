import React, { Component } from 'react'
import Loader from './Loader'
import './App.css'
import api from './lib/api'
import FontAwesome from 'react-fontawesome'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Badge,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

const defaultState = {
  loading: false,
  template: 'This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.',
  message: '',
  actions: [
    'noun',
    'a_noun',
    'adjective',
    'an_adjective'
  ],
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

    api.post('messages')
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

    this.setState({ loading: true })

    api.post('templates', { body: this.state.template })
      .then(({ data }) => {
        console.log('created template!', data)

        api.post('messages', { template_id: data.id })
          .then(({ data }) => {
            this.setState({ message: data.body })
            this.setState({ loading: false })
          })
          .catch(console.error)
      })
      .catch(console.error)
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
            <hr />
            <Form className='App-form' onSubmit={this.submitTemplate}>
              <FormGroup>
                <Card className='bg-info'>
                  <CardBody>
                    <CardTitle>
                      Create your own using:
                    </CardTitle>
                    <CardText className='small d-flex justify-content-around'>
                      {
                        this.state.actions.map((action, index) => (
                          <Badge
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => this.addAction(action)}>
                            {action}
                          </Badge>
                        ))
                      }
                    </CardText>
                  </CardBody>
                </Card>
              </FormGroup>
              <FormGroup>
                <Input
                  name='template'
                  type='textarea'
                  rows={4}
                  value={this.state.template}
                  onChange={(e) => this.updateTemplate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button block color='success' size='lg' onClick={this.submitTemplate}>
                  Submit Template
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </header>
      </div>
    )
  }
}

export default App
