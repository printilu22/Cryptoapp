import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import millify from 'millify';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    // Ensure to parse timestamps correctly depending on the format (seconds or milliseconds)
    const prices = coinHistory?.data?.history?.map((item) => item.price) || [];
    const timestamps = coinHistory?.data?.history?.map((item) => {
        const date = new Date(item.timestamp * 1000); // Adjust this line if your timestamps are in seconds
        return date.toLocaleDateString(); // Convert to locale date string
    }) || [];

    const data = {
        labels: timestamps,
        datasets: [
            {
                label: `${coinName} Price (Past ${coinHistory?.data?.timeframe})`,
                data: prices,
                fill: false,
                borderColor: '#0071ff',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return `${context.dataset.label}: $${millify(context.raw)}`;
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Price (USD)',
                },
                ticks: {
                    callback: (value) => `$${millify(value)}`,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
        },
    };

    return (
        <div>
            <h2>{coinName} Price Chart</h2>
            <Line data={data} options={options} />
            <div style={{ marginTop: '20px' }}>
                <strong>Current Price:</strong> ${currentPrice}
            </div>
        </div>
    );
};

export default LineChart;
