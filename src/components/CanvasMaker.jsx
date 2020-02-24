import React, { useState, useRef, useEffect } from 'react';
import gifshot from 'gifshot';
import Message from './Message';
import useFormatter from '../customHooks/useFormatter';
import useCanvasResizer from '../customHooks/useCanvasResizer';
import gifSizes from '../assets/gifSizes';
import DownloadLink from './DownloadLink';

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
  const [gifURL, setGifURL] = useState('');
  const [gifIsComplete, setGifIsComplete] = useState(false);
  const [gifIsReady, setGifIsReady] = useState(false);
  const leftPadding = useRef(0);
  const canvasMessageIsComplete = activeIndex >= totalSignals.current;
  let nextImage;
  let fileName;

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
        timer = setTimeout(increment, 10);
        setActiveIndex(newIndex);
      }
    }, 10);
    return () => clearTimeout(timer);
  });

  // from https://github.com/eligrey/FileSaver.js/issues/176#issuecomment-153800018

  // const base64toBlob = (data, type, size) => {
  //   const contentType = type || '';
  //   const sliceSize = size || 512;

  //   const byteCharacters = atob(data);
  //   const byteArrays = [];

  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);

  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i += 1) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);

  //     byteArrays.push(byteArray);
  //   }
  //   const blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // };

  useEffect(() => {
    if (activeIndex > totalSignals.current) {
      const endingFrames = Array(10).fill(nextImage);
      console.log('endingFrames: ', endingFrames);
      const images = frames;
      images.push(...endingFrames);
      gifshot.createGIF({
        images,
        interval: 0.3,
        gifWidth: canvasWidth,
        gifHeight: canvasHeight,
        webcamVideoElement: null,
        repeat: null,
      }, (obj) => {
        if (!obj.error) {
          const { image } = obj;
          const animatedImage = document.getElementById('animatedGIF');
          animatedImage.src = image;
          setGifURL(animatedImage.src);
        }
      });
    }
  }, [activeIndex, totalSignals]);

  useEffect(() => {
    if (frames.length === totalSignals.current + 2) {
      setGifIsComplete(true);
    }
  }, [frames, totalSignals]);

  useEffect(() => {
    if (gifIsComplete) {
      setTimeout(() => {
        setGifIsReady(true);
      }, 3000);
    }
  });

  const shouldHide = () => {
    if (gifIsReady) {
      return { display: 'block' };
    } return { display: 'none' };
  };

  // console.log('gifURL: ', gifURL);

  return (
    <div>
      <canvas className="hidden" ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '2px solid' }} />
      {!gifIsReady && <h1>Building your message ...</h1>}
      <div className="hidden">
        <Message
          style={shouldHide()}
          activeSignalIndexForCanvas={activeIndex}
          reduceBy={reduceBy}
          canvasMessageIsComplete={canvasMessageIsComplete}
        />
      </div>
      <div>
        <img id="animatedGIF" style={shouldHide()} alt="autoplaying-message" />
      </div>
      <DownloadLink source={gifURL} text="Download" />
    </div>
  );
};

export default CanvasMaker;
