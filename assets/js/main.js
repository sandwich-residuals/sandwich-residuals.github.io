/* Page behaviour: theme toggle, result tables, Figure 1 playback, rollout videos, nav. */

/* ---- theme toggle ------------------------------------------------------ */
(() => {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const dark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => btn.setAttribute("aria-label", dark() ? "Switch to light theme" : "Switch to dark theme");
  btn.addEventListener("click", () => {
    root.dataset.theme = dark() ? "light" : "dark";
    try { localStorage.setItem("sr-theme", root.dataset.theme); } catch {}
    sync();
  });
  // Keep the button label and the browser UI color in step with the active theme.
  const metas = [...document.querySelectorAll('meta[name="theme-color"]')];
  function sync() {
    label();
    if (root.dataset.theme) metas.forEach((m) => { m.media = "all"; m.content = dark() ? "#121416" : "#ffffff"; });
  }
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", sync);
  sync();
})();

/* ---- tables built from the same data as the charts --------------------- */
(() => {
  const D = window.SR_DATA;
  const fmt = (c) => `${c.m.toFixed(1)} ± ${c.sd.toFixed(1)}`;
  const best = (cells) => Math.max(...cells.map((c) => c.m));
  const signed = (d) => `${d >= 0 ? "+" : "−"}${Math.abs(d).toFixed(1)}`;
  const oursTd = (i, html) => `<td${i === 3 ? ' class="ours"' : ""}>${html}</td>`;

  const rowHtml = (label, cells, delta) => {
    const b = best(cells);
    const tds = cells.map((c, i) => oursTd(i, c.m === b ? `<strong>${fmt(c)}</strong>` : fmt(c))).join("");
    return `<tr><th>${label}</th>${tds}${delta ? `<td>${delta}</td>` : ""}</tr>`;
  };
  const delta = (cells) => signed(cells[3].m - cells[0].m);
  const valueRow = (label, vals, tail = "") => {
    const b = Math.max(...vals);
    return `<tr><th>${label}</th>` + vals.map((v, i) => oursTd(i, v === b ? `<strong>${v.toFixed(1)}</strong>` : v.toFixed(1))).join("") + tail + `</tr>`;
  };

  const head = `<thead><tr><th>Condition</th><th>Frozen</th><th>pl</th><th>pf</th><th class="ours">Ours</th><th>Δ</th></tr></thead>`;
  let body = "";
  for (const env of [...new Set(D.primary.map((r) => r.env))]) {
    const rows = D.primary.filter((r) => r.env === env);
    body += `<tr class="group-row"><th colspan="6">${env}</th></tr>`;
    for (const r of rows) body += rowHtml(r.label, r.cells, delta(r.cells));
    if (rows.length > 1) {
      const reported = D.aggregate.find((group) => group.label === env).values;
      const gain = D.paired.find((group) => group.label === env).diffs[0].m;
      body += valueRow("<em>Average</em>", reported, `<td>${signed(gain)}</td>`);
    }
  }
  body += valueRow("All 21 conditions", D.overall, `<td>${signed(D.paired[0].diffs[0].m)}</td>`).replace("<tr>", '<tr class="group-row">');
  document.getElementById("table-primary").innerHTML = head + `<tbody>${body}</tbody>`;

  document.getElementById("table-compound").innerHTML = head +
    `<tbody>${D.compound.map((r) => rowHtml(r.label, r.cells, delta(r.cells))).join("")}</tbody>`;

  document.getElementById("table-cube").innerHTML =
    `<thead><tr><th>Condition</th><th>Frozen</th><th>pl</th><th>pf</th><th class="ours">Ours</th></tr></thead><tbody>` +
    D.cube.map((r) => rowHtml(r.label, r.cells)).join("") + valueRow("<em>Average</em>", D.cube_avg) + `</tbody>`;

  document.getElementById("table-paired").innerHTML =
    `<thead><tr><th>Subset</th><th>− Frozen</th><th>− pl</th><th>− pf</th></tr></thead><tbody>` +
    D.paired.map((r) => `<tr><th>${r.label}</th>` + r.diffs.map((d) => `<td>${d.m > 0 ? "+" : "−"}${Math.abs(d.m).toFixed(1)} ± ${d.se.toFixed(1)}</td>`).join("") + `</tr>`).join("") +
    `</tbody>`;
})();

/* ---- tab lists (result tables) ----------------------------------------- */
(() => {
  const tabs = [...document.querySelectorAll("[data-table-tab]")];
  const panels = [...document.querySelectorAll("[data-table-panel]")];
  function select(tab, focus = false) {
    tabs.forEach((item) => { const on = item === tab; item.setAttribute("aria-selected", on); item.tabIndex = on ? 0 : -1; });
    panels.forEach((panel) => { panel.hidden = panel.dataset.tablePanel !== tab.dataset.tableTab; });
    panels.find((p) => !p.hidden)?.querySelector(".table-scroll")?.scrollTo({ top: 0, left: 0 });
    if (focus) tab.focus();
  }
  tabs.forEach((tab) => tab.addEventListener("click", () => select(tab)));
  tabs[0].parentElement.addEventListener("keydown", (event) => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(tabs[next], true);
  });
})();

