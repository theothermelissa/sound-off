import React, { useContext } from 'react';
import alphabet from '../assets/codeTranslationKey';
import CreateMessage from './CreateMessage';
import { GameContext } from './GameMaster';

const ScoreKeeper = () => {
  const {
    gameState: {
      userSubmittedMessage, signalStartTimes, signalEndTimes, totalErrors,
    },
  } = useContext(GameContext);
  const listOfMessageCharacters = userSubmittedMessage.toLowerCase().split('');
  const messageLength = listOfMessageCharacters.length;
  const entireSequence = [];

  const durationOfTransmission = () => {
    const timeStart = signalStartTimes[0];
    const timeEnd = signalEndTimes[signalEndTimes.length - 1];
    return (timeEnd - timeStart) / 1000;
  };

  const targetDuration = () => {
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
    return total;
  };

  const speedBonus = () => {
    const ratio = targetDuration() / durationOfTransmission();
    return Math.round(ratio * 1000);
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

  const messageDifficulty = () => (
    Math.round((entireSequence.length + numberOfCodeSignalChanges()) / 2)
  );

  const accuracyScore = () => (
    Math.round(((entireSequence.length - totalErrors) / entireSequence.length) * 100)
  );

  const totalScore = () => (accuracyScore() + speedBonus());
  console.log('accuracyscore(): ', accuracyScore());
  console.log('speedBonus(): ', speedBonus());

  return (
    <div className="scoreCard">
      <div className="scoreCard-main">
        <div className="score">Way to go!</div>
        <div className="score">
          {'Total Score: '}
          {totalScore()}
        </div>
        <div className="score">
          {'Accuracy: '}
          {accuracyScore()}
          %
        </div>
        <div className="score">
          {'Speed bonus: '}
          {speedBonus()}
          {' '}
          points
        </div>
        <div className="score">
          {'Message difficulty: '}
          {messageDifficulty()}
          %
        </div>
        <CreateMessage />
      </div>
    </div>
  );
};


export default ScoreKeeper;
