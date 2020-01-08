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

// char={letter} 
// charIndex={index} 
// activeCharIndex={props.activeCharIndex} 
// activeElementIndex={props.activeElementIndex}

const checkStatus = (currentIndex, activeIndex) => {
  let status = (currentIndex < activeIndex) ? "Complete" : ""
  return status;
}

const TranslateToMorse = ({ activeElementIndex, char, charStatus }) => {
  return alphabet[char.toLowerCase()]["sequence"].map((element, index) => { 
    return (
      <div 
        className={generateClassName(element.id, checkStatus(index, activeElementIndex), charStatus)} 
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
        <TranslateToMorse activeElementIndex={props.activeElementIndex} char={props.char} charStatus={props.charStatus}/>
      </div>
  )
};

function Prompt({ char, currentCharIndex, activeCharIndex, activeElementIndex }) {
  return (
    <div className="promptContainer">
      <AlphaPrompt className="aPrompt" char={char} status={checkStatus(currentCharIndex, activeCharIndex)} />
      <MorsePrompt className="mPrompt" char={char} activeElementIndex={activeElementIndex} charStatus={checkStatus(currentCharIndex, activeCharIndex)}/>
    </div>
  )
};

export default Prompt;