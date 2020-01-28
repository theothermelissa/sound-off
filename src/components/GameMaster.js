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
      isBegun: false,
      isComplete: false,
      isError: false,
      lastSignalReceived: "",
      signalStartTime: 0,
      signalEndTime: 0,
      durationOfTransmission: 0,
    };
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
    this.transmitInputDuration = this.transmitInputDuration.bind(this);
    this.logError = this.logError.bind(this);
    this.submitNewMessage = this.submitNewMessage.bind(this);
  };

  onCompleteMessage = () => {
    this.setState({ isComplete: true });
    setTimeout(this.setState({
      userSubmittedMessage: "Hello again, world",
      isBegun: false,
      isComplete: false,
      isError: false,
      lastSignalReceived: "",
      signalStartTime: 0,
      signalEndTime: 0,
      durationOfTransmission: 0,
    }), 400)
  };

  resetLastSignal = () => {
    this.setState({
      lastSignalReceived: "",
      isError: false,
    })
  };

  transmitInputDuration = (time) => {
    this.setState({ durationOfTransmission: time});
  };

  transmitSignal = (signal, startTime, endTime) => {
    if (this.state.isBegun === false) { 
      this.setState({ isBegun: true }) 
    };
    this.setState({ 
      lastSignalReceived: signal,
      signalStartTime: startTime,
      signalEndTime: endTime,
    })
  };

  logError = () => {
    console.log("logError has been called. Setting state to isError: true")
    this.setState({
      isError: true,
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
      userSubmittedMessage: message,
      isBegun: false,
      isComplete: false,
      isError: false,
      lastSignalReceived: "",
      signalStartTime: 0,
      signalEndTime: 0,
      durationOfTransmission: 0,
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
            isComplete={this.state.isComplete}
            isBegun={this.state.isBegun}
            lastSignalReceived={this.state.lastSignalReceived}
            logError={this.logError}
          />
        </div>
        <Switch
          transmitSignal={this.transmitSignal}
        />
        <CreateMessage 
          submitNewMessage={this.submitNewMessage}
          // currentMessage={this.state.userSubmittedMessage}
        />
        {/* <Timer transmitInputDuration={this.state.transmitInputDuration} /> */}
        <ScoreKeeper 
          userSubmittedMessage={this.state.userSubmittedMessage}
          isError={this.state.isError}
          isComplete={this.state.isComplete}
          durationOfTransmission={this.durationOfTransmission}
          signalStartTime={this.state.signalStartTime}
          isBegun={this.state.isBegun}
        />
          {/* <button onClick={this.toggleTimer}>Start/Stop Timer</button> */}
          {/* <Timer isComplete={this.state.isComplete} /> */}
      </div>
    )
  }
};

export default GameMaster;
