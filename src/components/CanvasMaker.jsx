import React, { useRef, useEffect } from 'react';
import dot from '../assets/dot.svg';
import codeTranslationKey from '../assets/codeTranslationKey';

const CanvasLetterMaker = ({ activeSignalIndex, activeCharIndex, currentCharIndex }) => {
  const char = 'n';
  const gray = '#CCC4BC';
  const black = '#000000';
  const img = useRef(null);
  const canvasRef = useRef(null);
  const isComplete = (activeCharIndex > currentCharIndex);

  const canvasWidth = 75;
  const canvasHeight = 90;
  const dashWidth = 9;
  const dotDiameter = 5;
  const dotRadius = dotDiameter / 2;
  const dashHeight = 5;
  const buffer = 2;

  const letter = codeTranslationKey[char.toLowerCase()];
  const totalSequenceLength = letter.sequence.length;
  const canvasHeightCenterPoint = canvasHeight / 2;
  const canvasWidthCenterPoint = canvasWidth / 2;
  const fontName = 'Courier';
  const fontSize = '70px';
  const font = `${fontSize} ${fontName}`;

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
    const circle = (x, y, r) => {
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.fill();
    };

    context.font = font;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = isComplete ? black : gray;
    context.fillText(char, canvasWidthCenterPoint, canvasHeightCenterPoint);

    for (let i = 0, x = codeStartPoint, y = 82; i < totalSequenceLength; i += 1) {
      if (isComplete || i < activeSignalIndex) {
        context.fillStyle = black;
      } else {
        context.fillStyle = gray;
      }
      if (letter.sequence[i].id === 'dot') {
        context.translate(dotRadius, dotRadius);
        circle(x, y, dotRadius);
        x = x + buffer + dotDiameter;
        context.translate(-dotRadius, -dotRadius);
      } if (letter.sequence[i].id === 'dash') {
        context.fillRect(x, y, dashWidth, dashHeight);
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

export default CanvasLetterMaker;
