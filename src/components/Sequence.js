import React, { useState, useEffect } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const Sequence = ({ char, activeCharacterIndex, lastSignalReceived, position, completeSequence, resetLastSignal, promptIsComplete }) => {
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [sequenceIsComplete, setSequenceIsComplete] = useState(false);

useEffect(() => {
  let newIndex = currentSignalIndex +1;
  if (lastSignalReceived) {
    if (position === activeCharacterIndex) {
      if (newIndex < totalSignalsInChar) {
      setCurrentSignalIndex(newIndex);
      resetLastSignal();
    } else {
      setSequenceIsComplete(true);
      setCurrentSignalIndex(0);
      completeSequence(currentSignalIndex)};
      resetLastSignal();
    }
  }
  }, [lastSignalReceived]);

  // const checkSignal () => 

  const morseElementSequence = alphabet[char.toLowerCase()]["sequence"];
  const totalSignalsInChar = morseElementSequence.length;

  const isComplete = (index) => (index < currentSignalIndex) || sequenceIsComplete || promptIsComplete;

  return (
    morseElementSequence.map((codeSignal, index) => {
      console.log("codeSignal: ", codeSignal)
      console.log("index: ", index)
      return (
        <div
          className={`${codeSignal.id} ${(isComplete(index)) ? 'completed' : ''}`}
          key={char + codeSignal.id + index} />
      )
    })
    )
};
  
  export default Sequence;
