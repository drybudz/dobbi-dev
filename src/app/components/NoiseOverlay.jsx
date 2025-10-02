'use client';

import React, { useEffect, useRef } from 'react';

const NoiseOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const generateNoise = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 100000; i++) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          0.77,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    };

    generateNoise();

    const handleResize = () => {
      generateNoise();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.3,
      }}
    />
  );
};

export default NoiseOverlay;
