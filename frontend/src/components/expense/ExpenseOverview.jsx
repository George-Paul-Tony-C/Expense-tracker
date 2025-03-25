import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import React , { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';

import CustomAreaChart from '../Charts/CustomAreaChart';

const ExpenseOverview = ({transactions , onAddExpense}) => {

    const [ chartData , setChartData ] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setChartData(result);
        return () => {};
    },[transactions]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your earnings over time and analyse your expense transaction
                </p>
            </div>
        <button className='add-btn' onClick={onAddExpense}>
            <LuPlus className='text-lg '/>
            Add Expense
        </button>
        </div>

        <div className='mt-10'>
        <CustomAreaChart data={chartData} type={"expense"} />
        </div>
    </div>
  )
}

export default ExpenseOverview