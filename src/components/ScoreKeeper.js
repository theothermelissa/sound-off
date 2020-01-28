import React, { useState, useRef, useEffect, useMemo } from 'react';
// import Timer from './Timer';
import alphabet from '../assets/codeTranslationKey';

const ScoreKeeper = (props) => {
  const { 
    // userSubmittedMessage, //entire message, string
    isError, //whether signal was a match; boolean
    isComplete, //whether message is completed; boolean
    isBegun, //whether message is begun; boolean
    signalStartTime, //to compare?
    // durationOfTransmission, //how long the user took to complete the message
  } = props;

  const [runningErrorCount, setRunningErrorCount] = useState(0); //running tally of errors
  const [isActive, setIsActive] = useState(false);

  const tempErrorCount = useRef(0);

  // const increaseCount = () => runningErrorCount + 1;
  // const newCount = useMemo(() => increaseCount());

  useEffect(() => {
    isBegun ? setIsActive(true) : setIsActive(false)
  }, [isBegun]);

  useEffect(() => {
    console.log("Should be logging error.")
    const logError = () => setRunningErrorCount(x => x + 1);
    if (isError) {
      logError();
    }
  }, [isError])

  console.log("Running Error Count: ", runningErrorCount)
  // const messageLength = userSubmittedMessage.length;
  // const listOfMessageCharacters = userSubmittedMessage.split("");
  // const targetMessageSpeed = (characterList, translationKey) => {
  //   return characterList.map((character)=> {
  //     return translationKey[character]["sequence"].minDuration;
  //   }).reduce((sumDuration, thisDuration) => {
  //     return sumDuration + thisDuration;
  //   })
  // };

  // const numberOfCodeSignalChanges = (elementSequence) => {
  //   console.log("Number of Code Signal Changes called. elementSequence: ", elementSequence);
  //   elementSequence.reduce((sumChanges, thisElement, index)=> {
  //     let nextElement = elementSequence[index + 1];
  //     if (thisElement !== nextElement) {
  //       if (nextElement === undefined) {
  //         return sumChanges;
  //       } else {
  //         return sumChanges + 1;
  //       }
  //     } else {
  //       return sumChanges;
  //     }
  //   }, 0)
  // };

  // const characterComplexity = (character) => {
  //   console.log("Character: ", character);
  //   let signalSequence = alphabet[character]["sequence"];
  //   console.log("Sequence length: ", signalSequence.length);
  //   console.log("Number of signal changes for ", character, ": ", numberOfCodeSignalChanges(signalSequence));
  //   let result = signalSequence.length + numberOfCodeSignalChanges(signalSequence)
  //   console.log("Character Complexity for ", character, ": ", result);
  //   return result;
  // }

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
    <div className="scoreCard">{runningErrorCount}
      {/* <div className="difficulty">Difficulty: {messageDifficulty}</div> */}
      {/* <div className="accuracy">Accuracy: {accuracyScore}</div> */}
      {/* <div className="speed">Speed: {speedScore}</div> */}
      {/* <div className="totalScore">Total score: {totalScore}</div> */}
    </div>
  )
}


export default ScoreKeeper;