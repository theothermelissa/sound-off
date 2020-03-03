import React, { useState } from 'react';
import CanvasMaker from './CanvasMaker';
import DownloadLink from './DownloadLink';

const SendableMessage = () => {
  const [gifURL, setGifURL] = useState('');

  const setURL = (data) => {
    setGifURL(data);
  };

  return (
    <div className="modal">
      <div className="sendableMessage-main">
        <CanvasMaker setURL={setURL} />
        <DownloadLink source={gifURL} buttonText="download" fileName="MorseMessage" />
      </div>
    </div>
  );
};

export default SendableMessage;
