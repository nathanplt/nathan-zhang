'use client';

import { useEffect, useRef } from 'react';

export default function MinimalDots() {
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

    // Create just a few dots
    const dots = [
      { x: 0.2, y: 0.3, phase: 0 },
      { x: 0.8, y: 0.4, phase: Math.PI / 2 },
      { x: 0.5, y: 0.7, phase: Math.PI },
      { x: 0.3, y: 0.8, phase: Math.PI * 1.5 },
    ];

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      dots.forEach(dot => {
        const x = dot.x * canvas.width;
        const y = dot.y * canvas.height;

        const pulse = Math.sin(time + dot.phase) * 0.5 + 0.5;
        const size = 25 + pulse * 15;
        const alpha = 0.15 + pulse * 0.1;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(124, 107, 166, ${alpha})`);
        gradient.addColorStop(1, 'rgba(124, 107, 166, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
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
