import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import alphabet from '../assets/codeTranslationKey';
import CreateMessage from './CreateMessage';
import { GameContext } from './GameMaster';

const ScoreKeeper = () => {
  const {
    gameState: {
      userSubmittedMessage,
      signalStartTimes,
      signalEndTimes,
      totalErrors,
      isBegun,
      isComplete,
    },
  } = useContext(GameContext);
  const listOfMessageCharacters = userSubmittedMessage.toLowerCase().split('');
  const messageLength = listOfMessageCharacters.length;
  const entireSequence = [];

  const [speedTarget, setSpeedTarget] = useState(0);
  const [sequenceLength, setSequenceLength] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [difficultyScore, setDifficultyScore] = useState(0);
  const [speedBonus, setSpeedBonus] = useState(0);

  const durationOfTransmission = () => {
    const timeStart = signalStartTimes[0];
    const timeEnd = signalEndTimes[signalEndTimes.length - 1];
    return (timeEnd - timeStart) / 1000;
  };

  const findTargetDuration = () => {
    let total = 0;
    for (let x = 0; x < messageLength; x += 1) {
      if (alphabet[listOfMessageCharacters[x]]) {
        const charCodeSequence = alphabet[listOfMessageCharacters[x]].sequence;
        for (let y = 0; y < charCodeSequence.length; y += 1) {
          entireSequence.push(charCodeSequence[y].id);
          const signalLength = (charCodeSequence[y].minDuration === 0)
            ? 0.01
            : charCodeSequence[y].minDuration;
          total += signalLength;
        }
      }
    }
    setSpeedTarget(total);
    return total;
  };

  const numberOfCodeSignalChanges = () => {
    const total = entireSequence
      .reduce((sumChanges, thisElement, index) => {
        const nextElement = entireSequence[index + 1];
        return (nextElement && thisElement !== nextElement)
          ? (sumChanges + 1)
          : sumChanges;
      }, 0);
    return total;
  };

  const handleBegin = useCallback(() => {
    if (isBegun) {
      const targetSpeed = findTargetDuration();
      const { length } = entireSequence;
      const difficulty = Math.round((entireSequence.length + numberOfCodeSignalChanges()) / 2);
      console.log("targetSpeed: ", targetSpeed);
      console.log("length: ", length);
      console.log("difficulty: ", difficulty);
      setSpeedTarget(targetSpeed);
      setSequenceLength(length);
      setDifficultyScore(difficulty);
    }
  });

  const handleComplete = useCallback(() => {
    console.log("targetSpeed upon completion: ", speedTarget);
    console.log("length upon completion: ", sequenceLength);
    console.log("difficulty upon completion: ", difficultyScore);
    if (isComplete) {
      const accuracy = ((sequenceLength - totalErrors) / sequenceLength) * 100;
      const transmissionSpeed = durationOfTransmission();
      const bonus = (speedTarget / transmissionSpeed) * 1000;
      const total = accuracy + bonus;
      console.log("accuracy upon completion: ", accuracy);
      console.log("transmissionSpeed upon completion: ", transmissionSpeed);
      console.log("speedBonus upon completion: ", bonus);
      console.log("total score upon completion: ", total);
      setAccuracyScore(accuracy);
      setSpeedBonus(Math.round(bonus));
      setTotalScore(total);
    }
  });

  useEffect(() => {
    handleBegin();
  }, [isBegun]);

  useEffect(() => {
    handleComplete();
  }, [isComplete]);

  return (
    <div className="scoreCard">
      <div className="scoreCard-main">
        <div className="score">Way to go!</div>
        <div className="score">
          Total Score:
          {totalScore}
        </div>
        <div className="score">
          Accuracy:
          {accuracyScore}
          %
        </div>
        <div className="score">
          Speed bonus:
          {speedBonus}
          {' '}
          points
        </div>
        <div className="score">
          Message difficulty:
          {difficultyScore}
          %
        </div>
        <CreateMessage />
      </div>
    </div>
  );
};


export default ScoreKeeper;
