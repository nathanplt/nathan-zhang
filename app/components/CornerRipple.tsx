'use client';

import { useEffect, useRef } from 'react';

export default function CornerRipple() {
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

      time += 0.02;

      const cornerX = canvas.width * 0.85;
      const cornerY = canvas.height * 0.15;

      // Draw ripples
      for (let i = 0; i < 8; i++) {
        const radius = (time * 50 + i * 80) % 600;
        const alpha = Math.max(0, 1 - radius / 600) * 0.1;

        ctx.strokeStyle = `rgba(124, 107, 166, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cornerX, cornerY, radius, 0, Math.PI * 2);
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
