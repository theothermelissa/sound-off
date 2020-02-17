import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import useMessageFormat from '../customHooks/useMessageFormat';
import dash from '../assets/dash.svg';

const CanvasMaker = () => {
  const totalSignals = useRef(useMessageFormat().totalSignals);
  const wordList = useMessageFormat().formattedMessage;
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasWidth='300';

  useEffect(() => {
    const messageCanvas = canvasRef.current;
    const context = messageCanvas.getContext('2d');
    wordList.map((word, wordIndex) => {
      word.map((letterObject, letterIndex) => {
        const { letter } = letterObject;
        const targetId = wordIndex + letter + letterIndex;
        const xOrigin = () => letterIndex * document.getElementById(targetId).width;
        context.drawImage(document.getElementById(targetId), xOrigin(), 0);
      });
    });
  }, []);

  useEffect(() => {
    const newIndex = activeIndex + 1;
    let timer = setTimeout(function increment() {
      if (activeIndex <= totalSignals.current) {
        timer = setTimeout(increment, 125);
        setActiveIndex(newIndex);
      }
    }, 125);
    // console.log('activeIndex: ', activeIndex);
    return () => clearTimeout(timer);
  });

  // const onCanvasCompletion = 'potato';

  return (
    <div>
      <canvas ref={canvasRef} width={canvasWidth} style={{ border: '2px solid' }} />
      <div className="hidden">
        <Message
          activeSignalIndexForCanvas={activeIndex}
        />
      </div>
    </div>
  );
};

export default CanvasMaker;
