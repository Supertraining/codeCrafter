const planContainer = document.getElementById("planes-precios");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(shoot, 0);
      setTimeout(shoot, 200);
      setTimeout(shoot, 400);
      observer.unobserve(entry.target);
    }
  });
});

observer.observe(planContainer);

function shoot() {
  confetti({
    origin: { x: 0.5, y: 0.7 },
  });
}
