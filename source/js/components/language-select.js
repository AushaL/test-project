export default function languageSelect() {
  const languageButton = document.querySelector(".header__language-button");
  const languageOptions = document.querySelectorAll(".header__language-option");

  function openSelect() {
    languageButton.classList.add("active");

    languageOptions.forEach((option) => {
      option.classList.add("active");
    });
  }

  function closeSelect(elem) {
    languageOptions.forEach((option) => {
      option.classList.remove("active");
      elem.classList.add("active");
      languageButton.classList.remove("active");
    });
  }

  languageButton.addEventListener("click", () => {
    openSelect();
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      if (languageButton.classList.contains("active")) {
        event.stopPropagation();
        closeSelect(event.target);
      }
    });
  });
}
