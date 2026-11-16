/* ===== EDIT YOUR DETAILS HERE ===== */
const CONTENT = {
  name: "Adib Mahmud",
  job: "Software Developer",
  tagline: "I build fast & AI powered, thoughtful software that people enjoy using.",
  about:
    "I’m Adib Mahmud. I care about clean code, fast interfaces and the small details users feel. I work with teams and founders to turn ideas into reliable products.",
  strengths: ["Clean architecture", "Problem solving", "Performance"],
  skills: [
    "Frontend •",
    "Backend •",
    "APIs •",
    "System design •",
    "Databases •",
    "Performance •",
  ],
  tools: ["JS", "TS", "React", "Node", "Python", "Git"],
  projects: [
    /* replace with your real projects */
    {
      title: "Project one",
      text: "One or two lines on what you built and the problem it solved.",
      stack: "React · Node",
      link: "",
    },
    {
      title: "Project two",
      text: "One or two lines on what you built and the problem it solved.",
      stack: "TypeScript · Postgres",
      link: "",
    },
    {
      title: "Project three",
      text: "One or two lines on what you built and the problem it solved.",
      stack: "Python · APIs",
      link: "",
    },
  ],
  steps: [
    [
      "Understand",
      "Clarify the problem, the users and what success looks like.",
    ],
    ["Design", "Sketch the architecture and the data before writing code."],
    ["Build", "Ship small, tested pieces. Keep it fast and readable."],
    ["Ship & improve", "Deploy, measure, then refine from real feedback."],
  ],
  email: "hi@adibmahmud.com",
  whatsapp: "+8801601247404" /* add your email and WhatsApp number with country code */,
  socials: [
    ["GitHub", ""],
    ["LinkedIn", ""],
    ["X", ""],
  ] /* add the URLs */,
};
/* Goo button credit: Venom Button by exteestudio (MIT), github.com/exteestudio/venom-button */
const $ = (s) => document.querySelector(s),
  C = CONTENT,
  mk = (t, c, h) => {
    const e = document.createElement(t);
    if (c) e.className = c;
    if (h != null) e.innerHTML = h;
    return e;
  };
document
  .querySelectorAll("[data-c]")
  .forEach((e) => (e.textContent = C[e.dataset.c]));
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches,
  fine = matchMedia("(pointer:fine)").matches && !reduce;
$("#tools").append(...C.tools.map((t) => mk("span", "", t)));
$("#strip").append(
  ...[...C.skills, ...C.skills, ...C.skills, ...C.skills].map((s) =>
    mk("span", "", s),
  ),
);
$("#projects").append(
  ...C.projects.map((p) => {
    const a = mk(
      p.link ? "a" : "div",
      "pc",
      `<small>${p.stack}</small><h3>${p.title}</h3><p>${p.text}</p>`,
    );
    if (p.link) {
      a.href = p.link;
      a.target = "_blank";
      a.rel = "noopener";
    }
    return a;
  }),
);
$("#steps").append(
  ...C.steps.map((s) => mk("div", "st", `<h3>${s[0]}</h3><p>${s[1]}</p>`)),
);
$("#pills").append(...C.strengths.map((s) => mk("span", "", s)));
$("#em").textContent = C.email || "your@email.com (add it in script.js)";
$("#copy").onclick = (e) => {
  if (!C.email) return;
  navigator.clipboard.writeText(C.email);
  e.target.textContent = "Copied";
  setTimeout(() => (e.target.textContent = "Copy"), 1500);
};
const wa = $("#wa");
C.whatsapp
  ? ((wa.href = "https://wa.me/" + C.whatsapp.replace(/\D/g, "")),
    (wa.textContent = "WhatsApp"))
  : (wa.textContent = "WhatsApp number (add it in script.js)");
