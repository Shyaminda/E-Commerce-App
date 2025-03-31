# 🛒 E-Commerce Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 📌 About the Project

A full-featured e-commerce platform with separate **Admin**, **Backend**, and **Client** applications. Admin users can manage products, orders, and users, while customers can browse products, make purchases using bank cards, write reviews, and manage their personal details.

---

## 📸 Project Screenshots

<details>
  <summary><strong>Home Page</strong></summary>
  <img src="/client/public/images/homepage.png" alt="homepage" />
</details>

<details>
  <summary><strong>Dashboard (Admin)</strong></summary>
  <img src="/client/public/images/admin-dashboard.png" alt="admin-dashboard" />
</details>

<details>
  <summary><strong>A product page</strong></summary>
  <img src="/client/public/images/user-dashboard.png" alt="user-dashboard" />
</details>

<details>
  <summary><strong>product page</strong></summary>
  <img src="/client/public/images/products.png" alt="products" />
</details>

---

## 📑 Index

- [Features](#-features)
- [Built With](#-built-with)
- [Installation](#-installation)
- [How It Works](#-how-it-works)
- [Roadmap](#-roadmap)
- [Support](#-support)
- [License](#-icense)

---

## 🚀 Features

✅ **Admin Dashboard**

- Add, update, and delete products
- Categorize products into **Popular**, **Featured**, or **Special** sections
- Manage orders and track shipping status
- View full statistics: **sales, income, products, orders, pending deliveries, paid orders**
- Create and manage **discount coupons**
- Manage users and their permissions

✅ **Customer Features**

- Browse dynamic product categories
- Secure checkout with **bank card payments**
- Write and read **product reviews**
- Edit personal details and passwords
- Access order history and track orders

✅ **Blog Section**

- Admins can post articles related to the store
- Users can engage with blog content

---

## 🛠 Built With

- **Frontend**: React.js, Redux
- **Backend**: Express.js, MongoDB, JWT Authentication
- **File Uploads**: Multer

---

## 📦 Installation

### Running Locally

#### 1️⃣ Clone the repository

```sh
git clone https://github.com/Shyaminda/E-Commerce-App.git
cd E-Commerce-App
```

#### 2️⃣ Install dependencies

```sh
npm install
```

#### 3️⃣ Start the applications

```sh
# Start the admin panel
cd admin && npm start
```
- Admin can be accessed from user profile page

```sh
# Start the client application
cd client && npm start
```

```sh
# Start the backend API
cd api && npm run dev
```

---

## 🔍 How It Works

1️⃣ **Admin logs in** to manage products, orders, users, and statistics.

2️⃣ **Users browse** the store, add products to the cart, and proceed to checkout.

3️⃣ **Users make payments** securely using their bank cards.

4️⃣ **Admins monitor** sales, pending orders, and create discount coupons.

5️⃣ **Users write reviews** for purchased products.

6️⃣ **Admins publish blogs** to engage with customers.

---

## 📌 Roadmap

- 📦 Add more payment options
- ✨ Improve product recommendation system
- 📊 Advanced analytics for admin dashboard
- 🚀 Implement AI-powered search and filtering

---

## 💡 Support

If you find this project useful, please consider giving it a ⭐ on GitHub.

---

## 📝 License

MIT License – Free to use and modify.

