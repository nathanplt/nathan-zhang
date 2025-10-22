'use client';

import { useEffect, useRef } from 'react';

export default function GridDeform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
      targetMouseX = mouseX;
      targetMouseY = mouseY;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const spacing = 40;
    const dotRadius = 2;
    const influenceRadius = 150;

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Draw grid with deformation
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < influenceRadius) {
            // Calculate displacement
            const force = (1 - distance / influenceRadius) * 30;
            const angle = Math.atan2(dy, dx);
            const offsetX = Math.cos(angle) * force;
            const offsetY = Math.sin(angle) * force;

            const finalX = x + offsetX;
            const finalY = y + offsetY;

            // Size based on distance
            const size = dotRadius + (1 - distance / influenceRadius) * 2;
            const alpha = 0.3 + (1 - distance / influenceRadius) * 0.4;

            ctx.fillStyle = `rgba(124, 107, 166, ${alpha})`;
            ctx.beginPath();
            ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Normal dot
            ctx.fillStyle = 'rgba(124, 107, 166, 0.2)';
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
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
