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

    // const popularity: { dishes: string[], percents: number[] } = {
    //     dishes: [
    //         "Мачанка з блінцамі",
    //         "Наліснікі з суніцамі і дурніцамі",
    //         "Імбірна-цытрусавая гарбата",
    //         "Крупнік",
    //         "Косаўская салата",
    //         "Калдуны",
    //     ],
    //     percents: [ 18, 4, 31, 22, 13, 9 ]
    // }

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
                borderRadius: 4,
                horizontal: false, // Vertical bars
                columnWidth: '25%', // Bar's width
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: dishes,
            labels: {
                rotate: -10,
                offsetY: 5,
                style: {
                    fontSize: '1.2rem',
                    fontFamily: 'Consolas, monospace',
                },
                // formatter: (value: string) => value.length > 15 ? value.split(" ") : value
            }
        },
        yaxis: {
            title: {
                text: 'Папулярнасць (%)',
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                }
            },
            max: Math.ceil(Math.max(...percents) / 10) * 10
        },
        colors: ['#8884d8'], // Цвет столбцов
        title: {
            text: 'Папулярнасць страў па калькасці замоў (%)',
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        },
        tooltip: {
            // y: {
            //     formatter: (val: number) => val + "%"
            // },
            theme: "light",
            // custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            //     return `
            //     <div class="custom-tooltip">
            //         <span>${w.globals.labels[dataPointIndex]}</span>
            //         <span>${series[seriesIndex][dataPointIndex]}%</span>
            //     </div>
            //     `;
            // }
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
            // style={{ margin: "0 auto", width: "90%" }}
        />
    );
}
