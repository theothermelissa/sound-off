import React from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'

const PromptField = (props) => {
  let msg = thingsToSay[props.jokeIndex]["call"].split("");
  return msg.map((letter, index) => {
    return <Prompt char={letter} charIndex={index} charLastComplete={props.charLastComplete} elementLastComplete={props.elementLastComplete} key={letter+index}/>
  })
};


export default PromptField;