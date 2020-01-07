import React, { useState } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const AlphaPrompt = ({ char, status }) => {
  return (
  <div className="aPrompt">{char}</div>
  )};

const TranslateToMorse = (props) => {
  return alphabet[props.char.toLowerCase()]["sequence"].map((element, index) => { 
    console.log("className: ", element.id);
    return (
      <div className={element.id} key={element.id + props.char + index}></div>
    )
  })
};

const MorsePrompt = (props) => {
  return (
      <div className="morsePromptContainer">
        <TranslateToMorse status={props.status} char={props.char}/>
      </div>
  )
};

function Prompt(props) {
  return (
    <div className="promptContainer">
      <AlphaPrompt className="aPrompt" char={props.char} status={props.status} />
      <MorsePrompt className="mPrompt" char={props.char} status={props.status}/>
    </div>
  )
};

export default Prompt;