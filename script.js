// ===============================
// API Configuration
// ===============================

const API_BASE_URL = "https://nova-admin-api-theta.vercel.app/api";

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
// Notifications
// ===============================

const notificationButton = document.getElementById("notificationButton");
const notificationPanel = document.getElementById("notificationPanel");

notificationButton.addEventListener("click", function (event) {
  event.stopPropagation();

  notificationPanel.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (
    !notificationPanel.contains(event.target) &&
    !notificationButton.contains(event.target)
  ) {
    notificationPanel.classList.remove("show");
  }
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
    return total + Number(String(order.price).replace("$", ""));
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
// Delete Order
// ===============================

async function deleteOrder(orderId) {
  const confirmed = confirm(
    `Are you sure you want to delete order ${orderId}?`,
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/${orderId.replace("#", "")}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete order");
    }

    const data = await response.json();

    console.log("Deleted order:", data);

    orders = orders.filter(function (order) {
      return order.id !== orderId;
    });

    updateStats();

    applyFilters();
  } catch (error) {
    console.error("Error deleting order:", error);

    alert("Failed to delete order.");
  }
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

      <td>
        $${Number(order.price).toLocaleString()}
      </td>

      <td>
        <span class="status ${order.status.toLowerCase()}">
          ${order.status}
        </span>
      </td>

      <td>
        <button
          class="delete-order-button"
          data-id="${order.id}"
        >
          Delete
        </button>
      </td>
    `;

    ordersTableBody.insertBefore(row, noResults);
  });

  if (orderList.length === 0) {
    noResults.style.display = "";
  } else {
    noResults.style.display = "none";
  }

  // ===============================
  // Delete Buttons
  // ===============================

  const deleteButtons = document.querySelectorAll(".delete-order-button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      deleteOrder(button.dataset.id);
    });
  });
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

  // ===============================
  // Status Filter
  // ===============================

  if (selectedStatus !== "all") {
    filteredOrders = filteredOrders.filter(function (order) {
      return order.status === selectedStatus;
    });
  }

  // ===============================
  // Search
  // ===============================

  if (searchTerm !== "") {
    filteredOrders = filteredOrders.filter(function (order) {
      return (
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm) ||
        order.product.toLowerCase().includes(searchTerm) ||
        String(order.price).toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
      );
    });
  }

  // ===============================
  // Sort
  // ===============================

  filteredOrders.sort(function (a, b) {
    if (selectedSort === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (selectedSort === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    if (selectedSort === "highest") {
      return Number(b.price) - Number(a.price);
    }

    if (selectedSort === "lowest") {
      return Number(a.price) - Number(b.price);
    }

    return 0;
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

    const price = Number(order.price);

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
// Load Orders From Express API
// ===============================

fetch(`${API_BASE_URL}/orders`)
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
