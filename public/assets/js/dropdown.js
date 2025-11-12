// Function to open/close dropdown
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("dropdown__content--show");
}

// Function to filter items based on search
function filterDropdown(dropdownId) {
    // Get the search input
    const input = document.getElementById(dropdownId + "-search");
    const filter = input.value.toUpperCase();

    // Get the dropdown
    const dropdown = document.getElementById(dropdownId);

    // Get all items
    const items = dropdown.getElementsByClassName("dropdown__item");

    // Loop through all items
    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;

        // If text matches search, show it. Otherwise hide it.
        if (text.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

// Close dropdown if user clicks outside
window.onclick = function (event) {
    if (!event.target.matches('.dropdown__trigger')) {
        const dropdowns = document.getElementsByClassName("dropdown__content");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('dropdown__content--show');
        }
    }
}