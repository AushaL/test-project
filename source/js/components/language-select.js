export default function languageSelect() {
  const languageButton = document.querySelector(
    ".header__language-button--desktop"
  );

  const languageOptions = languageButton.querySelectorAll(
    ".header__language-option"
  );

  const languageButtonMobile = document.querySelector(
    ".header__language-button--mobile"
  );

  const languageOptionsMobile = languageButtonMobile.querySelectorAll(
    ".header__language-option"
  );

  function openSelect(isMobile) {
    if (isMobile) {
      languageButtonMobile.classList.add("active");

      languageOptionsMobile.forEach((option) => {
        option.classList.add("active");
      });
    } else {
      languageButton.classList.add("active");

      languageOptions.forEach((option) => {
        option.classList.add("active");
      });
    }
  }

  function closeSelect(elem, isMobile) {
    if (isMobile) {
      languageOptionsMobile.forEach((option) => {
        option.classList.remove("active");
        languageButtonMobile.classList.remove("active");
      });
    } else {
      languageOptions.forEach((option) => {
        option.classList.remove("active");
        elem.classList.add("active");
        languageButton.classList.remove("active");
      });
    }
  }

  languageButton.addEventListener("click", () => {
    const isMobile = false;

    openSelect(isMobile);
  });

  languageButtonMobile.addEventListener("click", () => {
    const isMobile = true;

    openSelect(isMobile);
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      if (languageButton.classList.contains("active")) {
        const isMobile = false;

        event.stopPropagation();
        closeSelect(event.target, isMobile);
      }
    });
  });

  languageOptionsMobile.forEach((option) => {
    option.addEventListener("click", (event) => {
      if (languageButtonMobile.classList.contains("active")) {
        const isMobile = true;

        event.stopPropagation();
        closeSelect(event.target, isMobile);
      }
    });
  });
}
