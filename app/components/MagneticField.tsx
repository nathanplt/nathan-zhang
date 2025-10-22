'use client';

import { useEffect, useRef } from 'react';

export default function MagneticField() {
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

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw field lines
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(124, 107, 166, 0.15)';
        ctx.lineWidth = 2;

        for (let r = 50; r < Math.min(canvas.width, canvas.height) / 2; r += 5) {
          const wobble = Math.sin(r * 0.02 + time) * 20;
          const x = centerX + Math.cos(angle) * (r + wobble);
          const y = centerY + Math.sin(angle) * (r + wobble);

          if (r === 50) {
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
