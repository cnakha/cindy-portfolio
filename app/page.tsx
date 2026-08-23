"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import { useRouter } from "next/navigation";

// ── pixel constants ───────────────────────────────────────────────────────────
const SQ   = 4;
const UNIT = SQ + 4;        // 8px sub-unit
const CLUSTER = UNIT * 3;   // 24px cluster cell
const COLOR = "195,195,195";
const FILL  = 0.10;         // fraction of clusters active at rest

const SHAPES: Record<string, [number,number][]> = {
  single: [[1,1]],
  xShape: [[0,0],[2,0],[1,1],[0,2],[2,2]],
  block:  [[0,0],[1,0],[0,1],[1,1]],
};
type ShapeKey = keyof typeof SHAPES;

function pickShape(): ShapeKey {
  const r = Math.random();
  if (r < 0.30) return "single";
  if (r < 0.68) return "xShape";
  return "block";
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Travelling waves modulate OFF→ON probability
const WAVES = [
  { angle: 0.4,  speed: 0.00008, width: 180 },
  { angle: 1.9,  speed: 0.00005, width: 260 },
  { angle: -0.7, speed: 0.00010, width: 140 },
];
function waveBoost(px: number, py: number, t: number): number {
  let s = 0;
  for (const w of WAVES) {
    const proj  = px * Math.cos(w.angle) + py * Math.sin(w.angle);
    const phase = proj / w.width - t * w.speed;
    s += (Math.sin(phase * Math.PI * 2) + 1) / 2;
  }
  return s / WAVES.length;
}

// ── cluster state machine ─────────────────────────────────────────────────────
type Phase = "off" | "appearing" | "holding" | "disappearing";

type Cluster = {
  phase:        Phase;
  shape:        ShapeKey;
  order:        number[];
  visibleCount: number;
  nextStepTime: number;
  proximity:    number; // 0 = at mouse, 1 = far away — updated each tick
};

// Timing helpers — proximity 0=fast, 1=idle
const stepMs = (p: number) => (30 + p * 80)  + Math.random() * (20 + p * 70);
const holdMs = (p: number) => (80 + p * 600) + Math.random() * (80 + p * 2200);
const offMs  = ()          => 300 + Math.random() * 3500;

function makeCluster(nowMs: number): Cluster {
  const shape = pickShape();
  const len   = SHAPES[shape].length;
  const on    = Math.random() < FILL;
  return {
    phase:        on ? "holding" : "off",
    shape,
    order:        shuffle(Array.from({ length: len }, (_, i) => i)),
    visibleCount: on ? len : 0,
    nextStepTime: nowMs + Math.random() * 4000,
    proximity:    1,
  };
}


function hexToRgb(hex: string) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ] as const;
}
function ha(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}


// ── mouse-follow pixel layer ──────────────────────────────────────────────────
const MOUSE_RADIUS = 70;   // px — how far the effect reaches from cursor
const MOUSE_FILL   = 0.72; // fraction of clusters lit within the hotspot

function MousePixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const gridRef   = useRef<{ clusters: Cluster[]; cols: number; rows: number }>({
    clusters: [], cols: 0, rows: 0,
  });
  const rafRef    = useRef<number>(0);

  // fast timing — clusters pop on/off quickly near cursor
  const fastStep = () => 12 + Math.random() * 18;
  const fastHold = () => 40 + Math.random() * 80;
  const fastOff  = () => 20 + Math.random() * 60;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const now    = () => performance.now();

    function buildGrid() {
      const cols = Math.ceil(canvas.width  / CLUSTER) + 1;
      const rows = Math.ceil(canvas.height / CLUSTER) + 1;
      const t    = now();
      gridRef.current = {
        cols, rows,
        clusters: Array.from({ length: cols * rows }, () => ({
          phase:        "off" as Phase,
          shape:        "single" as ShapeKey,
          order:        [0],
          visibleCount: 0,
          nextStepTime: t + Math.random() * 200,
          proximity:    1,
        })),
      };
    }

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const updateInterval = setInterval(() => {
      const t  = now();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const { clusters, cols, rows } = gridRef.current;

      for (let i = 0; i < clusters.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx  = col * CLUSTER + CLUSTER / 2;
        const cy  = row * CLUSTER + CLUSTER / 2;
        const dx  = cx - mx, dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // density falls off with a squared curve from center
        const t01 = Math.max(0, 1 - dist / MOUSE_RADIUS);
        const prob = MOUSE_FILL * t01 * t01;

        const c = clusters[i];
        if (t < c.nextStepTime) continue;

        switch (c.phase) {
          case "off": {
            if (mx > -100 && Math.random() < prob) {
              c.phase        = "appearing";
              c.shape        = pickShape();
              c.order        = shuffle(Array.from({ length: SHAPES[c.shape].length }, (_, k) => k));
              c.visibleCount = 0;
              c.nextStepTime = t + fastStep();
            } else {
              c.nextStepTime = t + fastOff();
            }
            break;
          }
          case "appearing": {
            c.visibleCount++;
            if (c.visibleCount >= SHAPES[c.shape].length) {
              c.phase        = "holding";
              c.nextStepTime = t + fastHold();
            } else {
              c.nextStepTime = t + fastStep();
            }
            break;
          }
          case "holding": {
            // if cursor has moved away, start fading immediately
            if (mx < -100 || dist > MOUSE_RADIUS * 1.2) {
              c.phase        = "disappearing";
              c.order        = shuffle(Array.from({ length: SHAPES[c.shape].length }, (_, k) => k));
              c.nextStepTime = t + fastStep();
            } else {
              c.phase        = "disappearing";
              c.order        = shuffle(Array.from({ length: SHAPES[c.shape].length }, (_, k) => k));
              c.nextStepTime = t + fastHold();
            }
            break;
          }
          case "disappearing": {
            c.visibleCount--;
            if (c.visibleCount <= 0) {
              c.phase        = "off";
              c.visibleCount = 0;
              c.nextStepTime = t + fastOff();
            } else {
              c.nextStepTime = t + fastStep();
            }
            break;
          }
        }
      }
    }, 16);

    const OFFSET = CLUSTER / 2; // shift grid so squares don't overlap the base layer

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgb(170, 170, 170)";
      const { clusters, cols, rows } = gridRef.current;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cl = clusters[r * cols + c];
          if (cl.visibleCount === 0) continue;
          const ox  = c * CLUSTER + OFFSET;
          const oy  = r * CLUSTER + OFFSET;
          const pts = SHAPES[cl.shape];
          for (let k = 0; k < cl.visibleCount && k < cl.order.length; k++) {
            const [sc, sr] = pts[cl.order[k]];
            ctx.moveTo(ox + sc * UNIT + SQ / 2, oy + sr * UNIT + SQ / 2);
            ctx.arc(ox + sc * UNIT + SQ / 2, oy + sr * UNIT + SQ / 2, SQ / 2, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();
      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    const onMove  = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(updateInterval);
      ro.disconnect();
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

// ── ripple config ─────────────────────────────────────────────────────────────
const RIPPLE_SPEED    = 0.18;  // px/ms — faster expansion = rings visibly separate
const RIPPLE_BAND     = 14;    // px — thin band so each ring is crisp
const RIPPLE_EMIT_MS  = 900;   // ms between emissions — gap = 900*0.18 - 14 = 148px
const RIPPLE_MAX_R    = 320;   // px — keep effect local

type Ripple = { x: number; y: number; startTime: number };
type ClickBurst = { x: number; y: number; startTime: number };

// ── canvas component ──────────────────────────────────────────────────────────
function PixelCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const gridRef      = useRef<{ clusters: Cluster[]; cols: number; rows: number }>({
    clusters: [], cols: 0, rows: 0,
  });
  const ripplesRef   = useRef<Ripple[]>([]);
  const burstsRef    = useRef<ClickBurst[]>([]);
  const lastEmitRef  = useRef<number>(0);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const now    = () => performance.now();

    function buildGrid() {
      const cols = Math.ceil(canvas.width  / CLUSTER) + 1;
      const rows = Math.ceil(canvas.height / CLUSTER) + 1;
      const t    = now();
      gridRef.current = {
        cols, rows,
        clusters: Array.from({ length: cols * rows }, () => makeCluster(t)),
      };
    }

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const updateInterval = setInterval(() => {
      const t  = now();
      const { clusters, cols } = gridRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // emit a new ripple from the cursor periodically
      if (mx > -100 && t - lastEmitRef.current > RIPPLE_EMIT_MS) {
        ripplesRef.current.push({ x: mx, y: my, startTime: t });
        lastEmitRef.current = t;
      }

      // expire old ripples
      ripplesRef.current = ripplesRef.current.filter(
        (rp) => (t - rp.startTime) * RIPPLE_SPEED < RIPPLE_MAX_R
      );

      // update proximity for each cluster (0 = at mouse, 1 = far)
      const PROX_RADIUS = 280; // px — distance at which proximity reaches 1
      if (mx > -100) {
        for (let i = 0; i < clusters.length; i++) {
          const col  = i % cols;
          const row  = Math.floor(i / cols);
          const cx   = col * CLUSTER + CLUSTER / 2;
          const cy   = row * CLUSTER + CLUSTER / 2;
          const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
          clusters[i].proximity = Math.min(1, dist / PROX_RADIUS);
        }
      } else {
        clusters.forEach((c) => { c.proximity = 1; });
      }

      // check which clusters sit inside any ripple wavefront band
      const rippleHit = new Map<number, number>(); // idx → fade factor 0–1
      for (const rp of ripplesRef.current) {
        const currentR   = (t - rp.startTime) * RIPPLE_SPEED;
        const bandCenter = currentR - RIPPLE_BAND / 2;
        const maxR       = currentR;
        const minR       = currentR - RIPPLE_BAND;

        const clMinC = Math.floor((rp.x - maxR) / CLUSTER) - 1;
        const clMaxC = Math.ceil ((rp.x + maxR) / CLUSTER) + 1;
        const clMinR = Math.floor((rp.y - maxR) / CLUSTER) - 1;
        const clMaxR = Math.ceil ((rp.y + maxR) / CLUSTER) + 1;

        for (let r = Math.max(0, clMinR); r <= Math.min(gridRef.current.rows - 1, clMaxR); r++) {
          for (let c = Math.max(0, clMinC); c <= Math.min(gridRef.current.cols - 1, clMaxC); c++) {
            const cx   = c * CLUSTER + CLUSTER / 2;
            const cy   = r * CLUSTER + CLUSTER / 2;
            const dist = Math.sqrt((cx - rp.x) ** 2 + (cy - rp.y) ** 2);
            if (dist < minR || dist > maxR) continue;
            // bell-curve within band: 1 at centre, 0 at edges
            const bandT   = Math.abs(dist - bandCenter) / (RIPPLE_BAND / 2);
            const bandFade = Math.pow(1 - bandT, 2);
            // also fade as ripple approaches max radius
            const radFade  = 1 - currentR / RIPPLE_MAX_R;
            const fade     = bandFade * radFade;
            const idx      = r * gridRef.current.cols + c;
            rippleHit.set(idx, Math.max(rippleHit.get(idx) ?? 0, fade));
          }
        }
      }

      // trigger off→appearing for clusters hit by a wavefront (prob weighted by fade)
      for (const [idx, fade] of rippleHit) {
        const c = clusters[idx];
        if (c.phase === "off" && Math.random() < fade) {
          c.phase        = "appearing";
          c.shape        = pickShape();
          c.order        = shuffle(Array.from({ length: SHAPES[c.shape].length }, (_, k) => k));
          c.visibleCount = 0;
          c.nextStepTime = t + stepMs(c.proximity);
        }
      }

      // run normal state machine for all clusters
      for (let i = 0; i < clusters.length; i++) {
        const c = clusters[i];
        if (t < c.nextStepTime) continue;

        const col      = i % cols;
        const row      = Math.floor(i / cols);
        const wb       = waveBoost(col * CLUSTER, row * CLUSTER, t);
        const shapeLen = SHAPES[c.shape].length;
        const p        = c.proximity; // 0=fast, 1=slow

        switch (c.phase) {
          case "off": {
            const probOn = FILL * (0.6 + wb * 1.2);
            if (Math.random() < probOn) {
              c.phase        = "appearing";
              c.shape        = pickShape();
              c.order        = shuffle(Array.from({ length: SHAPES[c.shape].length }, (_, k) => k));
              c.visibleCount = 0;
              c.nextStepTime = t + stepMs(p);
            } else {
              c.nextStepTime = t + offMs();
            }
            break;
          }
          case "appearing": {
            c.visibleCount++;
            if (c.visibleCount >= shapeLen) {
              c.phase        = "holding";
              c.nextStepTime = t + holdMs(p);
            } else {
              c.nextStepTime = t + stepMs(p);
            }
            break;
          }
          case "holding": {
            c.phase        = "disappearing";
            c.order        = shuffle(Array.from({ length: shapeLen }, (_, k) => k));
            c.nextStepTime = t + stepMs(p);
            break;
          }
          case "disappearing": {
            c.visibleCount--;
            if (c.visibleCount <= 0) {
              c.phase        = "off";
              c.visibleCount = 0;
              c.nextStepTime = t + offMs();
              // gray dot finished its cycle — clear colored cells 50% of the time
              if (Math.random() < 0.5) {
                const ox = col * CLUSTER, oy = row * CLUSTER;
                for (let sc = 0; sc < 3; sc++)
                  for (let sr = 0; sr < 3; sr++)
                    coloredCells.delete(`${ox + sc * UNIT},${oy + sr * UNIT}`);
              }
            } else {
              c.nextStepTime = t + stepMs(p);
            }
            break;
          }
        }
      }
    }, 30);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── colored landing spots from swirl (keyed by UNIT grid x,y) ──────
      for (const [key, color] of coloredCells) {
        const [ux, uy] = key.split(",").map(Number);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(ux + SQ / 2, uy + SQ / 2, SQ / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgb(${COLOR})`;

      const { clusters, cols, rows } = gridRef.current;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cl = clusters[r * cols + c];
          if (cl.visibleCount === 0) continue;
          const ox  = c * CLUSTER;
          const oy  = r * CLUSTER;
          const pts = SHAPES[cl.shape];
          for (let k = 0; k < cl.visibleCount && k < cl.order.length; k++) {
            const [sc, sr] = pts[cl.order[k]];
            ctx.moveTo(ox + sc * UNIT + SQ / 2, oy + sr * UNIT + SQ / 2);
            ctx.arc(ox + sc * UNIT + SQ / 2, oy + sr * UNIT + SQ / 2, SQ / 2, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();

      const BURST_SPEED    = 0.32;
      const BURST_BAND     = 18;
      const BURST_MAX_R    = 200;
      const now2 = performance.now();
      burstsRef.current = burstsRef.current.filter(b => (now2 - b.startTime) * BURST_SPEED < BURST_MAX_R);
      if (burstsRef.current.length > 0) {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        for (const burst of burstsRef.current) {
          const currentR  = (now2 - burst.startTime) * BURST_SPEED;
          const minR      = currentR - BURST_BAND;
          const clMinC    = Math.floor((burst.x - currentR) / CLUSTER) - 1;
          const clMaxC    = Math.ceil ((burst.x + currentR) / CLUSTER) + 1;
          const clMinR    = Math.floor((burst.y - currentR) / CLUSTER) - 1;
          const clMaxR    = Math.ceil ((burst.y + currentR) / CLUSTER) + 1;
          for (let br = Math.max(0, clMinR); br <= Math.min(rows - 1, clMaxR); br++) {
            for (let bc = Math.max(0, clMinC); bc <= Math.min(cols - 1, clMaxC); bc++) {
              const cx   = bc * CLUSTER + CLUSTER / 2;
              const cy   = br * CLUSTER + CLUSTER / 2;
              const dist = Math.sqrt((cx - burst.x) ** 2 + (cy - burst.y) ** 2);
              if (dist < minR || dist > currentR) continue;
              const bandT = Math.abs(dist - (currentR - BURST_BAND / 2)) / (BURST_BAND / 2);
              const fade  = Math.pow(1 - Math.min(bandT, 1), 1.5) * (1 - currentR / BURST_MAX_R);
              if (Math.random() > fade * 1.4) continue;
              const ox = bc * CLUSTER, oy = br * CLUSTER;
              const numPx = 1 + Math.floor(fade * 4);
              for (let p = 0; p < numPx; p++) {
                const px = ox + Math.floor(Math.random() * (CLUSTER / SQ)) * SQ + SQ / 2;
                const py = oy + Math.floor(Math.random() * (CLUSTER / SQ)) * SQ + SQ / 2;
                ctx.moveTo(px + SQ / 2, py);
                ctx.arc(px, py, SQ / 2, 0, Math.PI * 2);
              }
            }
          }
        }
        ctx.fill();
        ctx.fillStyle = `rgb(${COLOR})`;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    const onMove  = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      burstsRef.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, startTime: performance.now() });
    };

    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click",      onClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(updateInterval);
      ro.disconnect();
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click",      onClick);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
  );
}


const coloredCells = new Map<string, string>();

const SWIRL_PALETTE = [
  "#b8e7fc", // sky blue
  "#ff66cf", // hot pink
  "#fc7540", // light pink
  "#79d746", // mint
  "#61b7f9", // tan
  "#9500ff", // royal blue
  "#dfe94d", // yellow-green
  "#81eccf", // teal
];
function pickSwirlColor() {
  return SWIRL_PALETTE[Math.floor(Math.random() * SWIRL_PALETTE.length)];
}

// Particles hop: they freeze while visible, then teleport to next orbit position
// when they blink off→on. This creates discrete hops instead of smooth gliding.
type SwirlParticle = {
  x: number; y: number;
  angle:    number;
  radius:   number;
  radiusV:  number;
  angularV: number;
  color:    string;
  showing:      boolean;
  frameCounter: number;
  showFrames:   number;
  hideFrames:   number;
  life:  number;
  decay: number;
  displayAlpha:  number;  // lerped 0→1 on show, 1→0 on hide
  displayRadius: number;  // lerped 0→SQ/2 on show, back to 0 on hide
};

function snapToUnitGrid(v: number) {
  return Math.round(v / UNIT) * UNIT;
}

function CursorSwirl() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<SwirlParticle[]>([]);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function spawnParticles(mx: number, my: number, count: number, spd = 0) {
      const speedBoost = Math.min(spd / 5, 1); // 0 at rest, 1 at speed≥5px/frame
      const maxR = 16 + speedBoost * 140;       // 16px idle → 156px fast
      for (let i = 0; i < count; i++) {
        const angle  = Math.random() * Math.PI * 2;
        const radius = 10 + Math.random() * maxR;
        const rawX   = mx + Math.cos(angle) * radius;
        const rawY   = my + Math.sin(angle) * radius;
        particlesRef.current.push({
          x:           snapToUnitGrid(rawX),
          y:           snapToUnitGrid(rawY),
          angle,
          radius,
          radiusV:     0.08 + Math.random() * 0.18,
          angularV:    (Math.random() > 0.5 ? 1 : -1) * (0.012 + Math.random() * 0.025),
          color:       pickSwirlColor(),
          showing:     true,
          frameCounter:0,
          showFrames:  6  + Math.floor(Math.random() * 6),
          hideFrames:  10 + Math.floor(Math.random() * 10),
          life:        1,
          decay:       0.002 + Math.random() * 0.003,
          displayAlpha:  0,
          displayRadius: 0,
        });
      }
    }

    let frameCount = 0;
    let lastMx = -9999, lastMy = -9999;
    let smoothSpd = 0; // exponential moving average of speed

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx > -100) {
        const dx = mx - lastMx, dy = my - lastMy;
        const spd = Math.sqrt(dx * dx + dy * dy);
        smoothSpd = smoothSpd * 0.8 + spd * 0.2;
        if (frameCount % 2 === 0 || spd > 3) spawnParticles(mx, my, 3, smoothSpd);
        lastMx = mx; lastMy = my;
      } else {
        smoothSpd *= 0.9;
      }

      const LERP = 0.1; // transition speed per frame
      const TARGET_R = SQ * 1.5;

      const alive: SwirlParticle[] = [];
      for (const p of particlesRef.current) {
        p.life -= p.decay;
        p.frameCounter++;

        const targetAlpha  = p.showing ? 1 : 0;
        const targetRadius = p.showing ? TARGET_R : 0;
        p.displayAlpha  += (targetAlpha  - p.displayAlpha)  * LERP;
        p.displayRadius += (targetRadius - p.displayRadius) * LERP;

        if (p.showing) {
          if (p.frameCounter >= p.showFrames) {
            p.showing = false;
            p.frameCounter = 0;
          }
        } else {
          if (p.frameCounter >= p.hideFrames) {
            p.angle  += p.angularV * p.hideFrames;
            p.radius += p.radiusV  * p.hideFrames;
            const rawX = mx + Math.cos(p.angle) * p.radius;
            const rawY = my + Math.sin(p.angle) * p.radius;
            p.x = snapToUnitGrid(rawX);
            p.y = snapToUnitGrid(rawY);
            p.showing = true;
            p.frameCounter = 0;
          }
        }

        // draw if visible enough and cursor is active
        if (mx > -100 && p.displayAlpha > 0.01 && p.displayRadius > 0.1) {
          ctx.globalAlpha = p.displayAlpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.displayRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        if (p.life <= 0 || p.radius > 200) {
          if (p.x > 0 && p.y > 0 && p.x < canvas.width && p.y < canvas.height) {
            coloredCells.set(`${p.x},${p.y}`, p.color);
          }
          continue;
        }
        alive.push(p);
      }
      particlesRef.current = alive;

      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: -9999, y: -9999 };
        lastMx = -9999; lastMy = -9999;
      }
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

export default function HomePage() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    router.push(`/#${id}`);
  };


  const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const fadeUp = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <main className="bg-white">

      {/* ── hero — bg + text in normal flow, no parallax ── */}
      <section className="relative w-full ">
        <div className="relative w-full overflow-hidden  min-h-[100svh] sm:min-h-[80svh] md:min-h-[100svh] sm:overflow-visible">


          <CursorSwirl />

          <motion.div
            className="relative z-10 pointer-events-none flex flex-col justify-start px-[5%] pt-24 pb-[10%] sm:absolute sm:inset-x-0 sm:top-0 lg:pt-20 sm:pb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
          >
         

            <motion.h1
              variants={fadeUp}
              className="leading-[0.9] tracking-tight mt-20 text-black "
              style={{ fontFamily: "Century Gothic", fontSize: "clamp(46px, 10vw, 160px)" }}
            >
              Hi! I'm Cindy
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="hidden lg:block mt-8 text-black text-wrap text-body leading-tight max-w-[700px]"
            >
              A multifaceted <b>Developer</b> and <b>Designer</b> curating tech solutions through research, designing, user testing, developing, and product focused thinking.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="lg:hidden mt-4 text-black text-wrap  text-body leading-snug max-w-[400px] md:max-w-[520px]"
            >
              A multifaceted <b>Developer</b> and <b>Designer</b> curating tech solutions through research, designing, user testing, developing, and product focused thinking.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-8 flex pointer-events-auto "
            >
              <span 
              onClick={() => scrollToSection("contact")}
              className="black-button hover:scale-[1.05] cursor-pointer transition-transform duration-300 ease-in-out ">Let's get in touch</span>
            </motion.p>
          </motion.div>

        </div>
      </section>
      <div className="border border-b-light-black mb-20"/>

      {/* ── projects + footer ── */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div id="works"><FeaturedProjectsSection /></div>
      </div>

      <div className="mt-20 mx-auto w-full max-w-[1440px]">
        <FeaturedProjectsSection showExtras/>
      </div>
      
      <Footer />

    </main>
  );
}
