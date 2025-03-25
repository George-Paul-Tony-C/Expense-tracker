import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import { toast } from "react-toastify";
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data.expenses);
        
      }
    } catch (error) {
      console.log("Something Went wrong on fetching expense data , Please try again", error);
    } finally {
      setLoading(false);
    }

    
  };

  const handleAddExpense = async (expense) => {
    if (loading) return;
    const { category, amount, date, icon } = expense;

    // Validate input fields
    if (!category.trim()) {
      toast.error("Expense category is required");
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    if (!icon) {
      toast.error("Icon is required");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false); // Close the modal after adding expense
      toast.success("Expense Added Successfully");
      fetchExpenseDetails(); // Fetch the latest data

    } catch (error) {
      console.log("Something went wrong on adding expense data, Please try again", error);
      toast.error("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (loading) return;

    setLoading(true);
    console.log("Deleting expense with id:", id); // Ensure id is passed

    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense Deleted Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Something went wrong on deleting expense data, Please try again", error);
      toast.error("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log("Something Went wrong on fetching expense data , Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6 transition-all ease-in-out duration-500">
          <div className="">
            <ExpenseOverview
              transactions={expenseData || []}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData || []}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)} // Use the correct id
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
