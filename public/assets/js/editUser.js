document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form='edit-user']");
  if (!form) return;

  const stationList = form.querySelector("[data-station-list]");
  if (!stationList) return;

  const combobox = form.querySelector("[data-combobox]");
  const input = combobox.querySelector("[data-combobox-input]");
  const resultsContainer = combobox.querySelector("[data-combobox-results]");

  let stations = Array.from(
    stationList.querySelectorAll("[data-station-id]")
  ).map((el) => ({
    id: el.dataset.stationId,
    text: el.dataset.stationText,
  }));

  let allStations = Array.from(
    resultsContainer.querySelectorAll("[data-value]")
  ).map((el) => ({
    id: el.dataset.value,
    text: el.dataset.text,
  }));

  function renderResults() {
    const availableStations = allStations
      .filter(
        (station) => !stations.some((selected) => selected.id === station.id)
      )
      .sort((a, b) => a.text.localeCompare(b.text));

    resultsContainer.innerHTML = "";
    availableStations.forEach((station) => {
      const div = document.createElement("div");
      div.className = "combobox__item";
      div.dataset.value = station.id;
      div.dataset.text = station.text;
      div.textContent = station.text;
      resultsContainer.appendChild(div);
    });
  }

  renderResults();

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    Array.from(resultsContainer.children).forEach((item) => {
      item.style.display = item.dataset.text.toLowerCase().includes(query)
        ? ""
        : "none";
    });
  });

  resultsContainer.addEventListener("click", (e) => {
    const item = e.target.closest("[data-value]");
    if (!item) return;

    const { value: id, text } = item.dataset;

    if (stations.some((station) => station.id === id)) return;

    stations.push({ id, text });

    const div = document.createElement("div");
    div.className = "station-item";
    div.dataset.stationId = id;
    div.dataset.stationText = text;
    div.innerHTML = `
      <div class="station-item__content">
        <div class="station-item__text">${text}</div>
      </div>
      <button class="station-item__close" data-action="remove">
        <img src="/assets/icons/close.svg" alt="Fjern station" />
      </button>
    `;
    stationList.appendChild(div);

    renderResults();
    input.value = "";
  });

  stationList.addEventListener("click", (e) => {
    const removeBtn = e.target.closest('[data-action="remove"]');
    if (!removeBtn) return;

    const item = removeBtn.closest("[data-station-id]");
    if (!item) return;

    const id = item.dataset.stationId;
    stations = stations.filter((station) => station.id !== id);
    item.remove();

    renderResults();
  });

  form.addEventListener("submit", () => {
    form
      .querySelectorAll('input[name="stationIds[]"]')
      .forEach((item) => item.remove());

    stations.forEach((station) => {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "stationIds[]";
      hidden.value = station.id;
      form.appendChild(hidden);
    });
  });
});
