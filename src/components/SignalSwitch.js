import React, { Component } from 'react';
import '../App.css';
import soundSignal from '../assets/800hz.mp3';

const beep = new Audio(soundSignal)


class SignalSwitch extends Component {
  constructor(props) {
    super(props);
      this.state = {
        switchOn: false
      }
    this.startSound = this.handleMouseDown.bind(this);
    this.stopSound = this.handleMouseUp.bind(this);
  }

  handleMouseDown() {
    this.setState(
      { switchOn: true },
      () => console.log(this.state)
    );
    beep.play();
  };

  handleMouseUp() {
    this.setState(
      { switchOn: false},
      () => console.log(this.state)
    )
    beep.pause();
    beep.currentTime = 0;
  };

  render() {
    return (
      <div className="buttonContainer">
        <button className="switchButton" onMouseDown={this.startSound} onMouseUp={this.stopSound}></button>
      </div>
    )
  }
};

export default SignalSwitch;