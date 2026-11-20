const PAPER = [255, 255, 255];
const WASH = [255, 255, 255];

let last = "";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mix(from: number[], to: number[], amount: number) {
  return from.map((channel, index) => Math.round(channel + (to[index]! - channel) * amount));
}

/** Page wash tracks scroll position. No timed fade, so it stays locked to the eased scroll. */
export function syncPageWash() {
  const view = window.innerHeight;
  const travel = view * 0.45 || 1;
  const fieldEl = document.querySelector<HTMLElement>("[data-field-wash]");
  const nightEl = document.querySelector<HTMLElement>("[data-night-wash]");
  const nightSection = document.getElementById("security");

  let field = 0;
  if (fieldEl) {
    const box = fieldEl.getBoundingClientRect();
    field = Math.min(clamp((view - box.top) / travel), clamp(box.bottom / travel));
  }

  let night = 0;
  if (nightEl && nightSection) {
    const lead = nightEl.getBoundingClientRect();
    const section = nightSection.getBoundingClientRect();
    night = Math.min(clamp((view - lead.top) / travel), clamp(section.bottom / travel));
  }

  const root = document.documentElement;
  if (field < 0.004 && night < 0.004) {
    if (!last) return;
    last = "";
    root.style.removeProperty("--background");
    window.dispatchEvent(new CustomEvent("osfin-wash"));
    return;
  }

  const base = mix(PAPER, WASH, field);
  const color = mix(base, WASH, night);
  const next = `rgb(${color[0]} ${color[1]} ${color[2]})`;
  if (next === last) return;
  last = next;
  root.style.setProperty("--background", next);
  window.dispatchEvent(new CustomEvent("osfin-wash"));
}
