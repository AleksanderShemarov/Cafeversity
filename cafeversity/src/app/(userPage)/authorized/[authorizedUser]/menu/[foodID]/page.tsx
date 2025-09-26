import { use } from "react";
import { DishShortInfo } from "../../@modal/(.)menu/[foodID]/page";
import CardImage from "@/components/CardParts/CardImage";
import { IconArrowNarrowRight, IconCheck, IconFeatherFilled, IconMeat, IconMilk, IconX } from "@tabler/icons-react";
import IngredientsChart from "@/app/components/IngredientsChart/IngredientsChart";
import AroundImage from "@/app/components/AroundImage/AroundImage";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useTranslations } from "next-intl";


type DishFullInfo = DishShortInfo & {
    spicy: boolean,
    vegetarian: boolean,
    vegan: boolean,
    amino_acids: string,
    favouredByUser: boolean,
    meal: string[],
}


async function fetchData(params: { authorizedUser: string, foodID: string }) {
    const response = await fetch(`http://localhost:3000/api/foodlist?id=${params.foodID}&info=full&name=${params.authorizedUser}`, {
        cache: "no-store"
    });
    const dishData = await response.json();
    // console.log("dishData -->", dishData);
    return dishData;
}


export default function DishFullDetails({ params }: { params: { authorizedUser: string, foodID: string } }) {

    const dishFull: DishFullInfo = use(fetchData(params));

    const choisenDish = useTranslations("UserChoisenDishPage");
    
    const protein = <IconMeat
        style={{
            height: "2.5rem", width: "2.5rem", color: "skyblue",
            outline: "3px solid skyblue", padding: "1rem", borderRadius: "50%"
        }}
    />
    const fat = <IconMilk
        style={{
            height: "2.5rem", width: "2.5rem", color: "gold",
            outline: "3px solid gold", padding: "1rem", borderRadius: "50%"
        }}
    />
    const carb = <IconFeatherFilled
        style={{
            height: "2.5rem", width: "2.5rem", color: "green",
            outline: "3px solid green", padding: "1rem", borderRadius: "50%"
        }}
    />
    const nutritions = [
        { type: protein, name: choisenDish("nutritions.protein"), value: dishFull.protein },
        { type: fat, name: choisenDish("nutritions.fats"), value: dishFull.fats },
        { type: carb, name: choisenDish("nutritions.carbo"), value: dishFull.carbohydrates }
    ];

    const includesOnParts = dishFull.includes.split(";");
    const formattedIncludes = [];

    for (let i = 0; i < includesOnParts.length; i++) {
        let repeats = 0;
        const array = [];
        for (const textPart of includesOnParts[i].split(", ")) {
            const leftBracket = textPart.indexOf("(");
            array.push(
                repeats === 0 ? textPart.substring(0, leftBracket - 1) : textPart.substring(0, leftBracket - 1).toLowerCase()
            );
            repeats++;
        }
        formattedIncludes.push(array);
    }

    const tasties = [
        { idKey: "spicyTaste", icon: '🌶️', text: `(${choisenDish("diets.spicy")}?)`, value: dishFull.spicy },
        { idKey: "vegetTaste", icon: '🌿', text: `(${choisenDish("diets.veget")}?)`, value: dishFull.vegetarian },
        { idKey: "veganTaste", icon: '🌱', text: `(${choisenDish("diets.vegan")}?)`, value: dishFull.vegan }
    ];

    return (
        <div style={{ position: "relative" }}>
            <AroundImage liked={dishFull.favouredByUser}>
                <div style={{ height: "35vh", width: "50%" }}>
                    <CardImage imagePath={dishFull.imagePath.slice(8)} imageAlt={`${dishFull.imagePath.slice(8)}`}
                        fill style={{ borderTopRightRadius: "5rem", borderTopLeftRadius: "5rem" }}
                    />
                </div>
            </AroundImage>
            <div style={{
                backgroundColor: "#f5f5f550", backdropFilter: "blur(4px)", position: "absolute", width: "100%", top: "25vh",
                borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem", boxShadow: "inset 0px 0px 15px -10px rgba(66, 68, 90, 1)",
            }}>
                <p style={{
                    fontSize: "5rem", fontWeight: "700", textAlign: "center", color: "wheat",
                    marginTop: "1.5rem", marginBottom: "1.5rem"
                }}>
                    {dishFull.food_name}
                </p>
                {formattedIncludes.map((formattedInclude, index) =>
                    <p key={`formattedInclude-${index + 1}`} style={{ fontSize: "2.5rem", fontWeight: "500", textAlign: "justify", textIndent: "5rem" }}>
                        {formattedInclude.join(", ")}
                    </p>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5rem", position: "relative" }}>
                        {nutritions.map((nutrit, index) =>
                            <div key={index} style={{ position: "relative", padding: "0 2.5rem" }}>
                                {index < nutritions.length - 1 && (
                                    <div style={{
                                        position: "absolute",
                                        right: "-2.5rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "2px",
                                        height: "75%",
                                        backgroundColor: "#ccc"
                                    }} />
                                )}
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                                        {nutrit.type}
                                    </div>
                                </div>
                                <p style={{ fontSize: "2rem", margin: 0, textAlign: "center" }}>{nutrit.name}</p>
                                <p style={{ fontSize: "2.5rem", margin: 0, textAlign: "center" }}>{nutrit.value} {choisenDish("nutritions.weightName")}</p>
                            </div>
                        )}
                    </div>
                    {includesOnParts.map((includesPart, index) =>
                        <div key={`ingredients-chart-${index + 1}`} style={{ height: "30rem", width: "50rem" }}>
                            <IngredientsChart ingredients={includesPart} />
                        </div>
                    )}
                    {/* <div style={{ height: "30rem", width: "50rem" }}>
                        <IngredientsChart ingredients={dishFull.includes} />
                    </div> */}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: "1rem" }}>
                {tasties.map(taste =>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }} key={taste.idKey}>
                        <p style={{ margin: 0, fontSize: "3rem" }}>{taste.icon}</p>
                        <p style={{ fontSize: "2rem", fontWeight: 400 }}>{taste.text}</p>
                        <IconArrowNarrowRight />
                        {taste.value ?
                            <IconCheck style={{ height: "3.75rem", width: "3.75rem", color: "white", padding: "0.1rem", borderRadius: "50%", backgroundColor: "green" }} />
                        :
                            <IconX style={{ height: "3.75rem", width: "3.75rem", color: "white", padding: "0.1rem", borderRadius: "50%", backgroundColor: "red" }} />
                        }
                    </div>
                )}
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}
