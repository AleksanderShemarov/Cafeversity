"use client";

import dynamic from 'next/dynamic';
import LoadingMealsTypes from './loading';
import { ApexOptions } from 'apexcharts';
const ApexPieChart = dynamic(
    () => import("@/components/Charts/ApexChart").then(mod => mod.ApexPieChart),
    {
        ssr: false,
        loading: () => <LoadingMealsTypes />
    }
);


export default function MealsTypes() {

    const pieOptions: ApexOptions = {
        chart: {
            type: 'pie',
            toolbar: { show: false },
        },
        labels: [ "Dish1", "Dish2", "Dish3", "Dish4", "Dish5" ],
        responsive: [{
            breakpoint: 250,
            options: {
                chart: { width: 200 },
                legend: { position: "right" }
            }
        }]
    };
    const pieSeries: ApexNonAxisChartSeries = [ 44, 55, 12, 47, 20 ];

    return (            
        <ApexPieChart options={pieOptions} series={pieSeries} style={{
            maxHeight: "75%",
            maxWidth: "75%",
            margin: "0 auto"
        }} />
    );
}
