const concepts = [
  {
    id: "momentum",
    name: "Momentum",
    domain: "mechanics",
    x: 42,
    y: 52,
    size: 94,
    color: "#f2b84b",
    summary:
      "Momentum tracks how much motion a system carries. In an isolated system, total momentum stays constant even when motion is exchanged between objects.",
    equation: "p = mv",
    units: "p in kg m/s, m in kg, v in m/s",
    guardrail: "Conservation claims assume the chosen system is isolated from external net force.",
    related: ["Force", "Impulse", "Energy"],
  },
  {
    id: "force",
    name: "Force",
    domain: "mechanics",
    x: 32,
    y: 38,
    size: 78,
    color: "#f2b84b",
    summary:
      "Net force changes motion. Forces are vectors, so direction is as important as magnitude.",
    equation: "ΣF = ma",
    units: "force in N, mass in kg, acceleration in m/s²",
    guardrail: "Separate individual forces from net force before predicting motion.",
    related: ["Momentum", "Energy", "Gravity"],
  },
  {
    id: "energy",
    name: "Energy",
    domain: "mechanics",
    x: 51,
    y: 35,
    size: 86,
    color: "#f2b84b",
    summary:
      "Energy is a bookkeeping quantity for change and transfer. It transforms between forms without being used up.",
    equation: "E = K + U",
    units: "energy in joules",
    guardrail: "Name the system boundary before using a conservation statement.",
    related: ["Work", "Momentum", "Entropy"],
  },
  {
    id: "wave",
    name: "Wave",
    domain: "waves",
    x: 61,
    y: 58,
    size: 82,
    color: "#8fe388",
    summary:
      "A wave carries energy and information through a changing pattern, often without transporting matter with it.",
    equation: "v = fλ",
    units: "v in m/s, f in Hz, wavelength in m",
    guardrail: "Keep amplitude, phase, wavelength, and speed visually distinct.",
    related: ["Interference", "Resonance", "Optics"],
  },
  {
    id: "field",
    name: "Field",
    domain: "fields",
    x: 68,
    y: 42,
    size: 88,
    color: "#55d6e8",
    summary:
      "A field assigns a value to each point in space and time, letting interactions be modeled locally.",
    equation: "F = qE",
    units: "electric field in N/C or V/m",
    guardrail: "Field vectors show direction and magnitude; potential is a scalar landscape.",
    related: ["Charge", "Maxwell", "Gravity"],
  },
  {
    id: "entropy",
    name: "Entropy",
    domain: "matter",
    x: 47,
    y: 71,
    size: 82,
    color: "#e066ff",
    summary:
      "Entropy measures how many microscopic arrangements fit the same macroscopic description.",
    equation: "S = k ln Ω",
    units: "entropy in J/K",
    guardrail: "Do not reduce entropy to disorder; connect it to multiplicity and energy dispersal.",
    related: ["Temperature", "Energy", "Ideal Gas"],
  },
  {
    id: "quantum",
    name: "Quantum State",
    domain: "matter",
    x: 73,
    y: 68,
    size: 104,
    color: "#e066ff",
    summary:
      "A quantum state encodes probability amplitudes for measurement outcomes, not a hidden little classical path.",
    equation: "iℏ ∂ψ/∂t = Hψ",
    units: "state evolution set by energy operator H",
    guardrail: "Use probability distributions and measurement outcomes rather than mystical language.",
    related: ["Tunneling", "Spin", "Wave"],
  },
  {
    id: "relativity",
    name: "Relativity",
    domain: "cosmos",
    x: 25,
    y: 67,
    size: 92,
    color: "#55d6e8",
    summary:
      "Relativity compares measurements between observers and treats space and time as one geometric structure.",
    equation: "E = mc²",
    units: "energy in J, mass in kg, c in m/s",
    guardrail: "State the frame of reference before comparing time, length, or simultaneity.",
    related: ["Spacetime", "Gravity", "Light"],
  },
  {
    id: "gravity",
    name: "Gravity",
    domain: "cosmos",
    x: 21,
    y: 48,
    size: 76,
    color: "#55d6e8",
    summary:
      "Gravity can be modeled as a force in Newtonian physics or as spacetime curvature in general relativity.",
    equation: "F = Gm₁m₂/r²",
    units: "force in N, distance in m",
    guardrail: "Choose the model scale: near Earth, orbital, relativistic, or cosmological.",
    related: ["Relativity", "Energy", "Force"],
  },
];

