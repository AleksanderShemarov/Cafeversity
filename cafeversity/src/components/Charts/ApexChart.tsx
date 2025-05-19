'use client';

import { ApexOptions } from 'apexcharts';
import ApexChart from "react-apexcharts";


export default function ApexBarChart({
    options, series
}: {
    options: ApexOptions,
    series: ApexAxisChartSeries|ApexNonAxisChartSeries|undefined
}) {
    return (
        <ApexChart options={options} series={series} type="bar" width="100%"
            style={{ border: "2px solid black" }}
        />
    );
}
