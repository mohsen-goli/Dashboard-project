// ===============================
// Sidebar Navigation
// ===============================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

// ===============================
// Order Search
// ===============================

const searchInput = document.getElementById("searchInput");

const orderRows = document.querySelectorAll("tbody tr:not(#noResults)");

const noResults = document.getElementById("noResults");

// Hide message when page loads
noResults.style.display = "none";

// Search when user types
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  let foundOrders = 0;

  orderRows.forEach(function (row) {
    const rowText = row.textContent.toLowerCase();

    if (rowText.includes(searchTerm)) {
      row.style.display = "";
      foundOrders++;
    } else {
      row.style.display = "none";
    }
  });

  // Show / hide "No orders found"

  if (foundOrders === 0) {
    noResults.style.display = "";
  } else {
    noResults.style.display = "none";
  }
});
