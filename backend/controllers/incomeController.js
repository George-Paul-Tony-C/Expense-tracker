const User = require('../models/User.js');
const Income = require('../models/Income.js');
const mongoose = require('mongoose');
const xlsx = require('xlsx');

// Helper function for checking ObjectId validity
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add User Income
exports.addIncome = async (req, res) => {
    const { icon, source, amount, date } = req.body;
    const userId = req.user.id;

    // Validation
    if (!source || !amount || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json({ newIncome });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all income for a specific user
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    // Validation
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const incomes = await Income.find({ userId });

        if (!incomes.length) {
            return res.status(404).json({ message: "No income data found" });
        }

        res.status(200).json({ incomes });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
    const { incomeId } = req.params;

    // Validation
    if (!isValidObjectId(incomeId)) {
        return res.status(400).json({ message: "Invalid incomeId" });
    }

    try {
        const deletedIncome = await Income.findByIdAndDelete(incomeId);

        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    // Validation
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        if (!incomes.length) {
            return res.status(404).json({ message: "No income data available for download" });
        }

        // Prepare data for Excel
        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toLocaleDateString(),
        }));

        // Generate Excel file
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Save and send file to the user
        const filePath = "Income_Details.xlsx";
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
