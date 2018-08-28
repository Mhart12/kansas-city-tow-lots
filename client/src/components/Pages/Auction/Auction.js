import React, { Component } from 'react';
import Toolbar from '../../Navigation/Toolbar';
import './Auction.css'

export default class Auction extends Component {
  render() {
    return (
      <div className="Auction ">
        <Toolbar />
        <h1> Auction </h1>
      </div>
    )
  }
}
