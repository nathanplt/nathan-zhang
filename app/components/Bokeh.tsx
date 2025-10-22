'use client';

import { useEffect, useRef } from 'react';

export default function Bokeh() {
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

    // Static bokeh circles
    const circles = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 40 + Math.random() * 80,
      opacity: 0.03 + Math.random() * 0.05,
    }));

    circles.forEach(circle => {
      const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius);
      gradient.addColorStop(0, `rgba(124, 107, 166, ${circle.opacity})`);
      gradient.addColorStop(0.7, `rgba(124, 107, 166, ${circle.opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(124, 107, 166, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
