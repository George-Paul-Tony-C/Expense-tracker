require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db.js');
const authRouter = require('./routes/AuthRoutes.js');
const incomeRouter = require('./routes/IncomeRoutes.js');
const expenseRouter = require('./routes/ExpenseRoutes.js');
const dashboardRouter = require('./routes/DashboardRoutes.js');

const app = express();

app.options('*', cors());  // Allow pre-flight OPTIONS request for all routes

// CORS setup
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Make sure CLIENT_URL is set in .env
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"],
    })
);

// Connect to the database
connectDB();

// Parse incoming JSON data
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Use authentication routes
app.use("/api/auth", authRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up the port and start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
