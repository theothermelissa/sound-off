import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import gifshot from 'gifshot';
// import { number } from 'prop-types';
import Message from './Message';
import useMessageFormat from '../customHooks/useMessageFormat';
import useWindowSize from '../customHooks/useWindowSize';
// import dash from '../assets/dash.svg';

const CanvasMaker = ({ setURL }) => {
  const {
    gameState: {
      formattedMessage,
      totalSignals,
    },
  } = useContext(GameContext);

// const CanvasMaker = () => {
  const { windowHeight, windowWidth } = useWindowSize();
  // const totalSignals = useRef(useMessageFormat().totalSignals);
  const wordList = useMessageFormat().formattedMessage;
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [frames, setFrames] = useState([]);
  const [gifIsComplete, setGifIsComplete] = useState(false);
  const [gifIsReady, setGifIsReady] = useState(false);
  let nextImage;
  const wordOriginCoordinates = [];
  const [canvasHeight, setCanvasHeight] = useState(0);

  const determineCanvasWidth = () => {
    if (windowWidth > 500) {
      return '500';
    } return JSON.stringify(windowWidth - (windowWidth * 0.2));
  };

  // thing = {
  //   one: 1,
  //   two: 2,
  //   get three() {
  //   return this.one + this.two }
  // }

  const determineCanvasHeight = () => {
    const letterWidth = 75;
    const letterHeight = 90;
    const emptyWidth = determineCanvasWidth();
    const rowWidth = emptyWidth;
    let rowBuffer;
    let previous;
    let previousWordWidth;
    let previousXCoordinate;
    let previousYCoordinate;
    const currentRow = [];
    const lastWordIndex = wordList.length - 1;

    wordList.map((word, wordIndex) => {
      const previousWordIndex = wordIndex - 1;
      const isLast = wordIndex === lastWordIndex;
      previous = currentRow[previousWordIndex];
      const { length } = word;
      const wordWidth = length * letterWidth;

      const wordCoordinates = {
        xOrigin: '',
        yOrigin: '',
        length: '',
      };

      if (wordWidth < rowWidth) {
        if (wordList.length === 1 || wordIndex === 0) {
          rowBuffer = Math.round((rowWidth - wordWidth) / 2);
          wordCoordinates.xOrigin = rowBuffer;
          wordCoordinates.yOrigin = 0;
          wordCoordinates.length = length;
          setCanvasHeight(letterHeight);
          // add wordCoordinates to currentRow;
          // push currentRow to wordOriginCoordinates;
        } else if (!isLast) {
          // wordCoordinates.xOrigin = previous.xOrigin + previous.length;
          // wordCoordinates.yOrigin = previous.yOrigin;
          // wordCoordinates.length = length;
          // currentRow.push(wordOriginCoordinates);
          // rowWidth -= length;
        } else if (isLast) {
          // wordCoordinates.xOrigin = previous.xOrigin + previous.length;
          // wordCoordinates.yOrigin = previous.yOrigin;
          // wordCoordinates.length = length;
          // currentRow.push(wordOriginCoordinates);
          // wordOriginCoordinates.push(currentRow);
        }
      } else if (wordWidth > rowWidth) {
        if (wordList.length === 1 || wordIndex === 0) {
          // alert -- resize the message to fit within 500px
        } else {
          console.log('New row needed.');
          setCanvasHeight(canvasHeight + letterHeight);
          // wordOriginCoordinates.push(currentRow);
          // rowBuffer = 0;
          // wordCoordinates.xOrigin = rowBuffer;
          // wordCoordinates.yOrigin = previous.yOrigin + letterHeight;
          // wordCoordinates.length = wordLength;
          // currentRow = [];
          // currentRow.push(wordCoordinates);
          // rowWidth = emptyWidth - length;
          // neededHeight += letterHeight;
          if (isLast) {
            setCanvasHeight(canvasHeight + letterHeight);
            // rowBuffer = Math.round(rowWidth / 2);
            // wordOriginCoordinates.push(currentRow)
          }
        }
      }
    });
  };

  const canvasWidth = determineCanvasWidth();

  // console.log('determineCanvasHeight(): ', determineCanvasHeight());

  // the empty canvas is __ wide.
  // the current row is __ wide.
  // this word is __ wide. Will it fit?
  // EITHER yes. remove this word's width from the canvas width.
  // OR no. add a new row to the bottom of the canvas and subtract
  // the next word is __ wide.

  // console.log('wordList: ', wordList);

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
        const targetLetterId = wordIndex + letter + letterIndex;
        // const wordXOrigin = () =>
        const xOrigin = () => letterIndex * document.getElementById(targetLetterId).width;
        context.drawImage(document.getElementById(targetLetterId), xOrigin(), 0);
      });
    });
    nextImage = messageCanvas.toDataURL();
    setFrames([...frames, nextImage]);
  }, [activeIndex, canvasHeight]);

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
    if (activeIndex > totalSignals.current) {
      const images = frames;
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
  }, [activeIndex, totalSignals, canvasHeight]);

console.log('canvasWidth: ', canvasWidth);
console.log('canvasHeight: ', canvasHeight);
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
