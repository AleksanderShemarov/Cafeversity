import dynamic from "next/dynamic";
import LoadingDishesTypes from "./loading";
const Chartjs = dynamic(
    () => import("@/components/Charts/Chatsjs"),
    {
        ssr: false,
        loading: () => <LoadingDishesTypes />
    }
);


export default function DishesTypes() {
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    DishesTypes Component
                </p>
            </div>

            <Chartjs />
        </>
    );
}
