const cursor = document.querySelector(".cursor");

const mouse = { x: 0, y: 0 };
const pos = { x: 0, y: 0 };
const lastMouse = { x: 0, y: 0 };

const speed = 0.15;
let scale = 0;
let angle = 0;

// Track mouse movement
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  // ✅ Initialize cursor position on first movement
  if (pos.x === 0 && pos.y === 0) {
    pos.x = mouse.x;
    pos.y = mouse.y;
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
  }
});

/* ================================
   Hover fill on links & buttons
================================ */
const hoverTargets = document.querySelectorAll("a, button");

hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("is-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-hover");
  });
});
/* ================================ */

function animate() {
  // Smooth follow (lerp)
  pos.x += (mouse.x - pos.x) * speed;
  pos.y += (mouse.y - pos.y) * speed;

  const dx = mouse.x - lastMouse.x;
  const dy = mouse.y - lastMouse.y;

  lastMouse.x = mouse.x;
  lastMouse.y = mouse.y;

  const velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 4, 150);
  const targetScale = (velocity / 150) * 0.5;
  scale += (targetScale - scale) * speed;

  if (velocity > 20) {
    angle = Math.atan2(dy, dx) * (180 / Math.PI);
  }

  cursor.style.transform = `
    translate(${pos.x}px, ${pos.y}px)
    rotate(${angle}deg)
    scale(${1 + scale}, ${1 - scale})
  `;

  requestAnimationFrame(animate);
}

animate();
