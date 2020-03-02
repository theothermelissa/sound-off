import React, { useState, useContext } from 'react';
import CanvasMaker from './CanvasMaker';
import DownloadLink from './DownloadLink';
import { GameContext } from './GameMaster';

const SendableMessage = () => {
  const [gifURL, setGifURL] = useState('');

  const recordURL = (data) => {
    setGifURL(data);
  };

  const {
    gameState: {
      userSubmittedMessage,
    },
  } = useContext(GameContext);

  return (
    <div className="modal">
      <div className="sendableMessage-main">
        <CanvasMaker recordURL={recordURL} message={userSubmittedMessage} />
        <DownloadLink source={gifURL} buttonText="download" fileName="MorseMessage" />
      </div>
    </div>
  );
};

export default SendableMessage;
