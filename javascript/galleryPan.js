//galler panning effect for zen garden

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth < 768;
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const INTENSITY = isMobile ? 0.25 : 0.45;

  window.addEventListener("mousemove", (e) => {
    const xRatio = e.clientX / window.innerWidth;
    const yRatio = e.clientY / window.innerHeight;

    const maxX = (gallery.offsetWidth - window.innerWidth) * INTENSITY;
    const maxY = (gallery.offsetHeight - window.innerHeight) * INTENSITY;

    const panX = -maxX * xRatio;
    const panY = -maxY * yRatio;

    gallery.animate(
      { transform: `translate(${panX}px, ${panY}px)` },
      { duration: 4000, fill: "forwards", easing: "ease" }
    );
  });
});
