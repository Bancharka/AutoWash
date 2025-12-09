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
        const dropdownId = dropdownContainer.querySelector(".dropdown-search__content").id;

        let selectedContainer = document.getElementById(`${dropdownId}-selected`);
        if (!selectedContainer) {
            selectedContainer = document.createElement("div");
            selectedContainer.id = `${dropdownId}-selected`;
            selectedContainer.style.display = "none";
            dropdownContainer.appendChild(selectedContainer);
        }

        // Create a visible list to show selected items
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
                if (document.getElementById(`item-${itemId}`)) {
                    alert("Dette er allerede valgt");
                    return;
                }

                // Add hidden input for form submission
                const hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = "itemIds[]";
                hiddenInput.value = itemId;
                hiddenInput.id = `item-${itemId}`;
                selectedContainer.appendChild(hiddenInput);

                // Add visible tag
                // const tag = document.createElement("div");
                // tag.className = "dropdown-search__item-tag";
                // const deleteTag = document.createElement("div");
                // deleteTag.className = "dropdown-search__delete-tag"
                // tag.innerHTML = `${itemName} <button class="dropdown-search__delete-button type="button" onclick="removeItem(${itemId}, '${dropdownId}')"><img src="./assets/icons/delete.svg" alt=""></button>`;
                // selectedList.appendChild(tag);

                const tag = document.createElement("div");
                tag.className = "dropdown-search__item-tag";
                tag.dataset.itemId = itemId;

                // text
                const text = document.createElement("span");
                text.className = "dropdown-search__item-text";
                text.textContent = itemName;

                // delete button
                const button = document.createElement("button");
                button.type = "button";
                button.className = "dropdown-search__delete-button";
                button.onclick = () => removeItem(itemId, dropdownId);

                const img = document.createElement("img");
                img.src = "./assets/icons/delete.svg";
                img.alt = "Slet";

                button.appendChild(img);

                // assemble
                tag.appendChild(text);
                tag.appendChild(button);
                selectedList.appendChild(tag);


                // Clear search
                input.value = "";
                filterDropdown(dropdownId);
            });
        });
    });
});

// Remove selected item
function removeItem(itemId, dropdownId) {
    // remove hidden input
    const hiddenInput = document.getElementById(`item-${itemId}`);
    if (hiddenInput) hiddenInput.remove();

    // remove visual tag
    const selectedList = document.getElementById(`${dropdownId}-list`);
    const tag = selectedList.querySelector(
        `.dropdown-search__item-tag[data-item-id="${itemId}"]`
    );

    if (tag) tag.remove();
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