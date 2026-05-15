/* js/loading.js */
/* Preloader: show at least 1.5s, hide after window load + components-ready */

(function () {
  'use strict';

  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  let windowLoaded = false;
  let componentsReady = false;
  const minDelay = 1500; // 1.5 seconds
  let startTime = Date.now();

  function tryHidePreloader() {
    if (windowLoaded && componentsReady) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDelay - elapsed);

      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Remove preloader from DOM after fade transition (0.5s)
        setTimeout(() => {
          if (preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 600);
      }, remaining);
    }
  }

  // Window load event
  window.addEventListener('load', () => {
    windowLoaded = true;
    tryHidePreloader();
  });

  // Custom components-ready event from app.js
  document.addEventListener('components-ready', () => {
    componentsReady = true;
    tryHidePreloader();
  });

  // Fallback: if for any reason components-ready doesn't fire within 5 seconds,
  // treat it as ready to avoid infinite loader.
  setTimeout(() => {
    if (!componentsReady) {
      componentsReady = true;
      tryHidePreloader();
    }
  }, 5000);

})();