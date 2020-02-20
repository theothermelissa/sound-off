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

  const maximumWidth = () => messageLength.current * workingLetterWidth;

  const needsReduced = maximumWidth() > 500;

  const findCanvasWidth = () => {
    if (needsReduced) {
      return 500;
    } return maximumWidth();
  };

  const reductionRate = () => {
    if (needsReduced) {
      return 500 / maximumWidth();
    } return 100;
  };

  const findCanvasHeight = () => {
    if (needsReduced) {
      return workingLetterHeight * reductionRate();
    } return workingLetterHeight;
  };

  return {
    canvasWidth: findCanvasWidth(),
    canvasHeight: findCanvasHeight(),
    reduceBy: (Math.round(reductionRate() * 100)) / 100,
  };
};

export default useCanvasResizer;
