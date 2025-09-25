# MisterToy 🎲🚀

**A Modern Toy Marketplace — Discover, Filter, and Manage Toys with Ease!**

---

## 📝 Overview
MisterToy is a full-featured web application for toy enthusiasts, collectors, and families. Browse, search, and manage a collection of toys with advanced filtering, real-time updates, and a beautiful, responsive UI. Built with modern web technologies, MisterToy delivers a seamless experience for users and admins alike.

### 🛠️ Technologies & Architecture
- **React** for building dynamic, component-based UIs
- **Redux** for global state management and predictable data flow
- **Material-UI (MUI)** for a modern, responsive, and accessible design system
- **Custom Hooks** for encapsulating reusable logic (e.g., `useEffectOnUpdateOnly`)
- **Socket.io** for real-time, bidirectional communication (live updates, collaborative actions)
- **RESTful API** for backend communication and data persistence
- **Axios** for HTTP requests with error handling and interceptors
- **Debouncing** for efficient filtering and search without excessive requests
- **Extensible Modular Structure** for easy feature expansion and maintainability

### ⚡ Advanced Functionality
- **Real-Time Updates:** Uses Socket.io to broadcast toy changes, reviews, and other events instantly to all connected clients, enabling collaborative features and live notifications.
- **Optimistic UI:** Updates the UI immediately on user actions (like adding/removing toys or reviews) and rolls back if the backend fails, for a snappy user experience.
- **Error Handling:** Centralized error handling with user-friendly notifications for failed actions, validation errors, and backend issues.
- **Authentication & Authorization:** Secure user signup/login, session management, and role-based access for admin features.
- **Custom Filtering Logic:** Advanced filter panel with debounced updates, multi-select labels, and dynamic stock status conversion for robust search.
- **Map Integration:** Visualizes toy branches using a map component, with interactive markers and location data.
- **Pagination & Sorting:** Efficiently handles large toy collections with server/client-side pagination and flexible sorting options.

MisterToy is designed for scalability, maintainability, and a delightful user experience, leveraging best practices in modern web development.

---

## ✨ Features
- 🎨 **Modern UI:** Responsive design using Material-UI and custom styles
- 🔍 **Advanced Filtering:** Filter toys by name, price, labels, and stock status
- 🏷️ **Label Management:** Assign and filter by multiple toy labels
- 🛒 **Toy CRUD:** Add, edit, remove, and view detailed toy information
- 📦 **Stock Management:** Toggle toy availability and filter by in-stock status
- 🗂️ **Pagination & Sorting:** Sort toys by name, price, or creation date
- 💬 **Reviews:** Add, update, and remove reviews for toys
- 🗺️ **Branch Map:** Visualize toy branches on an interactive map
- 🔄 **Real-Time Updates:** Live updates via sockets for collaborative actions
- 👤 **User Authentication:** Sign up, log in, and manage user sessions
- 🛡️ **Error Handling:** Friendly notifications for errors and actions
- 🧩 **Extensible Architecture:** Modular codebase for easy feature expansion

---

## 📦 Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/WDD-CODER/mistertoy-frontend.git