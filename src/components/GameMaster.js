import React, { Component } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import CreateMessage from './CreateMessage';
import ScoreKeeper from './ScoreKeeper';
// import Timer from './Timer';

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSubmittedMessage: "Hello world",
      isComplete: true,
      lastSignalReceived: "",
      signalStartTime: 0,
      signalEndTime: 0,
      durationOfTransmission: 0,
    };
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
    this.transmitInputDuration = this.transmitInputDuration.bind(this);
  };

  onCompleteMessage = () => {
    this.setState({ isComplete: true });
    setTimeout(this.setState({
      lastSignalReceived: "",
      userSubmittedMessage: "Hello again world.",
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

  transmitInputDuration = (time) => {
    this.setState({ durationOfTransmission: time});
  }

  transmitSignal = (signal, startTime, endTime) => {
    console.log("Signal received.")
    if (this.state.isComplete === true) { 
      // console.log("Message is incomplete.")
      this.setState({ isComplete: false }) 
    };
    console.log("Signal type: ", signal, " Start time: ", startTime, " End time: ", endTime)
    this.setState({ 
      lastSignalReceived: signal,
      signalStartTime: startTime,
      signalEndTime: endTime,
    })
  };

  logError = () => {
    this.setState({
      errorCount: this.state.errorCount + 1,
      signalsReceived: this.state.signalsReceived + 1,
    })
  }

  // transmitStartTime = (time) => {
  //   this.setState({ timeLastSignalBegan: time })
  //   if (this.state.signalsReceived === 0) {
  //     this.setState({ 
  //       timeFirstSignalBegan: time,
  //     })
  //   }
  // };

  // transmitEndTime = (time) => {
  //   this.setState({ 
  //     timeLastSignalEnded: time, 
  //   })
  // };

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
          />
          <CreateMessage 
            submitNewMessage={this.submitNewMessage}
            currentMessage={this.state.userSubmittedMessage}
          />
          {/* <Timer transmitInputDuration={this.state.transmitInputDuration} /> */}
          {/* <ScoreKeeper 
            userSubmittedMessage={this.state.userSubmittedMessage}
            signalIsMatch={this.state.signalIsMatch}
            isComplete={this.state.isComplete}
            durationOfTransmission={this.durationOfTransmission}
          /> */}
          {/* <button onClick={this.toggleTimer}>Start/Stop Timer</button> */}
          {/* <Timer isComplete={this.state.isComplete} /> */}
      </div>
    )
  }
};

export default GameMaster;
