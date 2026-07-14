import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from "./routes/auth_routes.js";
import expenseRoutes from "./routes/expense_routes.js";
import { connectDB } from "./config/db.js";
import { authenticateUser } from "./middleware/auth_middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*'
}))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', authenticateUser, expenseRoutes);

// Global error handler — must come after all routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error"
    });
});

// 404 handler for unmatched routes — optional but useful
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log("Server is running on http://localhost:" + process.env.PORT);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();