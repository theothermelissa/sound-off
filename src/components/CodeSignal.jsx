import React, { useEffect, useContext, useCallback } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { GameContext } from './GameMaster';
import { SettingsContext } from '../App';

const CodeSignal = ({
  elementName,
  elementIndex,
  characterPosition,
  activeSignalIndex,
  activeCharacterIndex,
  wordPosition,
  activeWordIndex,
  sequenceIsComplete,
  completeCodeSignal,
  promptIsComplete,
}) => {
  const { gameDispatch, gameState: { lastSignalReceived } } = useContext(GameContext);
  const { settingsState: { showSignals } } = useContext(SettingsContext);
  const isActive = (wordPosition === activeWordIndex)
    && (characterPosition === activeCharacterIndex)
    && (elementIndex === activeSignalIndex);
  const isComplete = elementIndex < activeSignalIndex || promptIsComplete;
  const currentClassName = (isComplete) ? `${elementName} completedCodeSignal` : elementName;

  const handleNewSignal = useCallback((signal) => {
    if (!isComplete) {
      if (isActive) {
        if (signal === elementName) {
          completeCodeSignal(elementIndex);
        } else if ((signal === 'dot' || signal === 'dash') && signal !== 'invalidSignal') {
          gameDispatch({
            type: 'error',
          });
        }
      }
    }
  }, [
    isComplete,
    isActive,
  ]);

  useEffect(() => {
    handleNewSignal(lastSignalReceived);
  }, [handleNewSignal, lastSignalReceived]);

  return (
    showSignals && <div className={currentClassName} />
  );
};

// {(promptIsComplete || showLetters)
//   ? <div className={`letter${promptIsComplete ? ' completedText' : ''}`}>{char}</div>
//   : null}

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
