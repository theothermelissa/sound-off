import React, { Component } from 'react';
import '../App.css';

class Prompt extends Component {
  constructor(props) {
    super(props);
      this.state = {
        index: 0,
        current: false,
        complete: false,
      }
  }

  render() {
    return (
      <div className="promptContainer">
      </div>
    )
  }
};

export default Prompt;