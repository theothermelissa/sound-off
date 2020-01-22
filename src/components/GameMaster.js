import React, { Component } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import CreateMessage from './CreateMessage';
// import Scoreboard from './Scoreboard';
import Timer from './Timer';

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
      timerShouldRun: false,
      elapsedSeconds: 0,
      errors: 0,
    };
    this.onCompleteMessage = this.onCompleteMessage.bind(this);
    this.resetLastSignal = this.resetLastSignal.bind(this);
    this.transmitSignal = this.transmitSignal.bind(this);
    this.transmitStartTime = this.transmitStartTime.bind(this);
    this.transmitEndTime = this.transmitEndTime.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.transmitElapsedSeconds = this.transmitElapsedSeconds.bind(this);
    // this.trackelapsedSeconds = this.trackelapsedSeconds.bind(this);
  };

  onCompleteMessage = () => {
    this.setState({ timerShouldRun: false });
    let messageDuration = -(this.state.timeFirstSignalBegan - this.state.timeLastSignalEnded)/1000;
    console.log("Good job! You completed ", this.state.userSubmittedMessage.length, " characters in ", messageDuration, " seconds with ", this.state.errors, "errors.");
    setTimeout(this.setState({
      lastSignalReceived: "",
      userSubmittedMessage: "",
      signalsReceived: 0,
      timeFirstSignalBegan: 0,
      timeLastSignalBegan: 0,
      errors: 0,
      timerShouldRun: false,
    }), 400)
  };

  resetLastSignal = () => {
    this.setState({
      lastSignalReceived: "",
    })
  };

  toggleTimer = () => {
    console.log("Trying to change the timer.")
    this.setState({ timerShouldRun: !this.state.timerShouldRun })
    };

    transmitElapsedSeconds = (seconds) => {
      console.log(seconds, " seconds have elapsed.");
    }

  // trackelapsedSeconds = () => {
  //   if (this.state.timerShouldRun) {
  //     setInterval(() => {
  //       this.setState({
  //         elapsedSeconds: this.state.elapsedSeconds + 1,
  //       });
  //     }, 1000)
  //   }
  // }
  
  transmitSignal = (signal) => {
    if (this.state.timerShouldRun === false) {
      this.setState({ timerShouldRun: true })
    };
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
      this.setState({ 
        timeFirstSignalBegan: time,
        // timerShouldRun: true })
      })
    }
  };

  transmitEndTime = (time) => {
    this.setState({ timeLastSignalEnded: time })
  };

  submitNewMessage = (message) => {
    this.setState({ userSubmittedMessage: message });
  }

  render() {
    console.log("Is timer running? Or at least supposed to be?", this.state.timerShouldRun);
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
              toggleTimer={this.toggleTimer}
              // trackelapsedSeconds={this.state.trackelapsedSeconds}
            />
          </div>
          <Switch
            transmitSignal={this.transmitSignal}
            transmitStartTime={this.transmitStartTime}
            transmitEndTime={this.transmitEndTime}
            isFirst={this.state.isFirstSignal}
          />
          <CreateMessage submitNewMessage={this.submitNewMessage} currentMessage={this.state.userSubmittedMessage} />
          {/* <Scoreboard errorCount={this.state.errors} /> */}
          <button onClick={this.toggleTimer}>Start/Stop Timer</button>
          <Timer timerShouldRun={this.state.timerShouldRun} transmitElapsedSeconds={this.transmitElapsedSeconds} />
      </div>
    )
  }
};

export default GameMaster;