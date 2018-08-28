import React, { Component } from 'react';
import Toolbar from '../../Navigation/Toolbar';
import './Login.css'

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Toolbar />
        <h1> Login Page </h1>
      </div>
    )
  }
}
