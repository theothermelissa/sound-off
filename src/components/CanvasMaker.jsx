import React, { useRef, useEffect } from 'react';
import dot from '../assets/dot.svg';
import codeTranslationKey from '../assets/codeTranslationKey';

const CanvasMaker = () => {
  const char = 'W';
  const color = '#CCC4BC';
  const img = useRef(null);
  const canvasRef = useRef(null);

  const canvasWidth = 90;
  const canvasHeight = 90;
  const dashWidth = 9;
  const dotDiameter = 5;
  const dashHeight = 5;
  const buffer = 2;

  const letter = codeTranslationKey[char.toLowerCase()];
  const totalSequenceLength = letter.sequence.length;
  const canvasHeightCenterPoint = canvasHeight / 2;
  const canvasWidthCenterPoint = canvasWidth / 2;

  const combinedCodeSignalWidths = () => {
    let total = letter.sequence
      .reduce((sum, codeSignal) => ((codeSignal.id === 'dot')
        ? (sum + dotDiameter)
        : (sum + dashWidth)), 0);
    total += (totalSequenceLength - 1) * buffer;
    return total;
  };

  const codeStartPoint = (canvasWidth - combinedCodeSignalWidths()) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    // const image = img.current;
    const context = canvas.getContext('2d');

    context.font = '40px Courier';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    context.fillText(char, canvasWidthCenterPoint, canvasHeightCenterPoint);

    for (let i = 0, x = codeStartPoint; i < totalSequenceLength; i += 1) {
      context.fillStyle = color;
      if (letter.sequence[i].id === 'dot') {
        context.fillRect(x, 62, dotDiameter, dotDiameter);
        x = x + buffer + dotDiameter;
      } if (letter.sequence[i].id === 'dash') {
        context.fillRect(x, 62, dashWidth, dashHeight);
        x = x + buffer + dashWidth;
      }
    }
  });

  return (
    <div>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '2px solid' }} />
      <img alt="dot" ref={img} src={dot} className="hidden" />
    </div>
  );
};

export default CanvasMaker;
