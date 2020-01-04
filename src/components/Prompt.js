import React from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const AlphaPrompt = ({ char }) => {
  return char;
};

const MorsePrompt = ({ char }) => {
  return alphabet[char]["sequence"].map(({ id }, index) => { 
    return <div className={id} key={id + index}></div>
  })
};

function Prompt(props) {
  return (
    <div>
      <AlphaPrompt char={props.char} />
      <MorsePrompt char={props.char}/>
    </div>
  )
};

export default Prompt;