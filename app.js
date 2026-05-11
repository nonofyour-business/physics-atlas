const demos = {
  projectile: {
    label: "Projectile motion",
    title: "Aim the arc.",
    controlTitle: "Projectile Motion",
    description:
      "A projectile keeps its horizontal velocity while gravity steadily changes its vertical velocity.",
    equation: "R = v² sin(2θ) / g",
    challenge: "Find the angle that sends the same launch speed farthest.",
    controls: [
      { key: "speed", label: "Launch speed", min: 12, max: 48, step: 1, value: 32, unit: "m/s" },
      { key: "angle", label: "Launch angle", min: 12, max: 78, step: 1, value: 42, unit: "°" },
      { key: "gravity", label: "Gravity", min: 1.6, max: 18, step: 0.1, value: 9.8, unit: "m/s²" }
    ]
  },
  waves: {
    label: "Wave interference",
    title: "Tune the ripple.",
    controlTitle: "Wave Interference",
    description:
      "When waves overlap, their displacements add. Peaks reinforce; peak and trough cancel.",
    equation: "v = fλ",
    challenge: "Raise the frequency and watch wavelength shrink when wave speed stays fixed.",
    controls: [
      { key: "frequency", label: "Frequency", min: 1, max: 9, step: 0.1, value: 4.2, unit: "Hz" },
      { key: "amplitude", label: "Amplitude", min: 10, max: 70, step: 1, value: 42, unit: "px" },
      { key: "phase", label: "Phase offset", min: 0, max: 6.28, step: 0.01, value: 1.3, unit: "rad" }
    ]
  },
  gravity: {
    label: "Orbital gravity",
    title: "Miss the planet forever.",
    controlTitle: "Orbital Gravity",
    description:
      "An orbit is falling with enough sideways speed that the falling body keeps missing the center.",
    equation: "F = Gm₁m₂ / r²",
    challenge: "Increase sideways speed until the path changes from a plunge to a wide loop.",
    controls: [
      { key: "mass", label: "Central mass", min: 35, max: 120, step: 1, value: 72, unit: "M" },
      { key: "velocity", label: "Sideways speed", min: 18, max: 90, step: 1, value: 54, unit: "km/s" },
      { key: "distance", label: "Starting distance", min: 90, max: 210, step: 1, value: 148, unit: "Mm" }
    ]
  },
  optics: {
    label: "Refraction",
    title: "Split the beam.",
    controlTitle: "Prism Optics",
    description:
      "Light bends when it changes speed in a new material. Different wavelengths bend by different amounts.",
    equation: "n₁ sin θ₁ = n₂ sin θ₂",
    challenge: "Increase refractive index and watch the rainbow spread widen.",
    controls: [
      { key: "index", label: "Refractive index", min: 1.0, max: 1.9, step: 0.01, value: 1.52, unit: "n" },
      { key: "angle", label: "Entry angle", min: 12, max: 64, step: 1, value: 36, unit: "°" },
      { key: "spread", label: "Dispersion", min: 0, max: 1, step: 0.01, value: 0.55, unit: "" }
    ]
  },
  quantum: {
    label: "Quantum probability",
    title: "Probability, not prophecy.",
    controlTitle: "Quantum Probability",
    description:
      "Quantum models predict a probability pattern. Repeated measurements build the pattern dot by dot.",
    equation: "P(x) = |ψ(x)|²",
    challenge: "Tighten the slit separation and notice the interference bands spread out.",
    controls: [
      { key: "separation", label: "Slit separation", min: 18, max: 90, step: 1, value: 54, unit: "nm" },
      { key: "wavelength", label: "Wavelength", min: 12, max: 48, step: 1, value: 26, unit: "nm" },
      { key: "particles", label: "Samples", min: 80, max: 520, step: 10, value: 260, unit: "" }
    ]
  }
};

