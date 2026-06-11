import React, { useEffect, useRef } from 'react';

export default function PreloaderParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const count = isMobile ? 15 : isTablet ? 20 : 30;

    const particles = [];

    // 3-4 larger soft glow orbs
    const orbCount = 3;
    for (let i = 0; i < orbCount; i++) {
      particles.push({
        type: 'orb',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 60,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.05 + 0.03,
      });
    }

    // Sparkles & Dots
    for (let i = 0; i < count; i++) {
      particles.push({
        type: Math.random() > 0.5 ? 'dot' : 'sparkle',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(Math.random() * 0.3 + 0.1),
        opacity: Math.random() * 0.2 + 0.1,
        pulseSpeed: Math.random() * 0.025 + 0.005,
        pulseDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.type === 'orb') {
          if (p.x < -p.size || p.x > canvas.width + p.size) p.speedX *= -1;
          if (p.y < -p.size || p.y > canvas.height + p.size) p.speedY *= -1;
        } else {
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -10 || p.x > canvas.width + 10) {
            p.x = Math.random() * canvas.width;
          }
        }

        if (p.type === 'sparkle') {
          p.opacity += p.pulseSpeed * p.pulseDir;
          if (p.opacity > 0.35) p.pulseDir = -1;
          else if (p.opacity < 0.05) p.pulseDir = 1;
        }

        if (p.type === 'orb') {
          ctx.save();
          ctx.beginPath();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(118, 201, 69, ${p.opacity})`);
          grad.addColorStop(1, 'rgba(118, 201, 69, 0)');
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.type === 'dot'
            ? `rgba(118, 201, 69, ${p.opacity})`
            : `rgba(255, 255, 255, ${p.opacity * 1.5})`;
          ctx.fill();
        }
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-1 pointer-events-none mix-blend-screen"
    />
  );
}
