import React, { Component } from 'react';
import '../App.css';
import PromptField from './PromptField';
import SignalSwitch from './SignalSwitch';
import thingsToSay from '../assets/thingsToSay';
import alphabet from '../assets/codeTranslationKey.js';

class GameMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeJokeIndex: 0,
      activeCharIndex: 0,
      activeElementIndex: 0,
      timeStart: 0,
      test: 0,
    };
    this.completeElement = this.completeElement.bind(this);
  };

  
  // saveCurrentStartTime = (pressEvent) => {
  //   let start = pressEvent.timeStamp
  //   this.setState({timeStart: start})
  //   return start;
  // };
  
  // saveCurrentEndTime = (releaseEvent) => {
  //   let end = releaseEvent.timeStamp
  //   // this.setState({timeEnd: end});
  //   let totalTime = (end - this.state.timeStart)/1000;
  //   console.log("Total time: ", totalTime)
  //   return totalTime;
  // };
  
  checkSignal = (minDuration, totalTime, maxDuration) => {
    if (minDuration <= totalTime <= maxDuration) {
      this.setState ({ elementStatus: "Complete" });
    } else {
      return null
    }
  };
  
  completeElement = (currentElementIndex, elementsLength, currentCharIndex, msgLength) => {
    if (currentCharIndex > msgLength) {
      this.setState ({
        // activeJokeIndex: this.activeJokeIndex + 1,
        // activeCharIndex: 0,
        // activeElementIndex: 0,
        // timeStart: 0,
        test: "Message complete",
      });
      console.log("test: ", this.state.test);
    } else if (currentElementIndex > elementsLength) {
      this.setState({
        activeCharIndex: this.state.activeCharIndex + 1,
        activeElementIndex: 0,
        test: "Prompt Complete",
      });
      console.log("test: ", this.state.test)
    } else {
      this.setState({
        activeElementIndex: this.state.activeElementIndex + 1,
        test: "Element Complete",
      });
      console.log("activeElementIndex: ", this.state.activeElementIndex)
      console.log("test: ", this.state.test)
    }
  };

  render() {
    let activeMessageLength = thingsToSay[this.state.activeJokeIndex]["call"].length;
    let activeChar = thingsToSay[this.state.activeJokeIndex]["call"][this.state.activeCharIndex];
    let activeElementsLength = alphabet[activeChar.toLowerCase()]["sequence"].length;

    return (
      <div className="game">
        <div className="promptField">
          <PromptField 
            jokeIndex={this.state.activeJokeIndex}
            activeCharIndex={this.state.activeCharIndex}
            activeElementIndex={this.state.activeElementIndex} 
            activeMessageLength={activeMessageLength}
          />
        </div>
          <SignalSwitch 
            activeElementIndex={this.state.activeElementIndex}
            activeCharIndex={this.state.activeCharIndex}
            activeMessageLength={activeMessageLength}
            activeElementsLength={activeElementsLength}
            completeElement={this.completeElement}
            completeChar={this.completeChar}
            completeMsg={this.completeMsg}
            startTimer={this.saveCurrentStartTime}
            stopTimer={this.saveCurrentEndTime}
          />
      </div>
    )
  }
};

export default GameMaster;