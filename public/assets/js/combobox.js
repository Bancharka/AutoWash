document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-combobox]").forEach((combobox) => {
    const input = combobox.querySelector("[data-combobox-input]");
    const content = combobox.querySelector("[data-combobox-content]");
    const results = combobox.querySelector("[data-combobox-results]");

    input.addEventListener("input", () => {
      const query = input.value.toLowerCase();
      let hasVisible = false;

      Array.from(results.children).forEach((item) => {
        const text = item.dataset.text.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "";
          hasVisible = true;
        } else {
          item.style.display = "none";
        }
      });

      content.style.display = hasVisible ? "block" : "none";
    });

    input.addEventListener("focus", () => {
      content.style.display = "block";
    });

    input.addEventListener("blur", () => {
      setTimeout(() => (content.style.display = "none"), 150);
    });

    results.addEventListener("click", (e) => {
      const item = e.target.closest("[data-value]");
      if (!item) return;

      combobox.dispatchEvent(
        new CustomEvent("combobox:select", {
          bubbles: true,
          detail: {
            id: item.dataset.value,
            text: item.dataset.text,
          },
        })
      );

      input.value = "";
    });
  });
});
