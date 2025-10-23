'use client';

import { useEffect, useRef } from 'react';

type Props = { reducedMotion?: boolean; staticMode?: boolean };

export default function VoronoiBackground({ reducedMotion = false, staticMode = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStaticRef = useRef<boolean>(staticMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Point {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
      }
    }

    const points = Array.from({ length: reducedMotion ? 22 : 28 }, () => new Point());

    const draw = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!isStaticRef.current) points.forEach(p => p.update());

      const step = 15;
      for (let x = 0; x < window.innerWidth; x += step) {
        for (let y = 0; y < window.innerHeight; y += step) {
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

          if (secondMinDist - minDist < (reducedMotion ? 10 : 11)) {
            ctx.fillStyle = `rgba(124, 107, 166, ${reducedMotion ? 0.18 : 0.22})`;
            ctx.fillRect(x, y, step, step);
          }
        }
      }
    };

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    isStaticRef.current = staticMode;
  }, [staticMode]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
