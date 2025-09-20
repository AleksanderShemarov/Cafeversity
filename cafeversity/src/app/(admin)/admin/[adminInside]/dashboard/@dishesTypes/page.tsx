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
        },
        labels: labels, // [ "Dish1", "Dish2", "Dish3", "Dish4", "Dish5" ],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: { position: "right" }
            }
        }]
    };
    
    const donutSeries: ApexNonAxisChartSeries = series;// [ 67, 42, 18, 56, 9 ];

    return (
        <ApexDonutChart options={donutOptions} series={donutSeries} style={{
            maxHeight: "75%",
            maxWidth: "75%",
            margin: "0 auto"
        }} />
    );
}
