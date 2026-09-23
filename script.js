// ===============================
// API Configuration
// ===============================

const API_BASE_URL =
  "https://nova-admin-api-theta.vercel.app/api";

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

const themeButton =
  document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// ===============================
// Notifications
// ===============================

const notificationButton =
  document.getElementById("notificationButton");

const notificationPanel =
  document.getElementById("notificationPanel");

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
// Edit State
// ===============================

let editingOrderId = null;

// null = Add mode
// "#1028" = Edit mode

// ===============================
// Orders Elements
// ===============================

const ordersTableBody =
  document.querySelector("tbody");

const noResults =
  document.getElementById("noResults");

const searchInput =
  document.getElementById("searchInput");

// ===============================
// Dashboard Elements
// ===============================

const totalOrders =
  document.getElementById("totalOrders");

const totalRevenue =
  document.getElementById("totalRevenue");

const totalCustomers =
  document.getElementById("totalCustomers");

const loadingMessage =
  document.getElementById("loadingMessage");

const errorMessage =
  document.getElementById("errorMessage");

// ===============================
// Modal Elements
// ===============================

const addOrderButton =
  document.getElementById("addOrderButton");

const orderModal =
  document.getElementById("orderModal");

const closeOrderModal =
  document.getElementById("closeOrderModal");

const cancelOrderButton =
  document.getElementById("cancelOrderButton");

const orderForm =
  document.getElementById("orderForm");

const orderIdInput =
  document.getElementById("orderId");

const customerNameInput =
  document.getElementById("customerName");

const productNameInput =
  document.getElementById("productName");

const orderPriceInput =
  document.getElementById("orderPrice");

const orderStatusInput =
  document.getElementById("orderStatus");

const orderDateInput =
  document.getElementById("orderDate");

const formMessage =
  document.getElementById("formMessage");

const modalTitle =
  document.getElementById("modalTitle");

const modalDescription =
  document.getElementById("modalDescription");

const submitOrderButton =
  document.getElementById("submitOrderButton");

// ===============================
// Open Add Order Modal
// ===============================

addOrderButton.addEventListener("click", function () {
  editingOrderId = null;

  modalTitle.textContent = "Add New Order";

  modalDescription.textContent =
    "Create a new customer order.";

  submitOrderButton.textContent =
    "Create Order";

  orderIdInput.disabled = false;

  formMessage.textContent = "";

  formMessage.className = "form-message";

  orderForm.reset();

  orderStatusInput.value = "Pending";

  orderDateInput.value =
    new Date().toISOString().split("T")[0];

  orderModal.classList.add("show");

  orderIdInput.focus();
});

// ===============================
// Open Edit Order Modal
// ===============================

function openEditModal(orderId) {
  const order = orders.find(function (item) {
    return item.id === orderId;
  });

  if (!order) {
    return;
  }

  editingOrderId = order.id;

  modalTitle.textContent = "Edit Order";

  modalDescription.textContent =
    "Update the customer order.";

  submitOrderButton.textContent =
    "Update Order";

  orderIdInput.value = order.id;

  customerNameInput.value =
    order.customer;

  productNameInput.value =
    order.product;

  orderPriceInput.value =
    order.price;

  orderStatusInput.value =
    order.status;

  orderDateInput.value =
    String(order.date).slice(0, 10);

  // ID نباید در Edit تغییر کند
  orderIdInput.disabled = true;

  formMessage.textContent = "";

  formMessage.className = "form-message";

  orderModal.classList.add("show");

  customerNameInput.focus();
}

// ===============================
// Close Modal
// ===============================

function closeModal() {
  orderModal.classList.remove("show");

  editingOrderId = null;

  formMessage.textContent = "";

  formMessage.className = "form-message";

  orderForm.reset();

  orderIdInput.disabled = false;
}

closeOrderModal.addEventListener(
  "click",
  closeModal,
);

cancelOrderButton.addEventListener(
  "click",
  closeModal,
);

orderModal.addEventListener(
  "click",
  function (event) {
    if (event.target === orderModal) {
      closeModal();
    }
  },
);

// ===============================
// Update Dashboard Stats
// ===============================

function updateStats() {
  totalOrders.textContent =
    orders.length;

  const revenue = orders.reduce(
    function (total, order) {
      return (
        total +
        Number(
          String(order.price).replace("$", ""),
        )
      );
    },
    0,
  );

  totalRevenue.textContent =
    "$" + revenue.toLocaleString();

  const customers = new Set(
    orders.map(function (order) {
      return order.customer;
    }),
  );

  totalCustomers.textContent =
    customers.size;
}

