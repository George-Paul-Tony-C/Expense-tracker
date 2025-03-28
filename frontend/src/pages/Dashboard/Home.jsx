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
import { BiSolidBank } from "react-icons/bi";
import { addThousandSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

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
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 transition-all ease-in-out duration-500'>
          <div className='lg:col-span-1 md:col-span-2 '>
            <InfoCard 
              icon = {<BiSolidBank />}
              label = "Total Balance"
              value = {addThousandSeparator(dashboardData?.totalBalance || 0)}
              color = "bg-primary"
            />
          </div>
          <div className='col-span-1'>
            <InfoCard 
              icon = {<FaWallet/>}
              label = "Total Income"
              value = {addThousandSeparator(dashboardData?.totalIncome || 0)}
              color = "bg-green-700"
            />
          </div>
          <div className='col-span-1'>
            <InfoCard 
              icon = {<FaChartBar/>}
              label = "Total Expense"
              value = {addThousandSeparator(dashboardData?.totalExpense || 0)}
              color = "bg-red-600"
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions 
            transactions = {dashboardData?.recentTransactions || [] }
            onSeeMore = {() => navigate('/expense')}
          />

          <FinanceOverview 
            totalBalance = {dashboardData?.totalBalance || 0}
            totalIncome = {dashboardData?.totalIncome || 0}
            totalExpense = {dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions 
            transactions = {dashboardData?.last30DaysExpense?.transaction || []}
            onSeeMore = {() => navigate('/expense')}
          />

          <Last30DaysExpenses 
            data = {dashboardData?.last30DaysExpense?.transaction || []}

          />

          <RecentIncomeWithChart
            data = {dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
            totalIncome = {dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions = {dashboardData?.last60DaysIncome?.transaction || [] }
            onSeeMore = {() => navigate('/expense')}
          />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
