import React, { useState } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const Sequence = ({ char, position, activeCharacterIndex, completeSequence, resetLastSignal, promptIsComplete }) => {
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [sequenceIsComplete, setSequenceIsComplete] = useState(false);
  const morseElementSequence = alphabet[char.toLowerCase()]["sequence"];
  const totalSignalsInChar = morseElementSequence.length;

  // console.log("Is the ", position, " sequence complete? ", sequenceIsComplete)

  const onCompleteSignal = () => {
    // console.log("The ", currentSignalIndex, " button has been clicked.")
    let newIndex = currentSignalIndex +1;
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

  const isComplete = (index) => (index < currentSignalIndex) || sequenceIsComplete || promptIsComplete;

  return (
    morseElementSequence.map((codeSignal, index) => {
      return (
        <div className={`${codeSignal.id} ${(isComplete(index)) ? 'completed' : ''}`} key={char + codeSignal.id + index} onClick={onCompleteSignal} />
      )
    })
  )
};
  
  export default Sequence;
