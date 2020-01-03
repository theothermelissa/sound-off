import React, { Component } from 'react';
import Prompt from './Prompt';
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
        <Prompt />
        </div>
      </div>
    )
  }
};

export default PromptField;