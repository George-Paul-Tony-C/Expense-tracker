const User = require('../models/User.js');
const Expense = require('../models/Expense.js');
const mongoose = require('mongoose');
const xlsx = require('xlsx');

// Helper function for checking ObjectId validity
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add User Expense
exports.addExpense = async (req, res) => {
    const { icon, category, amount, date } = req.body;
    const userId = req.user.id;

    // Validation
    if (!category || !amount || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json({ newExpense });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all Expense for a specific user
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    // Validation
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const expenses = await Expense.find({ userId });

        if (!expenses.length) {
            return res.status(404).json({ message: "No Expense data found" });
        }

        res.status(200).json({ expenses });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    const { expenseId } = req.params;

    // Validation
    if (!isValidObjectId(expenseId)) {
        return res.status(400).json({ message: "Invalid ExpenseId" });
    }

    try {
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    // Validation
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        if (!expenses.length) {
            return res.status(404).json({ message: "No Expense data available for download" });
        }

        // Prepare data for Excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toLocaleDateString(),
        }));

        // Generate Excel file
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Save and send file to the user
        const filePath = "Expense_Details.xlsx";
        xlsx.writeFile(wb, filePath);
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).json({ message: "Error in file download", error: err.message });
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
