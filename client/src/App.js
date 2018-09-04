import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import Auction from './components/Pages/Auction/Auction';
import Registration from './components/Pages/Registration/Registration';
import Profile from './components/Pages/Profile/Profile';
import Error from './components/Pages/Error/Error'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/auction' component={Auction}/>
        <Route path='/registration' component={Registration} />
        <Route path='/profile' component={Profile} />
        <Route component={Error} />
      </Switch>
    )
  }
}