const demoCanvas = document.querySelector("#demo-canvas");
const demoCtx = demoCanvas.getContext("2d");
const fieldCanvas = document.querySelector("#field-canvas");
const fieldCtx = fieldCanvas.getContext("2d");
const controlsEl = document.querySelector("#controls");
const metricsEl = document.querySelector("#metrics");
const tabs = [...document.querySelectorAll(".tab")];
const readout = document.querySelector("#hero-readout");
const heroTip = document.querySelector("#hero-tip");
let currentDemo = "projectile";
const state = Object.fromEntries(
  Object.entries(demos).map(([key, demo]) => [
    key,
    Object.fromEntries(demo.controls.map((control) => [control.key, control.value]))
  ])
);

function resizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return rect;
}

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function formatNumber(value, digits = 1) {
  return Number(value).toFixed(digits).replace(/\.0$/, "");
}

function renderControls() {
  const demo = demos[currentDemo];
  setText("#demo-kicker", demo.label);
  setText("#demo-title", demo.title);
  setText("#control-title", demo.controlTitle);
  setText("#control-description", demo.description);
  setText("#demo-equation", demo.equation);
  setText("#challenge", demo.challenge);
  controlsEl.innerHTML = "";

  for (const control of demo.controls) {
    const row = document.createElement("label");
    row.className = "control-row";
    row.innerHTML = `
      <span class="control-label">
        <span>${control.label}</span>
        <output>${formatNumber(state[currentDemo][control.key], control.step < 1 ? 2 : 0)} ${control.unit}</output>
      </span>
      <input type="range" min="${control.min}" max="${control.max}" step="${control.step}" value="${state[currentDemo][control.key]}" />
    `;
    const input = row.querySelector("input");
    const output = row.querySelector("output");
    input.addEventListener("input", () => {
      state[currentDemo][control.key] = Number(input.value);
      output.textContent = `${formatNumber(Number(input.value), control.step < 1 ? 2 : 0)} ${control.unit}`;
      updateReadout();
    });
    controlsEl.append(row);
  }
  updateReadout();
}

