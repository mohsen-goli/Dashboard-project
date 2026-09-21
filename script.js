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

let orders = [];

// ===============================
// Orders Elements
// ===============================

const ordersTableBody = document.querySelector("tbody");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");

// ===============================
// Dashboard Elements
// ===============================

const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");
const totalCustomers = document.getElementById("totalCustomers");

const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

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

// Sales Chart
// ===============================

function createSalesChart() {
  const monthlySales = {};

  // Go through every order
  orders.forEach(function (order) {
    const date = new Date(order.date);

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    const price = Number(order.price.replace("$", ""));

    // Create month if it doesn't exist
    if (!monthlySales[month]) {
      monthlySales[month] = 0;
    }

    // Add order price to that month
    monthlySales[month] += price;
  });

  const labels = Object.keys(monthlySales);

  const data = Object.values(monthlySales);

  const salesChart = document.getElementById("salesChart");

  new Chart(salesChart, {
    type: "line",

    data: {
      labels: labels,

      datasets: [
        {
          label: "Sales",

          data: data,

          borderWidth: 3,

          tension: 0.4,

          pointRadius: 4,

          pointHoverRadius: 6,

          fill: false,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label: function (context) {
              return "$" + context.parsed.y.toLocaleString();
            },
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
        },
      },
    },
  });
}
// ===============================
// Load Orders From JSON
// ===============================

fetch("./data/orders.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Failed to load orders.json");
    }

    return response.json();
  })

  .then(function (data) {
    // Put JSON data inside orders
    orders = data;

    // Hide loading message
    loadingMessage.style.display = "none";

    // Update dashboard numbers
    updateStats();

    // Show orders in table
    renderOrders(orders);

    // Create sales chart
    createSalesChart();
  })

  .catch(function (error) {
    loadingMessage.style.display = "none";

    errorMessage.textContent = "Failed to load orders.";

    console.error("Error loading orders:", error);
  });
