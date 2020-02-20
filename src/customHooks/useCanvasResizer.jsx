import React, { useRef, useContext, useEffect } from 'react';
import { GameContext } from '../components/GameMaster';
import gifSizes from '../assets/gifSizes';


const useCanvasResizer = () => {
  const {
    gameState: {
      userSubmittedMessage,
    },
  } = useContext(GameContext);

  const {
    letterW,
    letterH,
  } = gifSizes;

  const messageLength = useRef(userSubmittedMessage.length);
  const workingLetterWidth = letterW;
  const workingLetterHeight = letterH;

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
    letterWidth: Math.round(workingLetterWidth * reductionRate()),
  };
};

export default useCanvasResizer;
