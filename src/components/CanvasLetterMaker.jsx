import React, { useRef, useState, useEffect } from 'react';
import dot from '../assets/dot.svg';
import codeTranslationKey from '../assets/codeTranslationKey';

const CanvasLetterMaker = ({
  char,
  activeSignalIndex,
  id,
  reduceBy,
}) => {
  const canvasRef = useRef(null);
  const gray = '#CCC4BC';
  const black = '#000000';
  const canvasWidth = Math.round(75 * reduceBy);
  const canvasHeight = Math.round(90 * reduceBy);
  const dashWidth = Math.round(9 * reduceBy);
  const dotDiameter = Math.round(5 * reduceBy);
  const dashHeight = Math.round(5 * reduceBy);
  const dotRadius = dotDiameter / 2;
  const buffer = Math.round(2 * reduceBy);
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

    for (let signalIndex = 0, x = codeStartPoint, y = 82; signalIndex < totalSequenceLength; signalIndex += 1) {
      context.fillStyle = signalIsComplete(characterIndices[signalIndex]) ? black : gray;
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
