import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({data , type}) => {

    const getBarColor = (index) => {
        index = index % 5;
        let color = "";
        switch(index) {
            case 0:
                color = "#00072d"
                break;
            case 1:
                color = "#001c55"
                break;
            case 2:
                color = "#0a2472"
                break;
            case 3:
                color = "#0e6ba8"
                break;
            case 4:
                color = "#a6e1fa"
                break;
        }

        return color;
    }

    const CustomTooltip = ({active , payload}) => {

        if(active && payload && payload.length){
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    { type === "income" ? 
                    <p className='text-xs font-bold text-green-800 mb-1'>  {payload[0].payload.source}</p> : 
                    <p className='text-xs font-bold text-blue-800 mb-1'>{payload[0].payload.category}</p>}
                    <p className='text-sm text-gray-600'>
                        Amount : <span className='text-sm font-medium text-gray-900'> ₹ {payload[0].payload.amount} </span>
                    </p>
                </div>
            )
        }
    
        return null;
    }

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke='none' />
                <XAxis dataKey="month" tick={{ fontSize: 12 , fill: '#555' }} stroke='none' />
                <YAxis tick={{ fontSize: 12 , fill: '#555' }} stroke='none' />

                <Tooltip content={CustomTooltip} />

                <Bar 
                    dataKey="amount"
                    fill='#0432ff'
                    radius={[10,10,0,0]}
                    activeDot = {{ r:8, fill:"yellow"}}
                    activeStyle = {{fill:"green"}}
                >
                    {data.map((entry,index) => (
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>

        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart