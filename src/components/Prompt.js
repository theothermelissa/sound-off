import React, { Component } from 'react';
import codeTranslationKey from '../assets/codeTranslationKey';
import '../App.css';

// const alphaPrompt = (props) => {
//   return <h1>it's a {props.thing}</h1>;
// };



function Prompt(props) {
  return (
    <div className="promptContainer">
      <div className="aPrompt">It's an AlphaPrompt</div>
      <div className="mPrompt">It's a MorsePrompt</div>
    </div>)
}

export default Prompt;