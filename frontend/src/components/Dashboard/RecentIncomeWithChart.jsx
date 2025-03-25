import React , { useState , useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#03045e',  '#0077b6','#00b4d8','#90e0ef' , '#caf0f8'];

const RecentIncomeWithChart = ({data , totalIncome}) => {

  const [ chartData , setChartData ] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name : item?.source,
      amount : item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};

  },[data]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'> Last 60 Days Income </h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor = {true}
        colors={COLORS}
      />

    </div>
  )
}

export default RecentIncomeWithChart
