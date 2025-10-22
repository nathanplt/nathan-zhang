'use client';

import { useEffect, useRef } from 'react';

export default function HexagonGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    ctx.fillStyle = '#fdfcfe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const size = 40;
    const height = size * Math.sqrt(3);

    for (let row = 0; row < canvas.height / height + 2; row++) {
      for (let col = 0; col < canvas.width / (size * 1.5) + 2; col++) {
        const x = col * size * 1.5;
        const y = row * height + (col % 2) * height / 2;

        ctx.strokeStyle = 'rgba(124, 107, 166, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const hx = x + size * Math.cos(angle);
          const hy = y + size * Math.sin(angle);

          if (i === 0) {
            ctx.moveTo(hx, hy);
          } else {
            ctx.lineTo(hx, hy);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
