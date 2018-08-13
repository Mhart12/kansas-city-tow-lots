import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import { Alert, Button } from 'react-bootstrap';
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: false,
      response: ''
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: !this.state.show });
  }

  componentDidMount() {
    axios.get('/api/hello')
      .then((response) => {
        this.setState({ response: response.data.express })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {

    if (this.state.show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <h4>Oh snap! You got an error!</h4>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
          <p>
            <Button bsStyle="danger">Take this action</Button>
            <span> or </span>
            <Button onClick={this.handleDismiss}>Hide Alert</Button>
          </p>
        </Alert>
      );
    }

    return (
      <div className="App">
        <Toolbar />
        <p> {this.state.response} </p>
        <Button onClick={this.handleShow} bsStyle="primary"> Click Here </Button>
      </div>
    );
  }
}
