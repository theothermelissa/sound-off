import React, { useState, useEffect, useContext, useCallback } from 'react';
import '../App.css';
import { GameContext } from "./GameMaster";

const CodeSignal = ({ 
  elementName,
  elementIndex,
  characterPosition,
  activeSignalIndex,
  activeCharacterIndex,
  sequenceIsComplete,
  completeCodeSignal,
  promptIsComplete,
}) => {
  const context = useContext(GameContext);
  const lastSignalReceived = context.gameState.lastSignalReceived;
  const dispatch = context.gameDispatch;
  const isActive = characterPosition === activeCharacterIndex && elementIndex === activeSignalIndex;
  const isComplete = (elementIndex < activeSignalIndex) || promptIsComplete;
  const currentClassName = (isComplete) ? elementName + " completedCodeSignal" : elementName;

const handleNewSignal = useCallback(() => {
  if (isActive) {
    if (lastSignalReceived === elementName) { 
      completeCodeSignal(elementIndex);
    } else if ((lastSignalReceived === "dot" || lastSignalReceived === "dash")){
      dispatch({
        type: "error"
      })
    }
  }
}, [
  isActive,
  lastSignalReceived,
  elementName,
  completeCodeSignal,
  elementIndex,
  dispatch
  ])

  useEffect(() => {
    handleNewSignal(lastSignalReceived)
  }, [handleNewSignal, lastSignalReceived]);

  // useEffect(() => {
  //   if ( isActiveCharacterPosition && isActiveSignalIndex ) {
  //     console.log("is the signal a match? ", lastSignalReceived === elementName)
  //     // if (lastSignalReceived === elementName) {
  //     //   completeCodeSignal(elementIndex);
  //     // } else {
  //     //   dispatch({
  //     //     type: "error"
  //     //   })
  //   //     // resetLastSignal();
  //       }
  // }, [lastSignalReceived, signalStartTimes]);

  return (
    <div className={currentClassName}></div>
  );

};

export default CodeSignal;