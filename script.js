const API_BASE_URL = "https://nova-admin-api-theta.vercel.app/api";

/* =========================================
   LANGUAGE / TRANSLATION
========================================= */

const translations = {
  en: {
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    customers: "Customers",
    analytics: "Analytics",
    settings: "Settings",

    welcomeAdmin: "Welcome back, Admin.",
    searchPlaceholder: "Search orders, customers, products...",

    notifications: "Notifications",
    threeNew: "3 new",
    newOrderReceived: "New order received",
    order1028Created: "Order #1028 has been created.",
    orderCompleted: "Order completed",
    order1026Completed: "Order #1026 was completed.",
    dashboardUpdated: "Dashboard updated",
    salesDataUpdated: "Your sales data is up to date.",

    totalRevenue: "Total Revenue",
    totalOrders: "Total Orders",
    conversionRate: "Conversion Rate",

    salesOverview: "Sales Overview",
    monthlySalesPerformance: "Monthly sales performance",
    lastSevenMonths: "Last 7 months",

    recentOrders: "Recent Orders",
    latestCustomerOrders: "Latest customer orders",

    all: "All",
    completed: "Completed",
    pending: "Pending",

    newest: "Newest",
    oldest: "Oldest",
    highestPrice: "Highest Price",
    lowestPrice: "Lowest Price",

    addOrder: "+ Add Order",

    loadingOrders: "Loading orders...",
    noOrdersFound: "No orders found",

    order: "Order",
    customer: "Customer",
    product: "Product",
    price: "Price",
    status: "Status",
    action: "Action",

    topProducts: "Top Products",
    bestSellingProducts: "Best selling products",

    addNewOrder: "Add New Order",
    editOrder: "Edit Order",
    createNewCustomerOrder: "Create a new customer order.",
    updateCustomerOrder: "Update the customer order.",

    orderId: "Order ID",
    date: "Date",

    orderIdPlaceholder: "#1028",
    customerPlaceholder: "David Miller",
    productPlaceholder: "USB-C Hub",
    pricePlaceholder: "79",

    cancel: "Cancel",
    createOrder: "Create Order",
    updateOrder: "Update Order",

    creatingOrder: "Creating order...",
    updatingOrder: "Updating order...",

    orderCreated: "Order created successfully!",
    orderUpdated: "Order updated successfully!",

    createFailed: "Failed to create order.",
    updateFailed: "Failed to update order.",
    deleteFailed: "Failed to delete order.",
    loadFailed: "Failed to load orders.",

    duplicateOrderId: "This order ID already exists.",

    confirmDelete: "Are you sure you want to delete order",
    deletedOrder: "Order deleted successfully.",

    edit: "Edit",
    delete: "Delete",

    sales: "Sales",
  },

  fa: {
    dashboard: "داشبورد",
    products: "محصولات",
    orders: "سفارش‌ها",
    customers: "مشتریان",
    analytics: "تحلیل‌ها",
    settings: "تنظیمات",

    welcomeAdmin: "خوش آمدید، مدیر.",
    searchPlaceholder: "جستجوی سفارش، مشتری یا محصول...",

    notifications: "اعلان‌ها",
    threeNew: "۳ مورد جدید",
    newOrderReceived: "سفارش جدید دریافت شد",
    order1028Created: "سفارش #1028 ایجاد شده است.",
    orderCompleted: "سفارش تکمیل شد",
    order1026Completed: "سفارش #1026 تکمیل شده است.",
    dashboardUpdated: "داشبورد به‌روزرسانی شد",
    salesDataUpdated: "اطلاعات فروش شما به‌روز است.",

    totalRevenue: "مجموع درآمد",
    totalOrders: "مجموع سفارش‌ها",
    conversionRate: "نرخ تبدیل",

    salesOverview: "گزارش فروش",
    monthlySalesPerformance: "عملکرد فروش ماهانه",
    lastSevenMonths: "۷ ماه اخیر",

    recentOrders: "سفارش‌های اخیر",
    latestCustomerOrders: "آخرین سفارش‌های مشتریان",

    all: "همه",
    completed: "تکمیل‌شده",
    pending: "در انتظار",

    newest: "جدیدترین",
    oldest: "قدیمی‌ترین",
    highestPrice: "بیشترین قیمت",
    lowestPrice: "کمترین قیمت",

    addOrder: "+ افزودن سفارش",

    loadingOrders: "در حال بارگذاری سفارش‌ها...",
    noOrdersFound: "هیچ سفارشی پیدا نشد",

    order: "سفارش",
    customer: "مشتری",
    product: "محصول",
    price: "قیمت",
    status: "وضعیت",
    action: "عملیات",

    topProducts: "محصولات برتر",
    bestSellingProducts: "پرفروش‌ترین محصولات",

    addNewOrder: "افزودن سفارش جدید",
    editOrder: "ویرایش سفارش",
    createNewCustomerOrder: "یک سفارش جدید برای مشتری ایجاد کنید.",
    updateCustomerOrder: "اطلاعات سفارش مشتری را به‌روزرسانی کنید.",

    orderId: "شناسه سفارش",
    date: "تاریخ",

    orderIdPlaceholder: "#1028",
    customerPlaceholder: "David Miller",
    productPlaceholder: "USB-C Hub",
    pricePlaceholder: "79",

    cancel: "لغو",
    createOrder: "ایجاد سفارش",
    updateOrder: "به‌روزرسانی سفارش",

    creatingOrder: "در حال ایجاد سفارش...",
    updatingOrder: "در حال به‌روزرسانی سفارش...",

    orderCreated: "سفارش با موفقیت ایجاد شد!",
    orderUpdated: "سفارش با موفقیت به‌روزرسانی شد!",

    createFailed: "ایجاد سفارش ناموفق بود.",
    updateFailed: "به‌روزرسانی سفارش ناموفق بود.",
    deleteFailed: "حذف سفارش ناموفق بود.",
    loadFailed: "بارگذاری سفارش‌ها ناموفق بود.",

    duplicateOrderId: "این شناسه سفارش قبلاً وجود دارد.",

    confirmDelete: "آیا مطمئن هستید که می‌خواهید سفارش",
    deletedOrder: "سفارش با موفقیت حذف شد.",

    edit: "ویرایش",
    delete: "حذف",

    sales: "فروش",
  },
};

