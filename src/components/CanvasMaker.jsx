import React, { useState, useRef, useEffect } from 'react';
import Jimp from 'jimp/es';
import gifshot from 'gifshot';
import Message from './Message';
import useMessageFormat from '../customHooks/useMessageFormat';
import dash from '../assets/dash.svg';


const CanvasMaker = () => {
  const totalSignals = useRef(useMessageFormat().totalSignals);
  const wordList = useMessageFormat().formattedMessage;
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasWidth = '300';
  const [frames, setFrames] = useState([]);
  let nextImage;

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
    nextImage = messageCanvas.toDataURL();

    setFrames([...frames, nextImage]);
  }, [activeIndex]);

  // not sure ~ using jimp + gifwrap

  // useEffect(() => {
  //   if (activeIndex === totalSignals) {
  //     frames.map((image, index) => {
  //       Jimp.read(image, (err, img) => {
  //         if (err) {
  //           console.log(err)
  //         } else {
  //           img.write(`frame${index}`);
  //         }
  //       });
  //     });
  //   }
  // });

  useEffect(() => {
    const newIndex = activeIndex + 1;
    let timer = setTimeout(function increment() {
      if (activeIndex <= totalSignals.current) {
        timer = setTimeout(increment, 200);
        setActiveIndex(newIndex);
      }
    }, 200);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    console.log('activeIndex: ', activeIndex);
    console.log('totalSignals: ', totalSignals);
    if (activeIndex === totalSignals.current) {
      const images = frames;
      console.log("test");
      gifshot.createGIF({
        images,
        interval: 0.4,
      }, (obj) => {
        if (!obj.error) {
          console.log("error: ", obj.error);
          const { image } = obj;
          const animatedImage = document.getElementById('animatedGIF');
          animatedImage.src = image;
        }
      });
    }
  }, [activeIndex, totalSignals]);


  return (
    <div>
      <canvas ref={canvasRef} width={canvasWidth} style={{ border: '2px solid' }} />
      <div className="hidden">
        <Message
          activeSignalIndexForCanvas={activeIndex}
        />
      </div>
      <div>
        <img id="animatedGIF" alt="autoplaying-message" />
      </div>
    </div>
  );
};

export default CanvasMaker;
