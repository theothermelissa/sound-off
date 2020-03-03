import React, { useRef, useEffect } from 'react';
import gifSizes from '../assets/gifSizes';
import useCanvasResizer from '../customHooks/useCanvasResizer';

const CanvasLetterMaker = ({
  char,
  activeSignalIndex,
  id,
  // reduceBy,
  // canvasMessageIsComplete,
}) => {
  const { reduceBy } = useCanvasResizer();
  const {
    dotD,
    dashH,
    dashW,
    letterW,
    letterH,
    signalBuffer,
  } = gifSizes;
  const canvasRef = useRef(null);
  const gray = '#CCC4BC';
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

  const finalIndex = characterIndices[characterIndices.length - 1];
  const letterIsComplete = () => finalIndex < activeSignalIndex;
  const signalIsComplete = (signalIndex) => signalIndex < activeSignalIndex;


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

    context.font = font;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = letterIsComplete() ? black : gray;
    // console.log('letterIsComplete(): ', letterIsComplete());
    context.fillText(letter, canvasWidthCenterPoint, canvasHeightCenterPoint);

    const circle = (x, y, r) => {
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.fill();
    };

    const y = canvasHeight - (dashHeight * 2);
    let x = codeStartPoint;

    for (let signalIndex = 0; signalIndex < totalSequenceLength; signalIndex += 1) {
      const thisSignal = characterIndices[signalIndex];
      const thisSignalId = sequence[signalIndex].id;
      // const determineFillStyle = () => {
      //   if (letterIsComplete()) {
      //     return black;
      //   } if (signalIsComplete(thisSignal)) {
      //     return gray;
      //   } return 'pink';
      // };
      context.fillStyle = signalIsComplete(thisSignal) ? black : gray;
      if (thisSignalId === 'dot') {
        context.translate(dotRadius, dotRadius);
        circle(x, y, dotRadius);
        x = x + buffer + dotDiameter;
        context.translate(-dotRadius, -dotRadius);
      } if (thisSignalId === 'dash') {
        context.fillRect(x, y, dashWidth, dashHeight);
        x = x + buffer + dashWidth;
      }
    }
  });

  return (
    <div>
      <canvas id={id} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  );
};

export default CanvasLetterMaker;