const links = [
  ["force", "momentum"],
  ["momentum", "energy"],
  ["energy", "entropy"],
  ["wave", "field"],
  ["wave", "quantum"],
  ["field", "quantum"],
  ["relativity", "gravity"],
  ["gravity", "force"],
  ["relativity", "field"],
  ["entropy", "quantum"],
];

const conceptDetails = {
  momentum: {
    level: "Foundation",
    time: "8 min",
    model: "Closed system",
    intuition: "Momentum is the motion a system can trade during an interaction.",
    example: "Collisions, recoil, rockets, sports impacts, and particle scattering.",
    variables: [
      ["p", "momentum, a vector with direction"],
      ["m", "mass in kilograms"],
      ["v", "velocity in meters per second"],
    ],
    prompt: "Draw a boundary around two colliding carts. Which forces are internal, and what momentum should stay constant?",
  },
  force: {
    level: "Foundation",
    time: "9 min",
    model: "Particle model",
    equation: "sum F = m a",
    units: "force in N, mass in kg, acceleration in m/s^2",
    intuition: "Forces are interactions. The net force is the part that changes velocity.",
    example: "Elevators, friction, tension, normal force, thrust, and orbital motion.",
    variables: [
      ["sum F", "vector sum of all external forces"],
      ["m", "inertial mass"],
      ["a", "acceleration vector"],
    ],
    prompt: "Sketch every force first. Only then add them to find the net force.",
  },
  energy: {
    level: "Foundation",
    time: "10 min",
    model: "System bookkeeping",
    equation: "E total = K + U + E internal",
    intuition: "Energy tells you what changes are possible and what must be paid for.",
    example: "Roller coasters, batteries, heating, springs, engines, and orbital escape.",
    variables: [
      ["K", "kinetic energy of motion"],
      ["U", "potential energy from configuration"],
      ["E int", "thermal, chemical, or microscopic energy"],
    ],
    prompt: "What enters or leaves the system as work, heat, radiation, or matter?",
  },
  wave: {
    level: "Foundation",
    time: "8 min",
    model: "Oscillation pattern",
    equation: "v = f lambda",
    intuition: "A wave is a rule for how a disturbance repeats and travels.",
    example: "Sound, water waves, seismic waves, light, and matter waves.",
    variables: [
      ["v", "wave speed"],
      ["f", "frequency"],
      ["lambda", "wavelength"],
    ],
    prompt: "If frequency increases while wave speed stays fixed, what happens to wavelength?",
  },
  field: {
    level: "Core",
    time: "9 min",
    model: "Local interaction",
    intuition: "A field lets each point in space carry instructions for how a test object would respond.",
    example: "Electric fields near charges, gravitational fields near planets, and magnetic fields near currents.",
    variables: [
      ["F", "force on the test charge"],
      ["q", "test charge"],
      ["E", "electric field vector"],
    ],
    prompt: "At a chosen point, what direction would a positive test charge accelerate?",
  },
  entropy: {
    level: "Core",
    time: "11 min",
    model: "Microstate counting",
    equation: "S = k ln Omega",
    intuition: "Entropy counts how many hidden microscopic stories fit what you can observe.",
    example: "Gas expansion, heat flow, engines, mixing, and information erasure.",
    variables: [
      ["S", "entropy"],
      ["k", "Boltzmann constant"],
      ["Omega", "number of compatible microstates"],
    ],
    prompt: "Which macrostate can be realized in more microscopic ways?",
  },
  quantum: {
    level: "Advanced",
    time: "13 min",
    model: "Probability amplitude",
    equation: "i hbar d psi / dt = H psi",
    units: "state evolution set by the energy operator H",
    intuition: "The state is a compact prediction engine for what measurements can return.",
    example: "Electron orbitals, tunneling, spin measurements, spectra, and quantum devices.",
    variables: [
      ["psi", "quantum state"],
      ["H", "Hamiltonian or energy operator"],
      ["hbar", "reduced Planck constant"],
    ],
    prompt: "What observable is being measured, and what distribution of outcomes does the state predict?",
  },
  relativity: {
    level: "Advanced",
    time: "12 min",
    model: "Reference frames",
    equation: "E = m c^2",
    units: "energy in J, mass in kg, c in m/s",
    intuition: "Observers can disagree about distances and times while agreeing on spacetime intervals.",
    example: "GPS clocks, particle lifetimes, black holes, accelerators, and cosmology.",
    variables: [
      ["E", "energy"],
      ["m", "mass"],
      ["c", "speed of light in vacuum"],
    ],
    prompt: "Which observer is measuring which clock or ruler?",
  },
  gravity: {
    level: "Core",
    time: "10 min",
    model: "Scale dependent",
    intuition: "Gravity is weak locally but dominates at astronomical scale because mass mostly adds.",
    example: "Falling objects, tides, orbits, galaxies, black holes, and gravitational waves.",
    variables: [
      ["G", "gravitational constant"],
      ["m1, m2", "interacting masses"],
      ["r", "center-to-center separation"],
    ],
    prompt: "Is a Newtonian model enough, or do speed, curvature, or precision demand relativity?",
  },
};