let currentLanguage = localStorage.getItem("novaAdminLanguage") || "en";

const languageButton = document.getElementById("languageButton");

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const key = element.dataset.i18n;

    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(function (element) {
      const key = element.dataset.i18nPlaceholder;

      if (translations[currentLanguage][key]) {
        element.placeholder = translations[currentLanguage][key];
      }
    });

  languageButton.textContent = currentLanguage === "en" ? "FA" : "EN";

  localStorage.setItem("novaAdminLanguage", currentLanguage);

  updateDynamicLanguage();
}

languageButton.addEventListener("click", function () {
  currentLanguage = currentLanguage === "en" ? "fa" : "en";

  applyLanguage();
});

function translateStatus(status) {
  if (currentLanguage === "fa") {
    if (status === "Completed") return "تکمیل‌شده";
    if (status === "Pending") return "در انتظار";
  }

  return status;
}

function updateDynamicLanguage() {
  if (orders.length > 0) {
    applyFilters();
  }

  if (editingOrderId === null) {
    modalTitle.textContent = translate("addNewOrder");
    modalDescription.textContent = translate("createNewCustomerOrder");
    submitOrderButton.textContent = translate("createOrder");
  } else {
    modalTitle.textContent = translate("editOrder");
    modalDescription.textContent = translate("updateCustomerOrder");
    submitOrderButton.textContent = translate("updateOrder");
  }
}

/* =========================================
   SIDEBAR
========================================= */

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

/* =========================================
   DARK MODE
========================================= */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

/* =========================================
   NOTIFICATIONS
========================================= */

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

/* =========================================
   ORDERS STATE
========================================= */

let orders = [];
let editingOrderId = null;

const ordersTableBody = document.querySelector("tbody");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");

const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");
const totalCustomers = document.getElementById("totalCustomers");

const loadingMessage = document.getElementById("loadingMessage");

const errorMessage = document.getElementById("errorMessage");

/* =========================================
   MODAL ELEMENTS
========================================= */

const addOrderButton = document.getElementById("addOrderButton");

const orderModal = document.getElementById("orderModal");

const closeOrderModal = document.getElementById("closeOrderModal");

const cancelOrderButton = document.getElementById("cancelOrderButton");

const orderForm = document.getElementById("orderForm");

const orderIdInput = document.getElementById("orderId");

const customerNameInput = document.getElementById("customerName");

const productNameInput = document.getElementById("productName");

const orderPriceInput = document.getElementById("orderPrice");

const orderStatusInput = document.getElementById("orderStatus");

const orderDateInput = document.getElementById("orderDate");

const formMessage = document.getElementById("formMessage");

const modalTitle = document.getElementById("modalTitle");

const modalDescription = document.getElementById("modalDescription");

const submitOrderButton = document.getElementById("submitOrderButton");

/* =========================================
   ADD ORDER MODAL
========================================= */

addOrderButton.addEventListener("click", function () {
  editingOrderId = null;

  modalTitle.textContent = translate("addNewOrder");

  modalDescription.textContent = translate("createNewCustomerOrder");

  submitOrderButton.textContent = translate("createOrder");

  orderIdInput.disabled = false;

  formMessage.textContent = "";
  formMessage.className = "form-message";

  orderForm.reset();

  orderStatusInput.value = "Pending";

  orderDateInput.value = new Date().toISOString().split("T")[0];

  orderModal.classList.add("show");

  orderIdInput.focus();
});

/* =========================================
   EDIT ORDER
========================================= */

function openEditModal(orderId) {
  const order = orders.find(function (item) {
    return item.id === orderId;
  });

  if (!order) return;

  editingOrderId = order.id;

  modalTitle.textContent = translate("editOrder");

  modalDescription.textContent = translate("updateCustomerOrder");

  submitOrderButton.textContent = translate("updateOrder");

  orderIdInput.value = order.id;

  customerNameInput.value = order.customer;

  productNameInput.value = order.product;

  orderPriceInput.value = order.price;

  orderStatusInput.value = order.status;

  orderDateInput.value = String(order.date).slice(0, 10);

  orderIdInput.disabled = true;

  formMessage.textContent = "";
  formMessage.className = "form-message";

  orderModal.classList.add("show");

  customerNameInput.focus();
}

