import React, { Component } from 'react';
import '../App.css';
import shortBeep from '../shortBeep.mp3';
// import UIfx from 'uifx';

// const beep = new UIfx(
//   shortBeep,
//   {
//     volume: 0.4,
//     throttleMs: 100
//   }
// );

const beep = new Audio(shortBeep)
const start = () => {
  beep.play()
}

class Button extends Component {
  constructor(props) {
    super(props);
      this.state = {
        buttonPressed: false
      }
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  onMouseDown() {
    this.setState({ buttonPressed: true })
    alert("Good job!");
  };
  onMouseUp() {
    this.setState({ buttonPressed: false})
  };

  render() {
    return (
      <div className="buttonContainer">
        {/* <div className="switchButton" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></div> */}
        <button onClick={start}>Let's Beep</button>
      </div>
    )
  }
};

export default Button;