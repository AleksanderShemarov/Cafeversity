import dynamic from "next/dynamic";
import LoadingCommonIncome from "./loading";
const NivoChart = dynamic(
    () => import("@/components/Charts/Nivo"),
    {
        ssr: false,
        loading: () => <LoadingCommonIncome />
    }
);


export default function CommonIncome() {
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    CommonIncome Component
                </p>
            </div>
            
            <NivoChart />
        </>
    );
}
