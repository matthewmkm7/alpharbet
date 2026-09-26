"use client";

import { useEffect, useRef } from "react";

// Two atom colors, per the requested red/green look. Bonds are drawn in a
// neutral tone read from the current theme so they stay faint in both modes.
const ATOM_COLORS = ["rgba(214, 77, 67, OPACITY)", "rgba(63, 143, 91, OPACITY)"];

type Atom = { x: number; y: number; z: number; colorIndex: number };
type Bond = [number, number];

type Molecule = {
  atoms: Atom[];
  bonds: Bond[];
  centerX: number;
  centerY: number;
  driftX: number;
  driftY: number;
  angle: number;
  spin: number;
  birth: number;
  lifespan: number;
};

const FADE_MS = 2600; // how long a molecule takes to fade in (and, in reverse, to fade out)

function randomMolecule(width: number, height: number, now: number): Molecule {
  // A small hub-and-spoke shape: one central atom bonded to 2-4 outer atoms.
  const spokeCount = 2 + Math.floor(Math.random() * 3);
  const atoms: Atom[] = [{ x: 0, y: 0, z: 0, colorIndex: Math.round(Math.random()) }];
  const bonds: Bond[] = [];
  for (let i = 0; i < spokeCount; i++) {
    const theta = (i / spokeCount) * Math.PI * 2 + Math.random() * 0.6;
    const radius = 26 + Math.random() * 18;
    atoms.push({
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius,
      z: Math.sin(theta * 1.7) * 20,
      colorIndex: Math.round(Math.random()),
    });
    bonds.push([0, i + 1]);
  }

  return {
    atoms,
    bonds,
    centerX: Math.random() * width,
    centerY: Math.random() * height,
    driftX: (Math.random() - 0.5) * 10, // px per second
    driftY: (Math.random() - 0.5) * 10,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.25, // radians per second
    birth: now,
    lifespan: 14000 + Math.random() * 10000,
  };
}

// Smooth 0 -> 1 -> 0 opacity curve over a molecule's lifespan.
function fadeCurve(ageMs: number, lifespanMs: number): number {
  if (ageMs < FADE_MS) return ageMs / FADE_MS;
  if (ageMs > lifespanMs - FADE_MS) return Math.max(0, (lifespanMs - ageMs) / FADE_MS);
  return 1;
}

export default function MoleculeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return; // keep the page still for anyone who's asked for that

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const MOLECULE_COUNT = 6;
    const now0 = performance.now();
    const molecules: Molecule[] = Array.from({ length: MOLECULE_COUNT }, (_, i) =>
      randomMolecule(width, height, now0 - Math.random() * 8000 * i)
    );

    let lastTime = now0;
    let running = true;
    let frameId = 0;

    function frame(now: number) {
      if (!running || !ctx) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let m = 0; m < molecules.length; m++) {
        const mol = molecules[m];
        const age = now - mol.birth;
        if (age > mol.lifespan) {
          molecules[m] = randomMolecule(width, height, now);
          continue;
        }
        const opacity = fadeCurve(age, mol.lifespan);
        if (opacity <= 0) continue;

        mol.angle += mol.spin * dt;
        mol.centerX += mol.driftX * dt;
        mol.centerY += mol.driftY * dt;
        // wrap gently around the viewport instead of popping out of existence
        if (mol.centerX < -60) mol.centerX = width + 60;
        if (mol.centerX > width + 60) mol.centerX = -60;
        if (mol.centerY < -60) mol.centerY = height + 60;
        if (mol.centerY > height + 60) mol.centerY = -60;

        const cos = Math.cos(mol.angle);
        const sin = Math.sin(mol.angle);
        const projected = mol.atoms.map((atom) => {
          // rotate around the vertical axis for a slow "turning in space" feel
          const rx = atom.x * cos - atom.z * sin;
          const depth = atom.x * sin + atom.z * cos;
          const scale = 1 + depth / 140;
          return {
            screenX: mol.centerX + rx * scale,
            screenY: mol.centerY + atom.y * scale,
            radius: 4.5 * scale,
            colorIndex: atom.colorIndex,
            depth,
          };
        });

        ctx.strokeStyle = `rgba(140,140,140,${0.16 * opacity})`;
        ctx.lineWidth = 1;
        for (const [a, b] of mol.bonds) {
          ctx.beginPath();
          ctx.moveTo(projected[a].screenX, projected[a].screenY);
          ctx.lineTo(projected[b].screenX, projected[b].screenY);
          ctx.stroke();
        }

        for (const atom of projected) {
          ctx.fillStyle = ATOM_COLORS[atom.colorIndex].replace("OPACITY", String(0.34 * opacity));
          ctx.beginPath();
          ctx.arc(atom.screenX, atom.screenY, atom.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    function handleVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameId);
      } else if (!running) {
        running = true;
        lastTime = performance.now();
        frameId = requestAnimationFrame(frame);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="molecule-bg" aria-hidden="true" />;
}
