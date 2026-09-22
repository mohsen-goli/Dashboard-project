const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// ===============================
// Orders Data
// ===============================

const orders = [
  {
    id: "#1024",
    customer: "John Smith",
    product: "Wireless Headphones",
    price: "$129",
    status: "Completed",
    date: "2026-03-15",
  },
  {
    id: "#1025",
    customer: "Emma Brown",
    product: "Smart Watch",
    price: "$199",
    status: "Pending",
    date: "2026-04-10",
  },
  {
    id: "#1026",
    customer: "Michael Lee",
    product: "Mechanical Keyboard",
    price: "$149",
    status: "Completed",
    date: "2026-05-22",
  },
  {
    id: "#1027",
    customer: "Sarah Wilson",
    product: "Gaming Mouse",
    price: "$100",
    status: "Completed",
    date: "2026-03-20",
  },
];

// ===============================
// Test Route
// ===============================

app.get("/", function (req, res) {
  res.send("NovaAdmin API is running!");
});

// ===============================
// GET - All Orders
// ===============================

app.get("/api/orders", function (req, res) {
  res.json(orders);
});

// ===============================
// GET - Single Order
// ===============================

app.get("/api/orders/:id", function (req, res) {
  const orderId = req.params.id;

  const order = orders.find(function (item) {
    return item.id === "#" + orderId;
  });

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  res.json(order);
});

// ===============================
// POST - Create New Order
// ===============================

app.post("/api/orders", function (req, res) {
  const newOrder = {
    id: "#" + (1028 + orders.length - 4),
    customer: req.body.customer,
    product: req.body.product,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

// ===============================
// PUT - Update Order
// ===============================

app.put("/api/orders/:id", function (req, res) {
  const orderId = req.params.id;

  const orderIndex = orders.findIndex(function (item) {
    return item.id === "#" + orderId;
  });

  if (orderIndex === -1) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    customer: req.body.customer,
    product: req.body.product,
    price: req.body.price,
    status: req.body.status,
    date: req.body.date,
  };

  res.json(orders[orderIndex]);
});
// ===============================
// DELETE - Delete Order
// ===============================

app.delete("/api/orders/:id", function (req, res) {
  const orderId = req.params.id;

  const orderIndex = orders.findIndex(function (item) {
    return item.id === "#" + orderId;
  });

  if (orderIndex === -1) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  const deletedOrder = orders.splice(orderIndex, 1);

  res.json({
    message: "Order deleted successfully",
    order: deletedOrder[0],
  });
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
