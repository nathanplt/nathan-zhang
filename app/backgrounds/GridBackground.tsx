'use client';

import { useEffect, useRef } from 'react';

type Props = { reducedMotion?: boolean; staticMode?: boolean };

export default function GridBackground({ reducedMotion = false, staticMode = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStaticRef = useRef<boolean>(staticMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 4.2;

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

    const pixelSize = 16;
    const gap = 4;
    const gridSize = pixelSize + gap;

    const draw = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave1 = Math.sin((x * 0.01 + y * 0.006) + time * (reducedMotion ? 0.4 : 0.6));
          const wave2 = Math.cos((x * 0.006 - y * 0.008) - time * (reducedMotion ? 0.3 : 0.5));
          const combined = (wave1 + wave2) / 2;
          const alpha = (combined * 0.5 + 0.5) * 0.16;

          if (alpha > 0.03) {
            ctx.fillStyle = `rgba(124, 107, 166, ${alpha})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }
    };

    const animate = () => {
      if (!isStaticRef.current) {
        time += 0.014;
      }
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
