import React from 'react'

import {
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

class NewTemplateForm extends React.Component {
  render () {
    return (
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
    )
  }
}

export default NewTemplateForm
