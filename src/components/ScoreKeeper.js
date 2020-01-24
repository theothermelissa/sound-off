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

  const messageLength = userSubmittedMessage.length;
  const listOfMessageCharacters = userSubmittedMessage.split("");

  // const list = ["dot", "dash", "dot", "dot", "dash", "dash", "dash"];

  const targetSpeed = () => {
    //question : should this be a setting, or should this be calculated?
    //if calculated: map over each character in listOfMessageCharacters; total the minDuration of every signal element in every char's sequence
  }

  const findChanges = (sequence) => {
    return sequence.reduce((sumChanges, thisElement, index)=> {
      const nextElement = sequence[index + 1];
      console.log("Sum Changes: ", sumChanges);
      console.log("This Element: ", thisElement);
      console.log("thisElement !== nextElement", thisElement !== nextElement)
      console.log("nextElement === undefined", nextElement === undefined)
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
  }

  // const calculateCharacterComplexity = (character) => {
  //   //character.sequence.length + numberOfTimesSignalTypeChanges
  //   alphabet[character][sequence].length + numberOfTimesSignalTypeChanges(character))
  //   })
  // }

  const calculateMessageDifficulty = () => {
    //length * average character complexity"
  }

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