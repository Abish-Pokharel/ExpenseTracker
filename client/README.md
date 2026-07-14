# Ledger - Frontend

A MERN stack expense tracker for managing personal income and expenses with visual insights.

---

## 🚀 Features

- **JWT-Based Authentication**: Secure user register and login system.
- **Transaction CRUD**: Easily add, edit, and delete personal expenses/income.
- **Advanced Filtering & Search**: Category-based filtering and real-time search of transactions.
- **Interactive Dashboard**:
  - **Summary Cards**: Quick metrics showing total Income, Expenses, and net Balance.
  - **Pie Chart**: Visual breakdown of spending by category.
  - **Bar Chart**: Monthly trends showing financial trajectory.
- **User Profile Management**: Profile photo upload with an elegant fallback initials avatar when no image is uploaded.
- **Premium User Experience**:
  - **Toast Notifications**: Smooth visual feedback for actions using `react-hot-toast`.
  - **Delete Confirmations**: Modal alerts to confirm deletions and prevent accidental data loss.
  - **Skeleton Loaders**: Polished loading animations to improve perceived performance.
  - **Protected Routes**: Secure pages restricted to authenticated users.
  - **Empty States**: Elegant UI placeholders for clean and intuitive navigation when no data is available.

---

## 🛠️ Tech Stack

- **React** (v19.2.7) — Frontend UI framework
- **Vite** (v8.1.1) — Fast build tool and development server
- **Tailwind CSS v4** (v4.3.2) — Utility-first styling framework
- **React Router DOM** (v7.18.1) — Client-side routing
- **Axios** (v1.10.0) — Promise-based HTTP client for API requests
- **Recharts** (v3.9.2) — Responsive chart library for data visualization
- **react-hot-toast** (v2.6.0) — Lightweight, customizable toast notifications
- **Lucide React** (v1.24.0) — Sleek icon library

---

## 📂 Folder Structure

```text
client/src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable UI components
├── context/         # AuthContext and state providers
├── pages/           # Page-level components
├── services/        # API request services and axios configurations
├── App.jsx          # Application router and entry layout
└── main.jsx         # React DOM bootstrap entrypoint
```

---

## 🚦 Getting Started

Follow these steps to run the frontend locally:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Client Directory**
   ```bash
   cd client
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**
   Create a `.env` file in the root of the `client` directory and define the backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local server URL provided (usually `http://localhost:5173`).

---

## ⚙️ Environment Variables

| Variable Name  | Type   | Description                              | Example Value                |
| :------------- | :----- | :--------------------------------------- | :--------------------------- |
| `VITE_API_URL` | String | The base URL of the backend REST API     | `http://localhost:5000/api` |

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with hot-reloading using Vite.
- `npm run build`: Builds the application for production to the `dist` folder.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Performs rapid code linting using Oxlint to detect potential issues.

---

## 🧩 Folder & File Responsibilities

- **`src/services/api.js`**: Configures the base Axios instance and adds a request interceptor to automatically attach the user's JWT from `localStorage` to all outbound API requests.
- **`src/context/AuthContext.jsx`**: Manages global authentication state, session bootstrapping, registration, login, and logout functions, distributing them via Context.
- **`src/context/authContext.js`**: Instantiates and exports the React Context object.
- **`src/context/useAuth.js`**: A custom hook for clean, easy consumption of the authentication context.
- **`src/services/authService.js`**: Contains API wrappers for authentication requests (register, login, get current user).
- **`src/services/expenseService.js`**: Encompasses services for CRUD operations on user expenses.
- **`src/pages/`**: Holds routing endpoints like Dashboard (`Dashboard.jsx`), Login (`Login.jsx`), Register (`Register.jsx`), and Add/Edit Expense forms.
- **`src/components/`**: Houses independent UI elements, including routing guards (`ProtectedRoute.jsx`), indicators (`Skeleton.jsx`), empty placeholders (`EmptyState.jsx`), and charts (`ExpenseChart.jsx`).

---

## 📸 Screenshots

> [!NOTE]
> Add screenshots here. Include mockups or actual screenshots of the Dashboard, Login/Register pages, and the Expense form.

---

## 🎓 License & Author

**Author:** [Abis Pokharel]  
**Course:** [B.Sc. Computer Science And Information Technology (BSc. CSIT)]  
**College:** [New Summit College / Tribhuwan University]  
*This project is submitted as an academic submission.*