function setMetrics(items) {
  metricsEl.innerHTML = items
    .map((item) => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`)
    .join("");
}

function updateReadout() {
  const s = state[currentDemo];
  if (currentDemo === "projectile") {
    const theta = (s.angle * Math.PI) / 180;
    const range = (s.speed ** 2 * Math.sin(2 * theta)) / s.gravity;
    const hang = (2 * s.speed * Math.sin(theta)) / s.gravity;
    const peak = (s.speed ** 2 * Math.sin(theta) ** 2) / (2 * s.gravity);
    readout.textContent = `Range ≈ ${formatNumber(range)} m`;
    heroTip.textContent = "At equal launch and landing height, 45° maximizes range.";
    setMetrics([
      { label: "Range", value: `${formatNumber(range)} m` },
      { label: "Hang time", value: `${formatNumber(hang)} s` },
      { label: "Peak", value: `${formatNumber(peak)} m` },
      { label: "Gravity", value: `${formatNumber(s.gravity)} m/s²` }
    ]);
  }
  if (currentDemo === "waves") {
    const wavelength = 120 / s.frequency;
    readout.textContent = `λ ≈ ${formatNumber(wavelength)} m`;
    heroTip.textContent = "For fixed wave speed, higher frequency means shorter wavelength.";
    setMetrics([
      { label: "Frequency", value: `${formatNumber(s.frequency)} Hz` },
      { label: "Wavelength", value: `${formatNumber(wavelength)} m` },
      { label: "Amplitude", value: `${formatNumber(s.amplitude, 0)} px` },
      { label: "Phase", value: `${formatNumber(s.phase, 2)} rad` }
    ]);
  }
  if (currentDemo === "gravity") {
    const escape = Math.sqrt((2 * s.mass * 2800) / s.distance);
    readout.textContent = `Escape cue ≈ ${formatNumber(escape)} km/s`;
    heroTip.textContent = "Too little sideways speed falls inward; enough keeps curving around.";
    setMetrics([
      { label: "Mass", value: `${formatNumber(s.mass, 0)} M` },
      { label: "Speed", value: `${formatNumber(s.velocity, 0)} km/s` },
      { label: "Distance", value: `${formatNumber(s.distance, 0)} Mm` },
      { label: "Escape cue", value: `${formatNumber(escape)} km/s` }
    ]);
  }
  if (currentDemo === "optics") {
    const bend = Math.asin(Math.sin((s.angle * Math.PI) / 180) / s.index) * (180 / Math.PI);
    readout.textContent = `Bent to ≈ ${formatNumber(bend)}°`;
    heroTip.textContent = "A larger refractive index means light slows more and bends closer to normal.";
    setMetrics([
      { label: "Entry", value: `${formatNumber(s.angle, 0)}°` },
      { label: "Refracted", value: `${formatNumber(bend)}°` },
      { label: "Index", value: `${formatNumber(s.index, 2)}` },
      { label: "Spread", value: `${formatNumber(s.spread * 100, 0)}%` }
    ]);
  }
  if (currentDemo === "quantum") {
    const band = (s.wavelength / s.separation) * 140;
    readout.textContent = `Band spacing ≈ ${formatNumber(band)} px`;
    heroTip.textContent = "The pattern appears only after many individual detections accumulate.";
    setMetrics([
      { label: "Samples", value: `${formatNumber(s.particles, 0)}` },
      { label: "Separation", value: `${formatNumber(s.separation, 0)} nm` },
      { label: "Wavelength", value: `${formatNumber(s.wavelength, 0)} nm` },
      { label: "Band gap", value: `${formatNumber(band)} px` }
    ]);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentDemo = tab.dataset.demo;
    tabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });
    renderControls();
  });
});

function drawGrid(ctx, w, h) {
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + h * 0.35, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 42) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + w * 0.16);
    ctx.stroke();
  }
}

function drawProjectile(ctx, w, h, t) {
  const s = state.projectile;
  const theta = (s.angle * Math.PI) / 180;
  const range = (s.speed ** 2 * Math.sin(2 * theta)) / s.gravity;
  const peak = (s.speed ** 2 * Math.sin(theta) ** 2) / (2 * s.gravity);
  const scaleX = (w - 90) / Math.max(range, 30);
  const scaleY = (h - 110) / Math.max(peak, 20);
  const origin = { x: 45, y: h - 55 };
  ctx.strokeStyle = "#ffd166";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 120; i++) {
    const time = (i / 120) * ((2 * s.speed * Math.sin(theta)) / s.gravity);
    const x = s.speed * Math.cos(theta) * time;
    const y = s.speed * Math.sin(theta) * time - 0.5 * s.gravity * time ** 2;
    const px = origin.x + x * scaleX;
    const py = origin.y - y * scaleY;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  const phase = (Math.sin(t * 0.0012) + 1) / 2;
  const flyT = phase * ((2 * s.speed * Math.sin(theta)) / s.gravity);
  const bx = origin.x + s.speed * Math.cos(theta) * flyT * scaleX;
  const by = origin.y - (s.speed * Math.sin(theta) * flyT - 0.5 * s.gravity * flyT ** 2) * scaleY;
  drawGlow(ctx, bx, by, 11, "#58d7ff");
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillRect(origin.x, origin.y, w - 90, 2);
}

function drawWaves(ctx, w, h, t) {
  const s = state.waves;
  const mid = h / 2;
  for (const [color, phase] of [
    ["#58d7ff", 0],
    ["#ff6f91", s.phase]
  ]) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const y = mid + Math.sin(x * s.frequency * 0.018 - t * 0.004 + phase) * s.amplitude;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(132,240,141,0.65)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x <= w; x += 3) {
    const y =
      mid +
      Math.sin(x * s.frequency * 0.018 - t * 0.004) * s.amplitude * 0.5 +
      Math.sin(x * s.frequency * 0.018 - t * 0.004 + s.phase) * s.amplitude * 0.5;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawGravity(ctx, w, h, t) {
  const s = state.gravity;
  const cx = w / 2;
  const cy = h / 2;
  drawGlow(ctx, cx, cy, Math.max(24, s.mass * 0.38), "#ffd166");
  ctx.strokeStyle = "rgba(88,215,255,0.38)";
  ctx.lineWidth = 2;
  const rx = s.distance * 1.15;
  const ry = Math.max(36, rx * (0.35 + s.velocity / 180));
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, -0.25, 0, Math.PI * 2);
  ctx.stroke();
  const a = t * 0.001 * (s.velocity / 48);
  const px = cx + Math.cos(a) * rx * Math.cos(-0.25) - Math.sin(a) * ry * Math.sin(-0.25);
  const py = cy + Math.cos(a) * rx * Math.sin(-0.25) + Math.sin(a) * ry * Math.cos(-0.25);
  drawGlow(ctx, px, py, 9, "#84f08d");
}

function drawOptics(ctx, w, h) {
  const s = state.optics;
  const prism = [
    [w * 0.45, h * 0.2],
    [w * 0.28, h * 0.76],
    [w * 0.68, h * 0.72]
  ];
  ctx.fillStyle = "rgba(88,215,255,0.12)";
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  prism.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(20, h * 0.48);
  ctx.lineTo(w * 0.35, h * 0.48);
  ctx.stroke();
  const colors = ["#ff4d6d", "#ffd166", "#84f08d", "#58d7ff", "#9b8cff"];
  colors.forEach((color, i) => {
    const offset = (i - 2) * s.spread * 18 * s.index;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.48, h * 0.5);
    ctx.lineTo(w - 22, h * 0.43 + offset + s.angle * 0.42);
    ctx.stroke();
  });
}

function drawQuantum(ctx, w, h, t) {
  const s = state.quantum;
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(w * 0.18, h * 0.18, 10, h * 0.64);
  ctx.clearRect(w * 0.18, h * 0.42 - s.separation * 0.15, 10, 7);
  ctx.clearRect(w * 0.18, h * 0.58 + s.separation * 0.15, 10, 7);
  const spacing = (s.wavelength / s.separation) * 145;
  for (let i = 0; i < s.particles; i++) {
    const x = w * 0.36 + ((i * 37) % Math.max(1, w * 0.56));
    const band = Math.sin((x + t * 0.05) / spacing) ** 2;
    const y = h / 2 + Math.sin(i * 12.989) * h * 0.36 * band;
    ctx.fillStyle = `rgba(88,215,255,${0.12 + band * 0.62})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGlow(ctx, x, y, radius, color) {
  const gradient = ctx.createRadialGradient(x, y, 1, x, y, radius * 2.2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.35, `${color}88`);
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();
}

function drawField(t) {
  const rect = resizeCanvas(fieldCanvas);
  const w = rect.width;
  const h = rect.height;
  fieldCtx.clearRect(0, 0, w, h);
  drawGrid(fieldCtx, w, h);
  for (let i = 0; i < 56; i++) {
    const x = ((i * 97 + t * 0.018) % (w + 180)) - 90;
    const y = h * 0.18 + ((i * 53) % Math.max(1, h * 0.72));
    const pulse = 0.5 + Math.sin(t * 0.001 + i) * 0.5;
    fieldCtx.fillStyle = `rgba(${i % 3 === 0 ? "255,209,102" : i % 3 === 1 ? "88,215,255" : "132,240,141"},${0.2 + pulse * 0.45})`;
    fieldCtx.beginPath();
    fieldCtx.arc(x, y + Math.sin(t * 0.0015 + i) * 22, 1.6 + pulse * 2.5, 0, Math.PI * 2);
    fieldCtx.fill();
  }
}

function drawDemo(t) {
  const rect = resizeCanvas(demoCanvas);
  const w = rect.width;
  const h = rect.height;
  demoCtx.clearRect(0, 0, w, h);
  drawGrid(demoCtx, w, h);
  if (currentDemo === "projectile") drawProjectile(demoCtx, w, h, t);
  if (currentDemo === "waves") drawWaves(demoCtx, w, h, t);
  if (currentDemo === "gravity") drawGravity(demoCtx, w, h, t);
  if (currentDemo === "optics") drawOptics(demoCtx, w, h, t);
  if (currentDemo === "quantum") drawQuantum(demoCtx, w, h, t);
}

function frame(t) {
  drawField(t);
  drawDemo(t);
  requestAnimationFrame(frame);
}

window.addEventListener("resize", () => {
  resizeCanvas(fieldCanvas);
  resizeCanvas(demoCanvas);
});

renderControls();
requestAnimationFrame(frame);
