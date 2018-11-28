import React, { Component } from 'react'
import Loader from './Loader'
import './App.css'
import api from './lib/api'
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
  actions: [],
  errors: []
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = defaultState

    this.minReqTime = 500
    this.maxReqTime = 2000
    this.rndReqTime = Math.random() * (this.maxReqTime - this.minReqTime) + this.minReqTime

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

    api.get('message')
      .then(({ data }) => {
        setTimeout(() => {
          this.setState(data)
          this.setState({ loading: false })
        }, this.rndReqTime)
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
            <h1>philosophize.ai</h1>
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

                  <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
                    <Form className='App-form' onSubmit={this.submitTemplate}>
                      <FormGroup>
                        <Card className='bg-info'>
                          <CardBody>
                            <CardTitle>
                              Create your own
                            </CardTitle>
                            <CardText className='small d-flex justify-content-between'>
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
                          name="template"
                          type="textarea"
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
