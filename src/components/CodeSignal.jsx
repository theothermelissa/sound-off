import React, { useEffect, useContext, useCallback } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { GameContext } from './GameMaster';

const CodeSignal = ({
  elementName,
  elementIndex,
  characterPosition,
  activeSignalIndex,
  activeCharacterIndex,
  completeCodeSignal,
  promptIsComplete,
}) => {
  const { gameDispatch, gameState: { lastSignalReceived } } = useContext(GameContext);
  const isActive = characterPosition === activeCharacterIndex && elementIndex === activeSignalIndex;
  const isComplete = elementIndex < activeSignalIndex || promptIsComplete;
  const currentClassName = (isComplete) ? `${elementName} completedCodeSignal` : elementName;

  const handleNewSignal = useCallback(() => {
    if (!isComplete) {
      if (isActive) {
        if (lastSignalReceived === elementName) {
          completeCodeSignal(elementIndex);
        } else if ((lastSignalReceived === 'dot' || lastSignalReceived === 'dash') && lastSignalReceived !== 'invalidSignal') {
          gameDispatch({
            type: 'error',
          });
        }
      }
    }
  }, [
    isComplete,
    isActive,
    lastSignalReceived,
  ]);

  useEffect(() => {
    handleNewSignal(lastSignalReceived);
  }, [handleNewSignal, lastSignalReceived]);

  return (
    <div className={currentClassName} />
  );
};

CodeSignal.propTypes = {
  activeCharacterIndex: PropTypes.number.isRequired,
  activeSignalIndex: PropTypes.number.isRequired,
  characterPosition: PropTypes.number.isRequired,
  completeCodeSignal: PropTypes.func.isRequired,
  elementIndex: PropTypes.number.isRequired,
  elementName: PropTypes.string.isRequired,
  promptIsComplete: PropTypes.bool.isRequired,
};

export default CodeSignal;
