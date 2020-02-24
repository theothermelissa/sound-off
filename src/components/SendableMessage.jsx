import React, { useState, useContext } from 'react';
// import { saveAs } from 'file-saver';
import CanvasMaker from './CanvasMaker';
import { GameContext } from './GameMaster';

const SendableMessage = () => {
  const {
    gameState: {
      userSubmittedMessage,
    },
  } = useContext(GameContext);

  // const onClick = () => {
  //   saveAs(Blob, 'mymessage.gif');
  // };


  return (
    <div className="modal">
      <div className="sendableMessage-main">
        <CanvasMaker msg={userSubmittedMessage} />
        {/* <button type="button" className="submitButton">download</button> */}
      </div>
    </div>
  );
};

export default SendableMessage;
