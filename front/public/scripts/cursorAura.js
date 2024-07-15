let auraReceptors = document.querySelectorAll(".cursor-aura-receptor");
let currentReceptor;
let cursorAura;

const cursorAuraHandler = (e) => {
  if (!currentReceptor || !cursorAura) {
    return;
  }
  // Get the mouse coordinates
  let mouseX = e.clientX;
  let mouseY = e.clientY;

  // Calculate the position
  let receptorOffset = currentReceptor.getBoundingClientRect();
  let auraLeft = mouseX - receptorOffset.left;
  let auraTop = mouseY - receptorOffset.top;

  // Use the translate transform to position .cursor-aura
  cursorAura.style.left = auraLeft + "px";
  cursorAura.style.top = auraTop + "px";
};

// Function to add event listeners to aura receptors
const addAuraReceptorListener = (receptor) => {
  receptor.classList.add("processed");
  receptor.addEventListener("mouseenter", () => {
    if (receptor.classList.contains("hovering")) {
      return;
    }
    receptor.classList.add("hovering");
    cursorAura = document.createElement("div");
    cursorAura.classList.add("cursor-aura");
    receptor.prepend(cursorAura);
    currentReceptor = receptor;
    document.addEventListener("mousemove", cursorAuraHandler);
  });

  receptor.addEventListener("mouseleave", () => {
    if (!cursorAura) {
      return;
    }
    receptor.classList.remove("hovering");
    document.removeEventListener("mousemove", cursorAuraHandler);
    currentReceptor = null;
    cursorAura.remove();
    cursorAura = null;
  });
};

// Initial setup for existing aura receptors
auraReceptors.forEach((receptor) => {
  addAuraReceptorListener(receptor);
});

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // New elements were added to the DOM
      auraReceptors = document.querySelectorAll(".cursor-aura-receptor:not(.processed)");
      auraReceptors.forEach((receptor) => {
        addAuraReceptorListener(receptor);
      });
    }
  }
});

// Start observing changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });