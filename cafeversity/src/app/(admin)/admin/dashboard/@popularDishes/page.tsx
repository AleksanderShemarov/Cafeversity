import dynamic from "next/dynamic";
import LoadingPopularDishes from "./loading";
import { ApexOptions } from "apexcharts";
import { getDishesPopularity } from "@/app/actions/getDishesData";
import { use } from "react";
const ApexBars = dynamic(
    () => import("@/components/Charts/ApexChart").then(mod => mod.default),
    {
        ssr: false,
        loading: () => <LoadingPopularDishes />
    }
);


async function getDishesByTheirPopularity() {
    const data = await getDishesPopularity();
    return data;
}


export default function PopularDishes() {
    const data = use(getDishesByTheirPopularity());
    const dishes = data.map(datum => datum.name);
    const percents = data.map(datum => datum.percentage);

    const apexChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 9,
                horizontal: false, // Vertical bars
                columnWidth: '25%', // Bar's width
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: dishes,
            labels: {
                rotate: -10,
                offsetY: 5,
                style: {
                    fontSize: '1.2rem',
                    fontFamily: 'Consolas, monospace',
                    colors: "var(--text-color)"
                },
            }
        },
        yaxis: {
            title: {
                text: 'Папулярнасць (%)',
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: "var(--text-color)"
                }
            },
            max: Math.ceil(Math.max(...percents) / 10) * 10
        },
        colors: ['#8884d8'], // Columns Colour
        title: {
            text: 'Папулярнасць страў па калькасці замоў (%)',
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: "var(--text-color)"
            }
        },
        tooltip: {
            enabled: false
        },
        noData: {
            text: "Popular Dishes Chart Loading..."
        }
    };

    const apexChartSeries: ApexAxisChartSeries = [
        {
            name: 'Папулярнасць ў замовах (%)',
            data: percents
        }
    ];

    return (        
        <ApexBars options={apexChartOptions} series={apexChartSeries}
            height="300"
        />
    );
}
