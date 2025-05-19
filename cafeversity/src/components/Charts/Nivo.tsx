'use client';
import { ResponsiveBar } from '@nivo/bar';


export default function NivoBar() {

    const data = [
        { id: 'Янв', value: 400 },
        { id: 'Фев', value: 600 },
    ];

    return (
        <div style={{ height: "83%" ,width: "45%", border: "2px solid black" }}>
            <ResponsiveBar
                data={data}
                keys={['value']}
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                colors={['#8884d8']}
            />
        </div>
    );
}
