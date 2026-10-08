/* ============================================================================
   main.js: builds the whole page from data.js
   ----------------------------------------------------------------------------
   You do NOT need to edit this file to change content. Edit data.js instead.
   This file: reads PORTFOLIO → writes HTML into index.html → adds the
   interactions (theme toggle, mobile menu, filters, animations, clock).
   ============================================================================ */
(function () {
  "use strict";

  // If data.js has a typo, PORTFOLIO won't exist. Show a helpful message instead of a blank page.
  if (typeof PORTFOLIO === "undefined") {
    document.body.insertAdjacentHTML("afterbegin",
      '<div class="data-error">⚠ data.js has an error (usually a missing comma, quote or bracket). ' +
      "Press F12 → Console to see the line number.</div>");
    return;
  }

  const D = PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);
  const list = (x) => (Array.isArray(x) ? x : []);

  /* ───────── Helpers ───────── */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // "text with [highlight]" → text with <mark>highlight</mark>
  const mark = (s) => esc(s).replace(/\[(.+?)\]/g, "<mark>$1</mark>");
  const ext = (url) => `href="${esc(url)}" target="_blank" rel="noopener noreferrer"`;
  const highlightSet = new Set(list(D.skills && D.skills.highlight).map((s) => s.toLowerCase()));
  const chip = (t) => `<span class="chip${highlightSet.has(String(t).toLowerCase()) ? " hl" : ""}">${esc(t)}</span>`;
  const handle = (url) => {
    try { return "@" + new URL(url).pathname.split("/").filter(Boolean).pop(); } catch (e) { return ""; }
  };

  /* ───────── Icons (inline SVG, no external library needed) ───────── */
  const S = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const F = (d) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
  const I = {
    arrow: S('<path d="M7 17 17 7M8 7h9v9"/>'),
    download: S('<path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 20h14"/>'),
    mail: S('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7.5 8.5 6 8.5-6"/>'),
    pin: S('<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    copy: S('<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"/>'),
    check: S('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>'),
    clock: S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    github: F("M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"),
    linkedin: F("M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"),
    leetcode: F("M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.23l-3.86 4.12a5.27 5.27 0 0 0-1.33 2.62 5.53 5.53 0 0 0 .06 2.36 5.9 5.9 0 0 0 1.62 2.84l4.28 4.19.04.04c2.25 2.16 5.85 2.13 8.06-.08l2.4-2.39a1.38 1.38 0 0 0-1.95-1.95l-2.4 2.39a3.02 3.02 0 0 1-4.2.04l-.02-.02-4.28-4.19a2.8 2.8 0 0 1-.88-2.79 2.55 2.55 0 0 1 .62-1.16l3.83-4.12c1.06-1.13 3.2-1.27 4.43-.28l3.5 2.83a1.38 1.38 0 0 0 1.74-2.15l-3.5-2.83a5.6 5.6 0 0 0-2.78-1.2l2.02-2.16A1.38 1.38 0 0 0 13.48 0zm-2.86 12.82a1.38 1.38 0 1 0 0 2.76h10.17a1.38 1.38 0 1 0 0-2.76z"),
  };

  /* ───────── Résumé button ─────────
     A local PDF downloads with a clean file name; an online link (Drive etc.) opens in a new tab. */
  function resumeButton(cls, text) {
    const r = typeof D.resume === "string" ? { file: D.resume } : (D.resume || {});
    if (!r.file) return "";
    const online = /^https?:\/\//i.test(r.file);
    const attrs = online ? ext(r.file) : `href="${esc(r.file)}" download="${esc(r.downloadName || "")}"`;
    return `<a class="${cls}" ${attrs}>${I.download}${esc(text)}</a>`;
  }

  /* ───────── Generated "point cloud" artwork for covers without an image ─────────
     Each project title always produces the same unique pattern.               */
  function seeded(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () {
      h = (h + 0x6d2b79f5) | 0;
      let t = Math.imul(h ^ (h >>> 15), 1 | h);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function cloud(seed, count) {
    const r = seeded(String(seed)), W = 400, H = 220, k = 0.8 + r() * 1.6, ph = r() * 6.28;
    let dots = "";
    for (let i = 0; i < (count || 110); i++) {
      const x = r() * W;
      const y = H * 0.5 + Math.sin((x / W) * Math.PI * k + ph) * H * 0.24 + (r() - 0.5) * H * (0.18 + r() * 0.3);
      const accent = r() > 0.72;
      dots += `<circle class="${accent ? "a" : "d"}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(accent ? 1.6 + r() * 1.4 : 0.8 + r() * 1.1).toFixed(2)}"/>`;
    }
    return `<svg class="cloud" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${dots}</svg>`;
  }

  function terminalPreview() {
    return `<div class="terminal-preview" role="group" aria-label="StudyTrail terminal walkthrough">
      <div class="terminal-bar"><span class="terminal-lights" aria-hidden="true"><i></i><i></i><i></i></span><span>studytrails / terminal</span></div>
      <div class="terminal-output" aria-hidden="true"></div>
      <div class="terminal-footer"><span>Offline demo · shortened preview</span><button class="terminal-play" type="button">Play preview</button></div>
      <span class="sr-only">Sample session: StudyTrail checks progress, searches notes, and creates a Python loops quiz. The sample user answers B, completes the remaining questions, and saves a score of 3 out of 3. Play or stop the animation with the button.</span>
    </div>`;
  }

  function setupTerminalDemo(card) {
    const output = card.querySelector(".terminal-output");
    const button = card.querySelector(".terminal-play");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // A shortened replay of the project's offline demo, with sample answers.
    const steps = [
      { text: "$ studytrails demo", type: true, tone: "command", delay: 400 },
      { text: "OFFLINE DEMO · Python loops", tone: "heading", delay: 500 },
      { text: "Checking your progress...", tone: "muted", delay: 650 },
      { text: "Searching your notes...", tone: "muted", delay: 750 },
      { text: "Preparing your quiz...", tone: "muted", delay: 750 },
      { text: "Loops | beginner", tone: "heading", delay: 400 },
      { text: "1. Which values does list(range(3)) contain?", delay: 500 },
      { text: "A. [1, 2, 3]    B. [0, 1, 2]\nC. [0, 1, 2, 3] D. [3]", delay: 1800 },
      { text: "Your answer: B", type: true, tone: "command", delay: 850 },
      { text: "… 2 more questions answered …", tone: "muted", delay: 1100 },
      { text: "Saved result: 3/3 (100.0%)", tone: "success", delay: 850 },
      { text: "1. Correct — answer B: [0, 1, 2]", tone: "success", delay: 650 },
      { text: "range(3) starts at 0 and stops before 3.", delay: 500 },
    ];
    let timer;
    let running = false;

    function reset() {
      clearTimeout(timer);
      running = false;
      button.textContent = "Play preview";
      output.innerHTML = '<div class="terminal-line command">$ studytrails demo</div><div class="terminal-line">Your notes → quizzes → progress.</div><div class="terminal-line muted">Hover or press Play to watch.</div>';
      output.scrollTop = 0;
    }

    function play() {
      clearTimeout(timer);
      running = true;
      button.textContent = "Stop preview";
      output.replaceChildren();
      let index = 0;
      function next() {
        if (index === steps.length) {
          running = false;
          button.textContent = "Replay";
          return;
        }
        const step = steps[index++];
        const line = document.createElement("div");
        line.className = `terminal-line ${step.tone || ""}`;
        output.appendChild(line);
        let length = step.type && !reducedMotion.matches ? 0 : step.text.length;
        function write() {
          line.textContent = step.text.slice(0, length);
          line.classList.toggle("typing", length < step.text.length);
          output.scrollTop = output.scrollHeight;
          if (length < step.text.length) {
            length++;
            timer = setTimeout(write, 45);
          } else {
            timer = setTimeout(next, step.delay);
          }
        }
        write();
      }
      next();
    }

    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") play();
    });
    card.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") reset();
    });
    button.addEventListener("click", () => running ? reset() : play());
    reset();
    return reset;
  }

  function setupProjectTilt(card) {
    const canTilt = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || !canTilt.matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${x * 7}deg`);
      card.style.setProperty("--tilt-y", `${-y * 7}deg`);
    });
  }

  /* ───────── 1. Hero bento grid ───────── */
  function statTile(s) {
    if (!s) return "";
    return `<div class="t stat col${s.highlight ? " lime" : ""}">
      <span class="label">${esc(s.label)}</span>
      <div><b>${esc(s.value)}</b><span>${esc(s.note)}</span></div>
    </div>`;
  }

  function featuredTile(p) {
    const url = p.github || p.live;
    const m = p.metric && p.metric.value;
    if (p.demo === "studytrail-terminal") {
      return `<article class="t inv feat feat-demo c2 r2 col" data-demo="studytrail-terminal" aria-label="Featured project: ${esc(p.title)}">
        <span class="label">Featured project</span>
        <div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></div>
        ${terminalPreview()}
        <div class="btns">
          ${setupButton(p)}
          ${p.github ? `<a class="btn ghost sm" ${ext(p.github)}>${I.github}Source code</a>` : ""}
        </div>
      </article>`;
    }
    return `<a class="t inv feat c2 r2 col" ${url ? ext(url) : 'href="#projects"'} aria-label="Featured project: ${esc(p.title)}">
      ${cloud(p.title, 70)}
      <span class="arrow">${I.arrow}</span>
      <span class="label">Featured project</span>
      <div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></div>
      <div class="feat-foot">
        ${m ? `<div><div class="metric">${esc(p.metric.value)}</div><div class="label">${esc(p.metric.label)}</div></div>` : "<div></div>"}
        <div class="chips">${list(p.tech).slice(0, 3).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </div>
    </a>`;
  }

  function renderHero() {
    const L = D.links || {};
    const projects = list(D.projects);
    const feat = projects.find((p) => p.featured) || projects[0];
    const exp = list(D.experience)[0];
    const stats = list(D.stats);
    const st = D.status || {};

    $("#hero").innerHTML = `
      <div class="t intro c2 r2 col">
        <div>
          <p class="greet">${esc(D.greeting)}</p>
          <h1>${mark(D.headline)}</h1>
          ${D.about ? `<p class="about">${esc(D.about)}</p>` : ""}
        </div>
        <div class="btns">
          <a class="btn primary" href="#projects">View projects</a>
          ${resumeButton("btn", "Résumé")}
          ${L.github ? `<a class="btn" ${ext(L.github)}>${I.github}GitHub</a>` : ""}
        </div>
      </div>

      <div class="t photo r2">
        <img src="${esc(D.photo)}" alt="Portrait of ${esc(D.name)}" width="912" height="1168" fetchpriority="high">
        ${D.location ? `<span class="pin">${I.pin}${esc(D.location)}</span>` : ""}
      </div>

      <div class="t inv status col">
        <span class="label">Status</span>
        <div><div class="dot">${st.available ? "<i></i>" : ""}${esc(st.title)}</div><p>${esc(st.detail)}</p></div>
      </div>

      ${statTile(stats[0])}

      <div class="t c2 col">
        <span class="label">Toolkit</span>
        <div class="chips">${list(D.skills && D.skills.toolkit).map(chip).join("")}</div>
      </div>

      ${statTile(stats[1])}
      ${statTile(stats[2])}

      ${feat ? featuredTile(feat) : ""}

      ${exp ? `<a class="t exp c2 col" href="#experience">
        <span class="arrow">${I.arrow}</span>
        <span class="label">Experience · ${esc(exp.start)} – ${esc(exp.end)}</span>
        <div><h4>${esc(exp.role)}</h4><p>${esc(exp.company)}${exp.location ? ", " + esc(exp.location) : ""}. ${esc(exp.summary)}</p></div>
      </a>` : ""}

      <a class="t stat col" href="#achievements">
        <span class="arrow">${I.arrow}</span>
        <span class="label">Certificates</span>
        <div><b>${list(D.certificates).length}</b><span>Verified courses</span></div>
      </a>

      <a class="t stat col" href="#contact">
        <span class="arrow">${I.arrow}</span>
        <span class="label">Contact</span>
        <div><b class="say">Say hello</b><span>Email · LinkedIn</span></div>
      </a>

      ${stats.slice(3).map(statTile).join("")}
    `;
    const demo = $("#hero .feat-demo");
    if (demo) {
      setupTerminalDemo(demo);
      setupProjectTilt(demo);
    }
  }

  function setupButton(p) {
    return p.setupGuide === "studytrail"
      ? `<button class="btn sm setup-open" type="button" aria-haspopup="dialog" aria-controls="studytrail-setup">${I.download}Set up on your device</button>`
      : "";
  }

  function setupInstallGuide() {
    const dialog = $("#studytrail-setup");
    document.addEventListener("click", (event) => {
      if (event.target.closest(".setup-open")) dialog.showModal();
    });
    dialog.querySelectorAll(".setup-copy").forEach((button) => {
      button.addEventListener("click", async () => {
        const text = button.closest(".setup-command").querySelector("code").textContent;
        try {
          await navigator.clipboard.writeText(text);
          button.textContent = "Copied";
        } catch {
          button.textContent = "Select text to copy";
        }
        setTimeout(() => { button.textContent = "Copy"; }, 2000);
      });
    });
  }

  /* ───────── 2. Projects + filter buttons ───────── */
  function projectCard(p, i, all) {
    const cats = list(p.category);
    const m = p.metric && p.metric.value;
    const cover = p.demo === "studytrail-terminal"
      ? terminalPreview()
      : p.image
      ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy">`
      : `${cloud(p.title)}<span class="cover-num">${String(i + 1).padStart(2, "0")} / ${String(all.length).padStart(2, "0")}</span>`;
    const points = list(p.points);

    return `<article class="t project" data-cat="${esc(cats.join("|"))}"${p.demo ? ` data-demo="${esc(p.demo)}"` : ""}>
      <div class="cover">${cover}${m ? `<span class="badge">${esc(p.metric.value)} ${esc(p.metric.label)}</span>` : ""}</div>
      <div class="body">
        ${cats.length ? `<span class="label">${cats.map(esc).join(" · ")}</span>` : ""}
        <div><h3>${esc(p.title)}</h3>${p.subtitle ? `<p class="sub">${esc(p.subtitle)}</p>` : ""}</div>
        <p class="desc">${esc(p.description)}</p>
        ${points.length ? `<details><summary>Key highlights</summary><ul class="points">${points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details>` : ""}
        <div class="chips">${list(p.tech).map(chip).join("")}</div>
        <div class="actions">
          ${setupButton(p)}
          ${p.github ? `<a class="btn sm" ${ext(p.github)}>${I.github}Code</a>` : ""}
          ${p.live ? `<a class="btn sm primary" ${ext(p.live)}>${I.globe}${esc(p.liveLabel || "Live demo")}</a>` : ""}
        </div>
      </div>
    </article>`;
  }

  function renderProjects() {
    const projects = list(D.projects);
    $("#project-list").innerHTML = projects.map(projectCard).join("");
    document.querySelectorAll("#project-list .project").forEach(setupProjectTilt);

    const demoCard = $("#project-list [data-demo='studytrail-terminal']");
    const resetDemo = demoCard ? setupTerminalDemo(demoCard) : null;

    const cats = [...new Set(projects.flatMap((p) => list(p.category)))];
    if (cats.length < 2) return; // no point filtering a single category
    const bar = $("#filters");
    bar.innerHTML = ["All", ...cats].map((c, i) =>
      `<button class="filter" type="button" data-f="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("");

    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      const f = btn.dataset.f;
      bar.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      document.querySelectorAll(".project").forEach((card) => {
        card.hidden = f !== "All" && !card.dataset.cat.split("|").includes(f);
      });
      if (demoCard && demoCard.hidden) resetDemo();
    });
  }

  /* ───────── 2b. GitHub contribution graph (loads live, no setup needed) ───────── */
  const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
  const heatmap = (cols, months, cells, loading, label) => `
    <div class="heat${loading ? " loading" : ""}" role="img" aria-label="${esc(label)}">
      <div class="months" style="grid-template-columns:repeat(${cols},minmax(10px,1fr))" aria-hidden="true">${months}</div>
      <div class="days" aria-hidden="true">${DAY_LABELS.map((d) => `<span>${d}</span>`).join("")}</div>
      <div class="cells" style="grid-template-columns:repeat(${cols},minmax(10px,1fr))">${cells}</div>
    </div>`;

  function renderActivity() {
    const cfg = D.githubActivity || {};
    const box = $("#activity");
    if (!box || !cfg.show || !cfg.username) return;
    const user = String(cfg.username);
    const profile = "https://github.com/" + encodeURIComponent(user);

    // 1) Draw an empty grey grid straight away, so the layout doesn't jump
    box.innerHTML = `
      <div class="t graph">
        <div class="graph-head">
          <div><span class="label">GitHub activity</span><h3 id="gh-title">Contributions in the last year</h3></div>
          <a class="btn sm" ${ext(profile)}>${I.github}@${esc(user)}</a>
        </div>
        <div class="graph-scroll" id="gh-scroll">${heatmap(53, "", "<i></i>".repeat(53 * 7), true, "Loading GitHub contributions")}</div>
        <div class="graph-foot">
          <span id="gh-note">Loading from GitHub…</span>
          <span class="legend" aria-hidden="true">Less ${[0, 1, 2, 3, 4].map((l) => `<i style="background:var(--g${l})"></i>`).join("")} More</span>
        </div>
      </div>
      <a class="t inv gstats col" ${ext(profile)}>
        <span class="arrow">${I.arrow}</span>
        <span class="label">Last 12 months</span>
        <div><b class="total" id="gh-total">…</b><p class="sub">contributions on GitHub</p></div>
        <ul id="gh-list"></ul>
      </a>`;

    // 2) Fetch the real numbers (public API that reads your GitHub profile)
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`)
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((data) => drawActivity(list(data && data.contributions), user))
      .catch(() => {
        const heat = box.querySelector(".heat");
        if (heat) heat.classList.remove("loading");
        $("#gh-note").innerHTML = `Couldn't load the graph right now. <a ${ext(profile)} style="text-decoration:underline">See it on GitHub ↗</a>`;
        $("#gh-total").textContent = "—";
      });

    // Hover tooltip for each square
    const tip = document.createElement("div");
    tip.className = "tip";
    tip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tip);
    box.addEventListener("mouseover", (e) => {
      const cell = e.target.closest("[data-tip]");
      if (!cell) return;
      const r = cell.getBoundingClientRect();
      tip.textContent = cell.dataset.tip;
      tip.style.left = Math.min(Math.max(r.left + r.width / 2, 110), window.innerWidth - 110) + "px";
      tip.style.top = r.top + "px";
      tip.classList.add("show");
    });
    box.addEventListener("mouseout", (e) => { if (e.target.closest("[data-tip]")) tip.classList.remove("show"); });
    window.addEventListener("scroll", () => tip.classList.remove("show"), { passive: true });
  }

  function drawActivity(days, user) {
    if (!days.length) throw new Error("no data");
    const parse = (s) => new Date(s + "T00:00:00Z");
    const fmt = (d, opts) => d.toLocaleDateString("en-IN", Object.assign({ timeZone: "UTC" }, opts));
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const pad = parse(days[0].date).getUTCDay();        // empty squares before the first day (weeks start on Sunday)
    const cols = Math.ceil((pad + days.length) / 7);

    // Squares
    let cells = '<i class="pad"></i>'.repeat(pad);
    let total = 0, active = 0, run = 0, longest = 0, best = days[0];
    days.forEach((d) => {
      const n = Number(d.count) || 0;
      total += n;
      if (n > 0) { active++; run++; longest = Math.max(longest, run); } else { run = 0; }
      if (n > best.count) best = d;
      const when = fmt(parse(d.date), { day: "numeric", month: "short", year: "numeric" });
      cells += `<i class="l${Math.min(4, Math.max(0, d.level | 0))}" data-tip="${n || "No"} contribution${n === 1 ? "" : "s"} · ${when}"></i>`;
    });

    // Month names above the columns where a new month starts
    let months = "", prev = -1;
    for (let c = 0; c < cols; c++) {
      const first = parse(days[Math.min(Math.max(0, c * 7 - pad), days.length - 1)].date);
      const m = first.getUTCMonth();
      const skipFirst = c === 0 && first.getUTCDate() > 14;  // avoid two labels squashed together at the start
      if (m !== prev && !skipFirst) months += `<span style="grid-column:${c + 1}">${MONTHS[m]}</span>`;
      prev = m;
    }

    const scroll = $("#gh-scroll");
    scroll.innerHTML = heatmap(cols, months, cells, false, `${total} GitHub contributions in the last year`);
    scroll.scrollLeft = scroll.scrollWidth;              // on phones, show the most recent weeks first

    $("#gh-title").textContent = `${total} contributions in the last year`;
    $("#gh-note").textContent = `Updates automatically from github.com/${user}`;
    $("#gh-total").textContent = total;
    $("#gh-list").innerHTML = `
      <li>Active days <strong>${active}</strong></li>
      <li>Longest streak <strong>${longest} day${longest === 1 ? "" : "s"}</strong></li>
      <li>Best day <strong>${best.count} · ${fmt(parse(best.date), { day: "numeric", month: "short" })}</strong></li>`;
  }

  /* ───────── 3. Experience & education ───────── */
  function renderJourney() {
    const exp = list(D.experience).map((x) => `<div class="tl">
        <span class="tl-date">${esc(x.start)} – ${esc(x.end)}</span>
        <h4>${esc(x.role)}</h4>
        <p class="where">${esc(x.company)}${x.location ? " · " + esc(x.location) : ""}</p>
        ${list(x.points).length ? `<ul class="points">${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
        ${list(x.tech).length ? `<div class="chips">${x.tech.map(chip).join("")}</div>` : ""}
      </div>`).join("");

    const edu = list(D.education).map((x) => `<div class="tl">
        <span class="tl-date">${esc(x.start)} – ${esc(x.end)}</span>
        <h4>${esc(x.school)}</h4>
        <p class="where">${esc(x.degree)}${x.location ? " · " + esc(x.location) : ""}</p>
        ${x.grade ? `<span class="grade">${esc(x.grade)}</span>` : ""}
      </div>`).join("");

    $("#journey").innerHTML =
      (exp ? `<div class="t"><span class="label">Experience</span>${exp}</div>` : "") +
      (edu ? `<div class="t"><span class="label">Education</span>${edu}</div>` : "");
  }

  /* ───────── 4. Skills ───────── */
  function renderSkills() {
    $("#skill-list").innerHTML = list(D.skills && D.skills.groups).map((g, i) => `
      <div class="t skill lift">
        <div class="top"><span class="label">${String(i + 1).padStart(2, "0")}</span><span class="label">${list(g.items).length} skills</span></div>
        <h3>${esc(g.title)}</h3>
        <div class="chips">${list(g.items).map(chip).join("")}</div>
      </div>`).join("");
  }

  /* ───────── 5. Achievements & certificates ───────── */
  function renderAwards() {
    const awards = list(D.achievements).map((a, i) => {
      const tag = a.link ? "a" : "div";
      return `<${tag} class="t award col${i === 0 ? " lime" : ""}" ${a.link ? ext(a.link) : ""}>
        ${a.link ? `<span class="arrow">${I.arrow}</span>` : ""}
        <span class="label">${esc(a.date)}</span>
        <div><b>${esc(a.value)}</b><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></div>
      </${tag}>`;
    }).join("");

    const certs = list(D.certificates);
    const certTile = certs.length ? `<div class="t certs">
        <span class="label">Certificates · ${certs.length}</span>
        ${certs.map((c) => `<a class="cert" ${c.link ? ext(c.link) : 'href="#achievements"'}>
          <span><strong>${esc(c.title)}</strong><small>${esc(c.issuer)}</small></span>
          ${c.link ? `<span class="go">Verify ${I.arrow}</span>` : ""}
        </a>`).join("")}
      </div>` : "";

    $("#award-list").innerHTML = awards + certTile;
  }

  /* ───────── 6. Contact ───────── */
  function renderContact() {
    const L = D.links || {};
    const C = D.contact || {};
    const social = (url, icon, name, sub) => url ? `<a class="t social" ${ext(url)}>
        <span class="arrow">${I.arrow}</span>
        <span class="ic">${icon}</span>
        <span><strong>${name}</strong><small>${esc(sub)}</small></span>
      </a>` : "";

    $("#contact").innerHTML = `<div class="contact">
      <div class="t inv big col">
        ${cloud("contact-" + D.name, 90)}
        <span class="label">05 / Contact</span>
        <div>
          <h2 id="contact-h">${mark(C.title)}</h2>
          <p>${esc(C.text)}</p>
          <div class="btns">
            ${L.email ? `<a class="btn lime" href="mailto:${esc(L.email)}">${I.mail}${esc(L.email)}</a>
            <button class="btn ghost" type="button" id="copy-email">${I.copy}<span>Copy</span></button>` : ""}
            ${resumeButton("btn ghost", "Résumé")}
          </div>
        </div>
      </div>
      <div class="socials">
        ${social(L.github, I.github, "GitHub", handle(L.github))}
        ${social(L.linkedin, I.linkedin, "LinkedIn", "Let's connect")}
        ${social(L.leetcode, I.leetcode, "LeetCode", handle(L.leetcode))}
        <div class="t social clock">
          <span class="ic">${I.clock}</span>
          <span><b id="clock">--:--</b><small>${esc(D.location)} · local time</small></span>
        </div>
      </div>
    </div>`;

    const copyBtn = $("#copy-email");
    if (copyBtn) copyBtn.addEventListener("click", async () => {
      const label = copyBtn.querySelector("span");
      try {
        await navigator.clipboard.writeText(L.email);
        copyBtn.innerHTML = `${I.check}<span>Copied!</span>`;
      } catch (e) {
        label.textContent = "Press Ctrl+C";
        return;
      }
      setTimeout(() => { copyBtn.innerHTML = `${I.copy}<span>Copy</span>`; }, 1800);
    });

    const clock = $("#clock");
    const tick = () => {
      try {
        clock.textContent = new Date().toLocaleTimeString("en-IN", { timeZone: D.timezone || undefined, hour: "2-digit", minute: "2-digit", hour12: true });
      } catch (e) {
        clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    };
    tick();
    setInterval(tick, 15000);
  }

  /* ───────── 7. Footer + logo ───────── */
  function renderChrome() {
    $("#logo-initials").textContent = D.initials || "";
    $("#logo-name").textContent = D.name || "";
    $("#footer").innerHTML = `
      <span>© ${new Date().getFullYear()} ${esc(D.name)}${D.lastUpdated ? " · Last updated " + esc(D.lastUpdated) : ""}</span>
      <a href="#top">Back to top ↑</a>`;
  }

  /* ───────── Interactions ───────── */
  function setupTheme() {
    const root = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    const sync = () => { if (meta) meta.setAttribute("content", root.dataset.theme === "dark" ? "#0b0b0a" : "#f2f2ef"); };
    sync();
    $("#theme-toggle").addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode: theme just won't be remembered */ }
      sync();
    });
  }

  function setupNav() {
    const nav = $("#nav"), links = $("#links"), btn = $("#menu-btn");
    const close = () => { links.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
    btn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    document.addEventListener("click", (e) => { if (!nav.contains(e.target)) close(); });

    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the menu link of the section currently on screen
    if (!("IntersectionObserver" in window)) return;
    const anchors = [...links.querySelectorAll("a")];
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        anchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    anchors.forEach((a) => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
  }

  function setupReveal() {
    const items = document.querySelectorAll("main .t, .sec-head");
    if (!("IntersectionObserver" in window)) return;
    items.forEach((el) => el.classList.add("reveal"));
    // Stagger the hero tiles so they cascade in
    document.querySelectorAll("#hero .t").forEach((el, i) => el.style.setProperty("--d", (i * 0.045).toFixed(3) + "s"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    items.forEach((el) => io.observe(el));
  }

  /* ───────── Go! ───────── */
  renderChrome();
  renderHero();
  renderProjects();
  setupInstallGuide();
  renderActivity();
  renderJourney();
  renderSkills();
  renderAwards();
  renderContact();
  setupTheme();
  setupNav();
  setupReveal();
})();
