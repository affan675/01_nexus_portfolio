/* js/cursor.js */
/* Custom cursor with cyan main dot and 5 trailing dots with lerp movement */

(function () {
  'use strict';

  // Check if device has a fine pointer (mouse/trackpad), if not, do nothing
  if (window.matchMedia('(any-pointer: coarse)').matches) {
    return;
  }

  /* ========== Dom creation ========== */
  const body = document.body;

  // Create cursor container (optional, we'll create dots directly)
  const mainDot = document.createElement('div');
  mainDot.classList.add('cursor-dot', 'main');

  // Create 5 trailing dots
  const trailCount = 5;
  const trailDots = [];
  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('cursor-dot', 'trail');
    trailDots.push(dot);
  }

  // Append all dots to body
  body.appendChild(mainDot);
  trailDots.forEach(dot => body.appendChild(dot));

  /* ========== Position variables ========== */
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Positions array for trails (current drawn positions)
  const positions = [];
  for (let i = 0; i < trailCount; i++) {
    positions.push({ x: mouseX, y: mouseY });
  }

  /* ========== Mouse move handler ========== */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* ========== Animation loop with lerp ========== */
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function animate() {
    // Update main dot instantly
    mainDot.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;

    // Update trail dots with delay (each follows the previous)
    let prevX = mouseX;
    let prevY = mouseY;
    for (let i = 0; i < trailCount; i++) {
      // Smooth factor increases for each dot (more delay)
      const factor = 0.15 + i * 0.05;
      positions[i].x = lerp(positions[i].x, prevX, factor);
      positions[i].y = lerp(positions[i].y, prevY, factor);

      trailDots[i].style.transform = `translate(${positions[i].x - 4}px, ${positions[i].y - 4}px)`;

      prevX = positions[i].x;
      prevY = positions[i].y;
    }

    requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);

  // Hide default cursor
  body.style.cursor = 'none';

  // Re-show default cursor for interactive elements on hover (optional but good UX)
  const interactiveSelectors = 'a, button, input, textarea, select, label, [role="button"]';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.style.cursor = 'none'; // keep hidden, but we can enlarge main dot if needed
  });

})();