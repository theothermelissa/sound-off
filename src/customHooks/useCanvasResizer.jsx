import React, { useRef, useContext } from 'react';
import gifSizes from '../assets/gifSizes';
import { GameContext } from '../components/GameMaster';

const useCanvasResizer = () => {
  const {
    gameState: {
      formattedMessage,
    },
  } = useContext(GameContext);

  const {
    letterW,
    letterH,
  } = gifSizes;

  const messageLength = useRef(formattedMessage.length);
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
    } return 1;
  };

  const findCanvasHeight = () => {
    if (needsReduced) {
      return workingLetterHeight * reductionRate();
    } return workingLetterHeight;
  };

  const reduceByValue = (Math.round(reductionRate() * 100)) / 100;
  const finalLetterWidth = Math.round(workingLetterWidth * reduceByValue);

  return {
    canvasWidth: findCanvasWidth(),
    canvasHeight: findCanvasHeight(),
    reduceBy: reduceByValue,
    letterWidth: finalLetterWidth,
  };
};

export default useCanvasResizer;
