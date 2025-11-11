import CardImage from "@/components/CardParts/CardImage";
import prisma from "../../../../../../lib/utils/prismaClient";
import CardTitle from "@/components/CardParts/CardTitle";
import CardCliker from "./CardCliker";
import CardBottomLine from "./CardBottomLine";


export type FoodDatumTypes = {
    id: number,
    food_name: string,
    imagePath: string,
    cost: number,
    food_portion: number,
    dishTypeId: number,
} 


async function fetchFoodCategory(category: string) {
    const typeId = await prisma.dishTypes.findUnique({
        where: {
            Name: category
        },
        select: {
            ID: true
        }
    });

    const dishes = await prisma.dishes_BY.findMany({
        where: {
            dishTypeId: typeId?.ID
        },
        select: {
            id: true,
            food_name: true,
            imagePath: true,
            cost: true,
            food_portion: true,
            dishTypeId: true,
        }
    });

    const fixedDishes = dishes.map(dish => ({
        ...dish,
        cost: Number(dish.cost),
        food_portion: Number(dish.food_portion),
        dishTypeId: Number(dish.dishTypeId)
    }));

    return fixedDishes;
}


export default async function Category({ name, categotyFetchName }: { name: string, categotyFetchName: string }) {
    
    const foodData: FoodDatumTypes[] = await fetchFoodCategory(categotyFetchName);
    
    return (
        <div className="
            mx-[1.5rem] my-[2rem]
            first:my-0 first:mb-[2rem]
            last:my-0 last:mt-[2rem]
            px-[2rem] py-[0.5rem] outline-1 outline-gray-300 rounded-[1.25rem]
        ">
            <p className="m-0 mb-[1rem] p-0 py-[0.75rem] text-[1.6rem] text-left font-semibold border-b-1">{name}</p>
            <div className="flex flex-row flex-wrap items-center justify-between pt-[1rem] pb-[0.5rem]">
            {
                foodData.map(foodDatum =>
                    <CardCliker key={`${name}-${foodDatum.id}`}
                        clickerDishData={foodDatum}
                        className="p-[0.25rem] rounded-[1.75rem] w-[20rem]"
                    >
                        <div className="w-[100%] h-[10rem]">
                            <CardImage imagePath={foodDatum.imagePath} imageAlt={foodDatum.imagePath.substring(foodDatum.imagePath.lastIndexOf("/") + 1)}
                                fill
                                style={{ borderRadius: "1.75rem" }}
                            />
                        </div>
                        <CardTitle title={foodDatum.food_name} style={{}} className="pt-[0.5rem] text-[1.6rem] font-bold text-left text-balance" />
                        <CardBottomLine foodID={foodDatum.id}
                            portion={foodDatum.food_portion}
                            cost={foodDatum.cost}
                            foodType={foodDatum.dishTypeId}
                        />
                    </CardCliker>
                )
            }
            </div>
        </div>
    );
}
