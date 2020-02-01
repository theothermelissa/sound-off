import React, { useState, useRef, useCallback, useEffect, useMemo, useContext } from 'react';
// import Timer from './Timer';
import alphabet from '../assets/codeTranslationKey';
import signalElements from '../assets/signalElements';
import { GameContext } from "./GameMaster";

const ScoreKeeper = () => {
  const context = useContext(GameContext);
  const userSubmittedMessage = context.gameState.userSubmittedMessage;
  const signalStartTimes = context.gameState.signalStartTimes;
  const signalEndTimes = context.gameState.signalEndTimes;
  const totalErrors = context.gameState.totalErrors;

  const [difficulty, setDifficulty] = useState(0);
  const [targetLength, setTargetLength] = useState(0);

  const listOfMessageCharacters = userSubmittedMessage.toLowerCase().split("");
  const messageLength = listOfMessageCharacters.length;

  //Loop through each character in listOfMessageCharacters, and
  //find it in the alphabet object, and
  //loop through its "sequence" property array, and
  //sum the minDuration values

  let entireSequence = [];

  const totalDuration = () => {
    let total = 0;
    for (let x=0; x < messageLength; x++) {
      let charCodeSequence = alphabet[listOfMessageCharacters[x]]["sequence"];
      for (let y=0; y < charCodeSequence.length; y++) {
        entireSequence.push(charCodeSequence[y]["id"])
        let signalLength = (charCodeSequence[y]["minDuration"] === 0) ? .01 : charCodeSequence[y]["minDuration"];
        total += signalLength;
      }
    }
    return total;
  };

  const numberOfCodeSignalChanges = () => {
    const total = entireSequence
      .reduce((sumChanges, thisElement, index)=> {
        let nextElement = entireSequence[index + 1];
        return thisElement !== nextElement 
          ? (nextElement === undefined ? sumChanges : sumChanges + 1)
          : sumChanges
      }, 0);
    return total;
  };

  const messageComplexity = () => {
    return entireSequence.length + numberOfCodeSignalChanges()
  };

  // const messageDifficulty = messageLength + listOfMessageCharacters.reduce((totalComplexity, thisCharacter) => totalComplexity + characterComplexity(thisCharacter));
  // const speedScore = 100 - durationOfTransmission - targetMessageSpeed;
  // const accuracyScore = runningErrorCount / messageLength * 100;
  // const totalScore = accuracyScore + speedScore;

  // useEffect(() => {
  //   const newCount = runningErrorCount + 1;
  //   const logError = () => setRunningErrorCount(newCount);
  //   // if (!isBegun) {
  //   //   setRunningErrorCount(0);
  //   // };
  //   if (!isComplete) {
  //     if (isBegun) {
  //       if (!isError) {
  //         console.log("Error logged.")
  //         logError();
  //       }
  //     }
  //   }
  //   if (isComplete) {
  //     if (isError) {
  //       setTotalErrorCount(runningErrorCount);
  //       setTimeout(setRunningErrorCount(0), 200);
  //     } else {
  //       setTotalErrorCount(newCount);
  //       setTimeout(setRunningErrorCount(0), 200);
  //     };
  //     setTimeout(console.log("Message complete. Total error count: ", totalErrorCount), 1000);
  //   } 
  //   console.log("Change detected")
  // }, [isComplete, isError, signalStartTime]);





  return (
    <div className="scoreCard">
      <div>Total errors: {totalErrors}</div>
      <div>Target speed: {totalDuration()}</div>
      <div>Signal changes: {numberOfCodeSignalChanges()}</div>
      <div>Message complexity: {messageComplexity()}</div>
      {/* <div className="difficulty">Difficulty: {messageDifficulty}</div> */}
      {/* <div className="accuracy">Accuracy: {accuracyScore}</div> */}
      {/* <div className="speed">Speed: {speedScore}</div> */}
      {/* <div className="totalScore">Total score: {totalScore}</div> */}
    </div>
  )
}


export default ScoreKeeper;