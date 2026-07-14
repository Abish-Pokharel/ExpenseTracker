import express from 'express'
import { addExpense, deleteExpense, getExpense, getExpenseById, updateExpense } from "../controllers/expense_controller.js"
const router = express.Router()

router.post("/add",addExpense);
router.get("/get",getExpense);
router.get("/get/:id",getExpenseById);
router.put("/update/:id",updateExpense);
router.delete("/delete/:id",deleteExpense);

export default router
