/* Minimal inline-SVG chart set for the project page: grouped bars (vertical and
   horizontal), a dot plot, a line chart and a diverging difference chart.
   Every chart draws from window.SR_DATA and shares one hover tooltip. */
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const ARM_LABEL = { frozen: "Frozen", predlast: "PredLast", predfirst: "PredFirst", sandwich_encvis: "Ours" };
  const ARM_COLOR = { frozen: "var(--series-1)", predlast: "var(--series-2)", predfirst: "var(--series-3)", sandwich_encvis: "var(--series-4)" };
  const INK = "var(--text-primary)", MUTED = "var(--text-secondary)", GRID = "var(--grid)";

  const el = (name, attrs = {}, parent = null) => {
    const node = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    if (parent) parent.appendChild(node);
    return node;
  };
  const text = (parent, x, y, str, attrs = {}) => {
    const t = el("text", { x, y, fill: MUTED, "font-size": 12, ...attrs }, parent);
    t.textContent = str;
    return t;
  };
  // Rounded cap on the value end only, anchored to the baseline.
  const barPath = (x, y, w, h, r, dir) => {
    r = Math.max(0, Math.min(r, w / 2, h));
    if (dir === "up") return `M${x},${y + h}V${y + r}a${r},${r} 0 0 1 ${r},${-r}h${w - 2 * r}a${r},${r} 0 0 1 ${r},${r}V${y + h}Z`;
    return `M${x},${y}h${w - r}a${r},${r} 0 0 1 ${r},${r}v${h - 2 * r}a${r},${r} 0 0 1 ${-r},${r}h${-(w - r)}Z`;
  };

  let tip;
  const tooltip = () => (tip ||= Object.assign(document.body.appendChild(document.createElement("div")), { className: "viz-tip" }));
  const showTip = (evt, html) => {
    const t = tooltip();
    t.innerHTML = html;
    t.style.opacity = "1";
    const pad = 14, w = t.offsetWidth, h = t.offsetHeight;
    let x = evt.clientX + pad, y = evt.clientY - h - pad;
    if (x + w > innerWidth - 8) x = evt.clientX - w - pad;
    if (y < 8) y = evt.clientY + pad;
    t.style.transform = `translate(${x}px, ${y}px)`;
  };
  const hideTip = () => { if (tip) tip.style.opacity = "0"; };
  const hoverable = (node, html) => {
    node.addEventListener("pointerenter", (e) => showTip(e, html));
    node.addEventListener("pointermove", (e) => showTip(e, html));
    node.addEventListener("pointerleave", hideTip);
  };

  const legend = (container, items) => {
    const box = document.createElement("div");
    box.className = "viz-legend";
    for (const { label, color } of items) {
      const item = document.createElement("span");
      item.className = "viz-legend-item";
      item.innerHTML = `<i style="background:${color}"></i>${label}`;
      box.appendChild(item);
    }
    container.appendChild(box);
  };

  const frame = (container, w, h) => {
    const svg = el("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", role: "img", class: "viz-svg" });
    container.appendChild(svg);
    return svg;
  };

  /* Grouped bars, vertical. spec: {groups:[{label, values:[..], note}], arms, max, unit} */
  function groupedBars(container, spec) {
    const arms = spec.arms, G = spec.groups.length, n = arms.length;
    const W = spec.width || 760, H = spec.height || 300;
    const m = spec.margins || { t: 12, r: 10, b: spec.labelLines === 2 ? 54 : 40, l: 38 };
    const svg = frame(container, W, H);
    const pw = W - m.l - m.r, ph = H - m.t - m.b;
    const max = spec.max || 100, y = (v) => m.t + ph * (1 - v / max);
    for (const v of spec.ticks || [0, 25, 50, 75, 100]) {
      el("line", { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), stroke: GRID, "stroke-width": 1 }, svg);
      text(svg, m.l - 8, y(v) + 4, v, { "text-anchor": "end", "font-size": 11 });
    }
    const gap = spec.barGap || 2, gw = pw / G, inner = gw * (spec.groupFill || 0.78), bw = (inner - gap * (n - 1)) / n;
    spec.groups.forEach((g, gi) => {
      const gx = m.l + gi * gw + (gw - inner) / 2;
      g.values.forEach((v, i) => {
        if (v == null) return;
        const x = gx + i * (bw + gap), h = ph * v / max;
        const p = el("path", { d: barPath(x, y(v), bw, h, 4, "up"), fill: ARM_COLOR[arms[i]], class: "viz-bar" }, svg);
        hoverable(p, `<b>${g.label}</b><br>${ARM_LABEL[arms[i]]}: <b>${v.toFixed(1)}%</b>${g.note ? `<br><span class="dim">${g.note}</span>` : ""}`);
        if (spec.valueLabels) text(svg, x + bw / 2, y(v) - 6, v.toFixed(1), { "text-anchor": "middle", "font-size": spec.valueSize || 10.5, fill: MUTED });
      });
      const lines = String(g.label).split("\n");
      lines.forEach((ln, li) => text(svg, m.l + gi * gw + gw / 2, H - m.b + 18 + li * 14, ln, { "text-anchor": "middle", fill: INK, "font-size": spec.labelSize || 12.5 }));
      if (g.sub) text(svg, m.l + gi * gw + gw / 2, H - m.b + 18 + lines.length * 14, g.sub, { "text-anchor": "middle", "font-size": 10.5 });
    });
    el("line", { x1: m.l, x2: W - m.r, y1: y(0), y2: y(0), stroke: "var(--axis)", "stroke-width": 1 }, svg);
    legend(container, arms.map((a) => ({ label: ARM_LABEL[a], color: ARM_COLOR[a] })));
  }

  /* Grouped bars, horizontal - for long condition labels. */
  function groupedBarsH(container, spec) {
    const arms = spec.arms, rows = spec.rows, n = arms.length;
    const barH = spec.barH || 8, step = spec.step || 10, rowH = spec.rowH || 44;
    const W = spec.width || 760, m = spec.margins || { t: 6, r: 40, b: 22, l: 220 };
    const H = m.t + m.b + rows.length * rowH;
    const svg = frame(container, W, H);
    const pw = W - m.l - m.r, max = spec.max || 100, x = (v) => m.l + pw * v / max;
    for (const v of spec.ticks || [0, 25, 50, 75, 100]) {
      el("line", { x1: x(v), x2: x(v), y1: m.t, y2: H - m.b, stroke: GRID, "stroke-width": 1 }, svg);
      text(svg, x(v), H - m.b + 16, v, { "text-anchor": "middle", "font-size": 11 });
    }
    rows.forEach((r, ri) => {
      const top = m.t + ri * rowH + 3;
      text(svg, m.l - 10, top + (step * n) / 2 + 3, r.label, { "text-anchor": "end", fill: INK, "font-size": spec.labelSize || 11.5 });
      r.values.forEach((v, i) => {
        if (v == null) return;
        const yy = top + i * step, w = pw * v / max;
        const p = el("path", { d: barPath(m.l, yy, Math.max(w, 2), barH, 3, "right"), fill: ARM_COLOR[arms[i]], class: "viz-bar" }, svg);
        hoverable(p, `<b>${r.title || r.label}</b><br>${ARM_LABEL[arms[i]]}: <b>${v.toFixed(1)}%</b>`);
        if (i === n - 1) text(svg, m.l + w + 6, yy + barH, v.toFixed(1), { "font-size": 10, fill: ARM_COLOR[arms[i]], "font-weight": 600 });
      });
    });
    el("line", { x1: m.l, x2: m.l, y1: m.t, y2: H - m.b, stroke: "var(--axis)", "stroke-width": 1 }, svg);
    legend(container, arms.map((a) => ({ label: ARM_LABEL[a], color: ARM_COLOR[a] })));
  }

  /* Paired differences: ours minus each baseline, with standard-error whiskers. */
  function diffChart(container, spec) {
    const bases = ["frozen", "predlast", "predfirst"];
    const barH = spec.barH || 8, step = spec.step || 10, rowH = spec.rowH || 40;
    const W = spec.width || 760, m = spec.margins || { t: 8, r: 22, b: 24, l: 140 };
    const H = m.t + m.b + spec.rows.length * rowH;
    const svg = frame(container, W, H);
    const pw = W - m.l - m.r, lo = -10, hi = 36, x = (v) => m.l + pw * (v - lo) / (hi - lo);
    for (let v = -10; v <= 35; v += spec.tickStep || 5) {
      el("line", { x1: x(v), x2: x(v), y1: m.t, y2: H - m.b, stroke: GRID, "stroke-width": 1 }, svg);
      text(svg, x(v), H - m.b + 16, v > 0 ? `+${v}` : v < 0 ? `\u2212${-v}` : "0", { "text-anchor": "middle", "font-size": 11 });
    }
    el("line", { x1: x(0), x2: x(0), y1: m.t, y2: H - m.b, stroke: "var(--axis)", "stroke-width": 1.5 }, svg);
    spec.rows.forEach((r, ri) => {
      const top = m.t + ri * rowH + 5;
      text(svg, m.l - 10, top + (step * 3) / 2 + 3, r.label, { "text-anchor": "end", fill: INK, "font-size": spec.labelSize || 11.5 });
      r.diffs.forEach((d, i) => {
        const yy = top + i * step, x0 = x(0), x1 = x(d.m), mid = yy + barH / 2;
        const p = el("path", { d: barPath(Math.min(x0, x1), yy, Math.abs(x1 - x0) || 2, barH, 3, "right"), fill: ARM_COLOR[bases[i]], class: "viz-bar" }, svg);
        hoverable(p, `<b>${r.title || r.label}</b><br>Ours − ${ARM_LABEL[bases[i]]}: <b>${d.m > 0 ? "+" : "\u2212"}${Math.abs(d.m).toFixed(1)}</b> ± ${d.se.toFixed(1)} pts<br><span class="dim">${d.n} paired (condition, seed) pairs</span>`);
        el("line", { x1: x(d.m - d.se), x2: x(d.m + d.se), y1: mid, y2: mid, stroke: INK, "stroke-width": 1.2, opacity: 0.7 }, svg);
        for (const e of [d.m - d.se, d.m + d.se]) el("line", { x1: x(e), x2: x(e), y1: yy + 1, y2: yy + barH - 1, stroke: INK, "stroke-width": 1.2, opacity: 0.7 }, svg);
        const off = 7 + d.se * pw / (hi - lo);
        text(svg, x1 + (d.m >= 0 ? off : -off), yy + barH,
          `${d.m > 0 ? "+" : "\u2212"}${Math.abs(d.m).toFixed(1)}`, { "text-anchor": d.m >= 0 ? "start" : "end", "font-size": spec.valueSize || 10, fill: MUTED });
      });
    });
    legend(container, bases.map((b) => ({ label: `vs ${ARM_LABEL[b]}`, color: ARM_COLOR[b] })));
  }

  /* Single-series bars (ablation), one panel per environment. */
  function ablationPanel(container, spec) {
    const W = 420, rowH = 27, barH = 10, m = { t: 8, r: 34, b: 22, l: 82 };
    const H = m.t + m.b + spec.bars.length * rowH;
    const svg = frame(container, W, H);
    const pw = W - m.l - m.r, max = 100, x = (v) => m.l + pw * v / max;
    for (const v of [0, 25, 50, 75, 100]) {
      el("line", { x1: x(v), x2: x(v), y1: m.t, y2: H - m.b, stroke: GRID, "stroke-width": 1 }, svg);
      text(svg, x(v), H - m.b + 16, v, { "text-anchor": "middle", "font-size": 10.5 });
    }
    const full = spec.bars.find((b) => b.label === "full").value;
    el("line", { x1: x(full), x2: x(full), y1: m.t, y2: H - m.b, stroke: ARM_COLOR.sandwich_encvis, "stroke-width": 1.5, "stroke-dasharray": "4 4", opacity: 0.7 }, svg);
    spec.bars.forEach((b, i) => {
      const yy = m.t + i * rowH + 7, w = pw * b.value / max;
      const isFrozen = b.label === "frozen", isFull = b.label === "full";
      const color = isFrozen ? ARM_COLOR.frozen : ARM_COLOR.sandwich_encvis;
      const p = el("path", { d: barPath(m.l, yy, w, barH, 3, "right"), fill: color, opacity: isFrozen || isFull ? 1 : 0.58, class: "viz-bar" }, svg);
      const delta = b.value - full;
      hoverable(p, `<b>${spec.env}</b><br>${b.name}: <b>${b.value.toFixed(1)}%</b>${isFull ? "" : `<br><span class="dim">${delta > 0 ? "+" : "\u2212"}${Math.abs(delta).toFixed(1)} vs full</span>`}`);
      text(svg, m.l - 10, yy + barH - 1, b.name, { "text-anchor": "end", "font-size": 11.5, fill: isFrozen || isFull ? INK : MUTED });
      text(svg, m.l + w + 6, yy + barH - 1, b.value.toFixed(1), { "font-size": 10.5, fill: color, "font-weight": 600 });
    });
    el("line", { x1: m.l, x2: m.l, y1: m.t, y2: H - m.b, stroke: "var(--axis)", "stroke-width": 1 }, svg);
  }

  /* ---- wire the page up ---------------------------------------------------- */
  const D = window.SR_DATA;
  const arms = D.arms;
  const byId = (id) => document.getElementById(id);

  groupedBars(byId("chart-aggregate"), {
    arms, width: 400, height: 264, margins: { t: 10, r: 5, b: 48, l: 28 },
    labelLines: 2, labelSize: 10, groupFill: 0.72, barGap: 1.5,
    groups: D.aggregate.map((g, i) => ({
      label: ["Medium\nMaze", "Diverse\nMaze", "PushObj", "PushT", "Compound", "Cube"][i],
      values: g.values, note: `mean over ${g.n_cond} condition${g.n_cond > 1 ? "s" : ""}`,
    })),
  });

  groupedBarsH(byId("chart-compound"), {
    arms, width: 400, barH: 6, step: 8, rowH: 34, labelSize: 10,
    margins: { t: 6, r: 20, b: 20, l: 112 }, ticks: [0, 50, 100],
    rows: D.compound.map((r, i) => ({
      label: ["Maze · damping", "Maze · density", "PushT · blur + kᵥ", "PushT · anchor + kᵥ", "PushT · blur + anchor", "PushObj T", "PushObj square"][i],
      title: r.short, values: r.cells.map((c) => c.m),
    })),
  });

  diffChart(byId("chart-paired"), {
    rows: D.paired.map((r, i) => ({
      ...r,
      label: ["All primary (21)", "Medium Maze", "Diverse Maze", "PushObj", "PushT", "Compound (7)", "Cube"][i],
      title: r.label,
    })),
    width: 400, barH: 6, step: 10, rowH: 34,
    labelSize: 11.5, valueSize: 11,
    margins: { t: 6, r: 24, b: 20, l: 102 }, tickStep: 10,
  });

  D.ablation.forEach((panel, i) => {
    const names = { frozen: "Frozen", full: "Full", noaction: "− action", nooutput: "− output", noinput: "− input" };
    ablationPanel(byId(`chart-ablation-${i}`), {
      env: panel.env,
      bars: panel.bars.map((b) => ({ label: b.label, name: names[b.label], value: b.value })),
    });
  });

  groupedBars(byId("chart-cube"), {
    arms, width: 460, height: 250, valueLabels: true, valueSize: 8,
    margins: { t: 12, r: 6, b: 52, l: 32 }, labelLines: 2, labelSize: 12,
    groupFill: 0.78, barGap: 1.5, ticks: [0, 20, 40, 60, 80], max: 80,
    groups: D.cube.map((r, i) => ({
      label: ["No shift", "Light 0.3", "Camera\n+10°", "Arm gain\n0.5×"][i],
      values: r.cells.map((c) => c.m), note: `${r.cells[0].n} seeds × 50 episodes`,
    })).concat([{ label: "Average", sub: "4 conditions", values: D.cube_avg }]),
  });
})();
