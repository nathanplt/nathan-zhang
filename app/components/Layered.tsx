'use client';

import { useEffect, useRef } from 'react';

export default function Layered() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      // Multiple overlapping sine waves creating layered effect
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124, 107, 166, ${0.08 - layer * 0.01})`;
        ctx.lineWidth = 3;

        const amplitude = 40 + layer * 10;
        const frequency = 0.003 + layer * 0.001;
        const yOffset = canvas.height * (0.3 + layer * 0.1);

        for (let x = 0; x < canvas.width; x += 5) {
          const y = yOffset + Math.sin(x * frequency + time + layer) * amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