/* ---- animated overview: two clips kept in lockstep ---------------------- */
(() => {
  const fig = document.getElementById("overview");
  const clips = [...fig.querySelectorAll("video")];
  const bar = document.getElementById("anim-progress");
  const toggle = document.getElementById("anim-toggle");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused = reduced, visible = false, finished = 0;

  // The longer clip is the clock; the shorter one waits on its last frame.
  const master = () => clips.reduce((a, b) => ((b.duration || 0) > (a.duration || 0) ? b : a));
  const play = () => clips.forEach((v) => !v.ended && v.play().catch(() => {}));
  const pause = () => clips.forEach((v) => v.pause());
  const restart = () => { finished = 0; clips.forEach((v) => { v.currentTime = 0; }); if (!paused && visible) play(); };
  const sync = () => (paused || !visible ? pause() : play());

  function setPaused(p) {
    paused = p;
    fig.classList.toggle("paused", p);
    toggle.setAttribute("aria-label", p ? "Play animation" : "Pause animation");
    sync();
  }

  clips.forEach((v) => v.addEventListener("ended", () => { if (++finished >= clips.length) setTimeout(restart, 250); }));
  toggle.addEventListener("click", () => setPaused(!paused));
  document.getElementById("anim-replay").addEventListener("click", () => { setPaused(false); restart(); });

  let raf = 0;
  function tick() {
    const m = master();
    if (m.duration) bar.style.transform = `scaleX(${Math.min(1, m.currentTime / m.duration)})`;
    raf = visible ? requestAnimationFrame(tick) : 0;
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    sync();
    if (visible && !raf) raf = requestAnimationFrame(tick);
  }, { threshold: 0.25 }).observe(fig);
  setPaused(paused);
})();

/* ---- rollout videos ---------------------------------------------------- */
(() => {
  const ARMS = [["frozen", "Frozen", 1], ["predlast", "PredLast", 2], ["predfirst", "PredFirst", 3], ["ours", "Ours", 4]];
  const CONDS = [
    { id: "mediummaze_blur_2_damping_50", tab: "Medium Maze", crop: 1.024, ok: [0, 0, 0, 1],
      caption: "Medium Maze, blur σ = 2 + damping 50×. Under a 50× damping increase the agent barely moves under the frozen model; only Sandwich-Residuals reaches the goal in this episode." },
    { id: "pusht_blur_2_kv_2", tab: "PushT", crop: 1.04, ok: [0, 0, 0, 1],
      caption: "PushT, blur σ = 2 + controller k<sub>v</sub> 2×. The baselines push the T close to the goal pose but leave it rotated and oscillate around it; ours seats it on the goal outline." },
    { id: "pushshape_T_blur_2_kv_2", tab: "PushObj · T", crop: 1.04, ok: [0, 1, 0, 1],
      caption: "PushObj T, blur σ = 2 + controller k<sub>v</sub> 2×. PredFirst fails in this episode while PredLast and ours succeed." },
    { id: "pushshape_square_blur_2_kv_2", tab: "PushObj · Square", crop: 1.04, ok: [0, 0, 1, 1],
      caption: "PushObj Square, blur σ = 2 + controller k<sub>v</sub> 2×. PredLast fails here; PredFirst and ours both place the square on the goal." },
  ];
  const CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5"/></svg>';
  const CROSS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>';
  const tabs = document.getElementById("video-tabs");
  const grid = document.getElementById("video-grid");
  const cap = document.getElementById("video-caption");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = false, started = !reduced;
  grid.setAttribute("role", "tabpanel");

  const buttons = CONDS.map((c, i) => {
    const b = document.createElement("button");
    b.className = "seg";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.id = `video-tab-${i}`;
    b.setAttribute("aria-controls", "video-grid");
    b.textContent = c.tab;
    b.addEventListener("click", () => select(i));
    tabs.appendChild(b);
    return b;
  });

  function select(i) {
    const c = CONDS[i];
    buttons.forEach((b, k) => { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
    grid.setAttribute("aria-labelledby", `video-tab-${i}`);
    grid.innerHTML = ARMS.map(([slug, label, s], k) => `
      <figure class="video-card${slug === "ours" ? " is-ours" : ""}">
        <div class="video-frame" style="--crop:${c.crop}"><video src="assets/rollouts/${c.id}_${slug}.mp4" muted loop playsinline preload="metadata" aria-label="${label} rollout"></video></div>
        <div class="video-meta">
          <span class="video-name"><i style="background:var(--series-${s})"></i>${label}</span>
          <span class="badge ${c.ok[k] ? "success" : "failure"}">${c.ok[k] ? CHECK + "reaches the goal" : CROSS + "fails"}</span>
        </div>
      </figure>`).join("");
    cap.innerHTML = `<span class="fig-no">Figure 3.</span> ${c.caption}`;
    replay();
  }
  function replay() {
    grid.querySelectorAll("video").forEach((v) => { v.currentTime = 0; if (visible && started) v.play().catch(() => {}); });
  }
  // With reduced motion the clips wait for an explicit press of Replay.
  document.getElementById("replay").addEventListener("click", () => { started = true; replay(); });
  tabs.addEventListener("keydown", (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const next = { ArrowRight: (i + 1) % buttons.length, ArrowLeft: (i - 1 + buttons.length) % buttons.length }[e.key];
    if (next === undefined) return;
    e.preventDefault(); select(next); buttons[next].focus();
  });
  select(0);

  // Play only while on screen.
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    grid.querySelectorAll("video").forEach((v) => (visible && started ? v.play().catch(() => {}) : v.pause()));
  }, { threshold: 0.15 }).observe(grid);
})();

/* ---- nav highlighting + bibtex copy ------------------------------------ */
(() => {
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));

  const pre = document.querySelector("#bibtex");
  document.querySelectorAll("[data-copy]").forEach((button) => {
    const label = button.querySelector("span");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent.trim());
        label.textContent = "Copied";
      } catch {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        label.textContent = "Selected";
      }
      setTimeout(() => { label.textContent = "Copy"; }, 1500);
    });
  });
})();
