import React, { Component } from 'react';
import Toolbar from '../../Navigation/Toolbar'
import Search from '../../Search/Search'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Toolbar />
        <Search />
      </div>
    );
  }
}
