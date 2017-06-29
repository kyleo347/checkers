import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board, Square } from './board';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Board></Board>
      </div>
    );
  }
}

export default App;
