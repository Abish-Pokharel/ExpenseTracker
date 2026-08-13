import Expense from "../models/expense.js";

export const addExpense = async (req, res, next) => {
    try {
        const { title, amount, date, category, description, paymentMethod, type } = req.body;
        const userId = req.user._id;

        if (!amount || !category) {
            throw new Error("Amount and category are required");
        }

        const newExpense = await Expense.create({
            title: title || category,
            amount,
            date,
            category,
            description,
            paymentMethod,
            type,
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

        const updateData = { ...req.body };
        if (updateData.category && !updateData.title) {
            updateData.title = updateData.category;
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            updateData,
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
