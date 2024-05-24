export default function mobileNav() {
  const burgerButton = document.querySelector(".header__burger-button");
  const burgerIcon = document.querySelector(".header__burger-icon");
  const closeIcon = document.querySelector(".header__close-icon");
  const menuGrid = document.querySelector(".header__grid");
  const body = document.querySelector("body");

  burgerButton.addEventListener("click", () => {
    menuGrid.classList.toggle("active");
    body.style.overflowY = menuGrid.classList.contains("active")
      ? "hidden"
      : "scroll";

    burgerIcon.style.display = menuGrid.classList.contains("active")
      ? "none"
      : "block";
    closeIcon.style.display = menuGrid.classList.contains("active")
      ? "block"
      : "none";
  });
}