/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {
  orderModal.classList.remove("show");

  editingOrderId = null;

  formMessage.textContent = "";
  formMessage.className = "form-message";

  orderForm.reset();

  orderIdInput.disabled = false;
}

closeOrderModal.addEventListener("click", closeModal);

cancelOrderButton.addEventListener("click", closeModal);

orderModal.addEventListener("click", function (event) {
  if (event.target === orderModal) {
    closeModal();
  }
});

/* =========================================
   STATS
========================================= */

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

/* =========================================
   CREATE ORDER
========================================= */

async function createOrder() {
  formMessage.textContent = translate("creatingOrder");

  formMessage.className = "form-message";

  let orderId = orderIdInput.value.trim();

  const customer = customerNameInput.value.trim();

  const product = productNameInput.value.trim();

  const price = Number(orderPriceInput.value);

  const status = orderStatusInput.value;

  const date = orderDateInput.value;

  if (!orderId.startsWith("#")) {
    orderId = "#" + orderId;
  }

  const duplicateOrder = orders.some(function (order) {
    return order.id === orderId;
  });

  if (duplicateOrder) {
    formMessage.textContent = translate("duplicateOrderId");

    formMessage.classList.add("error");

    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
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
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const newOrder = await response.json();

    orders.push(newOrder);

    updateStats();

    applyFilters();

    formMessage.textContent = translate("orderCreated");

    formMessage.classList.add("success");

    setTimeout(function () {
      closeModal();
    }, 700);
  } catch (error) {
    console.error("Error creating order:", error);

    formMessage.textContent = translate("createFailed");

    formMessage.classList.add("error");
  }
}

/* =========================================
   UPDATE ORDER
========================================= */

async function updateOrder() {
  formMessage.textContent = translate("updatingOrder");

  formMessage.className = "form-message";

  const customer = customerNameInput.value.trim();

  const product = productNameInput.value.trim();

  const price = Number(orderPriceInput.value);

  const status = orderStatusInput.value;

  const date = orderDateInput.value;

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
      throw new Error("Failed to update order");
    }

    const updatedOrder = await response.json();

    orders = orders.map(function (order) {
      if (order.id === editingOrderId) {
        return updatedOrder;
      }

      return order;
    });

    updateStats();

    applyFilters();

    formMessage.textContent = translate("orderUpdated");

    formMessage.classList.add("success");

    setTimeout(function () {
      closeModal();
    }, 700);
  } catch (error) {
    console.error("Error updating order:", error);

    formMessage.textContent = translate("updateFailed");

    formMessage.classList.add("error");
  }
}

/* =========================================
   FORM SUBMIT
========================================= */

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (editingOrderId === null) {
    createOrder();
  } else {
    updateOrder();
  }
});

/* =========================================
   DELETE ORDER
========================================= */

async function deleteOrder(orderId) {
  const confirmed = confirm(`${translate("confirmDelete")} ${orderId}?`);

  if (!confirmed) return;

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

    alert(translate("deleteFailed"));
  }
}

/* =========================================
   RENDER ORDERS
========================================= */

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
          ${translateStatus(order.status)}
        </span>
      </td>

      <td>
        <div class="order-action-buttons">

          <button
            class="edit-order-button"
            data-id="${order.id}"
          >
            ${translate("edit")}
          </button>

          <button
            class="delete-order-button"
            data-id="${order.id}"
          >
            ${translate("delete")}
          </button>

        </div>
      </td>
    `;

    ordersTableBody.insertBefore(row, noResults);
  });

  if (orderList.length === 0) {
    noResults.style.display = "";
  } else {
    noResults.style.display = "none";
  }

  const editButtons = document.querySelectorAll(".edit-order-button");

  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openEditModal(button.dataset.id);
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-order-button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      deleteOrder(button.dataset.id);
    });
  });
}

/* =========================================
   FILTER / SORT
========================================= */

const filterButtons = document.querySelectorAll(".filter-button");

const sortSelect = document.getElementById("sortSelect");

let selectedStatus = "all";

let selectedSort = "newest";

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  let filteredOrders = [...orders];

  if (selectedStatus !== "all") {
    filteredOrders = filteredOrders.filter(function (order) {
      return order.status === selectedStatus;
    });
  }

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

searchInput.addEventListener("input", function () {
  applyFilters();
});

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

sortSelect.addEventListener("change", function () {
  selectedSort = sortSelect.value;

  applyFilters();
});

/* =========================================
   SALES CHART
========================================= */

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
          label: translate("sales"),

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

/* =========================================
   LOAD ORDERS
========================================= */

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

    errorMessage.textContent = translate("loadFailed");

    console.error("Error loading orders:", error);
  });

/* =========================================
   INITIAL LANGUAGE
========================================= */

applyLanguage();
