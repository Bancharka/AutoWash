console.log("script running...");
function showDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const items = dropdown.getElementsByClassName("dropdownSearch__item");
    dropdown.classList.add("dropdownSearch__content--show");
    for (let i = 0; i < items.length; i++) {
        if (i < 3) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}
function filterDropdown(dropdownId) {
    const input = document.getElementById(dropdownId + "-search");
    const searchText = input.value.trim();
    const filter = searchText.toUpperCase();
    const dropdown = document.getElementById(dropdownId);
    const group = dropdown.querySelector(".dropdownSearch__group");
    const items = dropdown.getElementsByClassName("dropdownSearch__item");
    if (searchText === "") {
        for (let i = 0; i < items.length; i++) {
            if (i < 3) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
        const noResults = dropdown.querySelector(".dropdownSearch__no-results");
        if (noResults) {
            noResults.remove();
        }
        return;
    }
    let visibleCount = 0;
    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
            visibleCount++;
        } else {
            items[i].style.display = "none";
        }
    }
    const existingNoResults = dropdown.querySelector(".dropdownSearch__no-results");
    if (visibleCount === 0) {
        if (!existingNoResults) {
            const noResults = document.createElement("div");
            noResults.className = "dropdownSearch__no-results";
            noResults.textContent = "Ingen resultater fundet";
            group.appendChild(noResults);
        }
    } else {
        if (existingNoResults) {
            existingNoResults.remove();
        }
    }
}
document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".dropdownSearch");
    dropdowns.forEach(function (dropdownContainer) {
        const input = dropdownContainer.querySelector(".dropdownSearch__search");
        const dropdown = dropdownContainer.querySelector(".dropdownSearch__content");
        if (!dropdownContainer.contains(event.target)) {
            dropdown.classList.remove("dropdownSearch__content--show");
        }
    });
});