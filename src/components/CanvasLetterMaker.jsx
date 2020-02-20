import React, { useRef, useState, useEffect } from 'react';
import codeTranslationKey from '../assets/codeTranslationKey';
import gifSizes from '../assets/gifSizes';

const CanvasLetterMaker = ({
  char,
  activeSignalIndex,
  id,
  reduceBy,
}) => {
  const { dotD,
    dashH,
    dashW,
    letterW,
    letterH,
    signalBuffer,
  } = gifSizes;
  const canvasRef = useRef(null);
  // const gray = '#CCC4BC';
  const black = '#000000';
  const canvasWidth = Math.round(letterW * reduceBy);
  const canvasHeight = Math.round(letterH * reduceBy);
  const dashWidth = Math.round(dashW * reduceBy);
  const dotDiameter = Math.round(dotD * reduceBy);
  const dashHeight = Math.round(dashH * reduceBy);
  const dotRadius = dotDiameter / 2;
  const buffer = signalBuffer;
  const textSize = Math.round(70 * reduceBy);

  const { letter, characterIndices, sequence } = char;
  const totalSequenceLength = sequence.length;
  const canvasHeightCenterPoint = canvasHeight / 2;
  const canvasWidthCenterPoint = canvasWidth / 2;
  const fontName = 'Courier';
  const fontSize = `${textSize}px`;
  const font = `${fontSize} ${fontName}`;

  const signalIsComplete = (signalIndex) => signalIndex < activeSignalIndex;

  const letterIsComplete = () => {
    const finalIndex = characterIndices[characterIndices.length - 1];
    return (finalIndex < activeSignalIndex);
  };

  const combinedCodeSignalWidths = () => {
    let total = sequence
      .reduce((sum, codeSignal) => ((codeSignal.id === 'dot')
        ? (sum + dotDiameter)
        : (sum + dashWidth)), 0);
    total += (totalSequenceLength - 1) * buffer;
    return total;
  };

  const codeStartPoint = (canvasWidth - combinedCodeSignalWidths()) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const circle = (x, y, r) => {
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.fill();
    };

    context.font = font;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = letterIsComplete() ? black : 'transparent';
    context.fillText(letter, canvasWidthCenterPoint, canvasHeightCenterPoint);

    for (let signalIndex = 0, x = codeStartPoint, y = canvasHeight - 10; signalIndex < totalSequenceLength; signalIndex += 1) {
      context.fillStyle = signalIsComplete(characterIndices[signalIndex]) ? black : 'transparent';
      if (sequence[signalIndex].id === 'dot') {
        context.translate(dotRadius, dotRadius);
        circle(x, y, dotRadius);
        x = x + buffer + dotDiameter;
        context.translate(-dotRadius, -dotRadius);
      } if (sequence[signalIndex].id === 'dash') {
        context.fillRect(x, y, dashWidth, dashHeight);
        x = x + buffer + dashWidth;
      }
    }
  });

  return (
    <div>
      <canvas id={id} ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '2px solid' }} />
      {/* <img alt="dot" ref={img} src={dot} className="hidden" /> */}
    </div>
  );
};

export default CanvasLetterMaker;
