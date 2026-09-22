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
  totalOrders.textContent = orders.length;

  const revenue = orders.reduce(function (total, order) {
    return total + Number(order.price.replace("$", ""));
  }, 0);

  totalRevenue.textContent = "$" + revenue.toLocaleString();

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
  const existingRows = ordersTableBody.querySelectorAll("tr:not(#noResults)");

  existingRows.forEach(function (row) {
    row.remove();
  });

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

  if (orderList.length === 0) {
    noResults.style.display = "";
  } else {
    noResults.style.display = "none";
  }
}

// ===============================
// Search + Status Filters + Sort
// ===============================

const filterButtons = document.querySelectorAll(".filter-button");
const sortSelect = document.getElementById("sortSelect");

let selectedStatus = "all";
let selectedSort = "newest";

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  let filteredOrders = [...orders];

  // Status Filter
  if (selectedStatus !== "all") {
    filteredOrders = filteredOrders.filter(function (order) {
      return order.status === selectedStatus;
    });
  }

  // Search
  if (searchTerm !== "") {
    filteredOrders = filteredOrders.filter(function (order) {
      return (
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm) ||
        order.product.toLowerCase().includes(searchTerm) ||
        order.price.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
      );
    });
  }

  // Sort
  filteredOrders.sort(function (a, b) {
    if (selectedSort === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (selectedSort === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    if (selectedSort === "highest") {
      return (
        Number(b.price.replace("$", "")) - Number(a.price.replace("$", ""))
      );
    }

    if (selectedSort === "lowest") {
      return (
        Number(a.price.replace("$", "")) - Number(b.price.replace("$", ""))
      );
    }
  });

  renderOrders(filteredOrders);
}

// ===============================
// Search Event
// ===============================

searchInput.addEventListener("input", function () {
  applyFilters();
});

// ===============================
// Status Filter Event
// ===============================

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedStatus = button.dataset.status;

    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    applyFilters();
  });
});

// ===============================
// Sort Event
// ===============================

sortSelect.addEventListener("change", function () {
  selectedSort = sortSelect.value;

  applyFilters();
});

// ===============================
// Sales Chart
// ===============================

function createSalesChart() {
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

  const monthlySales = {};

  months.forEach(function (month) {
    monthlySales[month] = 0;
  });

  orders.forEach(function (order) {
    const date = new Date(order.date);

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    const price = Number(order.price.replace("$", ""));

    if (monthlySales[month] !== undefined) {
      monthlySales[month] += price;
    }
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
// Load Orders From Our Express API
// ===============================

fetch("http://localhost:3000/api/orders")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Failed to load orders");
    }

    return response.json();
  })

  .then(function (data) {
    orders = data;

    loadingMessage.style.display = "none";

    updateStats();

    applyFilters();

    createSalesChart();
  })

  .catch(function (error) {
    loadingMessage.style.display = "none";

    errorMessage.textContent = "Failed to load orders.";

    console.error("Error loading orders:", error);
  });
