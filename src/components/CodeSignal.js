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
}) => {
  const isComplete = (elementIndex < activeSignalIndex) || sequenceIsComplete || promptIsComplete;
  const currentClassName = (isComplete) ? elementName + " " + "completedCodeSignal" : elementName;

  useEffect(() => {
    if (lastSignalReceived && characterPosition === activeCharacterIndex && elementIndex === activeSignalIndex && lastSignalReceived === elementName) {
      completeCodeSignal(elementIndex);
    } else {
      resetLastSignal();
    }
  }, [lastSignalReceived]);

  return (
    <div className={currentClassName}></div>
  );

};

export default CodeSignal;