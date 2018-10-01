import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {eventCount: 0};
  }

  componentDidMount() {
    this.socket = io('http://localhost:3032');
    this.socket.on('kafka', (msg) => {
      this.setState({eventCount: this.state.eventCount + 1});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Received <h1> {this.state.eventCount} </h1> events
        </p>
      </div>
    );
  }
}

export default App;
