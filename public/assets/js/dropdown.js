console.log("script running...");

// Show dropdown and first 3 items when input is focused
function showDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const items = dropdown.getElementsByClassName("dropdown__item");

    // Show dropdown
    dropdown.classList.add("dropdown__content--show");

    // Show only first 3 items initially
    for (let i = 0; i < items.length; i++) {
        if (i < 3) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

// Function to filter items based on search
function filterDropdown(dropdownId) {
    // Get the search input
    const input = document.getElementById(dropdownId + "-search");
    const searchText = input.value.trim();
    const filter = searchText.toUpperCase();

    // Get the dropdown
    const dropdown = document.getElementById(dropdownId);
    const group = dropdown.querySelector(".dropdown__group");
    const items = dropdown.getElementsByClassName("dropdown__item");

    // If input is empty, show first 3 items
    if (searchText === "") {
        for (let i = 0; i < items.length; i++) {
            if (i < 3) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }

        // Remove "no results" message if it exists
        const noResults = dropdown.querySelector(".dropdown__no-results");
        if (noResults) {
            noResults.remove();
        }
        return;
    }

    // Filter items based on search
    let visibleCount = 0;
    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;

        // If text matches search, show it
        if (text.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
            visibleCount++;
        } else {
            items[i].style.display = "none";
        }
    }

    // Handle "no results" message
    const existingNoResults = dropdown.querySelector(".dropdown__no-results");

    if (visibleCount === 0) {
        // Show "no results" message
        if (!existingNoResults) {
            const noResults = document.createElement("div");
            noResults.className = "dropdown__no-results";
            noResults.textContent = "Ingen resultater fundet";
            group.appendChild(noResults);
        }
    } else {
        // Remove "no results" message if items are found
        if (existingNoResults) {
            existingNoResults.remove();
        }
    }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdownContainer) {
        const input = dropdownContainer.querySelector(".dropdown__search");
        const dropdown = dropdownContainer.querySelector(".dropdown__content");

        // If click is outside the dropdown container
        if (!dropdownContainer.contains(event.target)) {
            dropdown.classList.remove("dropdown__content--show");
        }
    });
});