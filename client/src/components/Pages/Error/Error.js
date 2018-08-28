import React, { Component } from 'react';
import Toolbar from '../../Navigation/Toolbar';
import './Error.css'

export default class Error extends Component {
  render() {
    return (
      <div className="Error">
        <Toolbar />
        <h1> 404 </h1>
      </div>
    )
  }
}
