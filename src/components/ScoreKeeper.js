import React, { useState, useRef, useEffect, useMemo } from 'react';
// import Timer from './Timer';
import alphabet from '../assets/codeTranslationKey';

const ScoreKeeper = (props) => {
  const { 
    signalIsMatch, //whether signal was a match; boolean
    userSubmittedMessage, //entire message, string
    isComplete, //whether message is completed; boolean
    durationOfTransmission, //how long the user took to complete the message
  } = props;

  const [runningErrorCount, setRunningErrorCount] = useState(0); //running tally of errors
  const [totalErrorCount, setTotalErrorCount] = useState(0); //final number of errors

  const messageLength = userSubmittedMessage.length;
  const listOfMessageCharacters = userSubmittedMessage.split("");
  const targetMessageSpeed = (characterList, translationKey) => {
    return characterList.map((character)=> {
      return translationKey[character]["sequence"].minDuration;
    }).reduce((sumDuration, thisDuration) => {
      return sumDuration + thisDuration;
    })
  };

  const numberOfCodeSignalChanges = (elementSequence) => {
    return elementSequence.reduce((sumChanges, thisElement, index)=> {
      const nextElement = elementSequence[index + 1];
      if (thisElement !== nextElement) {
        if (nextElement === undefined) {
          return sumChanges;
        } else {
          return sumChanges + 1;
        }
      } else {
        return sumChanges;
      }
    }, 0)
  };
  const characterComplexity = (character) => {
    return alphabet[character]["sequence"].length + numberOfCodeSignalChanges(character)
  }
  const messageDifficulty = messageLength + listOfMessageCharacters.reduce((totalComplexity, thisCharacter) => totalComplexity + characterComplexity(thisCharacter));
  
  const speedScore = 100 - durationOfTransmission - targetMessageSpeed;
  const accuracyScore = runningErrorCount / messageLength * 100;
  const totalScore = accuracyScore + speedScore;

  let somethingToRemember = `
  GM: "dot" received, it [was] a match, begun at [this time] and completed at [this time]. We are active, and the message is [thisMessage]
  SK: (automatically) run timer
  Timer: Starting timer and recording start time.
  SK: Signal received. It was a match, so I do not record an error.
  GM: "signal" received, it [was not] a match, begun at [this time] and completed at [this time]. We are active, and the message is [thisMessage]
  SK: Signal received. Signal was not a match, so I record an error.
  GM: "signal" received, it [was] a match, begun at [this time] and completed at [this time]. We are complete.
  SK: (automatically) stop timer
  Timer: I stop the timer. The message took [messageDuration].
  SK: Signal received. Signal was a match, so I do not record an error.
  SK: Message duration received. This message was a level [messageDifficulty]. The user's accuracy was [accuracyScore] and they earned a speed bonus of [speedBonus]. The user's score was [totalScore].
  `

  useEffect(() => {
    const newCount = runningErrorCount + 1;
    const logError = () => setRunningErrorCount(newCount);
    if (isComplete) {
      if (!signalIsMatch) {
        logError();
        setTotalErrorCount(newCount);
      } else {
        setTotalErrorCount(runningErrorCount)
      };
    };
    if (!signalIsMatch) {
      logError();
    };
  }, [isComplete, signalIsMatch, runningErrorCount, totalErrorCount]);

  return (
    <div className="scoreCard">
      {/* <Timer runTimer={runTimer} /> */}
      <div className="difficulty">Difficulty: {messageDifficulty}</div>
      <div className="accuracy">Accuracy: {accuracyScore}</div>
      <div className="speed">Speed: {speedScore}</div>
      <div className="totalScore">Total score: {totalScore}</div>
    </div>
  )
}


export default ScoreKeeper;