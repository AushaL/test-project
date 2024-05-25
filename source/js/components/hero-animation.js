export default function heroAnimation() {
  function initDesktopAnimation() {
    const desktopAnimationContainer = document.querySelector(
      ".hero-animated-lines__wrapper--desktop"
    );

    const firstLineDesktop = desktopAnimationContainer.querySelector(
      ".hero-animated-lines__line--first"
    );
    const secondLineDesktop = desktopAnimationContainer.querySelector(
      ".hero-animated-lines__line--second"
    );
    const thirdLineDesktop = desktopAnimationContainer.querySelector(
      ".hero-animated-lines__line--third"
    );

    const firstLineDesktopClone = desktopAnimationContainer
      .querySelector(".hero-animated-lines__line--first img")
      .cloneNode(true);
    const secondLineDesktopClone = desktopAnimationContainer
      .querySelector(".hero-animated-lines__line--second img")
      .cloneNode(true);
    const thirdLineDesktopClone = desktopAnimationContainer
      .querySelector(".hero-animated-lines__line--third img")
      .cloneNode(true);

    desktopAnimationContainer.classList.add("animate");

    firstLineDesktop.append(firstLineDesktopClone);
    secondLineDesktop.append(secondLineDesktopClone);
    thirdLineDesktop.append(thirdLineDesktopClone);
  }

  function initMobileAnimation() {
    const mobileAnimationContainer = document.querySelector(
      ".hero-animated-lines__wrapper--mobile"
    );

    mobileAnimationContainer.classList.add("animate");
  }

  function removeDesktopAnimation() {
    const desktopAnimationContainer = document.querySelector(
      ".hero-animated-lines__wrapper--desktop"
    );
    desktopAnimationContainer.classList.remove("animate");
  }

  function removeMobileAnimation() {
    const mobileAnimationContainer = document.querySelector(
      ".hero-animated-lines__wrapper--mobile"
    );

    mobileAnimationContainer.classList.remove("animate");
  }

  if (window.innerWidth > 1050) {
    initDesktopAnimation();
  } else {
    initMobileAnimation();
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1050) {
      removeMobileAnimation();
      initDesktopAnimation();
    } else {
      removeDesktopAnimation();
      initMobileAnimation();
    }
  });
}