// ===============================
// Create Order
// ===============================

async function createOrder() {
  formMessage.textContent =
    "Creating order...";

  formMessage.className =
    "form-message";

  let orderId =
    orderIdInput.value.trim();

  const customer =
    customerNameInput.value.trim();

  const product =
    productNameInput.value.trim();

  const price =
    Number(orderPriceInput.value);

  const status =
    orderStatusInput.value;

  const date =
    orderDateInput.value;

  if (!orderId.startsWith("#")) {
    orderId = "#" + orderId;
  }

  const duplicateOrder =
    orders.some(function (order) {
      return order.id === orderId;
    });

  if (duplicateOrder) {
    formMessage.textContent =
      "This order ID already exists.";

    formMessage.classList.add("error");

    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/orders`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: orderId,
          customer: customer,
          product: product,
          price: price,
          status: status,
          date: date,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        "Failed to create order",
      );
    }

    const newOrder =
      await response.json();

    orders.push(newOrder);

    updateStats();

    applyFilters();

    formMessage.textContent =
      "Order created successfully!";

    formMessage.classList.add(
      "success",
    );

    setTimeout(function () {
      closeModal();
    }, 700);

  } catch (error) {
    console.error(
      "Error creating order:",
      error,
    );

    formMessage.textContent =
      "Failed to create order.";

    formMessage.classList.add(
      "error",
    );
  }
}

// ===============================
// Update Order
// ===============================

async function updateOrder() {
  formMessage.textContent =
    "Updating order...";

  formMessage.className =
    "form-message";

  const customer =
    customerNameInput.value.trim();

  const product =
    productNameInput.value.trim();

  const price =
    Number(orderPriceInput.value);

  const status =
    orderStatusInput.value;

  const date =
    orderDateInput.value;

  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/${editingOrderId.replace("#", "")}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer: customer,
          product: product,
          price: price,
          status: status,
          date: date,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        "Failed to update order",
      );
    }

    const updatedOrder =
      await response.json();

    orders = orders.map(function (order) {
      if (order.id === editingOrderId) {
        return updatedOrder;
      }

      return order;
    });

    updateStats();

    applyFilters();

    formMessage.textContent =
      "Order updated successfully!";

    formMessage.classList.add(
      "success",
    );

    setTimeout(function () {
      closeModal();
    }, 700);

  } catch (error) {
    console.error(
      "Error updating order:",
      error,
    );

    formMessage.textContent =
      "Failed to update order.";

    formMessage.classList.add(
      "error",
    );
  }
}

// ===============================
// Form Submit
// ===============================

orderForm.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    if (editingOrderId === null) {
      createOrder();
    } else {
      updateOrder();
    }
  },
);

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
      throw new Error(
        "Failed to delete order",
      );
    }

    const data =
      await response.json();

    console.log(
      "Deleted order:",
      data,
    );

    orders = orders.filter(
      function (order) {
        return order.id !== orderId;
      },
    );

    updateStats();

    applyFilters();

  } catch (error) {
    console.error(
      "Error deleting order:",
      error,
    );

    alert(
      "Failed to delete order.",
    );
  }
}

// ===============================
// Render Orders
// ===============================

function renderOrders(orderList) {
  const existingRows =
    ordersTableBody.querySelectorAll(
      "tr:not(#noResults)",
    );

  existingRows.forEach(
    function (row) {
      row.remove();
    },
  );

  orderList.forEach(
    function (order) {
      const row =
        document.createElement("tr");

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
          <div class="order-action-buttons">

            <button
              class="edit-order-button"
              data-id="${order.id}"
            >
              Edit
            </button>

            <button
              class="delete-order-button"
              data-id="${order.id}"
            >
              Delete
            </button>

          </div>
        </td>
      `;

      ordersTableBody.insertBefore(
        row,
        noResults,
      );
    },
  );

  if (orderList.length === 0) {
    noResults.style.display = "";
  } else {
    noResults.style.display = "none";
  }

  // ===============================
  // Edit Buttons
  // ===============================

  const editButtons =
    document.querySelectorAll(
      ".edit-order-button",
    );

  editButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          openEditModal(
            button.dataset.id,
          );
        },
      );
    },
  );

  // ===============================
  // Delete Buttons
  // ===============================

  const deleteButtons =
    document.querySelectorAll(
      ".delete-order-button",
    );

  deleteButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          deleteOrder(
            button.dataset.id,
          );
        },
      );
    },
  );
}

