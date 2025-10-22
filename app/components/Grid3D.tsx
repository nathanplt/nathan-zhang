'use client';

import { useEffect, useRef } from 'react';

export default function Grid3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      const gridSize = 40;
      const rows = 15;
      const cols = 20;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 100;

      // 3D perspective grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = (col - cols / 2) * gridSize;
          const z = row * gridSize;

          // Apply wave
          const wave = Math.sin(x * 0.02 + time) * 20 + Math.cos(z * 0.02 + time) * 20;
          const y = wave;

          // Perspective projection
          const rotationX = mouseY;
          const rotationY = mouseX + time * 0.2;

          // Rotate around Y
          const x1 = x * Math.cos(rotationY) - z * Math.sin(rotationY);
          const z1 = x * Math.sin(rotationY) + z * Math.cos(rotationY);

          // Rotate around X
          const y2 = y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
          const z2 = y * Math.sin(rotationX) + z1 * Math.cos(rotationX);

          // Project to 2D
          const scale = 300 / (300 + z2);
          const projX = centerX + x1 * scale;
          const projY = centerY + y2 * scale;

          // Distance-based alpha
          const distance = Math.sqrt(x * x + z * z) / 500;
          const alpha = Math.max(0, 1 - distance) * 0.4;

          // Draw point
          ctx.fillStyle = `rgba(124, 107, 166, ${alpha})`;
          ctx.beginPath();
          ctx.arc(projX, projY, 2 * scale, 0, Math.PI * 2);
          ctx.fill();

          // Draw lines
          if (col < cols - 1) {
            const nextX = ((col + 1) - cols / 2) * gridSize;
            const nextZ = row * gridSize;
            const nextWave = Math.sin(nextX * 0.02 + time) * 20 + Math.cos(nextZ * 0.02 + time) * 20;

            const nx1 = nextX * Math.cos(rotationY) - nextZ * Math.sin(rotationY);
            const nz1 = nextX * Math.sin(rotationY) + nextZ * Math.cos(rotationY);
            const ny2 = nextWave * Math.cos(rotationX) - nz1 * Math.sin(rotationX);
            const nz2 = nextWave * Math.sin(rotationX) + nz1 * Math.cos(rotationX);
            const nscale = 300 / (300 + nz2);
            const nprojX = centerX + nx1 * nscale;
            const nprojY = centerY + ny2 * nscale;

            ctx.strokeStyle = `rgba(124, 107, 166, ${alpha * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(nprojX, nprojY);
            ctx.stroke();
          }

          if (row < rows - 1) {
            const nextX = x;
            const nextZ = (row + 1) * gridSize;
            const nextWave = Math.sin(nextX * 0.02 + time) * 20 + Math.cos(nextZ * 0.02 + time) * 20;

            const nx1 = nextX * Math.cos(rotationY) - nextZ * Math.sin(rotationY);
            const nz1 = nextX * Math.sin(rotationY) + nextZ * Math.cos(rotationY);
            const ny2 = nextWave * Math.cos(rotationX) - nz1 * Math.sin(rotationX);
            const nz2 = nextWave * Math.sin(rotationX) + nz1 * Math.cos(rotationX);
            const nscale = 300 / (300 + nz2);
            const nprojX = centerX + nx1 * nscale;
            const nprojY = centerY + ny2 * nscale;

            ctx.strokeStyle = `rgba(124, 107, 166, ${alpha * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(nprojX, nprojY);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
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
