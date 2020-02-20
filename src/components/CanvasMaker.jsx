import React, { useState, useRef, useEffect } from 'react';
import gifshot from 'gifshot';
import Message from './Message';
import useFormatter from '../customHooks/useFormatter';
import useCanvasResizer from '../customHooks/useCanvasResizer';
import gifSizes from '../assets/gifSizes';

const CanvasMaker = () => {
  const {
    wordBuffer,
  } = gifSizes;
  const wordList = useFormatter().formattedMessage;
  const totalCharacters = wordList.reduce((sum, word) => sum + word.length, 0);
  const totalSignals = useRef(useFormatter().totalSignals);
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [frames, setFrames] = useState([]);
  const leftPadding = useRef(0);
  let nextImage;

  const {
    canvasWidth, canvasHeight, reduceBy, letterWidth,
  } = useCanvasResizer();

  const totalMessageWidth = (totalCharacters * letterWidth) + ((wordList.length - 1) * wordBuffer);
  leftPadding.current = Math.round((canvasWidth - totalMessageWidth) / 2);

  useEffect(() => {
    const messageCanvas = canvasRef.current;
    const context = messageCanvas.getContext('2d');
    context.fillStyle = 'whitesmoke';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    let previousXOrigin;
    wordList.map((word, wordIndex) => {
      word.map((letterObject, letterIndex) => {
        const veryFirst = (wordIndex === 0 && letterIndex === 0);
        const startOfWord = (wordIndex !== 0 && letterIndex === 0);
        const { letter } = letterObject;
        const targetId = wordIndex + letter + letterIndex;
        const xOrigin = () => {
          let origin;
          if (veryFirst) {
            origin = leftPadding.current;
            previousXOrigin = origin;
          } else if (startOfWord) {
            origin = previousXOrigin + wordBuffer + letterWidth;
          } else origin = previousXOrigin + letterWidth;
          previousXOrigin = origin;
          return origin;
        };
        context.drawImage(document.getElementById(targetId), xOrigin(), 0);
      });
    });
    nextImage = new Image();
    nextImage.src = messageCanvas.toDataURL();
    setFrames([...frames, nextImage]);
  }, [activeIndex]);

  useEffect(() => {
    const newIndex = activeIndex + 1;
    let timer = setTimeout(function increment() {
      if (activeIndex <= totalSignals.current) {
        timer = setTimeout(increment, 300);
        setActiveIndex(newIndex);
      }
    }, 300);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (activeIndex > totalSignals.current) {
      const images = frames;
      gifshot.createGIF({
        images,
        interval: 0.2,
        gifWidth: canvasWidth,
        gifHeight: canvasHeight,
        webcamVideoElement: null,
      }, (obj) => {
        if (!obj.error) {
          const { image } = obj;
          const animatedImage = document.getElementById('animatedGIF');
          animatedImage.src = image;
        }
      });
    }
  }, [activeIndex, totalSignals]);


  return (
    <div>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '2px solid' }} />
      <div className="hidden">
        <Message
          activeSignalIndexForCanvas={activeIndex}
          reduceBy={reduceBy}
        />
      </div>
      <div>
        <img id="animatedGIF" alt="autoplaying-message" />
      </div>
    </div>
  );
};

export default CanvasMaker;
