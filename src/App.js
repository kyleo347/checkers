import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board, Square } from './board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Checkers</h2>
        </div>
          <Board></Board>
      </div>
    );
  }
}

export default App;
