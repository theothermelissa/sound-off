import React from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const AlphaPrompt = ({ char }) => {
  return (
  <div className="aPrompt">{char}</div>
  )};

const TranslateToMorse = ({ char }) => {
  console.log("char: ", char);
  return alphabet[char]["sequence"].map(({ id }, index) => { 
    return <div className={id} key={id + index}></div>
  })
};

const MorsePrompt = ({ char }) => {
  return (
    <div className="morsePromptContainer">
      <TranslateToMorse className="mPropmt" char={char}/>
    </div>
  )
};

function Prompt(props) {
  return (
    <div className="promptContainer">
      <AlphaPrompt className="aPrompt" char={props.char} />
      <MorsePrompt char={props.char}/>
    </div>
  )
};

export default Prompt;