// ===============================
// Search + Status Filters + Sort
// ===============================

const filterButtons =
  document.querySelectorAll(
    ".filter-button",
  );

const sortSelect =
  document.getElementById(
    "sortSelect",
  );

let selectedStatus = "all";

let selectedSort = "newest";

function applyFilters() {
  const searchTerm =
    searchInput.value
      .toLowerCase()
      .trim();

  let filteredOrders =
    [...orders];

  if (
    selectedStatus !== "all"
  ) {
    filteredOrders =
      filteredOrders.filter(
        function (order) {
          return (
            order.status ===
            selectedStatus
          );
        },
      );
  }

  if (searchTerm !== "") {
    filteredOrders =
      filteredOrders.filter(
        function (order) {
          return (
            order.id
              .toLowerCase()
              .includes(searchTerm) ||

            order.customer
              .toLowerCase()
              .includes(searchTerm) ||

            order.product
              .toLowerCase()
              .includes(searchTerm) ||

            String(order.price)
              .toLowerCase()
              .includes(searchTerm) ||

            order.status
              .toLowerCase()
              .includes(searchTerm)
          );
        },
      );
  }

  filteredOrders.sort(
    function (a, b) {
      if (
        selectedSort ===
        "newest"
      ) {
        return (
          new Date(b.date) -
          new Date(a.date)
        );
      }

      if (
        selectedSort ===
        "oldest"
      ) {
        return (
          new Date(a.date) -
          new Date(b.date)
        );
      }

      if (
        selectedSort ===
        "highest"
      ) {
        return (
          Number(b.price) -
          Number(a.price)
        );
      }

      if (
        selectedSort ===
        "lowest"
      ) {
        return (
          Number(a.price) -
          Number(b.price)
        );
      }

      return 0;
    },
  );

  renderOrders(
    filteredOrders,
  );
}

// ===============================
// Search Event
// ===============================

searchInput.addEventListener(
  "input",
  function () {
    applyFilters();
  },
);

// ===============================
// Status Filter Event
// ===============================

filterButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function () {
        selectedStatus =
          button.dataset.status;

        filterButtons.forEach(
          function (item) {
            item.classList.remove(
              "active",
            );
          },
        );

        button.classList.add(
          "active",
        );

        applyFilters();
      },
    );
  },
);

// ===============================
// Sort Event
// ===============================

sortSelect.addEventListener(
  "change",
  function () {
    selectedSort =
      sortSelect.value;

    applyFilters();
  },
);

// ===============================
// Sales Chart
// ===============================

function createSalesChart() {
  const months = [
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];

  const monthlySales = {};

  months.forEach(
    function (month) {
      monthlySales[month] = 0;
    },
  );

  orders.forEach(
    function (order) {
      const date =
        new Date(order.date);

      const month =
        date.toLocaleString(
          "en-US",
          {
            month: "short",
          },
        );

      const price =
        Number(order.price);

      if (
        monthlySales[month] !==
        undefined
      ) {
        monthlySales[month] +=
          price;
      }
    },
  );

  const labels =
    Object.keys(
      monthlySales,
    );

  const data =
    Object.values(
      monthlySales,
    );

  const salesChart =
    document.getElementById(
      "salesChart",
    );

  new Chart(
    salesChart,
    {
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
              label:
                function (
                  context,
                ) {
                  return (
                    "$" +
                    context.parsed.y.toLocaleString()
                  );
                },
            },
          },
        },

        scales: {
          y: {
            beginAtZero: true,

            ticks: {
              callback:
                function (
                  value,
                ) {
                  return (
                    "$" +
                    value.toLocaleString()
                  );
                },
            },
          },
        },
      },
    },
  );
}

// ===============================
// Load Orders From API
// ===============================

fetch(
  `${API_BASE_URL}/orders`,
)
  .then(
    function (response) {
      if (!response.ok) {
        throw new Error(
          "Failed to load orders",
        );
      }

      return response.json();
    },
  )

  .then(
    function (data) {
      orders = data;

      loadingMessage.style.display =
        "none";

      updateStats();

      applyFilters();

      createSalesChart();
    },
  )

  .catch(
    function (error) {
      loadingMessage.style.display =
        "none";

      errorMessage.textContent =
        "Failed to load orders.";

      console.error(
        "Error loading orders:",
        error,
      );
    },
  );