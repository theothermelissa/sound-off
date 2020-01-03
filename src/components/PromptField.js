import React, { Component } from 'react';
import '../App.css';



class PromptField extends Component {
  constructor(props) {
    super(props);
      this.state = {
        aNumber: 1
      }
  }

  render() {
    return (
      <div className="promptContainer">
        <div className="promptName">Say this:</div>
        <div className="promptField">
        <div className="dot"></div>
        <div className="space"></div>
        <div className="dot"></div>
        <div className="space"></div>
        <div className="dot"></div>
        <div className="space"></div>
        <div className="dash"></div>
        <div className="space"></div>
        <div className="dash"></div>
        <div className="space"></div>
        <div className="dash"></div>
        <div className="space"></div>
        <div className="dot"></div>
        <div className="space"></div>
        <div className="dot"></div>
        <div className="space"></div>
        <div className="dot"></div>
        </div>
      </div>
    )
  }
};

export default PromptField;