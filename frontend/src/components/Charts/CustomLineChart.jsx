import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Dot,
    ReferenceLine,
    Area,
    Legend
} from "recharts";

// Gradient color for the area under the line
const GradientLine = ({ index }) => (
    <defs>
        <linearGradient id={`colorLine${index}`} x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor={getLineColor(index)} stopOpacity={0.8} />
            <stop offset="95%" stopColor={getLineColor(index)} stopOpacity={0} />
        </linearGradient>
    </defs>
);

// Improved color function to support gradient
const getLineColor = (index) => {
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
                <p className='text-xs text-gray-400'>
                    Date: {payload[0].payload.date}
                </p>
            </div>
        );
    }

    return null;
};

const CustomLineChart = ({ data, type }) => {

    return (
        <div className='bg-white shadow-md rounded-lg mt-6 p-5'>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#333' }} stroke='#d1d1d1' />
                    <YAxis tick={{ fontSize: 12, fill: '#333' }} stroke='#d1d1d1' />

                    {/* Tooltip for displaying the details */}
                    <Tooltip content={CustomTooltip} />

                    {/* Reference line for y = 0 */}
                    <ReferenceLine y={0} stroke="#000" strokeWidth={1} />

                    {/* Gradient area fill */}
                    {data.map((entry, index) => (
                        <GradientLine key={index} index={index} />
                    ))}

                    {/* Line with animation and gradient fill */}
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke={`black`}  // Use gradient stroke
                        activeDot={{ r: 8, fill: "#ff7f50" }}
                        strokeWidth={2}
                        dot={<Dot fill="#0432ff" r={5} />}
                        connectNulls
                        isAnimationActive={true}  // Animation enabled
                        animationDuration={1000}  // Animation duration (1 second)
                    >
                        {data.map((entry, index) => (
                            <Dot key={index} fill={getLineColor(index)} />
                        ))}
                    </Line>

                    {/* Optional: Add a legend if needed */}
                    {/* <Legend verticalAlign="top" height={36} iconSize={14} /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
