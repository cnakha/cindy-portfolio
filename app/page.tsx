"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";

// ── pixel constants ───────────────────────────────────────────────────────────
const SQ   = 4;
const UNIT = SQ + 4;        // 8px sub-unit
const CLUSTER = UNIT * 3;   // 24px cluster cell
const COLOR = "189,189,189";
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

// ── blob canvas ───────────────────────────────────────────────────────────────
const BLOB_PALETTE = [
  "#0c2ac1", "#2f65ed", "#96abf0",
  "#7674ff", "#c6dcff","#59a8fd",
];

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

function pickBlobColor() {
  return BLOB_PALETTE[Math.floor(Math.random() * BLOB_PALETTE.length)];
}

// Ambient blobs — always present, organically drifting
type AmbientBlob = {
  x: number; y: number;
  vx: number; vy: number;
  speed: number;        // magnitude of velocity
  steerAngle: number;   // current heading in radians
  steerRate: number;    // how fast heading rotates (organic curving)
  r: number;
  color: string;
  phase: number;
};

// Ripple blobs — emitted from mouse
type RippleBlob = {
  x: number; y: number;
  startTime: number;
  color: string;
  scaleX: number; scaleY: number;
  angle: number;
  maxR: number;
  lifetime: number;
};

const EMIT_MS = 300; // faster emission so blobs feel responsive to mouse movement

function BlobCanvas() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const mouseRef       = useRef({ x: -9999, y: -9999 });
  const ambientRef     = useRef<AmbientBlob[]>([]);
  const ripplesRef     = useRef<RippleBlob[]>([]);
  const lastEmitRef    = useRef(0);
  const rafRef         = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    function initAmbient() {
      const w = canvas.width, h = canvas.height;
      ambientRef.current = Array.from({ length: 6 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const spd   = 2.2 + Math.random() * 2.0; // 2.2–4.2 px/frame ≈ 130–250 px/sec
        return {
          x:          Math.random() * w,
          y:          Math.random() * h,
          vx:         Math.cos(angle) * spd,
          vy:         Math.sin(angle) * spd,
          speed:      spd,
          steerAngle: angle,
          steerRate:  (Math.random() - 0.5) * 0.012, // gentle organic curve
          r:          280 + Math.random() * 280,
          color:      pickBlobColor(),
          phase:      Math.random() * Math.PI * 2,
        };
      });
    }

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initAmbient();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function drawBlob(
      cx: number, cy: number,
      rx: number, ry: number,
      angle: number,
      color: string,
      alpha: number,
    ) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(rx, ry);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      // solid core that holds color much longer before fading
      grad.addColorStop(0,    ha(color, alpha));
      grad.addColorStop(0.40, ha(color, alpha * 0.92));
      grad.addColorStop(0.75, ha(color, alpha * 0.55));
      grad.addColorStop(1,    ha(color, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // emit ripple blobs from mouse
      if (mx > -100 && t - lastEmitRef.current > EMIT_MS) {
        const count = 2 + Math.floor(Math.random() * 2);
        for (let k = 0; k < count; k++) {
          ripplesRef.current.push({
            x:         mx + (Math.random() - 0.5) * 50,
            y:         my + (Math.random() - 0.5) * 50,
            startTime: t + k * 40,
            color:     pickBlobColor(),
            scaleX:    0.8 + Math.random() * 0.7,
            scaleY:    0.55 + Math.random() * 0.55,
            angle:     Math.random() * Math.PI,
            maxR:      280 + Math.random() * 220, // larger ripple blobs
            lifetime:  1200 + Math.random() * 800, // shorter life = faster turnover
          });
        }
        lastEmitRef.current = t;
      }

      ripplesRef.current = ripplesRef.current.filter(b => t - b.startTime < b.lifetime);

      // ── ambient layer ─────────────────────────────────────────────────────
      ctx.save();
      ctx.filter = "blur(40px)";
      for (const b of ambientRef.current) {
        // steer heading gradually for organic curving paths
        b.steerAngle += b.steerRate;

        // mouse repulsion — flee from cursor
        const mdx = b.x - mx, mdy = b.y - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const REPEL_R = 380; // px radius of influence
        let speedMult = 1;
        if (mdist < REPEL_R && mx > -100) {
          const t01 = 1 - mdist / REPEL_R; // 1 at center, 0 at edge
          const repelStr = t01 * t01 * 0.35; // steer strongly away
          const awayAngle = Math.atan2(mdy, mdx);
          let da2 = awayAngle - b.steerAngle;
          while (da2 > Math.PI)  da2 -= Math.PI * 2;
          while (da2 < -Math.PI) da2 += Math.PI * 2;
          b.steerAngle += da2 * repelStr;
          speedMult = 1 + t01 * 8; // up to 9× faster near mouse
        }

        // nudge toward center if too far out, so blobs stay on screen
        const cx = canvas.width / 2, cy = canvas.height / 2;
        const dx = cx - b.x, dy = cy - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = dist > Math.max(canvas.width, canvas.height) * 0.55 ? 0.004 : 0;
        const targetAngle = Math.atan2(dy, dx);
        let da = targetAngle - b.steerAngle;
        while (da > Math.PI) da -= Math.PI * 2;
        while (da < -Math.PI) da += Math.PI * 2;
        b.steerAngle += da * pull;
        b.vx = Math.cos(b.steerAngle) * b.speed * speedMult;
        b.vy = Math.sin(b.steerAngle) * b.speed * speedMult;
        b.x += b.vx; b.y += b.vy;
        // wrap around edges so blobs re-enter from the other side
        if (b.x < -b.r) b.x = canvas.width  + b.r;
        if (b.x > canvas.width  + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;
        const breathe = 0.80 + 0.12 * Math.sin(t * 0.0005 + b.phase);
        const aspect  = 0.55 + 0.25 * Math.sin(t * 0.0003 + b.phase * 1.7);
        drawBlob(b.x, b.y, b.r, b.r * aspect, b.steerAngle, b.color, breathe * 0.88);
      }
      ctx.restore();

      // ── ripple blobs ──────────────────────────────────────────────────────
      ctx.save();
      ctx.filter = "blur(28px)"; // less blur = more solid, visible color
      for (const b of ripplesRef.current) {
        const age      = Math.max(0, t - b.startTime);
        const progress = age / b.lifetime;
        const r        = (0.2 + progress * 0.8) * b.maxR; // starts bigger, feels snappier
        const alpha    = Math.pow(Math.sin(progress * Math.PI), 0.5) * 0.92;
        if (alpha < 0.01) continue;
        drawBlob(b.x, b.y, r * b.scaleX, r * b.scaleY, b.angle, b.color, alpha);
      }
      ctx.restore();

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
      ro.disconnect();
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "normal", opacity: 0.9 }}
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

    // ── update interval ───────────────────────────────────────────────────────
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
            } else {
              c.nextStepTime = t + stepMs(p);
            }
            break;
          }
        }
      }
    }, 30);

    // ── draw ──────────────────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgb(${COLOR})`;

      const { clusters, cols, rows } = gridRef.current;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cl = clusters[r * cols + c];
          if (cl.visibleCount === 0) continue;
          const ox  = c * CLUSTER;
          const oy  = r * CLUSTER;
          const pts = SHAPES[cl.shape];
          for (let k = 0; k < cl.visibleCount && k < cl.order.length; k++) {
            const [sc, sr] = pts[cl.order[k]];
            ctx.fillRect(ox + sc * UNIT, oy + sr * UNIT, SQ, SQ);
          }
        }
      }

      // ── click bursts — black pixels radiating outward ─────────────────────
      const BURST_SPEED    = 0.55;  // px/ms
      const BURST_BAND     = 18;    // px wavefront width
      const BURST_MAX_R    = 200;   // px
      const now2 = performance.now();
      burstsRef.current = burstsRef.current.filter(b => (now2 - b.startTime) * BURST_SPEED < BURST_MAX_R);
      if (burstsRef.current.length > 0) {
        ctx.fillStyle = "rgb(0,0,0)";
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
              // draw a small burst of single pixels scattered in this cluster
              const ox = bc * CLUSTER, oy = br * CLUSTER;
              const numPx = 1 + Math.floor(fade * 4);
              for (let p = 0; p < numPx; p++) {
                const px = ox + Math.floor(Math.random() * (CLUSTER / SQ)) * SQ;
                const py = oy + Math.floor(Math.random() * (CLUSTER / SQ)) * SQ;
                ctx.fillRect(px, py, SQ, SQ);
              }
            }
          }
        }
        ctx.fillStyle = `rgb(${COLOR})`; // restore color for next frame
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


