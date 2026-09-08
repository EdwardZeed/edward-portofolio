import React, { useEffect, useRef } from 'react';

type Props = {
  onCompanyHover: (index: number | null) => void;
  onCompanySelect: (index: number) => void;
};

const companies = [
  { point: 4, name: 'BYBIT' },
  { point: 10, name: 'BLUERATE' },
  { point: 16, name: 'MIRA' },
  { point: 22, name: 'STRONG COMPUTE' },
];

/** A lightweight interactive experience map projected from a rotating 3D sphere. */
export default function ConnectionGlobe({ onCompanyHover, onCompanySelect }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const hovered = useRef<number | null>(null);
  const hoverCallback = useRef(onCompanyHover);
  const selectCallback = useRef(onCompanySelect);

  useEffect(() => { hoverCallback.current = onCompanyHover; }, [onCompanyHover]);
  useEffect(() => { selectCallback.current = onCompanySelect; }, [onCompanySelect]);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = media.matches;
    let frame = 0;
    let last = 0;
    let time = 0;
    let rotation = 0;
    let width = 360;
    let height = 360;
    let visible = true;
    let tiltX = 0;
    let tiltY = 0;
    let projected: { x: number; y: number; z: number }[] = [];
    const pointer = { x: 0, y: 0, inside: false };
    const points = Array.from({ length: 28 }, (_, i) => {
      const y = 1 - (i / 27) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
    });
    const edges: [number, number][] = [];
    points.forEach((a, i) => points.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < .76) edges.push([i, j]);
    }));

    const setHovered = (index: number | null) => {
      if (hovered.current === index) return;
      hovered.current = index;
      hoverCallback.current(index);
      el.setAttribute('aria-label', index === null
        ? 'Interactive experience map. Use arrow keys to explore companies.'
        : `${companies[index].name}. Press Enter to view this experience.`);
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0, .04);
      last = now;
      // Freeze every positional effect while a company is being explored.
      // Keeping time fixed also prevents the vertical float from moving the hit target.
      if (!reduced && hovered.current === null) {
        time += dt;
        rotation += dt * .075;
      }
      if (hovered.current === null) {
        tiltX += ((pointer.inside && !reduced ? pointer.y * .2 : -.12) - tiltX) * .065;
        tiltY += ((pointer.inside && !reduced ? pointer.x * .28 : 0) - tiltY) * .065;
      }
      const angle = reduced ? .3 : rotation + tiltY;
      const radius = Math.min(width, height) * .385;
      const cx = width / 2;
      const cy = height / 2 + (reduced ? 0 : Math.sin(time * .75) * 5);
      projected = points.map(p => {
        const x = p.x * Math.cos(angle) + p.z * Math.sin(angle);
        const z1 = -p.x * Math.sin(angle) + p.z * Math.cos(angle);
        const y = p.y * Math.cos(tiltX) - z1 * Math.sin(tiltX);
        const z = p.y * Math.sin(tiltX) + z1 * Math.cos(tiltX);
        return { x: cx + x * radius, y: cy + y * radius, z };
      });
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(121,149,178,.22)'; ctx.lineWidth = .7; ctx.stroke();

      const activePoint = hovered.current === null ? -1 : companies[hovered.current].point;
      edges.forEach(([i, j], edgeIndex) => {
        const a = projected[i], b = projected[j];
        const highlighted = i === activePoint || j === activePoint;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = highlighted ? 'rgba(10,182,173,.52)' : `rgba(126,151,181,${.08 + ((a.z + b.z + 2) / 4) * .16})`;
        ctx.lineWidth = highlighted ? 1.15 : .65; ctx.stroke();
        if (!reduced && edgeIndex % 9 === 0) {
          const progress = (time * .2 + edgeIndex * .17) % 1;
          ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 1.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(16,180,171,.58)'; ctx.fill();
        }
      });

      projected.map((p, i) => ({ ...p, i })).sort((a, b) => a.z - b.z).forEach(p => {
        const companyIndex = companies.findIndex(company => company.point === p.i);
        const isCompany = companyIndex >= 0;
        const highlighted = companyIndex === hovered.current;
        const size = (isCompany ? 4.2 : 2) + (p.z + 1) * (isCompany ? 1.4 : 1.05);
        if (highlighted) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 32);
          glow.addColorStop(0, 'rgba(13,204,187,.28)'); glow.addColorStop(1, 'rgba(13,204,187,0)');
          ctx.fillStyle = glow; ctx.fillRect(p.x - 32, p.y - 32, 64, 64);
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, highlighted ? size + 1.3 : size, 0, Math.PI * 2);
        ctx.fillStyle = isCompany ? (highlighted ? '#0bbcac' : '#2877bd') : `rgba(79,120,166,${.26 + (p.z + 1) * .22})`;
        ctx.fill();
      });

      companies.forEach((company, companyIndex) => {
        const point = projected[company.point];
        if (!point || (point.z < .18 && companyIndex !== hovered.current)) return;
        const rightSide = point.x >= cx;
        const alpha = companyIndex === hovered.current ? 1 : Math.min(.72, .26 + point.z * .55);
        const lineEnd = point.x + (rightSide ? 17 : -17);
        ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(lineEnd, point.y);
        ctx.strokeStyle = `rgba(40,119,189,${alpha * .55})`; ctx.lineWidth = .75; ctx.stroke();
        ctx.font = '600 10px Arial, sans-serif';
        const labelWidth = ctx.measureText(company.name).width;
        const labelX = rightSide
          ? Math.min(lineEnd + 5, width - labelWidth - 4)
          : Math.max(lineEnd - 5, labelWidth + 4);
        ctx.textAlign = rightSide ? 'left' : 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(51,73,94,${alpha})`;
        ctx.fillText(company.name, labelX, point.y);
      });
      if (!reduced && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const start = () => { cancelAnimationFrame(frame); last = performance.now(); frame = requestAnimationFrame(draw); };
    const resize = () => {
      const bounds = el.getBoundingClientRect(); width = bounds.width; height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr); el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); start();
    };
    const findCompany = (e: PointerEvent) => {
      const bounds = el.getBoundingClientRect();
      pointer.x = (e.clientX - bounds.left) / width * 2 - 1;
      pointer.y = (e.clientY - bounds.top) / height * 2 - 1;
      pointer.inside = true;
      let nearest: number | null = null;
      let distance = Math.max(24, width * .045);
      companies.forEach((company, index) => {
        const point = projected[company.point];
        if (!point || point.z < -.22) return;
        const d = Math.hypot(point.x - (e.clientX - bounds.left), point.y - (e.clientY - bounds.top));
        if (d < distance) { distance = d; nearest = index; }
      });
      setHovered(nearest);
      el.style.cursor = nearest === null ? 'grab' : 'pointer';
      if (reduced) start();
    };
    const leave = () => { pointer.inside = false; setHovered(null); el.style.cursor = 'grab'; if (reduced) start(); };
    const click = () => { if (hovered.current !== null) selectCallback.current(hovered.current); };
    const keydown = (e: KeyboardEvent) => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Enter', ' '].includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'Enter' || e.key === ' ') {
        if (hovered.current !== null) selectCallback.current(hovered.current);
        return;
      }
      const direction = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1;
      const next = hovered.current === null ? 0 : (hovered.current + direction + companies.length) % companies.length;
      setHovered(next); if (reduced) start();
    };
    const blur = () => setHovered(null);
    const change = () => { reduced = media.matches; start(); };
    const visibility = () => { if (!document.hidden && visible) start(); else cancelAnimationFrame(frame); };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visibility(); });
    resizeObserver.observe(el); intersectionObserver.observe(el);
    el.addEventListener('pointermove', findCompany); el.addEventListener('pointerleave', leave);
    el.addEventListener('click', click); el.addEventListener('keydown', keydown); el.addEventListener('blur', blur);
    media.addEventListener('change', change); document.addEventListener('visibilitychange', visibility);
    resize();
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); intersectionObserver.disconnect();
      el.removeEventListener('pointermove', findCompany); el.removeEventListener('pointerleave', leave);
      el.removeEventListener('click', click); el.removeEventListener('keydown', keydown); el.removeEventListener('blur', blur);
      media.removeEventListener('change', change); document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  return <canvas ref={canvas} className="globe-canvas" role="button" tabIndex={0} aria-label="Interactive experience map. Use arrow keys to explore companies." />;
}
