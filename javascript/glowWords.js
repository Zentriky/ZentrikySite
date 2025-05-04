//Created a glowing effect that can "crawl" over words
document.addEventListener("DOMContentLoaded", () => {
  //Wrap words once
  document.querySelectorAll('[data-glow="words"]').forEach((zone) => {
    zone.innerHTML = zone.textContent
      .trim()
      .split(/\s+/)
      .map((w, i) => `<span class="glow-word" data-i="${i}">${w}</span>`)
      .join(" ");
  });

  // Wave toggle
  document.body.addEventListener("click", (e) => {
    if (!e.target.classList.contains("glow-word")) return;

    const zone = e.target.closest('[data-glow="words"]');
    const words = [...zone.querySelectorAll(".glow-word")];
    const centerIdx = +e.target.dataset.i;
    const STEP_MS = 80;

    if (!zone.classList.contains("glow-done")) {
      waveOn(); // turn on
    } else {
      waveOff(); // turn off
    }

    /* helpers for on and off */
    function waveOn() {
      let offset = 0;
      zone.classList.add("glow-done");
      const id = setInterval(() => {
        const L = centerIdx - offset,
          R = centerIdx + offset;
        if (L >= 0) words[L].classList.add("glow-lock");
        if (R < words.length) words[R].classList.add("glow-lock");
        offset++;
        if (L < 0 && R >= words.length) clearInterval(id);
      }, STEP_MS);
    }
    function waveOff() {
      let offset = 0;
      const id = setInterval(() => {
        const L = offset,
          R = words.length - 1 - offset;
        if (L < words.length) words[L].classList.remove("glow-lock");
        if (R >= 0) words[R].classList.remove("glow-lock");
        offset++;
        if (L >= R) {
          clearInterval(id);
          zone.classList.remove("glow-done");
        }
      }, STEP_MS);
    }
  });
});
