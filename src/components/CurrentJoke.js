import React, { Component } from 'react';
import thingsToSay from '../assets/thingsToSay.js';
import '../App.css';

const callText = (thing) => thingsToSay[thing].call;
const responseText = (msg) => thingsToSay[msg].response;
// const randomStatement = () => Math.floor(Math.random() * thingsToSay.length)

class CurrentJoke extends Component {
constructor(props) {
    super(props);
      this.state = {
        statement: 1,
      }
  }

  render() {
    // const setStatement = () => {
    //   this.setState({statement: randomStatement()});
    // }
    return (
      <div className="statementContainer">
        <div className="potato" {...this.state} >
          {callText(this.state.statement)}
        </div>
      </div>
    )
  }
};

export default CurrentJoke;