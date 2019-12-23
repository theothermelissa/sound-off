import React, { Component } from 'react';
import '../App.css';

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
        <div className="switchButton" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></div>
      </div>
    )
  }
};

export default Button;