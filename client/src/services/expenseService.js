import api from "./api";

export const addExpense = async (expenseData) => {
  try {
    const response = await api.post("/expenses/add", expenseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await api.get("/expenses/get");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExpenseById = async (id) => {
  try {
    const response = await api.get(`/expenses/get/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await api.put(`/expenses/update/${id}`, expenseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};