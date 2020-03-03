import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import gifshot from 'gifshot';
import Message from './Message';
import useCanvasResizer from '../customHooks/useCanvasResizer';
import gifSizes from '../assets/gifSizes';
import { GameContext } from './GameMaster';

const CanvasMaker = ({ setURL }) => {
  const {
    gameState: {
      formattedMessage,
      totalSignals,
    },
  } = useContext(GameContext);

  const {
    wordBuffer,
  } = gifSizes;

  const {
    canvasWidth, canvasHeight, reduceBy, letterWidth,
  } = useCanvasResizer();

  const totalCharacters = formattedMessage.reduce((sum, word) => sum + word.length, 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentTotalSignals = useRef(totalSignals);
  const leftPadding = useRef(0);

  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [gifIsComplete, setGifIsComplete] = useState(false);
  const [gifIsReady, setGifIsReady] = useState(false);
  let nextImage;

  const totalMessageWidth = (totalCharacters * letterWidth) + ((formattedMessage.length - 1) * wordBuffer);
  leftPadding.current = Math.round((canvasWidth - totalMessageWidth) / 2);

  useEffect(() => {
    const messageCanvas = canvasRef.current;
    const context = messageCanvas.getContext('2d');
    context.fillStyle = 'whitesmoke';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    let previousXOrigin;

    formattedMessage.map((word, wordIndex) => {
      word.map((letterObject, letterIndex) => {
        const { letter } = letterObject;
        const veryFirst = (wordIndex === 0 && letterIndex === 0);
        const startOfSubsequentWord = (wordIndex !== 0 && letterIndex === 0);
        const targetId = wordIndex + letter + letterIndex;
        const xOrigin = () => {
          let origin;
          if (veryFirst) {
            origin = leftPadding.current;
            previousXOrigin = origin;
          } else if (startOfSubsequentWord) {
            origin = previousXOrigin + wordBuffer + letterWidth;
          } else origin = previousXOrigin + letterWidth;
          previousXOrigin = origin;
          return origin;
        };
        context.drawImage(document.getElementById(targetId), xOrigin(), 0);
      });
    });
    nextImage = messageCanvas.toDataURL();
    setFrames([...frames, nextImage]);
    // nextImage = new Image();
  }, [activeIndex]);

  // useEffect(() => {

  // })

  useEffect(() => {
    const newIndex = activeIndex + 1;
    let timer = setTimeout(function increment() {
      if (activeIndex <= currentTotalSignals.current) {
        timer = setTimeout(increment, 200);
        setActiveIndex(newIndex);
      }
    }, 200);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (activeIndex > currentTotalSignals.current) {
      const endingFrames = Array(10).fill(nextImage);
      const images = frames;
      images.push(...endingFrames);
      gifshot.createGIF({
        images,
        interval: 0.3,
        gifWidth: canvasWidth,
        gifHeight: canvasHeight,
        webcamVideoElement: null,
      }, (obj) => {
        if (!obj.error) {
          const { image } = obj;
          const animatedImage = document.getElementById('animatedGIF');
          animatedImage.src = image;
          setURL(animatedImage.src);
        }
      });
    }
  }, [activeIndex, currentTotalSignals.current]);

  useEffect(() => {
    if (frames.length === currentTotalSignals.current + 2) {
      setGifIsComplete(true);
    }
  }, [frames, currentTotalSignals.current]);

  useEffect(() => {
    if (gifIsComplete) {
      setTimeout(() => {
        setGifIsReady(true);
      }, 2000);
    }
  });

  const shouldHide = () => {
    if (gifIsReady) {
      return { display: 'block' };
    } return { display: 'none' };
  };

  return (
    <div>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '2px solid' }} />
      {!gifIsReady && <h1>Building your message ...</h1>}
      <div className="hidden">
        <Message
          style={shouldHide()}
          activeSignalIndexForCanvas={activeIndex}
          reduceBy={reduceBy}
        />
      </div>
      <div>
        <img id="animatedGIF" style={shouldHide()} alt="autoplaying-message" />
      </div>
    </div>
  );
};

export default CanvasMaker;
