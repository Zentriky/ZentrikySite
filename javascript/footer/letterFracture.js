//footer fracture animation
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fancy.fractured").forEach((el) => {
    el.id ||= `fracture-${Math.random().toString(36).slice(2, 9)}`;
    enhance(el.id);
  });
});

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const enhance = (id) => {
  const element = document.getElementById(id),
    text = element.innerText.split("");

  element.innerText = ""; // Clear original text

  text.forEach((value, index) => {
    const outer = document.createElement("span");
    outer.className = "outer";

    const inner = document.createElement("span");
    inner.className = "inner";
    inner.style.animationDelay = `${rand(-5000, 0)}ms`;

    const letter = document.createElement("span");
    letter.className = "letter";
    letter.innerText = value;
    letter.style.animationDelay = `${index * 1000}ms`;

    inner.appendChild(letter);
    outer.appendChild(inner);
    element.appendChild(outer);
  });
};
