import { use } from "react";
import CardTitle from "@/components/CardParts/CardTitle";
import CardImage from "@/components/CardParts/CardImage";
import {
    IconBasketDollar,
    IconBowlChopsticks,
    IconMug,
    IconFeatherFilled,
    IconListDetails,
    IconMeat,
    IconMilk,
    IconToolsKitchen2
} from "@tabler/icons-react";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";
import { useTranslations } from "next-intl";


export type DishShortInfo = {
    food_name: string,
    includes: string,
    imagePath: string,
    protein: string,
    fats: string,
    carbohydrates: string,
    food_portion: string,
    cost: string,
    dishTypeId: number
}


async function fetchData(foodID: string) {
    const response = await fetch(`http://localhost:3000/api/foodlist?id=${foodID}&info=short`, { cache: "no-store" });
    const dishData = await response.json();

    return dishData;
}


export default function ShortMainDishInfo({ params }: { params: { authorizedUser: string, foodID: string } }) {
    
    const dishShortInfoView = useTranslations("UserChoisenDishShortInfo");
    
    const dishShort: DishShortInfo = use(fetchData(params.foodID));
    // console.log("dishShort -->", dishShort);

    return (
        <>
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-around",
                marginTop: "2rem", marginBottom: "2rem"
            }}>
                <div style={{ height: "30vh", width: "34vw" }}>
                    <CardImage imagePath={dishShort.imagePath.slice(8)} imageAlt={`${dishShort.imagePath.slice(8)}`}
                        fill style={{ borderRadius: "1rem" }}
                    />
                </div>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1rem", marginBottom: "1rem" }}>
                        <IconMeat style={{ height: "2.5rem", width: "2.5rem", color: "skyblue" }} />
                        <div>
                            <p style={{ fontSize: "2.5rem", margin: 0 }}>{dishShort.protein} {dishShortInfoView("nutritions.weightName")}</p>
                            <p style={{ fontSize: "1.5rem", margin: 0 }}>{dishShortInfoView("nutritions.protein")}</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1rem", marginBottom: "1rem" }}>
                        <IconMilk style={{ height: "2.5rem", width: "2.5rem", color: "gold" }} />
                        <div>
                            <p style={{ fontSize: "2.5rem", margin: 0 }}>{dishShort.fats} {dishShortInfoView("nutritions.weightName")}</p>
                            <p style={{ fontSize: "1.5rem", margin: 0 }}>{dishShortInfoView("nutritions.fats")}</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1rem", marginBottom: "1rem" }}>
                        <IconFeatherFilled style={{ height: "2.5rem", width: "2.5rem", color: "green" }} />
                        <div>
                            <p style={{ fontSize: "2.5rem", margin: 0 }}>{dishShort.carbohydrates} {dishShortInfoView("nutritions.weightName")}</p>
                            <p style={{ fontSize: "1.5rem", margin: 0 }}>{dishShortInfoView("nutritions.carbo")}</p>
                        </div>
                    </div>
                    <HorizontalLine cssProps={{ border: "1px solid var(--short-info-horizontal-line-color)", marginTop: "0.5rem", marginBottom: "0.5rem" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem", marginBottom: "1rem" }}>
                            <IconToolsKitchen2 style={{ height: "2rem", width: "2rem", color: "var(--short-info-icon-color)" }} />
                            <div>
                                <p style={{ fontSize: "2rem", margin: 0 }}>{dishShort.food_portion} {dishShortInfoView("nutritions.weightName")}</p>
                                <p style={{ fontSize: "1.2rem", margin: 0 }}>{dishShortInfoView("portion")}</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem", marginBottom: "1rem" }}>
                            <IconBasketDollar style={{ height: "2rem", width: "2rem", color: "var(--short-info-icon-color)" }} />
                            <div>
                                <p style={{ fontSize: "2rem", margin: 0 }}>{dishShort.cost} BYN</p>
                                <p style={{ fontSize: "1.2rem", margin: 0 }}>{dishShortInfoView("cost")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "2rem", marginLeft: "4rem", marginBottom: "1rem" }}>
                {dishShort.dishTypeId === 6
                ? <IconMug style={{ height: "3.5rem", width: "3.5rem", color: "var(--short-info-icon-color)" }} />
                : <IconBowlChopsticks style={{ height: "3.5rem", width: "3.5rem", color: "var(--short-info-icon-color)" }} />}
                <CardTitle title={dishShort.food_name} style={{
                    fontSize: "3.5rem", fontWeight: 600,
                    color: "var(--text-color)", padding: "0.5rem",
                    textAlign: "left"
                }} />
            </div>
            <div style={{ marginLeft: "4rem", marginRight: "4rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "3rem" }}>
                    <IconListDetails style={{ height: "4rem", width: "4rem", color: "var(--short-info-icon-color)" }} />
                    <div>
                        <CardTitle title={dishShortInfoView("composition")} style={{
                            fontSize: "2.5rem", fontWeight: 400,
                            color: "var(--text-color)", textAlign: "left"
                        }} />
                        <p style={{ marginTop: "1rem", fontSize: "1.8rem", color: "var(--text-color)" }}>
                            {dishShort.includes}.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
