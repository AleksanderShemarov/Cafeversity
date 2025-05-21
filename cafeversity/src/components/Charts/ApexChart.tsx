'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';
// import ApexChart from "react-apexcharts";// suitable for one chart component per a .tsx file
const ApexChart = dynamic(
    () => import("react-apexcharts"),
    { ssr: false }
);// suitable for multiple chart components per a .tsx file


type ApexChartProps = {
    options: ApexOptions,
    series: ApexAxisChartSeries|ApexNonAxisChartSeries|undefined,
    type: "bar"|"pie"|"donut",
    width?: string,
    height?: string,
    style?: CSSProperties
};

function ApexChartBase({ options, series, type, width = "100%", height, style }: ApexChartProps) {
    return (
        <ApexChart
            options={options}
            series={series}
            type={type}
            width={width}
            height={height}
            style={style}
        />  
    );
}

export default function ApexBarChart (props: Omit<ApexChartProps, "type">) {
    return (
        <ApexChartBase {...props} type="bar" />
    );
}

export function ApexPieChart (props: Omit<ApexChartProps, "type">) {
    return (
        <ApexChartBase {...props} type="pie" />
    );
}

export function ApexDonutChart (props: Omit<ApexChartProps, "type">) {
    return (
        <ApexChartBase {...props} type="donut" />
    );
}