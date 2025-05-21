import dynamic from "next/dynamic";
import LoadingPopularDishes from "./loading";
const Chartjs = dynamic(
    () => import("@/components/Charts/Chatsjs"),
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
            "Калдуны"
        ],
        percents: [ 18, 4, 31, 22, 13, 9 ]
    }

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
            
            <Chartjs {...popularity} />
        </>
    );
}