// ── page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);



  const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const fadeUp = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <main className="bg-white">

      {/* ── hero — bg + text in normal flow, no parallax ── */}
      <section className="relative w-full ">
        <div className="relative w-full overflow-hidden  min-h-[40vh] sm:min-h-[65vh] md:min-h-[100vh] sm:overflow-visible">

          <img
            src="/landing-bg2.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover sm:relative sm:block sm:w-full h-auto md:absolute md:inset-0 sm:h-full md:object-cover sm:object-fill opacity-25"
          />

          <PixelCanvas />

          <motion.div
            className="relative z-10 pointer-events-none flex flex-col justify-start px-[5%] pt-[14%] pb-[10%] sm:absolute sm:inset-x-0 sm:top-0 sm:pt-[7%] sm:pb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-black/50 font-semibold leading-tight text-display"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.0] tracking-tight text-black"
              style={{ fontFamily: "Century Gothic, Arial, sans-serif", fontSize: "clamp(36px, 8vw, 120px)" }}
            >
              Cindy<br />Nakhammouane
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="hidden lg:block mt-3 font-bold text-black leading-tight text-display"
            >
              Creative Developer &amp; Designer
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="lg:hidden mt-3 font-bold text-black leading-[1.0] text-display"
            >
              Creative Developer <br/> &amp; Designer
            </motion.p>

     

            <motion.p
              variants={fadeUp}
              className="hidden lg:block mt-2 text-black font-semibold text-body leading-snug max-w-[500px]"
            >
              Researching, designing, user testing, and coding <br/>
              cool projects with product focused thinking
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="lg:hidden mt-2 text-black font-semibold text-body leading-snug max-w-[360px]"
            >
              Researching, designing, user testing,<br />
              and coding cool projects with<br />
              product focused thinking
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-black/50 text-body font-semibold"
            >
              Based in Chicago, IL
            </motion.p>
          </motion.div>

        </div>
      </section>
      <div className="h-2 border border-black mb-20"/>

      {/* ── projects + footer ── */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div id="works"><FeaturedProjectsSection /></div>
      </div>
      
      <Footer />

    </main>
  );
}
