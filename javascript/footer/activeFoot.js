//footer being allowed to use the bubble animations
const wrapper = document.getElementById("bubble-wrapper");
const footer = document.getElementById("footer");

const animateBubble = (x) => {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = `${x}px`;
  wrapper.appendChild(bubble);
  setTimeout(() => wrapper.removeChild(bubble), 2000);
};

footer.addEventListener("mousemove", (e) => {
  const x = e.clientX - footer.getBoundingClientRect().left;
  animateBubble(x);
});
