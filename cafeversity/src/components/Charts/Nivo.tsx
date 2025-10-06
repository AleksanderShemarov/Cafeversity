'use client';
import { ResponsiveBar } from '@nivo/bar';


export default function NivoBar({ cafesIncomes }: { cafesIncomes: { [key: string]: number }}) {
    const keys = Object.keys(cafesIncomes);
    
    const data = [{
        name: 'Даходы',
        ...cafesIncomes
    }];

    // console.log("data in Nivo chart -->", data);

    return (
        <div style={{ height: "65%", maxWidth: "75%", margin: "0 auto" }}>
            <ResponsiveBar
                data={data}
                //keys={["Кафэ Гэрадоту", "Кафэ Эдгара Кодду", "Тэрмаядзернае Кафэ"]}
                keys={keys}
                indexBy="name"
                layout="horizontal"
                margin={{ top: 0, right: 10, bottom: 60, left: 60 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#d62728', '#9467bd', '#e377c2', '#7f7f7f', '#bcbd22']}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisBottom={{
                    tickSize: 9,
                    tickPadding: 3,
                    tickRotation: 30,
                    legend: "Колькасць",
                    legendPosition: "middle",
                    legendOffset: 40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [{
                            on: "hover", style: {
                                itemOpacity: 1
                            }
                        }]
                    }
                ]}
            />
        </div>
    );
}
