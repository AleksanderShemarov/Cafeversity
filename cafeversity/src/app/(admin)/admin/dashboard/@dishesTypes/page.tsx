import dynamic from "next/dynamic";
import LoadingDishesTypes from "./loading";
import { ApexOptions } from 'apexcharts';
import { use } from "react";
import getDishTypes from "@/app/actions/getDishesData";
const ApexDonutChart = dynamic(
    () => import("@/components/Charts/ApexChart").then(mod => mod.ApexDonutChart),
    {
        ssr: false,
        loading: () => <LoadingDishesTypes />
    }
);


async function getDishesByTypes() {
    const data = await getDishTypes();
    return data;
}


export default function DishesTypes() {
    const data = use(getDishesByTypes());
    const labels = data.map(datum => datum.Name);
    const series = data.map(datum => datum._count.Dishes);


    const donutOptions: ApexOptions = {
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
            breakpoint: 100,
            options: {
                chart: { width: 500 },
                legend: { position: "right" }
            }
        }]
    };
    
    const donutSeries: ApexNonAxisChartSeries = series;// [ 67, 42, 18, 56, 9 ];

    return (
        <ApexDonutChart options={donutOptions} series={donutSeries} style={{
            minWidth: "50%",
            maxWidth: "85%",
            margin: "0 auto",
        }} />
    );
}
