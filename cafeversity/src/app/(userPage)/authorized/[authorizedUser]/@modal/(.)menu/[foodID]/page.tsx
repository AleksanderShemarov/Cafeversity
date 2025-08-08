import { use } from "react";
import CardTitle from "@/components/CardParts/CardTitle";
import CardImage from "@/components/CardParts/CardImage";


type DishShortInfo = {
    food_name: string,
    includes: string,
    imagePath: string,
    protein: string,
    fats: string,
    carbohydrates: string,
    food_portion: string,
    cost: string,
}


async function fetchData(foodID: string) {
    const response = await fetch(`http://localhost:3000/api/foodlist?id=${foodID}&info=short`, { cache: "no-store" });
    const dishData = await response.json();

    return dishData;
}


export default function ShortMainDishInfo({ params }: { params: { authorizedUser: string, foodID: string } }) {
    
    const dishShort: DishShortInfo = use(fetchData(params.foodID));
    console.log("dishShort -->", dishShort);

    return (
        <>
            <CardTitle title={dishShort.food_name} style={{
                fontSize: "3.5rem", fontWeight: 700,
                color: "white",
                padding: "0.5rem",
                textAlign: "center",
            }} />
            <CardImage imagePath={dishShort.imagePath.slice(8)} imageAlt={`${dishShort.imagePath.slice(8)}`}
                width={500} height={275}
                style={{
                    borderRadius: "1rem",
                    margin: "0 auto",
                    marginTop: "1rem", marginBottom: "2rem"
                }}
            />
            <CardTitle title="Склад" style={{
                fontSize: "2.1rem", fontWeight: 400,
                color: "white",
                textAlign: "center",
            }} />
            <p style={{
                fontSize: "1.8rem", color: "white", textIndent: "2rem"
            }}>
                {dishShort.includes}.
            </p>
            <table style={{ fontSize: "1.8rem" }}>
                <tbody>
                    <tr>
                        <td>Бялкі</td>
                        <td>{dishShort.protein} г.</td>
                    </tr>
                    <tr>
                        <td>Тлушчы</td>
                        <td>{dishShort.fats} г.</td>
                    </tr>
                    <tr>
                        <td>Вугляводы</td>
                        <td>{dishShort.carbohydrates} г.</td>
                    </tr>
                </tbody>
            </table>
            
            <p style={{ fontSize: "1.8rem" }}>Кошт: {dishShort.cost} ({dishShort.food_portion} г.)</p>
        </>
    );
}
