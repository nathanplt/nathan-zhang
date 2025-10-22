'use client';

import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      angle += 0.005;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.max(canvas.width, canvas.height) * 0.6;

      const spotX = centerX + Math.cos(angle) * radius * 0.5;
      const spotY = centerY + Math.sin(angle) * radius * 0.5;

      const gradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 200);
      gradient.addColorStop(0, 'rgba(124, 107, 166, 0.1)');
      gradient.addColorStop(1, 'rgba(124, 107, 166, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(spotX, spotY, 200, 0, Math.PI * 2);
      ctx.fill();

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
