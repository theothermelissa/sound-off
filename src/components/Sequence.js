import React, { useState } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const Sequence = ({ char, position, activeCharacterIndex, completeSequence, totalCharacters }) => {
  console.log("Postion given to Sequence: ", position)
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const morseElementSequence = alphabet[char.toLowerCase()]["sequence"];
  const totalSignalsInChar = morseElementSequence.length;

  const clickButton = () => {
    console.log("The ", currentSignalIndex, " button has been clicked.")
    let newIndex = currentSignalIndex +1;
    if (position === activeCharacterIndex) {
      if (newIndex < totalSignalsInChar) {
      setCurrentSignalIndex(newIndex);
      console.log("New active signal index: ", newIndex)
      } else {
        setCurrentSignalIndex(0);
        completeSequence()};
        console.log("New active charater index: ", activeCharacterIndex)
      }
    }

  const isComplete = (index) => (index < currentSignalIndex) || (position < activeCharacterIndex);

  return (
    morseElementSequence.map((codeSignal, index) => {
      return (
        <div className={`${codeSignal.id} ${isComplete(index) ? 'completed' : ''}`} key={char + codeSignal.id + index} onClick={clickButton} />
      )
    })
  )
};
  
  export default Sequence;
