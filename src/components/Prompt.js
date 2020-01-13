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


const Prompt = ({ char, activeLetterIndex, lastSignalReceived, characterIndex, completeSignal }) => {
  const [status, setStatus] = useState(0);
  const updateStatus = () => {
    let newStatus = status + 2;
    (newStatus > 5) ? completeSignal() : setStatus(status + 2);
  }

  return (
    <div className="promptContainer">
      <button onClick={() => updateStatus()}>{status}</button>
    </div>
  )
};

export default Prompt;