"use client";

import dynamic from "next/dynamic";
import LoadingPopularDishes from "./loading";
import { ApexOptions } from "apexcharts";
const ApexBars = dynamic(
    () => import("@/components/Charts/ApexChart").then(mod => mod.default),
    {
        ssr: false,
        loading: () => <LoadingPopularDishes />
    }
);


export default function PopularDishes() {

    const popularity: { dishes: string[], percents: number[] } = {
        dishes: [
            "Мачанка з блінцамі",
            "Наліснікі з суніцамі і дурніцамі",
            "Імбірна-цытрусавая гарбата",
            "Крупнік",
            "Косаўская салата",
            "Калдуны",
        ],
        percents: [ 18, 4, 31, 22, 13, 9 ]
    }

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
            categories: popularity.dishes,
            labels: {
                rotate: -10,
                offsetY: 5,
                style: {
                    fontSize: '1.2rem',
                    fontFamily: 'Consolas, monospace',
                },
                formatter: function(value: string) {
                    return value.length > 15 ? value.split(" ") : value;
                }
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
            max: Math.ceil(Math.max(...popularity.percents) / 10) * 10
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
            y: {
                formatter: function (val: number) {
                    return val + "%";
                }
            },
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
            name: 'Папулярнасць ў замовах',
            data: popularity.percents
        }
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
                    PopularDishes Component
                </p>
            </div>
            
            <ApexBars options={apexChartOptions} series={apexChartSeries}
                height="300"
                style={{ margin: "0 auto", width: "90%" }}
            />
        </>
    );
}
