'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, ChartOptions } from 'chart.js';


ChartJS.register(...registerables);


export default function Chartsjs() {

    const chartData = {
        labels: ['Студзень', 'Люты', 'Сакавік'], // ось X
        datasets: [
            {
                label: 'Продажы',
                data: [400, 600, 300],     // ось Y
                backgroundColor: '#8884d8', // Цвет столбцов
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom', // Теперь TypeScript знает, что это допустимое значение
            },
            title: {
                display: true,
                text: 'Продажы па месяцах',
            },
        },
    };

    return (
        <Bar data={chartData} options={options} style={{ border: "2px solid black" }} />
    );
}
