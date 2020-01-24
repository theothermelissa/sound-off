import React, { useState, useRef, useMemo } from 'react';
import Timer from './Timer';
import alphabet from '../assets/codeTranslationKey';

const ScoreKeeper = (props) => {
  const { 
    lastSignalReceived,
    userSubmittedMessage,
    timerShouldRun,
    transmitElapsedTime,
  } = props;
  
  const [elapsedTime, setElapsedTime] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [signalsReceived, setSignalsReceived] = useState(0);
  const timeFirstSignalReceived = useRef(0);
  const timeLastSignalReceived = useRef(0);
  const timerIsRunning = useMemo(() => (timerShouldRun === true) ? true : false, [timerShouldRun])
  
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

  const messageDuration = (start, end) => -(end - start)/1000;
  const speedBonus = (actual, target) => 100 - actual - target;
  const accuracy = (errors, length) => errors / length * 100;
  const finalScore = accuracy(errorCount, messageLength) + speedBonus(messageDuration(timeFirstSignalReceived, timeLastSignalReceived));

  const startTimer = () => {
    console.log("Record transmissionStartTime")
    
  }

  const stopTimer = () => {
    console.log("Record transmissionEndTime")
  }

  const recordError = () => {
    console.log("Error recorded // increment error count")
  }

  const onCompletion = () => {
    console.log("We're all done. Here's the message difficulty, your accuracy, your speed bonus, and your total score.")
  };

  return (
    <div>
      <Timer timerShouldRun={timerShouldRun} />
      <div>{errorCount}</div>
    </div>
  )
}


export default ScoreKeeper;