$("#soc").append(
  ...C.socials
    .filter((s) => s[1])
    .map((s) => {
      const a = mk("a", "", s[0]);
      a.href = s[1];
      a.target = "_blank";
      a.rel = "noopener";
      return a;
    }),
);
$("#stx").textContent = Array(12)
  .fill(C.job.toUpperCase() + " • " + C.name.toUpperCase() + " • ")
  .join("");
/* loader */
{
  let f = 0;
  const t = setInterval(() => {
    f += 7;
    $("#tc").textContent =
      "00:00:0" +
      Math.min(Math.floor(f / 24), 9) +
      ":" +
      String(f % 24).padStart(2, "0");
    if (f > 60) {
      clearInterval(t);
      $("#loader").classList.add("off");
      startCard();
    }
  }, 40);
}
/* nav + progress + steps */
let ly = 0;
addEventListener(
  "scroll",
  () => {
    const y = scrollY;
    $("#nav").classList.toggle("hide", y > ly && y > 120);
    ly = y;
    $("#prog").style.transform =
      `scaleX(${y / (document.body.scrollHeight - innerHeight || 1)})`;
  },
  { passive: true },
);
const io = new IntersectionObserver(
  (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
  { threshold: 0.6 },
);
document.querySelectorAll(".st").forEach((e) => io.observe(e));
/* ===== Effect 1: ID card (Verlet rope) ===== */
function startCard() {
  const lan = $("#lan"),
    card = $("#card"),
    path = $("#strap"),
    N = 12,
    G = 0.55,
    D = 0.982,
    MAX = 16;
  const SEG = innerWidth < 800 ? 14 : 24;
  let P = [],
    ax = lan.clientWidth / 2,
    ch = card.offsetHeight,
    drag = false,
    pt = { x: 0, y: 0 },
    off = { x: 0, y: 0 },
    run = false,
    calm = 0;
  for (let i = 0; i <= N; i++) {
    const y = reduce ? i * SEG : -(ch + 60);
    P.push({ x: ax, y, ox: ax, oy: y });
  }
  function step() {
    let e = 0;
    for (let i = 1; i <= N; i++) {
      const p = P[i];
      if (drag && i == N) continue;
      let vx = (p.x - p.ox) * D,
        vy = (p.y - p.oy) * D;
      const s = Math.hypot(vx, vy);
      if (s > MAX) {
        vx *= MAX / s;
        vy *= MAX / s;
      }
      p.ox = p.x;
      p.oy = p.y;
      p.x += vx;
      p.y += vy + G;
      e += Math.abs(vx) + Math.abs(vy);
    }
    if (drag) {
      const p = P[N];
      p.ox = p.x;
      p.oy = p.y;
      p.x = pt.x - off.x;
      p.y = pt.y - off.y;
      e += 9;
    }
    for (let k = 0; k < 10; k++) {
      P[0].x = ax;
      P[0].y = 0;
      for (let i = 0; i < N; i++) {
        const a = P[i],
          b = P[i + 1],
          dx = b.x - a.x,
          dy = b.y - a.y,
          d = Math.hypot(dx, dy) || 1;
        if (d > SEG) {
          const f = (d - SEG) / d;
          if (i == 0) {
            b.x -= dx * f;
            b.y -= dy * f;
          } else if (drag && i + 1 == N) {
            a.x += dx * f;
            a.y += dy * f;
          } else {
            a.x += (dx * f) / 2;
            a.y += (dy * f) / 2;
            b.x -= (dx * f) / 2;
            b.y -= (dy * f) / 2;
          }
        }
      }
    }
    return e;
  }
  function draw() {
    path.setAttribute(
      "d",
      "M" + P.map((p) => p.x.toFixed(1) + " " + p.y.toFixed(1)).join("L"),
    );
    const a = P[N],
      b = P[N - 1];
    card.style.transform = `translate(${a.x}px,${a.y}px) rotate(${Math.atan2(-(a.x - b.x), a.y - b.y)}rad)`;
    $("#lan .cap").style.top = a.y + card.offsetHeight + 16 + "px";
  }
  function loop() {
    const e = step();
    draw();
    calm = e < 0.05 && !drag ? calm + 1 : 0;
    if (calm > 90) {
      run = false;
      return;
    }
    requestAnimationFrame(loop);
  }
  const go = () => {
    if (!run) {
      run = true;
      calm = 0;
      requestAnimationFrame(loop);
    }
  };
  if (reduce) {
    for (let i = 0; i < 300; i++) step();
    draw();
    return;
  }
  card.addEventListener("pointerdown", (e) => {
    const r = lan.getBoundingClientRect();
    pt = { x: e.clientX - r.left, y: e.clientY - r.top };
    off = { x: pt.x - P[N].x, y: pt.y - P[N].y };
    drag = true;
    card.setPointerCapture(e.pointerId);
    go();
  });
  card.addEventListener("pointermove", (e) => {
    if (drag) {
      const r = lan.getBoundingClientRect();
      pt = { x: e.clientX - r.left, y: e.clientY - r.top };
    }
  });
  const up = () => {
    if (!drag) return;
    drag = false;
    const p = P[N];
    p.ox = p.x - (p.x - p.ox) * 0.4;
    p.oy = p.y - (p.y - p.oy) * 0.4;
    go();
  };
  card.addEventListener("pointerup", up);
  card.addEventListener("pointercancel", up);
  addEventListener("resize", () => {
    ax = lan.clientWidth / 2;
    go();
  });
  go();
}
/* ===== Effect 2: mask reveal ===== */
{
  const f = $("#frame");
  let tx = 0,
    ty = 0,
    mx = 0,
    my = 0,
    r = 0,
    tr = 0,
    pressed = false,
    on = false;
  const set = (e) => {
    const b = f.getBoundingClientRect();
    tx = e.clientX - b.left;
    ty = e.clientY - b.top;
  };
  const tick = () => {
    mx += (tx - mx) * 0.18;
    my += (ty - my) * 0.18;
    r += (tr - r) * 0.18;
    f.style.setProperty("--mx", mx + "px");
    f.style.setProperty("--my", my + "px");
    f.style.setProperty("--r", r + "px");
    on || r > 0.5
      ? requestAnimationFrame(tick)
      : f.style.setProperty("--r", "0px");
  };
  const R = () => f.clientWidth * (pressed ? 0.32 : 0.2);
  f.addEventListener("pointerenter", (e) => {
    set(e);
    mx = tx;
    my = ty;
    on = true;
    tr = R();
    tick();
  });
  f.addEventListener("pointermove", (e) => {
    set(e);
    tr = R();
  });
  f.addEventListener("pointerdown", (e) => {
    pressed = true;
    set(e);
    tr = R();
  });
  addEventListener("pointerup", () => {
    pressed = false;
    tr = on ? R() : 0;
  });
  f.addEventListener("pointerleave", () => {
    on = false;
    tr = 0;
  });
}
/* ===== Effect 4: cursor ring ===== */
if (fine) {
  document.body.classList.add("fine");
  const d = $("#d"),
    g = $("#rg"),
    h = $("#hl");
  let x = 0,
    y = 0,
    gx = 0,
    gy = 0,
    hx = 0,
    hy = 0;
  addEventListener(
    "pointermove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      g.classList.toggle("big", !!e.target.closest("a,button,.card,video"));
      const over = !!e.target.closest(".frame");
      [d, g, h].forEach(
        (n) => (n.style.visibility = over ? "hidden" : "visible"),
      );
    },
    { passive: true },
  );
  (function t() {
    gx += (x - gx) * 0.2;
    gy += (y - gy) * 0.2;
    hx += (x - hx) * 0.12;
    hy += (y - hy) * 0.12;
    d.style.transform = `translate3d(${x}px,${y}px,0)`;
    g.style.transform = `translate3d(${gx}px,${gy}px,0)`;
    h.style.transform = `translate3d(${hx}px,${hy}px,0)`;
    requestAnimationFrame(t);
  })();
}
