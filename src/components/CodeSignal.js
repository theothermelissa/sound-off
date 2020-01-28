import React, { useState, useEffect } from 'react';
import '../App.css';

const CodeSignal = ({ 
  elementName,
  elementIndex,
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
          // resetLastSignal();
          }
      }
    }
  }, [lastSignalReceived]);

  return (
    <div className={currentClassName}></div>
  );

};

export default CodeSignal;