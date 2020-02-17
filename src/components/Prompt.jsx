import React, { useState, useEffect, useContext } from 'react';
import Sequence from './Sequence';
import '../App.css';
import { SettingsContext } from '../App';
import { GameContext } from './GameMaster';

const Prompt = ({
  char,
  characterPosition,
  activeCharacterIndex,
  wordPosition,
  activeWordIndex,
  completePrompt,
}) => {
  const { gameState: { isBegun } } = useContext(GameContext);
  const { settingsState: { showLetters } } = useContext(SettingsContext);
  const [promptIsComplete, setPromptIsComplete] = useState(false);


  const onCompleteSequence = () => {
    setPromptIsComplete(true);
    completePrompt();
  };

  useEffect(() => {
    if (!isBegun) {
      setPromptIsComplete(false);
    }
  }, [isBegun]);

  const translatedChar = (letter) => {
    if (letter === ' ') {
      return '&nbsp';
    } if (letter === '   ') {
      return '&br';
    }
    return letter.toLowerCase();
  };

  return (
    <div className="promptContainer">
      {(promptIsComplete || showLetters)
        ? <div className={`letter${promptIsComplete ? ' completedText' : ''}`}>{char}</div>
        : null}
      <div className="sequence">
        <Sequence
          char={translatedChar(char)}
          characterPosition={characterPosition}
          activeCharacterIndex={activeCharacterIndex}
          wordPosition={wordPosition}
          activeWordIndex={activeWordIndex}
          completeSequence={onCompleteSequence}
          promptIsComplete={promptIsComplete}
        />
      </div>
    </div>
  );
};

export default Prompt;
