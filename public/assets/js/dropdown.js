console.log("script running...");

function showDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const items = dropdown.getElementsByClassName("dropdown__item");

    dropdown.classList.add("dropdown__content--show");

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
    const group = dropdown.querySelector(".dropdown__group");
    const items = dropdown.getElementsByClassName("dropdown__item");

    if (searchText === "") {
        for (let i = 0; i < items.length; i++) {
            if (i < 3) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }

        const noResults = dropdown.querySelector(".dropdown__no-results");
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

    const existingNoResults = dropdown.querySelector(".dropdown__no-results");

    if (visibleCount === 0) {
        if (!existingNoResults) {
            const noResults = document.createElement("div");
            noResults.className = "dropdown__no-results";
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
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdownContainer) {
        const input = dropdownContainer.querySelector(".dropdown__search");
        const dropdown = dropdownContainer.querySelector(".dropdown__content");

        if (!dropdownContainer.contains(event.target)) {
            dropdown.classList.remove("dropdown__content--show");
        }
    });
});