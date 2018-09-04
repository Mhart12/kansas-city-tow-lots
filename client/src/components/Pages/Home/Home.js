import React, { Component } from 'react';
import AuctionDate from '../../AuctionDate/AuctionDate'
import Toolbar from '../../Navigation/Toolbar'
import Search from '../../Search/Search'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Toolbar />
        <AuctionDate />
        <Search />
      </div>
    );
  }
}
