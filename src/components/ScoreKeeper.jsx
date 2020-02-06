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
      isComplete,
    },
  } = useContext(GameContext);
  const listOfMessageCharacters = userSubmittedMessage.toLowerCase().split('');
  const messageLength = listOfMessageCharacters.length;
  const entireSequence = [];

  const findTargetDuration = (length) => {
    let total = 0;
    for (let x = 0; x < length; x += 1) {
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

  const [speedTarget, setSpeedTarget] = useState(findTargetDuration(messageLength));
  const [sequenceLength, setSequenceLength] = useState(entireSequence.length);
  const [difficultyScore, setDifficultyScore] = useState(
    Math.round((entireSequence.length + numberOfCodeSignalChanges() / 2)),
  );
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [speedBonus, setSpeedBonus] = useState(0);

  const durationOfTransmission = () => {
    const timeStart = signalStartTimes[0];
    const timeEnd = signalEndTimes[signalEndTimes.length - 1];
    return (timeEnd - timeStart) / 1000;
  };

  console.log('targetSpeed upon completion: ', speedTarget);
  console.log('length upon completion: ', sequenceLength);
  console.log('difficulty upon completion: ', difficultyScore);

  const handleComplete = useCallback(() => {
    if (isComplete) {
      const accuracy = ((sequenceLength - totalErrors) / sequenceLength) * 100;
      const transmissionSpeed = durationOfTransmission();
      const bonus = Math.round((speedTarget / transmissionSpeed) * 1000);
      const total = accuracy + bonus;
      console.log('accuracy upon completion: ', accuracy);
      console.log('transmissionSpeed upon completion: ', transmissionSpeed);
      console.log('speedBonus upon completion: ', bonus);
      console.log('total score upon completion: ', total);
      setAccuracyScore(accuracy);
      setSpeedBonus(Math.round(bonus));
      setTotalScore(total);
    }
  });

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
