import React, { Component } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import CreateMessage from './CreateMessage';

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // messageIndex: 0,
      lastSignalReceived: "",
      submittedMessage: "Hello world",
    };
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
    this.submitNewMessage = this.submitNewMessage.bind(this);
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
  
  submitNewMessage = (message) => {
    this.setState({ submittedMessage: message });
  }
  
  
  render() {
    return (
      <div className="game">
          <div className="message">
            <Message 
              className="message"
              submittedMessage={this.state.submittedMessage}
              completeMessage={this.onCompleteMessage}
              resetLastSignal={this.resetLastSignal}
              messageIndex={this.state.messageIndex}
              lastSignalReceived={this.state.lastSignalReceived} />
          </div>
          <Switch transmitSignal={this.transmitSignal}/>
          <CreateMessage submitNewMessage={this.submitNewMessage} currentMessage={this.state.submittedMessage} />
      </div>
    )
  }
};

export default GameMaster;