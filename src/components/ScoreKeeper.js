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
  const listOfMessageCharacters = userSubmittedMessage.toLowerCase().split("");
  const messageLength = listOfMessageCharacters.length;
  let entireSequence = [];
  
  const [difficulty, setDifficulty] = useState(0);
  const [targetLength, setTargetLength] = useState(0);
  
  const durationOfTransmission = () => {
    const timeStart = signalStartTimes[0];
    const timeEnd = signalEndTimes[signalEndTimes.length - 1];
    return timeEnd - timeStart;
  }
  // const speedScore = 100 - durationOfTransmission - targetMessageSpeed;
  
  const targetDuration = () => {
    let total = 0;
    for (let x=0; x < messageLength; x++) {
      if (alphabet[listOfMessageCharacters[x]]) {
        let charCodeSequence = alphabet[listOfMessageCharacters[x]]["sequence"];
        for (let y=0; y < charCodeSequence.length; y++) {
          entireSequence.push(charCodeSequence[y]["id"])
          let signalLength = 
            (charCodeSequence[y]["minDuration"] === 0)
              ? .01
              : charCodeSequence[y]["minDuration"]
          total += signalLength;
        }
      } else {
          continue
        }
    }
    // setTargetLength(total);
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

  const messageDifficulty = () => {
    // setDifficulty(entireSequence.length + numberOfCodeSignalChanges());
    return entireSequence.length + numberOfCodeSignalChanges();
  };


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
      <div>Target speed: {targetDuration()}</div>
      <div>Signal changes: {numberOfCodeSignalChanges()}</div>
      <div>Message difficulty: {messageDifficulty()}</div>
      <div>Duration of transmission: {durationOfTransmission()}</div>
      {/* <div className="difficulty">Difficulty: {messageDifficulty}</div> */}
      {/* <div className="accuracy">Accuracy: {accuracyScore}</div> */}
      {/* <div className="speed">Speed: {speedScore}</div> */}
      {/* <div className="totalScore">Total score: {totalScore}</div> */}
    </div>
  )
}


export default ScoreKeeper;