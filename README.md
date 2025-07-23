# 📔 Personal Diary App (MERN Stack)

A secure and simple diary web app where users can register, log in, and write private notes — just like a personal diary. All notes are stored in a secure MongoDB database and are only visible to the logged-in user.

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Styling:** CSS

---

## 🔐 Features

- ✅ User Registration & Login
- ✅ JWT-based Authentication
- ✅ Add, View, Edit, and Delete Notes
- ✅ Private Diary-like view
- ✅ Responsive UI
- ✅ Protected Routes

---

## 📂 Folder Structure

- `client/` – React frontend  
  Contains all pages and UI components

- `server/` – Node.js + Express backend  
  Includes API routes, MongoDB models, and auth middleware

- `.env` – Environment variables (not tracked by Git)

- `.gitignore` – Files/folders Git should ignore

- `README.md` – Project documentation

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/MERN-Diary-App.git
cd MERN-Diary-App


2️⃣ Setup Backend
cd server
npm install

Create a .env file inside server/:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000



3️⃣ Setup Frontend
cd ../client
npm install
npm start
