import React, { useRef, useEffect } from 'react';
import dot from '../assets/dot.svg';
import codeTranslationKey from '../assets/codeTranslationKey';

const CanvasMaker = () => {
  const char = 'm';
  const img = useRef(null);
  const canvasRef = useRef(null);

  const dashW = 9;
  const dotD = 5;
  const dashH = 5;
  const buffer = 2;

  const letter = codeTranslationKey[char];

  const totalSequenceLength = letter.sequence.length;
  const canvasW = 90;
  const canvasH = 90;

  const combinedCodeSignalWidths = () => {
    let total = letter.sequence
      .reduce((sum, codeSignal) => ((codeSignal.id === 'dot')
        ? (sum + dotD)
        : (sum + dashW)), 0);
    total += (totalSequenceLength - 1) * buffer;
    return total;
  };

  const startPoint = (canvasW - combinedCodeSignalWidths()) / 2;

  console.log('combinedCodeSignalWidths: ', combinedCodeSignalWidths());
  console.log('startPoint: ', startPoint);

  // const sequenceBoxWidth = (totalSequenceLength - 1) * buffer + (combinedCodeSignalWidths);

  useEffect(() => {
    const canvas = canvasRef.current;
    // const image = img.current;
    const context = canvas.getContext('2d');

    for (let i = 0, x = startPoint; i < totalSequenceLength; i += 1) {
      context.fillStyle = '#CCC4BC';
      if (letter.sequence[i].id === 'dot') {
        context.fillRect(x, 60, dotD, dotD);
        x = x + buffer + dotD;
      } if (letter.sequence[i].id === 'dash') {
        context.fillRect(x, 60, dashW, dashH);
        x = x + buffer + dashW;
      }
    }

    // context.fillStyle = '#A68823';
    // context.fillRect(10, 10, 9, 5);
  });

  return (
    <div>
      <canvas ref={canvasRef} width={canvasW} height={canvasH} style={{ border: '2px solid' }} />
      <img alt="dot" ref={img} src={dot} className="hidden" />
    </div>
  );
};

export default CanvasMaker;
