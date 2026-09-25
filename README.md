# NovaAdmin — Responsive Admin Dashboard

A modern, responsive admin dashboard built with **HTML, CSS, JavaScript and REST API** for managing orders, tracking revenue, and visualizing business data.

The project simulates a real-world e-commerce administration panel with dynamic data, order management, filtering, search, charts, dark mode, and multilingual support.

## 🚀 Live Demo

**[View NovaAdmin Live Demo](https://nova-admin-dashboard-two.vercel.app/)**

## ✨ Features

* 📊 Dashboard overview
* 🛒 Dynamic order management
* 🔍 Order search
* 🎯 Order status filtering
* ➕ Add new orders
* ✏️ Edit existing orders
* 🗑️ Delete orders
* 💰 Dynamic total revenue calculation
* 📦 Dynamic total orders statistics
* 📈 Monthly sales and order charts
* 🌙 Dark mode
* 🌐 Persian / English language support
* 📱 Fully responsive layout
* 📋 Dynamic data rendering
* 🔄 REST API integration
* ⚡ Real-time UI updates after CRUD operations
* 🧩 Empty-state messages
* 📂 Backend API for order management

## 🛠️ Technologies

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API
* Responsive Web Design
* Chart.js

### Backend

* Node.js
* Express.js
* REST API
* JSON-based data storage

### Tools

* Git
* GitHub
* Vercel
* VS Code

## 🏗️ Project Structure

```text
NovaAdmin/
│
├── backend/
│   ├── server.js
│   └── ...
│
├── data/
│   └── ...
│
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md
```

## 🔌 REST API

The dashboard is connected to a backend REST API for managing orders.

The frontend communicates with the backend using the JavaScript `fetch()` API.

The API supports CRUD operations:

```text
GET     → Get orders
POST    → Create a new order
PUT     → Update an existing order
DELETE  → Delete an order
```

This allows the dashboard to behave more like a real-world administration system rather than a static frontend project.

## 📊 Dashboard Statistics

The dashboard dynamically calculates and displays business statistics such as:

* Total Orders
* Total Revenue
* Order status distribution
* Monthly sales
* Monthly order volume

Data is processed with JavaScript methods such as:

```javascript
map()
filter()
reduce()
```

## 🔍 Search & Filtering

Users can search through orders and filter them based on their current status.

The interface updates dynamically without requiring a page reload.

## 📈 Charts

The dashboard includes dynamic charts for visualizing business performance.

Chart data is generated from the application data and includes monthly sales and order information.

This demonstrates how raw business data can be transformed into useful visual information for an admin interface.

## 🌙 Dark Mode

NovaAdmin includes a dark mode that allows users to switch between light and dark themes.

The interface is designed to keep the dashboard readable and usable across both modes.

## 🌐 Multilingual Support

The dashboard supports both:

* 🇬🇧 English
* 🇮🇷 Persian

The interface can switch between languages while maintaining the dashboard structure and functionality.

## 📱 Responsive Design

The dashboard is designed to work across different screen sizes:

* Desktop
* Laptop
* Tablet
* Mobile

The sidebar, tables, cards, charts, and other dashboard components adapt to smaller screens.

## 🎯 What I Practiced

This project helped me practice several important frontend and web-development concepts:

* Working with JavaScript arrays and objects
* `map()`, `filter()`, and `reduce()`
* DOM manipulation
* Fetch API
* REST API communication
* CRUD operations
* Async JavaScript
* Dynamic rendering
* Search and filtering
* Form handling
* Data visualization
* Responsive layouts
* Dark mode
* Multilingual interfaces
* Frontend ↔ Backend communication
* Git and GitHub workflow
* Deploying a web application with Vercel

## 🔮 Future Improvements

Possible future improvements include:

* Authentication and authorization
* User management
* Database integration
* Pagination
* Advanced analytics
* More interactive charts
* Role-based access control
* Improved API validation
* Production database integration

## 👨‍💻 Author

**Mohsen Golzad**

Junior Frontend Developer

* GitHub: https://github.com/mohsen-goli
* LinkedIn: https://www.linkedin.com/in/mohsen-golzad-a5495319b/

## 🌐 Project Links

**Live Demo:**
https://nova-admin-dashboard-two.vercel.app/

**GitHub Repository:**
https://github.com/mohsen-goli/Dashboard-project
