import React, { useState, useEffect } from 'react';
import '../App.css';
import { element } from 'prop-types';

// element={codeSignal.id}
// totalSignalsInChar={totalSignalsInChar}
// key={char + codeSignal.id + index}
// characterPosition={position}
// activeSignalIndex={currentSignalIndex}
// activeCharacterIndex={activeCharacterIndex}
// lastSignalReceived={lastSignalReceived}
// sequenceIsComplete={sequenceIsComplete}
// completeSequence={completeSequence}
// resetLastSignal={resetLastSignal}
// promptIsComplete={promptIsComplete}

const CodeSignal = ({ 
  element,
  elementName,
  elementIndex,
  totalSignalsInChar,
  characterPosition,
  activeSignalIndex,
  activeCharacterIndex,
  lastSignalReceived,
  sequenceIsComplete,
  completeCodeSignal,
  resetLastSignal,
  promptIsComplete,
}) => {
  const isComplete = (elementIndex < activeSignalIndex) || sequenceIsComplete || promptIsComplete;
  const currentClassName = (isComplete) ? elementName + " " + "completed" : elementName;

  // const completeSpaces = () => {
  //   if (elementName === "space" || elementName === "linebreak") {
  //     console.log("We'll give you the space for free. ");
  //     completeCodeSignal(elementIndex);
  // };

  // completeSpaces();

  useEffect(() => {
    if (lastSignalReceived && characterPosition === activeCharacterIndex && elementIndex === activeSignalIndex && lastSignalReceived === elementName) {
      console.log("That's the right signal!");
      completeCodeSignal(elementIndex);
    } else {
      resetLastSignal();
    }
  }, [lastSignalReceived]);

  // useEffect(() => {
  //   let newIndex = currentSignalIndex +1;
  //   if (lastSignalReceived) {
  //     if (position === activeCharacterIndex) {
  //       if (newIndex < totalSignalsInChar) {
  //       setCurrentSignalIndex(newIndex);
  //       resetLastSignal();
  //     } else {
  //       setSequenceIsComplete(true);
  //       setCurrentSignalIndex(0);
  //       completeSequence(currentSignalIndex)};
  //       resetLastSignal();
  //     }
  //   }
  //   }, [lastSignalReceived]);


  return (
    <div className={currentClassName}></div>
  );

};

export default CodeSignal;