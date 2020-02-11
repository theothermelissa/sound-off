import React, { useRef, useEffect } from 'react';
import sailboat from '../assets/sailboat.png';
// import dot from '../assets/dot.svg';

const CanvasMaker = () => {
  const img = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = img.current;
    const context = canvas.getContext('2d');

    image.onload = () => {
      context.drawImage(image, 0, 0, 400, 400);
      context.font = '10px Courier';
      context.fillStyle = '#FFFFFF';
      context.fillText('The Why Knot (statistically)', 200, 75);
    };

    // context.fillStyle = '#A68823';
    // context.fillRect(10, 10, 9, 5);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400} style={{ border: '2px solid' }} />
      <img alt="sailboat" ref={img} src={sailboat} className="hidden" />
    </div>
  );
};

export default CanvasMaker;
