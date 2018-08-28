import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap';
import './Toolbar.css';

export default class Toolbar extends Component {
  render() {
    return (
      <div className ="Toolbar">
        <Navbar style={{backgroundColor: '#24435c'}} inverse fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a style={{color: 'white', fontWeight: 'bold'}} href="/"> Kansas City Tow Lots </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/login">
                <p> <Glyphicon style={{paddingRight: "5px", color: 'white'}} glyph="log-in" /> Login </p>
              </NavItem>
              <NavItem eventKey={2} href="/auction">
                <p> <Glyphicon style={{paddingRight: "5px", color: 'white'}} glyph="question-sign" /> Auction Information </p>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
