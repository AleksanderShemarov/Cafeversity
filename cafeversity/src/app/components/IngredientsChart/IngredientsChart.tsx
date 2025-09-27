import dynamic from "next/dynamic";
import { ApexOptions } from 'apexcharts';
import { CSSProperties } from "react";


const ApexPieChart = dynamic(
    () => import("@/components/Charts/ApexChart").then(mod => mod.ApexPieChart),
    {
        ssr: false,
        loading: () => <>Loading...</>
    }
);


export default function IngredientsChart({ ingredients, style }: { ingredients: string, style?: CSSProperties }) {

    const dividedIngreds = ingredients.split(", ");
    const names = [];
    const percents = [];

    for(const dividedOne of dividedIngreds) {
        const array = dividedOne.split(" (");
        names.push(array[0]);
        percents.push(Number(array[1].substring(0, array[1].length - 2)));
    }

    const donutOptions: ApexOptions = {
        chart: {
            type: 'pie',
            toolbar: { show: false },
        },
        labels: names,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: {
                    position: "right"
                }
            }
        }],
    };

    return (
        <ApexPieChart options={donutOptions} series={percents} style={style} />
    );
}
