'use client';

import { useEffect, useRef } from 'react';

export default function Constellations() {
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

    class Star {
      x: number;
      y: number;
      size: number;
      twinkleSpeed: number;
      twinklePhase: number;
      brightness: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 1 + Math.random() * 2;
        this.twinkleSpeed = 0.02 + Math.random() * 0.03;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.brightness = 0.3 + Math.random() * 0.4;
      }

      draw(time: number) {
        if (!ctx) return;

        const twinkle = Math.sin(time * this.twinkleSpeed + this.twinklePhase);
        const alpha = this.brightness * (0.7 + twinkle * 0.3);

        // Star glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(155, 138, 184, ${alpha})`);
        gradient.addColorStop(1, 'rgba(124, 107, 166, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Star center
        ctx.fillStyle = `rgba(200, 180, 220, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Constellation {
      stars: Star[];
      connections: [number, number][];

      constructor(numStars: number, centerX: number, centerY: number, spread: number) {
        this.stars = [];
        this.connections = [];

        // Create stars
        for (let i = 0; i < numStars; i++) {
          const angle = (i / numStars) * Math.PI * 2 + Math.random() * 0.5;
          const distance = spread * (0.5 + Math.random() * 0.5);
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          this.stars.push(new Star(x, y));
        }

        // Create connections (connect nearby stars)
        for (let i = 0; i < this.stars.length; i++) {
          for (let j = i + 1; j < this.stars.length; j++) {
            const dx = this.stars[i].x - this.stars[j].x;
            const dy = this.stars[i].y - this.stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < spread * 0.7 && Math.random() > 0.5) {
              this.connections.push([i, j]);
            }
          }
        }
      }

      draw(time: number) {
        if (!ctx) return;

        // Draw connections
        this.connections.forEach(([i, j]) => {
          const s1 = this.stars[i];
          const s2 = this.stars[j];

          ctx.strokeStyle = 'rgba(124, 107, 166, 0.15)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        });

        // Draw stars
        this.stars.forEach(star => star.draw(time));
      }
    }

    // Create random constellations
    const constellations: Constellation[] = [];
    const numConstellations = 5;

    for (let i = 0; i < numConstellations; i++) {
      const centerX = Math.random() * canvas.width;
      const centerY = Math.random() * canvas.height;
      const numStars = 4 + Math.floor(Math.random() * 5);
      const spread = 80 + Math.random() * 100;

      constellations.push(new Constellation(numStars, centerX, centerY, spread));
    }

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time++;

      constellations.forEach(constellation => constellation.draw(time));

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
