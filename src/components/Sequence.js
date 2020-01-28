import React, { useState, useEffect } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';
import CodeSignal from './CodeSignal';

const Sequence = ({
  char,
  activeCharacterIndex,
  lastSignalReceived,
  position,
  completeSequence,
  resetLastSignal,
  promptIsComplete,
  logError,
  startTimer,
  isBegun,
  // timerIsRunning
  // trackElapsedTime,
 }) => {
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [sequenceIsComplete, setSequenceIsComplete] = useState(false);

  const morseElementSequence = alphabet[char]["sequence"];
  const totalSignalsInChar = morseElementSequence.length;

  const onCompleteCodeSignal = (index) => {
    let newIndex = index + 1;
    if (newIndex < totalSignalsInChar) {
      setCurrentSignalIndex(newIndex);
    } else {
      setCurrentSignalIndex(0);
      setSequenceIsComplete(true);
      completeSequence();
    }
  };

  useEffect(() => {
    if (!isBegun) {
      setCurrentSignalIndex(0);
      setSequenceIsComplete(false);
    }
  }, [isBegun]);

  return (
    morseElementSequence.map((codeSignal, index) => {
      return (
        <CodeSignal
          element={codeSignal}
          elementName={codeSignal.id}
          elementIndex={index}
          key={char + codeSignal.id + index}
          characterPosition={position}
          activeSignalIndex={currentSignalIndex}
          activeCharacterIndex={activeCharacterIndex}
          lastSignalReceived={lastSignalReceived}
          sequenceIsComplete={sequenceIsComplete}
          completeCodeSignal={onCompleteCodeSignal}
          resetLastSignal={resetLastSignal}
          promptIsComplete={promptIsComplete}
          logError={logError}
          startTimer={startTimer}
          // timerIsRunning={timerIsRunning}
          // trackElapsedTime={trackElapsedTime}
        />
      )
    })
    )
};
  
  export default Sequence;
