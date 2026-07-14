# Ledger - Server

REST API backend for Ledger, an expense tracking application.

---

## 🚀 Features

- **User Authentication & Authorization**: Registration and login endpoints with secure password hashing (using `bcryptjs`) and JWT generation.
- **Route Protection**: Auth middleware to secure private endpoints, ensuring only authenticated users can access them.
- **Personalized Transaction CRUD**: Scopes all CRUD operations for expenses to the currently logged-in user.
- **Profile Photo Uploads**: Static file storage for user profile photos powered by `multer` (served statically).
- **MongoDB Atlas Integration**: Remote database connection and management via object-document modeling with `mongoose`.

---

## 🛠️ Tech Stack

- **Node.js** — JavaScript runtime environment
- **Express.js** (v5.2.1) — Web framework for routing and middleware
- **MongoDB** / **Mongoose** (v9.7.4) — Document-oriented database & Object Data Modeling (ODM)
- **JSON Web Tokens (jsonwebtoken)** (v9.0.3) — Standard for stateless user authentication
- **bcryptjs** (v3.0.3) — Hashing library for securing user passwords
- **multer** — Middleware for handling `multipart/form-data` file uploads
- **cors** (v2.8.6) — Middleware for enabling Cross-Origin Resource Sharing
- **dotenv** (v17.4.2) — Zero-dependency module that loads environment variables from a `.env` file
- **nodemon** (v3.1.14) — Development dependency to automatically reload the server on file changes

---

## 📂 Folder Structure

```text
server/src/
├── config/         # Database and third-party configuration files
├── controllers/    # Controller functions containing request handler logic
├── middleware/     # Request interceptors and custom middleware (e.g., authentication)
├── models/         # Mongoose database schemas (User, Expense)
├── routes/         # Route definitions map endpoints to controllers
├── app.js          # Core Express app setup and middleware configuration
└── server.js       # Main server entrypoint (starts the server and connects to database)
```

---

## 🚦 Getting Started

Follow these steps to run the backend server locally:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Server Directory**
   ```bash
   cd server
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment Variables**
   Create a `.env` file in the root of the `server/` directory and populate it with the appropriate values (see [Environment Variables](#-environment-variables) below).

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The backend service will run on `http://localhost:<PORT>`.

---

## ⚙️ Environment Variables

| Variable Name     | Type   | Description                                     | Example Value                    |
| :---------------- | :----- | :---------------------------------------------- | :------------------------------- |
| `PORT`            | Number | The port number on which the server listens     | `5000`                           |
| `MONGO_URI`       | String | Connection URI for the MongoDB Atlas database    | `mongodb+srv://user:pass@db...`  |
| `JWT_SECRET`      | String | Private secret key used to sign Auth tokens     | `supersecret_jwtkey_12345`       |
| `JWT_EXPIRES_IN`  | String | Duration before user session tokens expire      | `7d`                             |

---

## 📡 API Endpoints

The server exposes the following RESTful routes:

### Authentication

| Method | Route                       | Description                             | Auth Required? |
| :----- | :-------------------------- | :-------------------------------------- | :------------- |
| `POST` | `/api/auth/register`        | Register a new user account             | No             |
| `POST` | `/api/auth/login`           | Authenticate user & return JWT access token | No             |
| `GET`  | `/api/auth/me`              | Fetch current logged-in user profile    | Yes            |
| `PATCH`| `/api/auth/profile-photo`   | Upload and update user profile photo    | Yes            |

### Expenses

| Method | Route                       | Description                             | Auth Required? |
| :----- | :-------------------------- | :-------------------------------------- | :------------- |
| `GET`  | `/api/expenses`             | Fetch all expenses for the active user  | Yes            |
| `POST` | `/api/expenses`             | Log a new transaction (income/expense)  | Yes            |
| `PATCH`| `/api/expenses/:id`         | Update an existing transaction          | Yes            |
| `DELETE`| `/api/expenses/:id`        | Remove a transaction from the database  | Yes            |

---

## 📜 Available Scripts

In the backend root directory, you can run:

- `npm run dev`: Starts the server with `nodemon` for instant hot-reloading during development.
- `npm start`: Runs the server with production-grade `node ./src/server.js` command.

---

## 🔒 Notes on Security

All passwords stored in the MongoDB database are securely hashed before write operations using a robust salt factor with `bcryptjs`. Stateless token authentication is handled via JSON Web Tokens (JWT) configured with a strict expiration window of `7d`. Access control and API access safety in development and production is reinforced using MongoDB Atlas IP Whitelisting, ensuring only authorized servers can query the data stores.

---

## 🎓 License & Author

**Author:** [Abis Pokharel]  
**Course:** [B.Sc. Computer Science And Information Technology (BSc. CSIT)]  
**College:** [New Summit College / Tribhuwan University]  
*This project is submitted as an academic submission.*
