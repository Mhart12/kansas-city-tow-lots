import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Col, FormControl, Button } from 'react-bootstrap';
import Toolbar from '../../Navigation/Toolbar';
import './Login.css'

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Toolbar />
        <Form horizontal>
          <FormGroup controlId="email">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                autoFocus
                type="email"
                placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
        <p> No account? Click <a href="/registration" target=""> here </a> to create an account. </p>
      </div>
    )
  }
}
