'use client';

import { useEffect, useRef } from 'react';

export default function PixelWave() {
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

    const pixelSize = 15;

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.03;

      for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
          const wave1 = Math.sin(x * 0.01 + time) * 0.5 + 0.5;
          const wave2 = Math.sin(y * 0.01 + time * 1.2) * 0.5 + 0.5;
          const combined = (wave1 + wave2) / 2;
          const alpha = combined * 0.15;

          if (alpha > 0.02) {
            ctx.fillStyle = `rgba(124, 107, 166, ${alpha})`;
            ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
          }
        }
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
