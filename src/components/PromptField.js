import React from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'

const PromptField = (props) => {
  let msg = thingsToSay[props.index]["call"].split("");
  return msg.map((letter, index) => {
    return <Prompt char={letter} status={props.status} key={letter+index}/>
  })
};


export default PromptField;