'use client';

import { useEffect, useRef } from 'react';

export default function VoronoiCells() {
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

    // Generate random points
    const points = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }));

    ctx.fillStyle = '#fdfcfe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw voronoi cell edges
    const step = 10;
    for (let x = 0; x < canvas.width; x += step) {
      for (let y = 0; y < canvas.height; y += step) {
        let minDist = Infinity;
        let secondMinDist = Infinity;

        points.forEach(point => {
          const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
          if (dist < minDist) {
            secondMinDist = minDist;
            minDist = dist;
          } else if (dist < secondMinDist) {
            secondMinDist = dist;
          }
        });

        if (secondMinDist - minDist < 15) {
          ctx.fillStyle = 'rgba(124, 107, 166, 0.15)';
          ctx.fillRect(x, y, step, step);
        }
      }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
