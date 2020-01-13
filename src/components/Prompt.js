import React, { useState } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

// const checkStatus = (currentIndex, activeIndex) => {
//   let status = (currentIndex < activeIndex) ? "Complete" : ""
//   return status;
// }

// function greeting(person) {
//   var name = person ? person.name : "stranger";
//   return "Howdy, " + name;
// }


const Prompt = ({ char, activeLetterIndex, lastSignalReceived, position, completeSignal }) => {
  // const activeStatus = 
  const [status, setStatus] = useState(0);

  const updateStatus = () => {
    let newStatus = status + 2;
    console.log("New Status: ", newStatus);
    if (activeLetterIndex === position) {
      if (newStatus > 5) {
        completeSignal();
        setStatus(0);
      } else {
        setStatus(status + 2);
      }
    };
  };
  // (newStatus > 5 && isActive === true) ? completeSignal() : setStatus(status + 2);
  // const updateIsActive = () => {
  //   if (position === activeLetterIndex) {
  //     setIsActive(true);
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <div className="promptContainer">
      <button char={char} position={position} onClick={() => updateStatus()}>{status}</button>
    </div>
  )
};

export default Prompt;