const state = {
  activeConcept: concepts[0],
  activeDomain: "all",
  query: "",
  mode: "explore",
  pointer: { x: 0, y: 0 },
  time: 0,
  reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  animationFrame: null,
};

const canvas = document.querySelector("#atlasCanvas");
const ctx = canvas.getContext("2d");
const nodeLayer = document.querySelector("#nodeLayer");
const searchInput = document.querySelector("#conceptSearch");
const inspector = document.querySelector(".inspector");
const detailsToggle = document.querySelector("#detailsToggle");

function detectDevice() {
  const coarse = matchMedia("(pointer: coarse)").matches;
  const narrow = matchMedia("(max-width: 760px)").matches;
  const landscapePhone = coarse && matchMedia("(max-height: 520px)").matches;
  const mode = coarse || narrow ? (landscapePhone ? "touch landscape" : "phone focus") : "laptop atlas";
  document.body.dataset.device = mode;
  document.querySelector("#deviceMode").textContent = mode;
}

function sizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  renderNodes();
  renderAtlasFrame();
}

function visibleConcepts() {
  const q = state.query.trim().toLowerCase();
  return concepts.filter((concept) => {
    const domainMatch = state.activeDomain === "all" || concept.domain === state.activeDomain;
    const queryMatch =
      !q ||
      concept.name.toLowerCase().includes(q) ||
      concept.summary.toLowerCase().includes(q) ||
      concept.related.join(" ").toLowerCase().includes(q);
    return domainMatch && queryMatch;
  });
}

function renderNodes() {
  const visible = new Set(visibleConcepts().map((concept) => concept.id));
  nodeLayer.innerHTML = "";
  concepts.forEach((concept, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "concept-node";
    if (concept.id === state.activeConcept.id) button.classList.add("active");
    if (!visible.has(concept.id)) button.classList.add("dimmed");
    button.style.left = `${concept.x}%`;
    button.style.top = `${concept.y}%`;
    button.style.setProperty("--node-size", `${concept.size}px`);
    button.style.setProperty("--node-color", concept.color);
    button.style.setProperty("--node-glow", `${concept.color}42`);
    button.style.animationDelay = `${index * -0.23}s`;
    button.textContent = concept.name;
    button.addEventListener("click", () => selectConcept(concept));
    nodeLayer.appendChild(button);
  });
}

