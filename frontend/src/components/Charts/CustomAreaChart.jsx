import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Dot,
    ReferenceLine,
    Legend
} from "recharts";


const GradientArea = ({ index }) => (
    <defs>
        <linearGradient id={`colorArea${index}`} x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor={getAreaColor(index)} stopOpacity={0.8} />
            <stop offset="95%" stopColor={getAreaColor(index)} stopOpacity={0} />
        </linearGradient>
    </defs>
);


const getAreaColor = (index) => {
    const colors = [
        "#2E4A87", "#1A3451", "#0D234D", "#2D6181", "#58A0C6"
    ];
    return colors[index % colors.length];
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white shadow-lg rounded-lg p-4 border border-gray-300'>
                <p className='text-xs font-bold text-indigo-700 mb-1'>
                    {payload[0].payload.category || 'Expense'}
                </p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className='font-medium text-gray-900'>₹ {payload[0].payload.amount}</span>
                </p>
            </div>
        );
    }

    return null;
};

const CustomAreaChart = ({ data, type }) => {

    return (
        <div className='bg-white shadow-md rounded-lg mt-6 p-5'>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#333' }} stroke='#d1d1d1' />
                    <YAxis tick={{ fontSize: 12, fill: '#333' }} stroke='#d1d1d1' />
                    
                    <Tooltip content={CustomTooltip} />
                    
                    <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
                    
                    {data.map((entry, index) => (
                        <GradientArea key={index} index={index} />
                    ))}
                
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke={`black`}  
                        fill={`url(#colorArea0)`}  
                        activeDot={{ r: 8, fill: "#ff7f50" }}
                        strokeWidth={2}
                        dot={<Dot fill="#0432ff" r={5} />}
                        connectNulls
                        isAnimationActive={true}  
                        animationDuration={1000}  
                    />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomAreaChart;
