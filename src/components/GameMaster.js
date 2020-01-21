import React, { Component } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import CreateMessage from './CreateMessage';

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSignalReceived: "",
      userSubmittedMessage: "Hello world",
      signalsReceived: 0,
      timeFirstSignalBegan: 0,
      timeLastSignalBegan: 0,
      timeLastSignalEnded: 0,
      errors: 0,
    };
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
    this.transmitStartTime = this.transmitStartTime.bind(this);
    this.transmitEndTime = this.transmitEndTime.bind(this);
  };

  onCompleteMessage = () => {
    let messageDuration = -(this.state.timeFirstSignalBegan - this.state.timeLastSignalEnded)/1000;
    console.log("Good job! You completed ", this.state.userSubmittedMessage.length, " characters in ", messageDuration, " seconds with ", this.state.errors, "errors.");
    setTimeout(this.setState({
      lastSignalReceived: "",
      userSubmittedMessage: "",
      signalsReceived: 0,
      timeFirstSignalBegan: 0,
      timeLastSignalBegan: 0,
      errors: 0,
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

  logError = () => {
    this.setState({
      errors: this.state.errors + 1,
      signalsReceived: this.state.signalsReceived + 1,
    })
  }

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
    return (
      <div className="game">
          <div className="messageHolder">
            <Message 
              userSubmittedMessage={this.state.userSubmittedMessage}
              completeMessage={this.onCompleteMessage}
              resetLastSignal={this.resetLastSignal}
              messageIndex={this.state.messageIndex}
              lastSignalReceived={this.state.lastSignalReceived}
              logError={this.logError}
            />
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