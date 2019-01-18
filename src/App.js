import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import './fontawesome-free-5.6.3-web/css/all.min.css';


import Game from './Game'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Play Nine</h1>
        <Game />
      </div>
    );
  }
}

export default App;
