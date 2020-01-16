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
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
  };

  onCompleteMessage = () => {
    console.log("GameMaster says the message is complete. Good job!")
    this.setState({
      messageIndex: 1,
    })
  };

  resetLastSignal = () => {
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
          <div className="message">
            <Message 
              className="message"
              completeMessage={this.onCompleteMessage}
              resetLastSignal={this.resetLastSignal}
              messageIndex={this.state.messageIndex}
              lastSignalReceived={this.state.lastSignalReceived} />
          </div>
          <Switch transmitSignal={this.transmitSignal}/>
      </div>
    )
  }
};

export default GameMaster;