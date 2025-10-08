import dynamic from 'next/dynamic';
import LoadingMealsTypes from './loading';
import { ApexOptions } from 'apexcharts';
import { use } from 'react';
import { getDishMeals } from '@/app/actions/getDishesData';
const ApexPieChart = dynamic(
    () => import("@/components/Charts/ApexChart").then(mod => mod.ApexPieChart),
    {
        ssr: false,
        loading: () => <LoadingMealsTypes />
    }
);


async function getDishesByMeals() {
    const data = await getDishMeals();
    return data;
}


export default function MealsTypes() {

    const data = use(getDishesByMeals());
    const labels = data.map(datum => datum.Name);
    const series = data.map(datum => datum._count.Dish);

    const pieOptions: ApexOptions = {
        chart: {
            type: 'pie',
            toolbar: { show: false },
            background: "transparent",
        },
        labels: labels,
        legend: {
            labels: { colors: "var(--text-color)" }
        },
        responsive: [{
            breakpoint: 250,
            options: {
                chart: { width: 200 },
                legend: { position: "right" }
            }
        }]
    };
    const pieSeries: ApexNonAxisChartSeries = series; //[ 44, 55, 12, 47, 20 ];

    return (            
        <ApexPieChart options={pieOptions} series={pieSeries} style={{
            minWidth: "50%",
            maxWidth: "75%",
            margin: "0 auto"
        }} />
    );
}
