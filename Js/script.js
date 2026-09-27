const messageModal = document.getElementById("messageModal");
const giftModal = document.getElementById("giftModal");
const messageText = document.getElementById("messageText");

document.querySelectorAll(".car").forEach(car => {
  car.addEventListener("click", () => {
    messageText.textContent = car.dataset.message;
    messageModal.classList.add("show");
    messageModal.setAttribute("aria-hidden", "false");
  });
});

document.getElementById("openGift").addEventListener("click", () => {
  giftModal.classList.add("show");
  giftModal.setAttribute("aria-hidden", "false");
  launchHearts();
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", closeModals);
});

[messageModal, giftModal].forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) closeModals();
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModals();
});

function closeModals() {
  messageModal.classList.remove("show");
  giftModal.classList.remove("show");
  messageModal.setAttribute("aria-hidden", "true");
  giftModal.setAttribute("aria-hidden", "true");
}

document.getElementById("heartButton").addEventListener("click", () => {
  launchHearts(30);
});

function launchHearts(amount = 18) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.textContent = ["❤️","💗","💕","✨"][Math.floor(Math.random()*4)];

    Object.assign(heart.style, {
      position: "fixed",
      left: `${Math.random()*100}vw`,
      bottom: "-30px",
      zIndex: 999,
      pointerEvents: "none",
      fontSize: `${14 + Math.random()*22}px`
    });

    document.body.appendChild(heart);

    const animation = heart.animate(
      [
        { transform: "translateY(0) scale(.7) rotate(0deg)", opacity: 0 },
        { transform: `translate(${(Math.random()-.5)*100}px,-45vh) scale(1) rotate(180deg)`, opacity: 1, offset:.55 },
        { transform: `translate(${(Math.random()-.5)*180}px,-100vh) scale(.8) rotate(360deg)`, opacity: 0 }
      ],
      {
        duration: 2200 + Math.random()*1400,
        easing: "ease-out"
      }
    );

    animation.finished.finally(() => heart.remove());
  }
}