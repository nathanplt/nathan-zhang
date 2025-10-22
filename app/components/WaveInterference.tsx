'use client';

import { useEffect, useRef } from 'react';

export default function WaveInterference() {
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

    // Wave sources
    const sources = [
      { x: 0.3, y: 0.4, frequency: 0.015, phase: 0 },
      { x: 0.7, y: 0.6, frequency: 0.02, phase: Math.PI / 3 },
    ];

    const numCircles = 40;

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      // Draw concentric circles from each source
      sources.forEach(source => {
        const sx = source.x * canvas.width;
        const sy = source.y * canvas.height;

        for (let i = 0; i < numCircles; i++) {
          const baseRadius = i * 30;
          const wave = Math.sin(i * 0.5 - time + source.phase);
          const radius = baseRadius + wave * 5;
          const alpha = Math.max(0, (1 - i / numCircles) * Math.abs(wave) * 0.15);

          ctx.strokeStyle = `rgba(124, 107, 166, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
