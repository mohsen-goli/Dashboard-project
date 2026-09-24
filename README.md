# NovaAdmin — Responsive Admin Dashboard

A responsive admin dashboard built with **HTML, CSS and JavaScript** for managing orders, tracking revenue and visualizing business data.

The project was designed to simulate a real-world dashboard for an e-commerce business.

## ✨ Features

* 📊 Dashboard overview
* 📦 Dynamic order management
* 🔎 Order search
* 🏷️ Order status filtering
* 💰 Dynamic total revenue calculation
* 📈 Sales/order chart
* 🌙 Dark mode
* 📱 Responsive sidebar and layout
* 📋 Dynamic data rendering from JSON
* 🚫 Empty-state message when no orders match the search/filter

## 🛠️ Technologies

* HTML5
* CSS3
* JavaScript (ES6+)
* JSON
* Fetch API
* Responsive Web Design

## 📊 Data & API Simulation

Order data is currently loaded from a local JSON file.

```text
orders.json
```

The project uses JavaScript to fetch the data, render orders dynamically, calculate dashboard statistics and update the interface based on user interactions.

This structure can later be connected to a real REST API or backend service.

## 🔎 Search & Filtering

Users can search through orders and filter them based on their status.

The search and filtering functionality works together to dynamically update the order list.

## 💰 Dynamic Statistics

Dashboard statistics are calculated from the order data rather than being hard-coded.

For example:

* Total Orders
* Total Revenue
* Order status information
* Chart data

This allows the dashboard to automatically update when the underlying data changes.

## 📈 Charts

The dashboard visualizes order-related data using JavaScript-generated chart data.

The chart is connected to the underlying order dataset rather than using completely static values.

## 🌙 Dark Mode

The dashboard includes a dark mode interface that allows users to switch between light and dark themes.

## 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Tablet
* Mobile

The sidebar and dashboard layout adapt to smaller screen sizes.

## 📂 Project Structure

```text
Dashboard-project/
│
├── index.html
├── style.css
├── script.js
├── orders.json
└── README.md
```

## 🎯 Project Purpose

This project was built to practice developing a more realistic frontend application rather than a static webpage.

The main focus was on:

* Dynamic data
* JavaScript logic
* DOM manipulation
* Search and filtering
* Calculated statistics
* JSON data handling
* Responsive UI
* Dashboard interactions

## 💡 What I Practiced

Through this project I practiced:

* Working with arrays of objects
* Using `map()`, `filter()` and `reduce()`
* Fetching JSON data with the Fetch API
* Rendering dynamic content
* Handling user interactions
* Building search functionality
* Combining search and filtering
* Calculating revenue dynamically
* Creating chart data
* Managing UI state
* Building responsive dashboard layouts

## 🚀 Future Improvements

Possible future improvements include:

* Connecting the dashboard to a real REST API
* Adding authentication
* Adding real backend data
* CRUD operations for orders
* More advanced charts and analytics
* Pagination
* User management

## 👨‍💻 Author

**Mohsen Golzad**

Junior Frontend Developer

GitHub: https://github.com/mohsen-goli

LinkedIn: https://www.linkedin.com/in/mohsen-golzad-a5495319b
