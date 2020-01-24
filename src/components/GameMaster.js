import React, { Component } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import CreateMessage from './CreateMessage';
import ScoreKeeper from './ScoreKeeper';
import Timer from './Timer';

  // transmitInputDuration, // callback to pass to Timer to return duration of user's encoded message; function; doesn't need to come from GM


class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSubmittedMessage: "Hello world",
      isComplete: false,
      lastSignalReceived: "",
      signalStartTime: 0,
      signalEndTime: 0,
      durationOfTransmission: 0,
    };
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
    this.transmitStartTime = this.transmitStartTime.bind(this);
    this.transmitEndTime = this.transmitEndTime.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.transmitElapsedTime = this.transmitElapsedTime.bind(this);
  };

  onCompleteMessage = () => {
    this.setState({ isComplete: false });
    let messageDuration = -(this.state.timeFirstSignalBegan - this.state.timeLastSignalEnded)/1000;
    let totalTime = Math.round(messageDuration * 100)/100;
    alert(`Good job! You completed ${this.state.userSubmittedMessage.length} characters in ${totalTime} seconds with ${this.state.errorCount} errors.`);
    setTimeout(this.setState({
      lastSignalReceived: "",
      userSubmittedMessage: "",
      signalsReceived: 0,
      timeFirstSignalBegan: 0,
      timeLastSignalBegan: 0,
      timeLastSignalEnded: 0,
      isComplete: false,
      elapsedTime: 0,
      errorCount: 0,
    }), 400)
  };

  resetLastSignal = () => {
    this.setState({
      lastSignalReceived: "",
    })
  };

  // toggleTimer = () => {
  //   this.setState({ isComplete: !this.state.isComplete })
  //   };

  transmitElapsedTime = (time) => {
    this.setState({ elapsedTime: time});
  }

  transmitSignal = (signal) => {
    if (this.state.isComplete === false) { this.setState({ isComplete: true }) };
    this.setState({ 
      lastSignalReceived: signal,
      signalsReceived: this.state.signalsReceived + 1,
    })
  };

  logError = () => {
    this.setState({
      errorCount: this.state.errorCount + 1,
      signalsReceived: this.state.signalsReceived + 1,
    })
  }

  transmitStartTime = (time) => {
    this.setState({ timeLastSignalBegan: time })
    if (this.state.signalsReceived === 0) {
      this.setState({ 
        timeFirstSignalBegan: time,
      })
    }
  };

  transmitEndTime = (time) => {
    this.setState({ 
      timeLastSignalEnded: time, 
    })
  };

  submitNewMessage = (message) => {
    this.setState({ 
      userSubmittedMessage: message 
    });
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
          <CreateMessage 
            submitNewMessage={this.submitNewMessage}
            currentMessage={this.state.userSubmittedMessage}
          />
          <Timer />
          <ScoreKeeper 
            isComplete={this.state.isComplete}
            signalIsMatch={this.state.signalIsMatch}
            durationOfTransmission={this.durationOfTransmission}
          />
          {/* <button onClick={this.toggleTimer}>Start/Stop Timer</button> */}
          {/* <Timer isComplete={this.state.isComplete} /> */}
      </div>
    )
  }
};

export default GameMaster;
