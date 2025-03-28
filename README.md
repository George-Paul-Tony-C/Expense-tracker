# Expense Tracker

This is an easy-to-use expense tracker application where users can track their income and expenses, view transaction history, and download reports. The app provides an intuitive dashboard, allowing users to manage their financial data with ease. 

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Frontend Structure](#frontend-structure)
7. [Backend Structure](#backend-structure)
8. [Security](#security)
9. [Contributing](#contributing)
10. [License](#license)

## Features

- **User Authentication**: 
  - Register and log in using email and password. All user data is securely stored and accessed.
  
- **Dashboard**: 
  - An overview of total income, total expenses, and balance. 
  - Visual representation of income and expenses through graphs and charts.
  
- **Income/Expense Management**: 
  - Add, delete, and view your income and expenses.
  - Each transaction can be categorized for better organization.
  
- **Category Management**: 
  - Categorize income and expenses for better insights.
  - Predefined categories and user-defined options.
  
- **Transaction History**: 
  - Filter and search through your income and expense transactions.
  - Allows users to track spending and saving patterns over time.
  
- **Download Reports**: 
  - Download income and expense records as Excel files.
  - Reports can be generated for any date range.

- **Profile Page**: 
  - Users can view and update their profile details, including their profile picture.
  
- **Responsive Design**: 
  - Fully responsive design that works across all devices (desktop, tablet, mobile).
  
- **Security**: 
  - JWT-based authentication ensures that only authenticated users can access their data.
  - Data is encrypted for secure transmission.

## Tech Stack

- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
  - **Axios**: A promise-based HTTP client for making API requests.

- **Backend**: 
  - **Node.js**: A JavaScript runtime environment for building fast, scalable applications.
  - **Express.js**: A web application framework for Node.js that simplifies routing and middleware.
  - **MongoDB**: A NoSQL database for storing user data and transaction records.
  - **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.

- **Authentication**: 
  - **JWT (JSON Web Tokens)**: A compact and secure way to represent information between the frontend and backend.

- **File Upload**: 
  - **Multer**: A Node.js middleware for handling multipart/form-data, which is used for uploading files (like profile images).

- **Excel Generation**: 
  - **ExcelJS**: A library for creating, reading, and editing Excel files in Node.js.
