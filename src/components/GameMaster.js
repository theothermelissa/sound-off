import React, { Component } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageIndex: 0,
      lastSignalReceived: "",
    };
    this.markMessageComplete = this.markMessageComplete.bind(this);
    this.markLetterSignalComplete = this.markLetterSignalComplete.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
  };

  markMessageComplete = () => {
    alert("Good job!");
    this.setState({
      messageIndex: 1,
      lastSignalReceived: "",
    })
  };

  markLetterSignalComplete = () => {
    this.setState({
      lastSignalReceived: "",
    })
  };

  transmitSignal = (signal) => {
    this.setState({ lastSignalReceived: signal})
  };

  render() {
    return (
      <div className="game">
          <Message 
            className="message" 
            markMessageComplete={this.markMessageComplete}
            markLetterSignalComplete={this.markLetterSignalComplete}
            messageIndex={this.state.messageIndex}
            lastSignalReceived={this.state.lastSignalReceived} />
          <Switch transmitSignal={this.transmitSignal}/>
      </div>
    )
  }
};

export default GameMaster;