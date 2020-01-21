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
      userSubmittedMessage: "Hello world",
      signalsReceived: 0,
      timeFirstSignalBegan: 0,
      timeLastSignalBegan: 0,
      timeLastSignalEnded: 0,
    };
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
    this.transmitStartTime = this.transmitStartTime.bind(this);
    this.transmitEndTime = this.transmitEndTime.bind(this);
  };

  onCompleteMessage = () => {
    let messageDuration = -(this.state.timeFirstSignalBegan - this.state.timeLastSignalEnded)/1000;
    console.log("GameMaster says the message is complete. Good job!")
    console.log("Good job! You completed ", this.state.userSubmittedMessage.length, " characters in ", messageDuration, " seconds.");
    setTimeout(this.setState({
      lastSignalReceived: "",
      userSubmittedMessage: "",
      signalsReceived: 0,
      timeFirstSignalBegan: 0,
      timeLastSignalBegan: 0,
      // messageEndTime: 0,
    }), 400)
  };
  
  resetLastSignal = () => {
    this.setState({
      lastSignalReceived: "",
    })
  };
  
  transmitSignal = (signal) => {
    this.setState({ 
      lastSignalReceived: signal,
      signalsReceived: this.state.signalsReceived + 1,
    })
  };

  transmitStartTime = (time) => {
    this.setState({ timeLastSignalBegan: time })
    if (this.state.signalsReceived === 0) {
      this.setState({ timeFirstSignalBegan: time })
    };
  };

  transmitEndTime = (time) => {
    this.setState({ timeLastSignalEnded: time })
  };

  submitNewMessage = (message) => {
    this.setState({ userSubmittedMessage: message });
  }
  
  
  render() {
    let messageLength = this.state.userSubmittedMessage.length;
  console.log("Time first signal began: ", this.timeLastSignalBegan);
  console.log("Time last signal ended: ", this.timeLastSignalEnded);
    return (
      <div className="game">
          <div className="message">
            <Message 
              className="message"
              userSubmittedMessage={this.state.userSubmittedMessage}
              completeMessage={this.onCompleteMessage}
              resetLastSignal={this.resetLastSignal}
              messageIndex={this.state.messageIndex}
              lastSignalReceived={this.state.lastSignalReceived} />
          </div>
          <Switch
            transmitSignal={this.transmitSignal}
            transmitStartTime={this.transmitStartTime}
            transmitEndTime={this.transmitEndTime}
            isFirst={this.state.isFirstSignal}
          />
          <CreateMessage submitNewMessage={this.submitNewMessage} currentMessage={this.state.userSubmittedMessage} />
      </div>
    )
  }
};

export default GameMaster;