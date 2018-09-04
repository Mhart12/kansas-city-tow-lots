import React, { Component } from 'react';
import Toolbar from '../../Navigation/Toolbar';
import './Profile.css'

export default class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <Toolbar />
        <h1> Profile Page </h1>
      </div>
    )
  }
}
