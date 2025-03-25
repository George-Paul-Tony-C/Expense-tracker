import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from "react-toastify";
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data.incomes);
      }
    } catch (error) {
      console.log("Something Went wrong on fetching income data , Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    if (loading) return;
    const { source, amount, date, icon } = income;

    // Validate input fields
    if (!source.trim()) {
      toast.error("Income Source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false); // Close the modal after adding income
      toast.success("Income Added Successfully");
      fetchIncomeDetails(); // Fetch the latest data

    } catch (error) {
      console.log("Something went wrong on adding income data, Please try again", error);
      toast.error("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    if (loading) return;

    setLoading(true);
    console.log("Deleting income with id:", id); // Ensure id is passed

    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income Deleted Successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Something went wrong on deleting income data, Please try again", error);
      toast.error("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log("Something Went wrong on fetching income data , Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6 transition-all ease-in-out duration-500">
          <div className="">
            <IncomeOverview
              transactions={incomeData || []}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData || []}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)} // Use the correct id
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
