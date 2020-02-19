import React, { useRef, useContext, useEffect } from 'react';
import { GameContext } from '../components/GameMaster';


const useCanvasResizer = () => {
  const {
    gameState: {
      userSubmittedMessage,
    },
  } = useContext(GameContext);

  const messageLength = useRef(userSubmittedMessage.length);
  const workingLetterWidth = 75;
  const workingLetterHeight = 90;

  const maximumWidth = () => messageLength * workingLetterWidth;

  const needsReduced = maximumWidth > 300;

  const findCanvasWidth = () => {
    if (needsReduced) {
      return maximumWidth;
    } return 300;
  };

  const reductionRate = () => ((maximumWidth > 300) ? ((300 / maximumWidth) * 100) : 100);

  const findCanvasHeight = () => {
    if (needsReduced) {
      return workingLetterHeight * reductionRate;
    } return workingLetterHeight;
  };

  return {
    canvasWidth: findCanvasWidth(),
    canvasHeight: findCanvasHeight(),
    reduceBy: Math.round(reductionRate() / 100),
  };
};

export default useCanvasResizer;
