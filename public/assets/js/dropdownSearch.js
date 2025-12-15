console.log("Dropdown search script running...");

// Generic show dropdown function
function showDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    const items = dropdown.getElementsByClassName("dropdown-search__item");
    dropdown.classList.add("dropdown-search__content--show");

    for (let i = 0; i < items.length; i++) {
        items[i].style.display = i < 3 ? "" : "none";
    }
}

// Generic filter function
function filterDropdown(dropdownId) {
    const input = document.getElementById(dropdownId + "-search");
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    const searchText = input.value.trim();
    const filter = searchText.toUpperCase();
    const group = dropdown.querySelector(".dropdown-search__group");
    const items = dropdown.getElementsByClassName("dropdown-search__item");

    if (searchText === "") {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = i < 3 ? "" : "none";
        }
        const noResults = dropdown.querySelector(".dropdown-search__no-results");
        if (noResults) noResults.remove();
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
    if (visibleCount === 0 && !existingNoResults) {
        const noResults = document.createElement("div");
        noResults.className = "dropdown-search__no-results";
        noResults.textContent = "Ingen resultater fundet";
        group.appendChild(noResults);
    } else if (visibleCount > 0 && existingNoResults) {
        existingNoResults.remove();
    }
}

// Initialize dropdowns
document.addEventListener("DOMContentLoaded", function () {
    // ✅ CLEAR ALL SELECTIONS ON PAGE LOAD
    clearAllSelections();

    // Setup for PRODUCT dropdown
    setupProductDropdown();

    // Setup for TASK dropdown
    setupTaskDropdown();

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (event) {
        document.querySelectorAll(".dropdown-search").forEach(function (container) {
            const dropdown = container.querySelector(".dropdown-search__content");
            if (!container.contains(event.target)) {
                dropdown.classList.remove("dropdown-search__content--show");
            }
        });
    });
});

// Product dropdown setup
function setupProductDropdown() {
    const productDropdown = document.getElementById("productId");
    if (!productDropdown) return;

    const container = productDropdown.closest('.dropdown-search');
    const items = container.querySelectorAll(".dropdown-search__item");
    const input = container.querySelector(".dropdown-search__search");

    let selectedList = document.getElementById('productId-list');
    if (!selectedList) {
        selectedList = document.createElement("div");
        selectedList.id = 'productId-list';
        selectedList.className = "dropdown-search__selected-items";
        container.appendChild(selectedList);
    }

    items.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();

            const productId = item.getAttribute("data-value");
            const productName = item.textContent.trim();

            if (document.getElementById(`product-tag-${productId}`)) {
                alert("Dette produkt er allerede valgt");
                return;
            }

            const tag = createProductTag(productId, productName);
            selectedList.appendChild(tag);

            input.value = "";
            filterDropdown('productId');
            productDropdown.classList.remove("dropdown-search__content--show");
        });
    });
}

// Task dropdown setup
function setupTaskDropdown() {
    const taskDropdown = document.getElementById("taskId");
    if (!taskDropdown) return;

    const container = taskDropdown.closest('.dropdown-search');
    const items = container.querySelectorAll(".dropdown-search__item");
    const input = container.querySelector(".dropdown-search__search");

    let selectedList = document.getElementById('taskId-list');
    if (!selectedList) {
        selectedList = document.createElement("div");
        selectedList.id = 'taskId-list';
        selectedList.className = "dropdown-search__selected-items";
        container.appendChild(selectedList);
    }

    items.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();

            const taskId = item.getAttribute("data-value");
            const taskName = item.textContent.trim();

            if (document.getElementById(`task-tag-${taskId}`)) {
                alert("Denne opgave er allerede valgt");
                return;
            }

            const tag = createTaskTag(taskId, taskName);
            selectedList.appendChild(tag);

            input.value = "";
            filterDropdown('taskId');
            taskDropdown.classList.remove("dropdown-search__content--show");
        });
    });
}

// Create product tag (with amount and unit)
function createProductTag(productId, productName) {
    const tag = document.createElement("div");
    tag.className = "dropdown-search__item-tag";
    tag.id = `product-tag-${productId}`;

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "productIds[]";
    hiddenInput.value = productId;

    const text = document.createElement("span");
    text.className = "dropdown-search__item-text";
    text.textContent = productName;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "dropdown-search__delete-button";
    button.onclick = () => tag.remove();

    const img = document.createElement("img");
    img.src = "/assets/icons/delete.svg";
    img.alt = "Slet";
    button.appendChild(img);

    const amountInput = document.createElement("input");
    amountInput.type = "number";
    amountInput.name = `productAmount_${productId}`;
    amountInput.min = "0";
    amountInput.step = "0.01";
    amountInput.placeholder = "Mængde";
    amountInput.required = true;
    amountInput.className = "dropdown-search__amount-input";

    const unitSelect = document.createElement("select");
    unitSelect.name = `productUnit_${productId}`;
    unitSelect.required = true;
    unitSelect.className = "dropdown-search__unit-select";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Vælg enhed";
    unitSelect.appendChild(defaultOption);

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

    tag.appendChild(hiddenInput);
    tag.appendChild(text);
    tag.appendChild(button);
    tag.appendChild(amountInput);
    tag.appendChild(unitSelect);

    return tag;
}

// Create task tag (simple, no amount/unit)
function createTaskTag(taskId, taskName) {
    const tag = document.createElement("div");
    tag.className = "dropdown-search__item-tag";
    tag.id = `task-tag-${taskId}`;

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "taskIds[]";
    hiddenInput.value = taskId;

    const text = document.createElement("span");
    text.className = "dropdown-search__item-text";
    text.textContent = taskName;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "dropdown-search__delete-button";
    button.onclick = () => tag.remove();

    const img = document.createElement("img");
    img.src = "/assets/icons/delete.svg";
    img.alt = "Slet";
    button.appendChild(img);

    tag.appendChild(hiddenInput);
    tag.appendChild(text);
    tag.appendChild(button);

    return tag;
}

// ✅ CLEAR ALL SELECTIONS FUNCTION
function clearAllSelections() {
    const productList = document.getElementById('productId-list');
    const taskList = document.getElementById('taskId-list');

    if (productList) {
        productList.innerHTML = '';
        console.log('✅ Cleared product selections');
    }

    if (taskList) {
        taskList.innerHTML = '';
        console.log('✅ Cleared task selections');
    }
}