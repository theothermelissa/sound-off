import React from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';
import signalElements from '../assets/signalElements';

// const TranslateToMorse = ({ activeElementIndex, char, charStatus }) => {
//   return alphabet[char.toLowerCase()]["sequence"].map((element, index) => { 
//     return (
//       <div 
//         className={generateClassName(element.id, checkStatus(index, activeElementIndex), charStatus)} 
//         key={element.id + char + index}>
//       </div>
//     )
//   })
// };

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

const Sequence = ({ currentClassName }) => {
  return (
        <div className={currentClassName}/>
  )
};

export default Sequence;