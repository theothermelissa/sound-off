import React, { useState, useContext } from 'react';
import CanvasMaker from './CanvasMaker';
import { GameContext } from './GameMaster';

const SendableMessage = () => {
  const {
    gameState: {
      userSubmittedMessage,
    },
  } = useContext(GameContext);

  return (
    <div className="modal">
      <div className="sendableMessage-main">
        <CanvasMaker msg={userSubmittedMessage} />
        <button>download</button>
      </div>
    </div>
  );
};

export default SendableMessage;
