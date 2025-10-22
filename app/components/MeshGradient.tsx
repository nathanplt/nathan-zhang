'use client';

import { useEffect, useRef } from 'react';

export default function MeshGradient() {
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

    // Blob points that will morph
    const blobs = [
      { baseX: 0.3, baseY: 0.3, radius: 0.4, color: [124, 107, 166], phase: 0 },
      { baseX: 0.7, baseY: 0.5, radius: 0.35, color: [155, 138, 184], phase: Math.PI * 0.5 },
      { baseX: 0.5, baseY: 0.7, radius: 0.3, color: [243, 240, 248], phase: Math.PI },
    ];

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      color: number[],
      alpha: number
    ) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      // Clear with base color
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.003;

      blobs.forEach((blob) => {
        // Smooth organic movement using sine waves
        const offsetX = Math.sin(time + blob.phase) * 0.1;
        const offsetY = Math.cos(time * 0.8 + blob.phase) * 0.1;
        const radiusVar = Math.sin(time * 0.5 + blob.phase) * 0.05;

        const x = (blob.baseX + offsetX) * canvas.width;
        const y = (blob.baseY + offsetY) * canvas.height;
        const radius = (blob.radius + radiusVar) * Math.max(canvas.width, canvas.height);

        ctx.globalCompositeOperation = 'multiply';
        drawBlob(x, y, radius, blob.color, 0.15);
      });

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

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
