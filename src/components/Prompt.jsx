import React, { useState, useEffect, useContext } from 'react';
import Sequence from './Sequence';
import '../App.css';
import { GameContext } from './GameMaster';

const Prompt = ({
  char,
  position,
  activeCharacterIndex,
  completePrompt,
}) => {
  const { gameState: { isBegun } } = useContext(GameContext);
  const [promptIsComplete, setPromptIsComplete] = useState(false);

  const onCompleteSequence = () => {
    setPromptIsComplete(true);
    completePrompt();
  };

  useEffect(() => {
    setPromptIsComplete(false);
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
      {promptIsComplete
        ? <div className={`letter${promptIsComplete ? ' completedText' : ''}`}>{char}</div>
        : null}
      <div className="sequence">
        <Sequence
          char={translatedChar(char)}
          position={position}
          activeCharacterIndex={activeCharacterIndex}
          completeSequence={onCompleteSequence}
          promptIsComplete={promptIsComplete}
        />
      </div>
    </div>
  );
};

export default Prompt;
