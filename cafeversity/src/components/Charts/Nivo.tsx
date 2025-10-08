'use client';
import { ResponsiveBar } from '@nivo/bar';


export default function NivoBar({ cafesIncomes }: { cafesIncomes: { [key: string]: number }}) {
    const keys = Object.keys(cafesIncomes);
    
    const data = [{
        name: 'Даходы',
        ...cafesIncomes
    }];

    const nivoStyles = {
        axis: {
            domain: {
                line: {
                    stroke: 'var(--text-color)',
                    strokeWidth: 1
                }
            },
            legend: {
                text: {
                    fontSize: 12,
                    fill: 'var(--text-color)',
                    fontWeight: 600
                }
            },
            ticks: {
                line: {
                    stroke: 'var(--text-color)',
                    strokeWidth: 1,
                    strokeOpacity: 0.8
                },
                text: {
                    fontSize: 12,
                    fill: 'var(--text-color)',
                    fontWeight: 600
                }
            }
        },
        labels: {
            text: {
                fill: 'rgb(73, 71, 66)',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'Consolas, monospace',
            }
        }
    }

    return (
        <div style={{ height: "65%", width: "75%", margin: "0 auto", position: "relative", minHeight: "30rem" }}>
            <ResponsiveBar
                data={data}
                //keys={["Кафэ Гэрадоту", "Кафэ Эдгара Кодду", "Тэрмаядзернае Кафэ"]}
                keys={keys}
                indexBy="name"
                layout="horizontal"
                margin={{ top: 0, right: 10, bottom: 90, left: 60 }}
                
                padding={0.4}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                
                colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#d62728', '#9467bd', '#e377c2', '#7f7f7f', '#bcbd22']}
                
                theme={nivoStyles}
                borderColor={{ from: "color", modifiers: [[ "darker", 1.8 ]] }}
                
                axisBottom={{
                    ticksPosition: "after",
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: -25,
                    legend: "Колькасць",
                    legendPosition: "middle",
                    legendOffset: 40,
                }}

                enableLabel={true}
                labelSkipWidth={16}
                labelSkipHeight={16}
                // labelTextColor="var(--text-color)"
                
                // legends={[
                //     {
                //         dataFrom: "keys",
                //         anchor: "bottom-right",
                //         direction: "column",
                //         justify: false,
                //         translateX: 120,
                //         translateY: 40,
                //         itemsSpacing: 4,
                //         itemWidth: 100,
                //         itemHeight: 24,
                //         itemDirection: "left-to-right",
                //         itemOpacity: 0.9,
                //         itemTextColor: "var(--text-color)",
                //         symbolSize: 20,
                //         effects: [{
                //             on: "hover", style: {
                //                 itemOpacity: 1
                //             }
                //         }]
                //     }
                // ]}

                animate={true}
                motionConfig="gentle"

                isInteractive={true}

                tooltip={({ id, value, color }) => (
                    <div
                        style={{
                            padding: '12px',
                            background: 'var(--admin-income-chart-tip-background)',
                            color: 'var(--text-color)',
                            border: `2px solid ${color}`,
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: 600,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                            textAlign: "center",
                        }}
                    >
                        <strong>{id}</strong>:<br /><br />{value}
                    </div>
                )}
            />
        </div>
    );
}
