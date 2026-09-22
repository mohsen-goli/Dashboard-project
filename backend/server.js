const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// ===============================
// Test Route
// ===============================

app.get("/", function (req, res) {
  res.send("NovaAdmin API is running!");
});

// ===============================
// GET - All Orders
// ===============================

app.get("/api/orders", async function (req, res) {
  try {
    const result = await pool.query("SELECT * FROM orders");

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error.message);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// ===============================
// GET - Single Order
// ===============================

app.get("/api/orders/:id", async function (req, res) {
  try {
    const orderId = "#" + req.params.id;

    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [
      orderId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching order:", error.message);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
});

// ===============================
// POST - Create New Order
// ===============================

app.post("/api/orders", async function (req, res) {
  try {
    const { id, customer, product, price, status, date } = req.body;

    const result = await pool.query(
      `INSERT INTO orders (id, customer, product, price, status, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, customer, product, price, status, date],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating order:", error.message);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
});

// ===============================
// PUT - Update Order
// ===============================

app.put("/api/orders/:id", async function (req, res) {
  try {
    const orderId = "#" + req.params.id;

    const { customer, product, price, status, date } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET customer = $1,
           product = $2,
           price = $3,
           status = $4,
           date = $5
       WHERE id = $6
       RETURNING *`,
      [customer, product, price, status, date, orderId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating order:", error.message);

    res.status(500).json({
      message: "Failed to update order",
    });
  }
});

// ===============================
// DELETE - Delete Order
// ===============================

app.delete("/api/orders/:id", function (req, res) {
  res.status(501).json({
    message: "DELETE is temporarily disabled",
  });
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
