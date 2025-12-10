console.log("script running...");

function showDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const items = dropdown.getElementsByClassName("dropdown-search__item");
    dropdown.classList.add("dropdown-search__content--show");
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
    const group = dropdown.querySelector(".dropdown-search__group");
    const items = dropdown.getElementsByClassName("dropdown-search__item");

    if (searchText === "") {
        for (let i = 0; i < items.length; i++) {
            if (i < 3) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
        const noResults = dropdown.querySelector(".dropdown-search__no-results");
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

    const existingNoResults = dropdown.querySelector(".dropdown-search__no-results");
    if (visibleCount === 0) {
        if (!existingNoResults) {
            const noResults = document.createElement("div");
            noResults.className = "dropdown-search__no-results";
            noResults.textContent = "Ingen resultater fundet";
            group.appendChild(noResults);
        }
    } else {
        if (existingNoResults) {
            existingNoResults.remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown-search");

    dropdowns.forEach(function (dropdownContainer) {
        const items = dropdownContainer.querySelectorAll(".dropdown-search__item");
        const input = dropdownContainer.querySelector(".dropdown-search__search");
        const dropdownContent = dropdownContainer.querySelector(".dropdown-search__content");
        const dropdownId = dropdownContent.id;

        // Create selected list container
        let selectedList = document.getElementById(`${dropdownId}-list`);
        if (!selectedList) {
            selectedList = document.createElement("div");
            selectedList.id = `${dropdownId}-list`;
            selectedList.className = "dropdown-search__selected-items";
            dropdownContainer.appendChild(selectedList);
        }

        items.forEach(function (item) {
            item.addEventListener("click", function (e) {
                e.preventDefault();

                const itemId = item.getAttribute("data-value");
                const itemName = item.textContent.trim();

                // Check if already selected
                if (document.getElementById(`item-tag-${itemId}`)) {
                    alert("Dette er allerede valgt");
                    return;
                }

                const tag = document.createElement("div");
                tag.className = "dropdown-search__item-tag";
                tag.id = `item-tag-${itemId}`;
                tag.dataset.itemId = itemId;

                // Hidden input for product ID
                const hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = "productIds[]";
                hiddenInput.value = itemId;

                // Product name
                const text = document.createElement("span");
                text.className = "dropdown-search__item-text";
                text.textContent = itemName;

                tag.appendChild(hiddenInput);
                tag.appendChild(text);

                // If this is the product dropdown, add amount and unit inputs
                if (dropdownId === "productId") {
                    // Amount input
                    const amountInput = document.createElement("input");
                    amountInput.type = "number";
                    amountInput.name = "productAmounts[]"; // Changed to array
                    amountInput.min = "0";
                    amountInput.step = "0.01";
                    amountInput.placeholder = "Mængde";
                    amountInput.required = true;
                    amountInput.className = "dropdown-search__amount-input";

                    // Unit select
                    const unitSelect = document.createElement("select");
                    unitSelect.name = "productUnits[]"; // Changed to array
                    unitSelect.required = true;
                    unitSelect.className = "dropdown-search__unit-select";

                    // Add default option
                    const defaultOption = document.createElement("option");
                    defaultOption.value = "";
                    defaultOption.textContent = "Vælg enhed";
                    unitSelect.appendChild(defaultOption);

                    // Get units from the script tag
                    const unitsData = document.getElementById("unitData");
                    if (unitsData) {
                        const units = JSON.parse(unitsData.textContent);
                        units.forEach((unit) => {
                            const option = document.createElement("option");
                            option.value = unit.value;
                            option.textContent = unit.text;
                            unitSelect.appendChild(option);
                        });
                    }

                    tag.appendChild(amountInput);
                    tag.appendChild(unitSelect);
                }

                // Delete button
                const button = document.createElement("button");
                button.type = "button";
                button.className = "dropdown-search__delete-button";
                button.onclick = () => removeItem(itemId, dropdownId);

                const img = document.createElement("img");
                img.src = "/assets/icons/delete.svg";
                img.alt = "Slet";
                button.appendChild(img);

                tag.appendChild(button);
                selectedList.appendChild(tag);

                // Clear search and close dropdown
                input.value = "";
                filterDropdown(dropdownId);
                dropdownContent.classList.remove("dropdown-search__content--show");
            });
        });
    });
});

// Remove selected item
function removeItem(itemId, dropdownId) {
    const tag = document.getElementById(`item-tag-${itemId}`);
    if (tag) {
        tag.remove();
    }
}

document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".dropdown-search");
    dropdowns.forEach(function (dropdownContainer) {
        const input = dropdownContainer.querySelector(".dropdown-search__search");
        const dropdown = dropdownContainer.querySelector(".dropdown-search__content");
        if (!dropdownContainer.contains(event.target)) {
            dropdown.classList.remove("dropdown-search__content--show");
        }
    });
});