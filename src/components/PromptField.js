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
      <div>
        <div className="promptName">Say this:</div>
        <div>
        <Prompt char="a"/>
        </div>
      </div>
    )
  }
};

export default PromptField;