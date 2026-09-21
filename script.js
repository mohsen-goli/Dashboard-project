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
// Dark Mode
// ===============================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// ===============================
// Orders
// ===============================

// فعلاً سفارش‌ها خالی هستند.
// بعداً اطلاعات را از JSON می‌گیریم.
let orders = [];

// ===============================
// Orders Elements
// ===============================

const ordersTableBody = document.querySelector("tbody");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

// ===============================
// Dashboard Elements
// ===============================

const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");
const totalCustomers = document.getElementById("totalCustomers");

// ===============================
// Update Dashboard Stats
// ===============================

function updateStats() {
  // Total Orders
  totalOrders.textContent = orders.length;

  // Total Revenue
  const revenue = orders.reduce(function (total, order) {
    return total + Number(order.price.replace("$", ""));
  }, 0);

  totalRevenue.textContent = "$" + revenue.toLocaleString();

  // Total Customers
  const customers = new Set(
    orders.map(function (order) {
      return order.customer;
    }),
  );

  totalCustomers.textContent = customers.size;
}

// ===============================
// Render Orders
// ===============================

function renderOrders(orderList) {
  // Remove old rows
  const existingRows = ordersTableBody.querySelectorAll("tr:not(#noResults)");

  existingRows.forEach(function (row) {
    row.remove();
  });

  // Create new rows
  orderList.forEach(function (order) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.price}</td>
            <td>
                <span class="status ${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </td>
        `;

    ordersTableBody.insertBefore(row, noResults);
  });

  // Show / hide "No orders found"
  if (orderList.length === 0) {
    noResults.style.display = "";
  } else {
    noResults.style.display = "none";
  }
}

// ===============================
// Search Orders
// ===============================

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredOrders = orders.filter(function (order) {
    return (
      order.id.toLowerCase().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm) ||
      order.product.toLowerCase().includes(searchTerm) ||
      order.price.toLowerCase().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm)
    );
  });

  renderOrders(filteredOrders);
});

// ===============================
// Load Orders From JSON
// ===============================

fetch("./data/orders.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    orders = data;

    loadingMessage.style.display = "none";

    updateStats();

    renderOrders(orders);
  })
  .catch(function (error) {
    loadingMessage.style.display = "none";

    errorMessage.textContent = "Failed to load orders.";

    console.error("Error loading orders:", error);
  });
