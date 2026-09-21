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
// Order Data
// ===============================

const orders = [
  {
    id: "#1024",
    customer: "John Smith",
    product: "Wireless Headphones",
    price: "$129",
    status: "Completed",
  },
  {
    id: "#1025",
    customer: "Emma Brown",
    product: "Smart Watch",
    price: "$199",
    status: "Pending",
  },
  {
    id: "#1026",
    customer: "Michael Lee",
    product: "Mechanical Keyboard",
    price: "$149",
    status: "Completed",
  },
];

// ===============================
// Orders Elements
// ===============================

const ordersTableBody = document.querySelector("tbody");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");

// ===============================
// Render Orders
// ===============================

function renderOrders(orderList) {
  // Remove old dynamic rows
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
            <td>${order.status}</td>
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
// Initial Render
// ===============================

renderOrders(orders);

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
// Total Orders
// ===============================

const totalOrders = document.getElementById("totalOrders");

totalOrders.textContent = orders.length;
const totalRevenue = document.getElementById("totalRevenue");

const revenue = orders.reduce(function (total, order) {
  return total + Number(order.price.replace("$", ""));
}, 0);

totalRevenue.textContent = "$" + revenue.toLocaleString();
const totalCustomers = document.getElementById("totalCustomers");

const customers = new Set(
  orders.map(function (order) {
    return order.customer;
  }),
);

totalCustomers.textContent = customers.size;
