import React from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const generateClassName = (item, status, parentStatus) => {
  let name;
  if (parentStatus === "Complete") {
    name = item + "Complete";
    // console.log("item with complete parent: ", name)
  } else if (parentStatus === "Active") {
    name = (status === "Complete") ? item + "Complete" : item
    // console.log("parent is active item: ", name)
    } else {
    name = item;
    // console.log("parent is inactive item: ", name)
  }
  return name;
}

const checkStatus = (currentIndex, indexLastComplete) => {
  let status;
  if (currentIndex < indexLastComplete) {
    status = "Complete";
  } else if (currentIndex === indexLastComplete) {
    status = "Active";
  } else {
    status = ""
  }
  return status;
}

const TranslateToMorse = ({ elementLastComplete, char, charStatus }) => {
  return alphabet[char.toLowerCase()]["sequence"].map((element, index) => { 
    return (
      <div 
        className={generateClassName(element.id, checkStatus(index, elementLastComplete), charStatus)} 
        key={element.id + char + index}>
      </div>
    )
  })
};

const AlphaPrompt = ({ char, status }) => {
  return (
  <div className={generateClassName("aPrompt", status, "Active")}>{char}</div>
  )};

const MorsePrompt = (props) => {
  return (
      <div className="morsePromptContainer">
        <TranslateToMorse elementLastComplete={props.elementLastComplete} char={props.char} charStatus={props.charStatus}/>
      </div>
  )
};

function Prompt({ char, charLastComplete, charIndex, elementLastComplete }) {
  return (
    <div className="promptContainer">
      <AlphaPrompt className="aPrompt" char={char} status={checkStatus(charIndex, charLastComplete)} />
      <MorsePrompt className="mPrompt" char={char} elementLastComplete={elementLastComplete} charStatus={checkStatus(charIndex, charLastComplete)}/>
    </div>
  )
};

export default Prompt;