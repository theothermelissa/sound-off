import React from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'

// jokeIndex={this.state.activeJokeIndex}
// activeCharIndex={this.state.activeCharIndex}
// activeElementIndex={this.state.activeElementIndex}

const PromptField = (props) => {
  let msg = thingsToSay[props.jokeIndex]["call"].split("");
  return msg.map((letter, index) => {
    return <Prompt 
      char={letter} 
      currentCharIndex={index} 
      activeCharIndex={props.activeCharIndex} 
      activeElementIndex={props.activeElementIndex}
      // activeMessageLength={props.activeMessageLength}
      // currentMessageLength={props.currentMessageLength} 
      // currentElementsLength={props.currentElementsLength} 
      // currentElement={props.currentElement} 
      key={letter+index}
    />
  })
};

export default PromptField;
