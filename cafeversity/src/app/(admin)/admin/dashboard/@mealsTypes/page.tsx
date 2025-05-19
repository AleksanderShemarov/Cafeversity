import dynamic from 'next/dynamic';
import LoadingMealsTypes from './loading';
import { ApexOptions } from 'apexcharts';
const ApexBarChart = dynamic(
    () => import("@/components/Charts/ApexChart"),
    {
        ssr: false,
        loading: () => <LoadingMealsTypes />
    }
);


export default function MealsTypes() {

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            }, // Скрыть тулбар
        },
        xaxis: {
            categories: [
                'Студзень', 'Красавік', 'Травень', 'Чэрвень'
            ],
        },
        plotOptions: {
            bar: {
                borderRadius: 4, // Скругление углов
            },
        },
        colors: [
            '#8884d8'
        ], // Цвет столбцов
    };

    const series: ApexAxisChartSeries = [
        {
            name: 'Продажы',
            data: [
                400, 600, 350, 800
            ],
        },
    ];

    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    MealsTypes Component
                </p>
            </div>
            
            <ApexBarChart options={options} series={series} />
        </>
    );
}
