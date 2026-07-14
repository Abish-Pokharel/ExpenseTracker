# Ledger

A MERN stack expense tracker for managing personal income and expenses with visual insights.

---

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

---

## 🚀 Features

- **JWT-Based Authentication**: Secure user register and login system.
- **Protected Routes**: Secure pages restricted to authenticated users.
- **Full Expense CRUD Scoped per User**: Scopes all CRUD operations for expenses to the currently logged-in user.
- **Category-Based Search/Filtering**: Filter transactions by category and search through them in real-time.
- **Dashboard with Summary Cards**: Quick metrics showing total Income, Expenses, and net Balance.
- **Visual Charts**: 
  - **Pie Chart**: Visual breakdown of spending by category.
  - **Bar Chart**: Monthly trends showing financial trajectory.
- **Profile Photo Upload**: Secure photo upload using `multer` with a fallback to user initials avatar.
- **Toast Notifications**: Smooth visual feedback for actions using `react-hot-toast`.
- **Confirm-Before-Delete Modal**: Alert modals to confirm deletion and prevent accidental data loss.
- **Empty States**: Elegant UI placeholders when no data is available.
- **Skeleton Loaders**: Polished loading animations to improve perceived performance.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)** — Frontend library and development environment.
- **Tailwind CSS v4** — Utility-first styling framework.
- **React Router** — Client-side routing.
- **Axios** — Promise-based HTTP client for API requests.
- **Recharts** — Responsive charts for data visualization.
- **react-hot-toast** — Lightweight toast notifications.
- **lucide-react** — Modern, clean icons.

### Backend
- **Node.js** — JavaScript runtime environment.
- **Express.js** — Web framework for routing and middleware.
- **MongoDB (Mongoose)** — Document-oriented database & Object Data Modeling.
- **JWT (jsonwebtoken)** — Standard for stateless user authentication.
- **bcryptjs** — Hashing library for securing user passwords.
- **cors** — Cross-Origin Resource Sharing middleware.
- **dotenv** — Environment variable manager.

---

## 📂 Project Structure

```text
ledger/
├── client/                      # Frontend React Application
│   ├── public/                  # Static assets
│   └── src/
│       ├── components/          # Reusable UI elements (Skeleton, ProtectedRoute, etc.)
│       ├── context/             # AuthContext and state providers
│       ├── pages/               # Page-level views (Dashboard, Login, Register)
│       ├── services/            # API request services (axios configurations)
│       ├── utils/               # Helper utilities
│       ├── App.jsx              # Main routing and entry layout
│       └── main.jsx             # React DOM bootstrap entrypoint
│
└── server/                      # Backend Express REST API
    └── src/
        ├── config/              # Database and configuration files
        ├── controllers/         # Controller functions containing business logic
        ├── middleware/          # Authentication & upload interceptors
        ├── models/              # Mongoose database schemas (User, Expense)
        ├── routes/              # Express API route endpoints
        ├── utils/               # Backend helper utilities
        ├── app.js               # Core Express app setup
        └── server.js            # Main server entrypoint
```

---

## 🚦 Getting Started

Follow these steps to set up and run both the client and server locally. Both applications must run simultaneously in separate terminal windows.

### 1. Clone the Repository
```bash
git clone git@github.com:Abish-Pokharel/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Backend Setup
Open a terminal window and navigate to the `server` directory:
```bash
cd server
npm install
```
Create a `.env` file in the `server/` root directory (see configuration below) and start the development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a **new** terminal window and navigate to the `client` directory:
```bash
cd client
npm install
```
Create a `.env` file in the `client/` root directory (see configuration below) and start the Vite development server:
```bash
npm run dev
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

| Variable Name | Type | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | The port number on which the server listens | `5000` |
| `MONGO_URI` | String | Connection URI for the MongoDB Atlas database | `mongodb+srv://<user>:<pass>@db...` |
| `JWT_SECRET` | String | Private secret key used to sign Auth tokens | `supersecret_jwtkey_12345` |
| `JWT_EXPIRES_IN` | String | Duration before user session tokens expire | `7d` |

### Frontend (`client/.env`)

| Variable Name | Type | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | String | The base URL of the backend REST API | `http://localhost:5000/api` |

---

## 📡 API Reference

### Authentication & Profile
| Method | Route | Description | Auth Required? |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT access token | No |
| `GET` | `/api/auth/me` | Fetch current logged-in user profile | Yes |
| `PATCH` | `/api/auth/profile-photo` | Upload/update user profile photo | Yes |

### Expense CRUD
| Method | Route | Description | Auth Required? |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/expenses` | Fetch all expenses for the active user | Yes |
| `POST` | `/api/expenses` | Log a new transaction (income/expense) | Yes |
| `PATCH` | `/api/expenses/:id` | Update an existing transaction | Yes |
| `DELETE` | `/api/expenses/:id` | Remove a transaction from the database | Yes |

---

## 📜 Available Scripts

### Client Scripts
In the `client/` directory, you can run:
- `npm run dev` — Starts the client application in development mode using Vite.
- `npm run build` — Compiles the production-ready code into the `dist` directory.
- `npm run preview` — Previews the production build locally.

### Server Scripts
In the `server/` directory, you can run:
- `npm run dev` — Starts the backend server with `nodemon` for automatic reload on file changes.
- `npm start` — Runs the server in production mode using Node.js.

---

## 🔒 Security Notes

Password data is securely hashed before storage in MongoDB using salt rounds via `bcryptjs`. Session authorization is protected using stateless JSON Web Tokens (JWT) configured with a strict expiration window. Additionally, access control is enhanced during development and deployment using MongoDB Atlas IP Whitelisting, ensuring only authorized origins can establish a connection with the database.

---

## 🎓 Author & License

- **Author**: Abis Pokharel
- **Course**: B.Sc. Computer Science and Information Technology (BSc. CSIT)
- **Semester**: 8th Semester
- **College**: New Summit College / Tribhuwan University
- **License**: MIT License
