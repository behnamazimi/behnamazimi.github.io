const STORE_KEY = "gym-v1";
const SESSION_KEYS = Object.keys(SESSIONS);

let state = load();

function load() {
  const fresh = { week: 1, session: "A", log: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    return saved && saved.log ? { ...fresh, ...saved } : fresh;
  } catch { return fresh; }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const logKey = (week, sess, id, p) => `${week}.${sess}.${id}.${p}`;
const entry = (week, sess, id, p) => state.log[logKey(week, sess, id, p)];

// Week 4 is the deload: at most 2 sets.
const setCount = (rx) => (state.week === 4 && rx.sets > 2 ? 2 : rx.sets);

// Most recent weight logged for this lift and person in an earlier session slot.
function lastWeight(ex, p) {
  const here = state.week * 10 + SESSION_KEYS.indexOf(state.session);
  let best = null, bestOrder = -1;
  for (const [key, val] of Object.entries(state.log)) {
    const [w, s, id, who] = key.split(".");
    if (who !== p || !val.weight) continue;
    const order = Number(w) * 10 + SESSION_KEYS.indexOf(s);
    const other = SESSIONS[s].exercises.find((e) => e.id === id);
    if (order < here && order > bestOrder && other && other.lift === ex.lift) { best = val.weight; bestOrder = order; }
  }
  return best;
}

function lineHTML(ex, p) {
  const rx = ex[p];
  const count = setCount(rx);
  const e = entry(state.week, state.session, ex.id, p) || { sets: [], weight: "" };
  const last = lastWeight(ex, p);
  const swap = rx.alt ? `<p class="note">Swap: ${esc(rx.alt)}</p>` : "";
  const note = rx.note ? `<p class="note">${esc(rx.note)}</p>` : "";
  const sets = Array.from({ length: count }, (_, i) =>
    `<button class="set" data-ex="${ex.id}" data-p="${p}" data-i="${i}" aria-pressed="${!!e.sets[i]}" aria-label="Set ${i + 1}">${count === 1 ? "✓" : i + 1}</button>`).join("");
  const weight = rx.sets === 1 ? "" : `
    <label class="wt"><input type="text" inputmode="decimal" placeholder="${last ? esc(last) : "–"}" value="${esc(e.weight || "")}" data-ex="${ex.id}" data-p="${p}" aria-label="Weight in kg">kg</label>`;
  return `
    <div class="line ${p}">
      <div class="who"><span class="tag">${PEOPLE[p]}</span><span class="n">#${rx.n}</span>
        <span class="rx">${count} × ${esc(rx.reps)}</span><span class="rest">${esc(rx.rest)}</span></div>
      ${note}${swap}
      <div class="ctrl"><div class="sets">${sets}</div>${weight}</div>
    </div>`;
}

function thumbHTML(ex) {
  if (!IMAGES.has(ex.lift)) return "";
  return `<button class="thumb" data-lift="${ex.lift}" data-name="${esc(ex.name)}" aria-label="Show ${esc(ex.name)} demo">
    <img src="img/${ex.lift}-0.jpg" alt="" loading="lazy"><img src="img/${ex.lift}-1.jpg" alt="" loading="lazy"></button>`;
}

function cardHTML(ex, people) {
  return `<section class="card"><div class="head"><h3>${esc(ex.name)}</h3>${thumbHTML(ex)}</div>${people.map((p) => lineHTML(ex, p)).join("")}</section>`;
}

function render() {
  const sess = SESSIONS[state.session];
  document.getElementById("sessions").innerHTML = SESSION_KEYS.map((k) =>
    `<button role="tab" data-session="${k}" aria-selected="${k === state.session}">${k} · ${SESSIONS[k].title.slice(0, 3)}</button>`).join("");
  document.getElementById("weeks").innerHTML = [1, 2, 3, 4].map((w) =>
    `<button role="tab" data-week="${w}" aria-selected="${w === state.week}">Week ${w}</button>`).join("");
  document.getElementById("focus").textContent = sess.focus;
  document.getElementById("weekNote").innerHTML =
    `<b class="h">Hani</b> ${esc(WEEKS[state.week].h)}<br><b class="b">Behnam</b> ${esc(WEEKS[state.week].b)}`;

  const ex = sess.exercises;
  const shared = ex.filter((e) => e.shared);
  const solo = (p) => ex.filter((e) => e.who === p).sort((a, b) => a[p].n - b[p].n);

  document.getElementById("main").innerHTML = `
    <details><summary>Warm-up</summary><div class="body">
      <p><b class="h">Hani</b> ${esc(WARMUP.h)}</p><p><b class="b">Behnam</b> ${esc(WARMUP.b)}</p></div></details>
    <h2 class="sec">Together</h2>
    ${shared.map((e) => cardHTML(e, ["h", "b"])).join("")}
    <h2 class="sec h">Hani only</h2>
    ${solo("h").map((e) => cardHTML(e, ["h"])).join("")}
    <h2 class="sec b">Behnam only</h2>
    <p class="hint">Knee pain above 3/10 or sharp: stop and use the swap.</p>
    ${solo("b").map((e) => cardHTML(e, ["b"])).join("")}
    <details><summary>Cool-down</summary><div class="body">
      <p><b class="h">Hani</b> ${esc(COOLDOWN.h)}</p><p><b class="b">Behnam</b> ${esc(COOLDOWN.b)}</p></div></details>`;
}

function ensure(ex, p) {
  const k = logKey(state.week, state.session, ex, p);
  return (state.log[k] ||= { sets: [], weight: "" });
}

document.addEventListener("click", (ev) => {
  const t = ev.target.closest("button");
  if (!t) return;
  if (t.classList.contains("thumb")) {
    demo.querySelector("h2").textContent = t.dataset.name;
    demo.querySelector(".frames").innerHTML = `<img src="img/${t.dataset.lift}-0.jpg" alt=""><img src="img/${t.dataset.lift}-1.jpg" alt="">`;
    demo.showModal();
  }
  else if (t.dataset.session) { state.session = t.dataset.session; save(); render(); scrollTo(0, 0); }
  else if (t.dataset.week) { state.week = Number(t.dataset.week); save(); render(); }
  else if (t.classList.contains("set")) {
    const e = ensure(t.dataset.ex, t.dataset.p);
    const i = Number(t.dataset.i);
    e.sets[i] = !e.sets[i];
    t.setAttribute("aria-pressed", String(!!e.sets[i]));
    save();
  }
});

document.addEventListener("input", (ev) => {
  const t = ev.target;
  if (t.matches(".wt input")) { ensure(t.dataset.ex, t.dataset.p).weight = t.value.trim(); save(); }
});

// Menu: backup, restore, reset
const demo = document.getElementById("demo");
demo.addEventListener("click", () => demo.close());
const menu = document.getElementById("menu");
document.getElementById("menuBtn").onclick = () => menu.showModal();
document.getElementById("closeMenu").onclick = () => menu.close();

document.getElementById("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `gym-backup-${new Date().toISOString().slice(0, 10)}.json` });
  a.click();
  URL.revokeObjectURL(a.href);
};

document.getElementById("importFile").onchange = async (ev) => {
  const file = ev.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!data || typeof data.log !== "object") throw new Error("bad file");
    state = { week: 1, session: "A", ...data };
    save(); render(); menu.close();
  } catch { alert("That file isn't a valid backup."); }
  ev.target.value = "";
};

document.getElementById("resetBtn").onclick = () => {
  if (!confirm(`Clear all ticks and weights for week ${state.week}?`)) return;
  const prefix = `${state.week}.`;
  for (const k of Object.keys(state.log)) if (k.startsWith(prefix)) delete state.log[k];
  save(); render(); menu.close();
};

render();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
