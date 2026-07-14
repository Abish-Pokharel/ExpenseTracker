import Expense from "../models/expense.js";

export const addExpense = async (req, res, next) => {
    try {
        const { title, amount, date, category, description, paymentMethod } = req.body;
        const userId = req.user._id;

        if (!title || !amount || !category) {
            throw new Error("Title, amount, and category are required");
        }

        const newExpense = await Expense.create({
            title,
            amount,
            date,
            category,
            description,
            paymentMethod,
            user: userId
        });

        res.status(201).json({
            message: "Expense added successfully",
            data: newExpense
        });
    } catch (error) {
        next(error);
    }
};

export const getExpense = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

        res.status(200).json({
            message: "Expenses retrieved successfully",
            data: expenses
        });
    } catch (error) {
        next(error);
    }
};


export const getExpenseById = async (req, res, next)=>{
    try {
        const userId = req.user._id;
        const expense = await Expense.findOne({ _id: req.params.id, user: userId });

        if (!expense) {
            throw new Error("Expense not found");
        }

        res.status(200).json({
            message: "Expense retrieved successfully",
            data: expense
        });
    } catch (error) {
        next(error);
    }
}


export const updateExpense = async (req, res, next)=>{
    try {
        const userId = req.user._id;
        const expense = await Expense.findOne({ _id: req.params.id, user: userId });

        if (!expense) {
            throw new Error("Expense not found");
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Expense updated successfully",
            data: updatedExpense
        });
    } catch (error) {
        next(error);
    }
}

export const deleteExpense = async (req, res, next)=>{
    try {
        const userId = req.user._id;
        const expense = await Expense.findOne({ _id: req.params.id, user: userId });

        if (!expense) {
            throw new Error("Expense not found");
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Expense deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}
