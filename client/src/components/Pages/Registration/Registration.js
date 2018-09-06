import React, { Component } from "react";
import Toolbar from '../../Navigation/Toolbar';
import { HelpBlock, Button, Form, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import './Registration.css'

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ newUser: "test" });

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  }

  renderConfirmationForm() {
    return (
      <Form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
      </Form>
    );
  }

  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit} horizontal>
        <FormGroup controlId="firstName">
          <Col componentClass={ControlLabel} sm={2}>
            First
          </Col>
          <Col sm={10}>
            <FormControl
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="First Name"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="lastName">
          <Col componentClass={ControlLabel} sm={2}>
            Last
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
              placeholder="Last Name"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="password">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="confirmPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Confirm
          </Col>
          <Col sm={10}>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
              placeholder="Confirm Password"
            />
          </Col>
        </FormGroup>

        <Button type="submit"> Sign Up </Button>
      </Form>
    );
  }

  render() {
    return (
      <div className="Registration">
        <Toolbar />
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
        <br />
        <p> Already have an account? Click <a href="/login" target=""> here </a> to log in. </p>
      </div>
    );
  }
}
