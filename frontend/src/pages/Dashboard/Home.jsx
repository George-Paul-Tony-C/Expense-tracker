import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useEffect } from 'react';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins , LuWalletMinimal } from "react-icons/lu";
import { FaHome, FaWallet, FaChartBar } from 'react-icons/fa'; 
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from '../../utils/helper';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [ dashboardData, setDashboardData ] = useState(null);

  const [ loading , setLoading ] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if(response.data){
        setDashboardData(response.data);
      }

    } catch (error) {
      console.log("Something went wrong, Please try again.",error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    fetchDashboardData();

    return () => {

    }

  },[])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all ease-in-out duration-500'>
          <InfoCard 
            icon = {<IoMdCard/>}
            label = "Total Balance"
            value = {addThousandSeparator(dashboardData?.totalBalance || 0)}
            color = "bg-primary"
          />
          <InfoCard 
            icon = {<IoMdCard/>}
            label = "Total Income"
            value = {addThousandSeparator(dashboardData?.totalIncome || 0)}
            color = "bg-green-600"
          />
          <InfoCard 
            icon = {<IoMdCard/>}
            label = "Total Expense"
            value = {addThousandSeparator(dashboardData?.totalExpense || 0)}
            color = "bg-red-600"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
