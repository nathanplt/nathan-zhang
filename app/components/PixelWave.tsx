'use client';

import { useEffect, useRef } from 'react';

type Props = { reducedMotion?: boolean; staticMode?: boolean };

export default function PixelWave({ reducedMotion = false, staticMode = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStaticRef = useRef<boolean>(staticMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

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

    const basePixel = 14;

    const draw = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelSize = Math.max(10, Math.min(basePixel, Math.floor(width / 90)));

      for (let x = 0; x < width; x += pixelSize) {
        for (let y = 0; y < height; y += pixelSize) {
          const speedFactor = reducedMotion ? 0.6 : 1;
          const t = isStaticRef.current ? 4.2 : time;
          const wave1 = Math.sin(x * 0.012 + t * speedFactor) * 0.5 + 0.5;
          const wave2 = Math.sin(y * 0.012 + t * 1.15 * speedFactor) * 0.5 + 0.5;
          const combined = (wave1 + wave2) / 2;
          const alpha = Math.min(0.16, combined * 0.16);

          if (alpha > 0.02) {
            ctx.fillStyle = `rgba(124, 107, 166, ${alpha})`;
            ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
          }
        }
      }
    };

    const animate = () => {
      if (!isStaticRef.current) {
        time += 0.055;
      }
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    isStaticRef.current = staticMode;
  }, [staticMode]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
