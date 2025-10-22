'use client';

import { useEffect, useRef } from 'react';

export default function Topographic() {
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

      time += 0.01;

      // Draw contour lines
      for (let level = 0; level < 10; level++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124, 107, 166, ${0.05 + level * 0.01})`;
        ctx.lineWidth = 1;

        for (let x = 0; x < canvas.width; x += 5) {
          const noise = Math.sin(x * 0.01 + time) * 30 + Math.cos(x * 0.007 + time * 0.7) * 20;
          const y = canvas.height * 0.5 + noise + level * 40 - 200;

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
