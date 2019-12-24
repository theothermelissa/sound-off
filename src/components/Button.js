import React, { Component } from 'react';
import '../App.css';
import longBeep from '../800hz.mp3';

const beep = new Audio(longBeep)


class Button extends Component {
  constructor(props) {
    super(props);
      this.state = {
        buttonPressed: false
      }
    this.startSound = this.handleMouseDown.bind(this);
    this.stopSound = this.handleMouseUp.bind(this);
  }

  handleMouseDown() {
    this.setState(
      { buttonPressed: true },
      () => console.log(this.state)
    );
    beep.play();
  };

  handleMouseUp() {
    this.setState(
      { buttonPressed: false},
      () => console.log(this.state)
    )
    beep.pause();
    beep.currentTime = 0;
  };

  render() {
    return (
      <div className="buttonContainer">
        <div className="switchButton" onMouseDown={this.startSound} onMouseUp={this.stopSound}></div>
      </div>
    )
  }
};

export default Button;