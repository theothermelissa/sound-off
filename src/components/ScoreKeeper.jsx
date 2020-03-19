import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import alphabet from '../assets/codeTranslationKey';
import CreateMessage from './CreateMessage';
import { GameContext } from './GameMaster';
import affirmations from '../assets/affirmations';

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

  const handleComplete = useCallback(() => {
    if (isComplete) {
      const accuracy = ((sequenceLength - totalErrors) / sequenceLength) * 100;
      const transmissionSpeed = durationOfTransmission();
      const bonus = (speedTarget / transmissionSpeed);
      const total = accuracy + bonus;
      setAccuracyScore(Math.round(accuracy));
      setSpeedBonus(Math.round(bonus));
      setTotalScore(Math.round(total));
    }
  });

  useEffect(() => {
    handleComplete();
  }, [isComplete]);

  const randomAffirmation = () => (
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  return (
    <div className="modal">
      <div className="scoreCard-main">
        <div className="score-secondary">{randomAffirmation()}</div>
        <div className="score-secondary">
          Accuracy:
          {' '}
          {accuracyScore}
          %
        </div>
        {!!speedBonus && (
        <div className="score-secondary">
          {`Speed bonus: ${speedBonus}`}
        </div>
        )}
        <div className="score-secondary">
          {`Mesage difficulty: ${difficultyScore}%`}
        </div>
        {!!totalScore && (
        <div className="score-main">
          {`Score: ${totalScore}`}
        </div>
        )}
        <CreateMessage />
      </div>
    </div>
  );
};


export default ScoreKeeper;
