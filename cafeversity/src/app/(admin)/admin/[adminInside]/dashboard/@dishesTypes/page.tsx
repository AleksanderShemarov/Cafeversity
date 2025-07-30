"use client";

import dynamic from "next/dynamic";
import LoadingDishesTypes from "./loading";
import { ApexOptions } from 'apexcharts';
const ApexDonutChart = dynamic(
    () => import("@/components/Charts/ApexChart").then(mod => mod.ApexDonutChart),
    {
        ssr: false,
        loading: () => <LoadingDishesTypes />
    }
);


export default function DishesTypes() {

    const donutOptions: ApexOptions = {
        chart: {
            type: 'pie',
            toolbar: { show: false },
        },
        labels: [ "Dish1", "Dish2", "Dish3", "Dish4", "Dish5" ],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: { position: "right" }
            }
        }]
    };
    const donutSeries: ApexNonAxisChartSeries = [ 67, 42, 18, 56, 9 ];

    return (
        <ApexDonutChart options={donutOptions} series={donutSeries} style={{
            maxHeight: "75%",
            maxWidth: "75%",
            margin: "0 auto"
        }} />
    );
}
