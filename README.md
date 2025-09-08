# 🛍️ eCommerce Web App — MERN Stack + Vite

---

A full-stack eCommerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js), with **Vite** for lightning-fast frontend development. Features include **User authentication with JWT**, **bcrypt-secured login**, and **Admin dashboard** for managing website.

---

## 🎯 Features

- User registration & login (JWT auth)
- Redirect to page according to role
- Secure password handling with **bcrypt**
- Admin panel to manage:
  - Products
  - Orders
  - User roles
  - Shop Analytics
  - Review feedbacks
- MongoDB for data storage
- RESTful API using Cors, Express & Node.js
- React + Vite frontend

---

## 🛠️ Tech Stack

|     Frontend    |         Backend           | Database |     Auth       |
|-----------------|---------------------------|----------|----------------|
| React + Vite    | Node.js + Cors+ Express.js| MongoDB  | JWT + bcrypt   |


---

## Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB Atlas or local MongoDB instance

### Backend Setup
```bash
cd Server
npm install
npm start
```

### Frontend Setup
```bash
cd herbalro
npm install
npm run dev
```
---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

- MONGODB_URL = your_mongodb_url
- jwt_secretKey = your_jwt_secret

---
##  Screenshots

**Here is a preview of the application:**

<p float="left">
  <img width="45%" alt="home" src="https://github.com/user-attachments/assets/d7ddc689-dba8-49bf-9696-1fbe96e6e44a" />
  <img width="45%" alt="feedback" src="https://github.com/user-attachments/assets/403b60a8-788c-4d71-8424-2fe53f9045be" />
</p>

**Admin/Moderator Page:**

<p float="left">
  
  Admin Login:

  <img src="./ss/Admin.gif" width="50%" />

  
  Moderator Login:
  
  <img src="./ss/moderator.gif" width="50%" />

  
  <img width="45%" alt="product" src="https://github.com/user-attachments/assets/08ab8a56-18ca-468f-aa53-8db6724698e5" />
  <img width="45%" alt="adminfeedback" src="https://github.com/user-attachments/assets/1a506fbe-ec4a-4604-b372-53eb4463cc01" />
</p>

**Shop Page:**

<p float="left">
  <img width="45%" alt="Shop" src="./ss/shop.png"/>
  <img width="45%" alt="Details" src="./ss/details.png"/>
  <img width="45%" alt="Cart" src="./ss/cart.png"/>
  <img width="45%" alt="Checkout" src="./ss/checkout.png"/>
</p>

---
## Status
- Completed core features
- Actively testing and refining
- Future plans: Payment Integration

--- 

## Author
- [@PriteshET](https://github.com/PriteshET)
