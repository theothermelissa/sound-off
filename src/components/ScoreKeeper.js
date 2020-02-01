import React, { useState, useRef, useCallback, useEffect, useMemo, useContext } from 'react';
// import Timer from './Timer';
import alphabet from '../assets/codeTranslationKey';
import signalElements from '../assets/signalElements';
import CreateMessage from './CreateMessage';
import { GameContext } from "./GameMaster";

const ScoreKeeper = () => {
  const context = useContext(GameContext);
  const dispatch = context.gameDispatch;
  const userSubmittedMessage = context.gameState.userSubmittedMessage;
  const signalStartTimes = context.gameState.signalStartTimes;
  const signalEndTimes = context.gameState.signalEndTimes;
  const totalErrors = context.gameState.totalErrors;
  const listOfMessageCharacters = userSubmittedMessage.toLowerCase().split("");
  const messageLength = listOfMessageCharacters.length;
  let entireSequence = [];

  const durationOfTransmission = () => {
    const timeStart = signalStartTimes[0];
    const timeEnd = signalEndTimes[signalEndTimes.length - 1];
    return (timeEnd - timeStart)/1000;
  }

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
    return total;
  };

  const speedBonus = () => {
    const ratio = targetDuration()/durationOfTransmission();
    return Math.round(ratio * 1000);
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
    return Math.round((entireSequence.length + numberOfCodeSignalChanges())/2);
  };

  const accuracyScore = Math.round((messageLength - totalErrors) / messageLength * 100);

  const totalScore = accuracyScore + speedBonus();

  const handleClose = () => {
    dispatch({
      type: "resetMessage",
      payload: "Play again",
    })
  };

  return (
    <div className="scoreCard">
      <div className="scoreCard-main">
        <div className="score">Way to go!</div>
        <div className="score">Total Score: {totalScore}</div>
        <div className="score">Accuracy: {accuracyScore}%</div>
        <div className="score">Speed bonus: {speedBonus()} points</div>
        <div className="score">Message difficulty: {messageDifficulty()}%</div>
        <CreateMessage />
        {/* <button className="modal-close" onClick={handleClose}>Dismiss</button> */}
      </div>
    </div>
  )
}


export default ScoreKeeper;