function renderAtlasFrame() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);

  const gradient = ctx.createRadialGradient(
    rect.width * 0.52,
    rect.height * 0.55,
    20,
    rect.width * 0.52,
    rect.height * 0.55,
    rect.width * 0.72,
  );
  gradient.addColorStop(0, "rgba(85,214,232,0.08)");
  gradient.addColorStop(1, "rgba(85,214,232,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  drawGrid(rect);
  drawLinks(rect);
  drawParticles(rect);
}

function drawAtlas() {
  state.time += state.reducedMotion ? 0 : 0.008;
  renderAtlasFrame();
  if (!state.reducedMotion) {
    state.animationFrame = requestAnimationFrame(drawAtlas);
  }
}

function syncMotionPreference() {
  state.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (state.reducedMotion && state.animationFrame) {
    cancelAnimationFrame(state.animationFrame);
    state.animationFrame = null;
    renderAtlasFrame();
  }
  if (!state.reducedMotion && !state.animationFrame) {
    drawAtlas();
  }
}

function drawGrid(rect) {
  ctx.save();
  ctx.strokeStyle = "rgba(238,244,244,0.055)";
  ctx.lineWidth = 1;
  const step = document.body.dataset.device?.includes("phone") ? 38 : 46;
  const offset = (state.time * 28) % step;
  for (let x = -step + offset; x < rect.width + step; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + rect.width * 0.08, rect.height);
    ctx.stroke();
  }
  for (let y = -step + offset; y < rect.height + step; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(rect.width, y + rect.height * 0.05);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLinks(rect) {
  const conceptById = Object.fromEntries(concepts.map((concept) => [concept.id, concept]));
  const visible = new Set(visibleConcepts().map((concept) => concept.id));
  links.forEach(([from, to]) => {
    const a = conceptById[from];
    const b = conceptById[to];
    const highlighted = from === state.activeConcept.id || to === state.activeConcept.id;
    const muted = !visible.has(from) || !visible.has(to);
    ctx.save();
    ctx.globalAlpha = muted ? 0.08 : highlighted ? 0.72 : 0.2;
    ctx.strokeStyle = highlighted ? state.activeConcept.color : "rgba(238,244,244,0.46)";
    ctx.lineWidth = highlighted ? 1.8 : 1;
    ctx.beginPath();
    ctx.moveTo((a.x / 100) * rect.width, (a.y / 100) * rect.height);
    const cx = ((a.x + b.x) / 200) * rect.width + Math.sin(state.time * 2) * 16;
    const cy = ((a.y + b.y) / 200) * rect.height + Math.cos(state.time * 2) * 16;
    ctx.quadraticCurveTo(cx, cy, (b.x / 100) * rect.width, (b.y / 100) * rect.height);
    ctx.stroke();
    ctx.restore();
  });
}

function drawParticles(rect) {
  ctx.save();
  const active = state.activeConcept;
  const cx = (active.x / 100) * rect.width;
  const cy = (active.y / 100) * rect.height;
  for (let i = 0; i < 34; i += 1) {
    const angle = state.time * (0.7 + i * 0.02) + i * 0.82;
    const radius = 70 + (i % 5) * 24;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle * 1.12) * radius * 0.58;
    ctx.globalAlpha = 0.24 + (i % 4) * 0.07;
    ctx.fillStyle = i % 3 === 0 ? active.color : "rgba(238,244,244,0.72)";
    ctx.beginPath();
    ctx.arc(x, y, i % 3 === 0 ? 2.6 : 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function selectConcept(concept) {
  const details = { ...concept, ...(conceptDetails[concept.id] || {}) };
  state.activeConcept = concept;
  document.querySelector("#conceptDomain").textContent = concept.domain;
  document.querySelector("#conceptTitle").textContent = concept.name;
  document.querySelector("#conceptLevel").textContent = details.level || "Core";
  document.querySelector("#conceptTime").textContent = details.time || "8 min";
  document.querySelector("#conceptModel").textContent = details.model || "Model";
  document.querySelector("#conceptSummary").textContent = details.summary;
  document.querySelector("#conceptEquation").textContent = details.equation;
  document.querySelector("#conceptUnits").textContent = details.units;
  document.querySelector("#conceptGuardrail").textContent = details.guardrail;
  document.querySelector("#conceptIntuition").textContent = details.intuition || "Build the idea from the system, the quantities, and the model limits.";
  document.querySelector("#conceptExample").textContent = details.example || "Used across experiments, simulations, and real systems.";
  document.querySelector("#conceptPrompt").textContent = details.prompt || "Identify the system, variables, units, and assumptions before calculating.";
  renderVariables(details.variables || [["model", "Define variables, units, and assumptions before using the equation."]]);
  document.querySelector("#mapHint").textContent = `${concept.name} opened. Related paths are lit across the atlas.`;
  renderRelated(concept);
  renderNodes();
  renderAtlasFrame();
}

function renderVariables(variables) {
  const variableList = document.querySelector("#variableList");
  variableList.innerHTML = "";
  variables.forEach(([symbol, description]) => {
    const row = document.createElement("div");
    row.className = "variable-row";
    const key = document.createElement("strong");
    key.textContent = symbol;
    const value = document.createElement("span");
    value.textContent = description;
    row.append(key, value);
    variableList.appendChild(row);
  });
}

function renderRelated(concept) {
  const relatedLinks = document.querySelector("#relatedLinks");
  relatedLinks.innerHTML = "";
  concept.related.forEach((name) => {
    const target = concepts.find((item) => item.name.toLowerCase() === name.toLowerCase());
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name;
    if (target) button.addEventListener("click", () => selectConcept(target));
    relatedLinks.appendChild(button);
  });
}

function updateMomentumLab() {
  const mass = Number(document.querySelector("#massRange").value);
  const velocity = Number(document.querySelector("#velocityRange").value);
  const momentum = mass * velocity;
  document.querySelector("#massValue").textContent = `${mass.toFixed(1)} kg`;
  document.querySelector("#velocityValue").textContent = `${velocity.toFixed(1)} m/s`;
  document.querySelector("#momentumResult").textContent = `Momentum: ${momentum.toFixed(1)} kg m/s`;
  document.querySelector("#massDot").style.setProperty("--mass-size", `${24 + mass * 4}px`);
  document.querySelector("#velocityLine").style.setProperty("--velocity-size", `${48 + velocity * 14}px`);
}

function setMode(mode) {
  state.mode = mode;
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  document.querySelector("#journeyPanel").classList.toggle("hidden", mode !== "journey");
  document.querySelector("#labPanel").classList.toggle("hidden", mode !== "lab");
  if (mode === "explore") document.querySelector("#atlas").scrollIntoView({ block: "start" });
  if (mode === "journey") document.querySelector("#journeyPanel").scrollIntoView({ block: "start" });
  if (mode === "lab") document.querySelector("#labPanel").scrollIntoView({ block: "start" });
}

function bindEvents() {
  window.addEventListener("resize", () => {
    detectDevice();
    sizeCanvas();
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", syncMotionPreference);
  document.querySelectorAll(".domain-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDomain = button.dataset.domain;
      document.querySelectorAll(".domain-button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderNodes();
      renderAtlasFrame();
    });
  });
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });
  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    const first = visibleConcepts()[0];
    if (first) selectConcept(first);
    renderNodes();
    renderAtlasFrame();
  });
  document.querySelectorAll("input[type='range']").forEach((input) => {
    input.addEventListener("input", updateMomentumLab);
  });
  if (detailsToggle) {
    detailsToggle.addEventListener("click", () => {
      const collapsed = inspector.classList.toggle("collapsed");
      detailsToggle.setAttribute("aria-expanded", String(!collapsed));
      detailsToggle.querySelector("em").textContent = collapsed ? "Show details" : "Hide details";
    });
  }
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") inspector.classList.remove("open");
    if (event.key === "/") {
      event.preventDefault();
      searchInput.focus();
    }
  });
}

detectDevice();
bindEvents();
sizeCanvas();
selectConcept(concepts[0]);
updateMomentumLab();
drawAtlas();
