# 🎓 Student Management System REST API

A complete, production-ready RESTful API backend for a **Student Management System** built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**, following strict **MVC (Model-View-Controller)** design patterns.

Created for College 3rd Evaluation Assignment & Viva Demonstration.

---

## 📌 Project Overview

This backend system provides CRUD (Create, Read, Update, Delete) operations to manage student records:
- **Name**: Student's full name
- **Email**: Unique, validated email address
- **Roll Number**: Unique roll/registration number
- **Course**: Enrolled degree or study branch
- **Year of Study**: Current academic year (1 to 5)

---

## 🛠️ Tech Stack

- **Runtime Environment:** [Node.js](https://nodejs.org/) (v20+ / v22+ LTS)
- **Framework:** [Express.js](https://expressjs.com/) (v4.x)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud NoSQL Database)
- **Object Data Modeling (ODM):** [Mongoose](https://mongoosejs.com/) (v8.x)
- **Environment Configuration:** [dotenv](https://github.com/motdotla/dotenv)
- **CORS Support:** [cors](https://github.com/expressjs/cors)
- **Development Tool:** [nodemon](https://nodemon.io/) (Hot reloading)
- **API Testing:** [Postman Desktop](https://www.postman.com/)

---

## 📁 Project Structure (MVC Architecture)

```text
student-management-api/
├── config/
│   └── db.js                 # MongoDB Atlas connection handler
├── models/
│   └── studentModel.js       # Mongoose schema and model definition
├── controllers/
│   └── studentController.js  # Business logic for all 5 CRUD operations
├── routes/
│   └── studentRoutes.js      # Express router mapping URLs to controllers
├── public/
│   └── debug-demo.html       # Interactive page for browser debugging demonstration
├── .vscode/
│   └── launch.json           # VS Code Node.js debugger configuration (F5)
├── .env                      # Secret credentials (ignored in Git)
├── .env.example              # Template environment file for reference
├── .gitignore                # Files excluded from GitHub repository
├── package.json              # Project dependencies and startup scripts
├── README.md                 # Complete documentation and viva guide
└── student-management-api.postman_collection.json # Ready-to-import Postman collection
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher) and **npm**
- **Git**
- A free **MongoDB Atlas** account

### 2. Installation
Open your terminal in the project directory:

```bash
cd student-management-api
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your MongoDB Atlas connection URI:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/student_db?retryWrites=true&w=majority
```
*(Replace `<username>` and `<password>` with your actual MongoDB database credentials)*.

### 4. Running the Server

- **Development Mode (with auto-reload on file save):**
  ```bash
  npm run dev
  ```
- **Standard Mode:**
  ```bash
  npm start
  ```

Once started, test the server in your browser:
👉 `http://localhost:5000/`

---

## 📡 API Endpoints Documentation

| HTTP Method | Endpoint | Description | Request Body | Response Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | API status and routes index | None | `200 OK` |
| **POST** | `/api/students` | Add a new student record | JSON (All fields) | `201 Created` |
| **GET** | `/api/students` | Get all students (sorted newest first) | None | `200 OK` |
| **GET** | `/api/students/:id` | Get details of a single student by ID | None | `200 OK` / `404 Not Found` |
| **PUT** | `/api/students/:id` | Update an existing student | JSON (Updated fields) | `200 OK` / `404 Not Found` |
| **DELETE** | `/api/students/:id` | Delete a student by ID | None | `200 OK` / `404 Not Found` |

---

## 🧪 Postman Testing Guide

### Method 1: Import the Pre-built Collection (Fastest)
1. Open **Postman Desktop**.
2. Click **Import** (top left).
3. Drag and drop the `student-management-api.postman_collection.json` file located in this project.
4. You will instantly see all 6 pre-configured requests ready to execute!

### Method 2: Manual Testing

#### 1. Create a Student (POST `/api/students`)
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/students`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "rollNumber": "CS2026-001",
    "course": "Computer Science & Engineering",
    "yearOfStudy": 3
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Student registered successfully",
    "data": {
      "_id": "673f1a2b...",
      "name": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "rollNumber": "CS2026-001",
      "course": "Computer Science & Engineering",
      "yearOfStudy": 3,
      "createdAt": "2026-11-02T13:30:00.000Z",
      "updatedAt": "2026-11-02T13:30:00.000Z"
    }
  }
  ```

#### 2. Get All Students (GET `/api/students`)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`

#### 3. Get Student By ID (GET `/api/students/:id`)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/673f1a2b...`

#### 4. Update Student (PUT `/api/students/:id`)
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/students/673f1a2b...`
- **Body (raw JSON):**
  ```json
  {
    "name": "Aarav Sharma (Updated)",
    "course": "Artificial Intelligence & ML",
    "yearOfStudy": 4
  }
  ```

#### 5. Delete Student (DELETE `/api/students/:id`)
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/students/673f1a2b...`

---

## 🐞 JavaScript Debugging Guide (Viva Requirements)

Your evaluation specifically requires demonstrating JavaScript debugging. Both backend (VS Code) and frontend (Browser) debugging setups are pre-configured:

### 1. Backend Debugging in VS Code
1. Open this project in **VS Code**.
2. Open `controllers/studentController.js` and click next to the line number on line 12 (inside `createStudent`) to set a **Red Dot (Breakpoint)**.
3. Press **F5** (or click the Run & Debug icon on the left sidebar &rarr; click **🚀 Launch Student Management API**).
4. Send a `POST` request from Postman.
5. VS Code will pause execution at your breakpoint!
6. Use the debug toolbar controls:
   - **Continue (F5):** Resume execution until next breakpoint.
   - **Step Over (F10):** Execute current line without diving into called functions.
   - **Step Into (F11):** Enter inside the function called on that line.
   - **Step Out (Shift + F11):** Finish current function and jump back to the caller.
   - **Variables Pane:** Inspect local variables (`req.body`, `existingStudent`, etc.).
   - **Watch Pane:** Add custom expressions (e.g., `req.body.name`).
   - **Call Stack:** View the sequence of function calls that reached this point.

### 2. Browser Developer Tools Debugging
1. With the server running, open `http://localhost:5000/debug-demo.html` in Chrome or Edge.
2. Press `F12` (or Right-Click &rarr; **Inspect**) and click the **Sources** tab.
3. Open `debug-demo.html` from the left file tree.
4. Set a breakpoint inside `calculateTotal` or `startGradeCalculation`.
5. Click **Run Grade Calculation** on the web page.
6. Execution will halt, allowing you to show the evaluator:
   - The Call Stack hierarchy
   - Stepping through loops with **Step Over (F10)**
   - Variable scope under **Scope** tab
   - Live evaluation in the **Console** tab

---

## 🎓 Viva Questions & Answers (Evaluation Prep)

1. **What is Node.js?**
   - Node.js is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 engine that allows developers to run JavaScript on the server.

2. **What is Express.js?**
   - Express is a fast, minimalist web framework for Node.js that provides routing, middleware support, and simplified HTTP request/response handling.

3. **What is MongoDB Atlas?**
   - MongoDB Atlas is a fully managed cloud database service provided by MongoDB. It stores data in flexible, JSON-like documents (BSON).

4. **What is Mongoose and why do we use it?**
   - Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides schema validation, type casting, default values, and queries.

5. **What is the MVC Architecture?**
   - **Model:** Represents database structure and business logic (`models/studentModel.js`).
   - **View:** Formats and presents data to client (in a REST API, the View is the JSON response).
   - **Controller:** Processes client requests, executes logic, and interacts with the Model (`controllers/studentController.js`).

6. **What is the difference between SQL and NoSQL?**
   - SQL databases (MySQL, PostgreSQL) are relational, tabular, and use rigid schemas. NoSQL databases (MongoDB) are document-based, flexible, and store data as JSON-like documents.

7. **What are HTTP Status Codes used here?**
   - `200 OK`: Request succeeded.
   - `201 Created`: Resource was successfully created.
   - `400 Bad Request`: Client sent invalid data or missing required fields.
   - `404 Not Found`: Requested resource or ID does not exist.
   - `500 Internal Server Error`: Unexpected server or database exception.

8. **What does `async/await` do?**
   - `async/await` makes asynchronous JavaScript code read and behave like synchronous code without blocking the main event loop, replacing nested callback and `.then()` chains.

---

## 🔒 Security & Best Practices
- Never commit `.env` containing database credentials.
- All database inputs are validated by Mongoose schema constraints.
- Unique index constraints prevent duplicate roll numbers and emails.
