import React, { useState, useEffect } from 'react';
import '../App.css';

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
  logError,
}) => {
  const isComplete = (elementIndex < activeSignalIndex) || sequenceIsComplete || promptIsComplete;
  const currentClassName = (isComplete) ? elementName + " " + "completedCodeSignal" : elementName;

  useEffect(() => {
    if (lastSignalReceived) {
      if (characterPosition === activeCharacterIndex && elementIndex === activeSignalIndex) {
        if (lastSignalReceived === elementName) {
          completeCodeSignal(elementIndex);
          resetLastSignal();
        } else {
          logError();
          resetLastSignal();
        }
      }
    }
  }, [lastSignalReceived]);

  // useEffect(() => {
  //   if (lastSignalReceived && characterPosition === activeCharacterIndex && elementIndex === activeSignalIndex && lastSignalReceived === elementName) {
  //     completeCodeSignal(elementIndex);
  //   } else {
  //     resetLastSignal();
  //   }
  // }, [lastSignalReceived]);

  return (
    <div className={currentClassName}></div>
  );

};

export default CodeSignal;