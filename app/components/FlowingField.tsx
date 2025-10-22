'use client';

import { useEffect, useRef } from 'react';

export default function FlowingField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: FlowParticle[] = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Clear and reinitialize particles on resize
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new FlowParticle());
      }
    };

    window.addEventListener('resize', resizeCanvas);

    // Simplex-like noise function
    const noise = (x: number, y: number, t: number) => {
      const nx = Math.sin(x * 0.003 + t * 0.0005) * Math.cos(y * 0.002);
      const ny = Math.cos(x * 0.002) * Math.sin(y * 0.003 + t * 0.0005);
      return Math.atan2(ny, nx);
    };

    class FlowParticle {
      x: number;
      y: number;
      prevX: number;
      prevY: number;
      age: number;
      maxAge: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.prevX = this.x;
        this.prevY = this.y;
        this.age = 0;
        this.maxAge = 100 + Math.random() * 100;
      }

      update(time: number) {
        this.prevX = this.x;
        this.prevY = this.y;

        const angle = noise(this.x, this.y, time);
        const speed = 0.8;

        this.x += Math.cos(angle) * speed;
        this.y += Math.sin(angle) * speed;

        this.age++;

        // Reset particle if too old or out of bounds
        if (
          this.age > this.maxAge ||
          this.x < -50 ||
          this.x > canvas.width + 50 ||
          this.y < -50 ||
          this.y > canvas.height + 50
        ) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.prevX = this.x;
          this.prevY = this.y;
          this.age = 0;
        }
      }

      draw() {
        if (!ctx) return;

        const alpha = Math.max(0, 1 - this.age / this.maxAge) * 0.3;
        ctx.strokeStyle = `rgba(124, 107, 166, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // Draw dot at current position
        ctx.fillStyle = `rgba(124, 107, 166, ${alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    resizeCanvas();

    const animate = () => {
      // Clear background fully first time
      if (time === 0) {
        ctx.fillStyle = '#fdfcfe';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Gentle fade to show trails
        ctx.fillStyle = 'rgba(253, 252, 254, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      time++;

      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });

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
        backgroundColor: '#fdfcfe',
      }}
    />
  );
}
