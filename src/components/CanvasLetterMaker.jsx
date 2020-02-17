import React, { useRef, useState, useEffect } from 'react';
import dot from '../assets/dot.svg';
import codeTranslationKey from '../assets/codeTranslationKey';

const CanvasLetterMaker = ({
  char,
  activeSignalIndex,
  id,
}) => {
  const canvasRef = useRef(null);
  const gray = '#CCC4BC';
  const black = '#000000';
  const canvasWidth = 75;
  const canvasHeight = 90;
  const dashWidth = 9;
  const dotDiameter = 5;
  const dotRadius = dotDiameter / 2;
  const dashHeight = 5;
  const buffer = 2;

  const { letter, characterIndices, sequence } = char;
  const totalSequenceLength = sequence.length;
  const canvasHeightCenterPoint = canvasHeight / 2;
  const canvasWidthCenterPoint = canvasWidth / 2;
  const fontName = 'Courier';
  const fontSize = '70px';
  const font = `${fontSize} ${fontName}`;

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

    const letterIsComplete = () => {
      const finalIndex = characterIndices[characterIndices.length - 1];
      return (finalIndex < activeSignalIndex);
    };

    context.font = font;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = letterIsComplete() ? black : 'transparent';
    context.fillText(letter, canvasWidthCenterPoint, canvasHeightCenterPoint);

    for (let signalIndex = 0, x = codeStartPoint, y = 82; signalIndex < totalSequenceLength; signalIndex += 1) {
      const isComplete = () => characterIndices[signalIndex] < activeSignalIndex;
      console.log('isComplete(): ', isComplete());
      context.fillStyle = isComplete() ? black : gray;
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
