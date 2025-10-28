import prisma from "../../../../../../lib/utils/prismaClient";
import orderPreview from "@/app/actions/orderPreview";
import { use } from "react";
import { IconBasketCog } from "@tabler/icons-react";
// import orderOnPreparing from "@/app/actions/orderStatusChanging";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";
import DishBlank from "@/app/components/CafeManager/OrdersManagement/DishBlank";
import CafeDishBlank from "@/app/components/CafeManager/OrdersManagement/CafeDishBlank";
import ConfirmButtonWithSelect from "@/app/components/CafeManager/OrdersManagement/ConfirmBtnWithSelect";


async function dishesInCafe(cafeID: number) {
    const dishes = await prisma.cafes.findUnique({
        where: {
            ID: cafeID
        },
        select: {
            hasDish: {
                where: {
                    dishAvailable: true
                },
                select: {
                    dishes: {
                        select: {
                            id: true,
                            food_name: true,
                            food_portion: true,
                            cost: true,
                            imagePath: true,
                            dishTypeId: true,
                        }
                    }
                }
            }
        }
    });

    if (!dishes) return [];

    const portions = dishes.hasDish.map(dish => Number(dish.dishes.food_portion));
    const costs = dishes.hasDish.map(dish => Number(dish.dishes.cost));

    return [
        ...dishes.hasDish.map(
            (dish, index) => {
                return {
                    dishes: {
                        ...dish.dishes,
                        food_portion: portions[index],
                        cost: costs[index]
                    }
                }
            }
        ).sort((a, b) => a.dishes.food_name.localeCompare(b.dishes.food_name))
    ];
}


export default function OrderPage({ params }: { params: { orderNumber: string } }) {
    
    const [orderInfo, cafeDishes] = use(Promise.all([orderPreview(params.orderNumber), dishesInCafe(1)]));
    const time = orderInfo.sentTime;
    
    return (
        <div className="w-[100dvw] h-[85dvh] bg-[whitesmoke] px-[3rem] py-[1.75rem] outline-1 outline-[orange]">
            <div className="w-[100%] flex flex-row items-center pb-[1.25rem]">
                <div className="grow inline-flex justify-start gap-[3rem]">
                    <p className="text-[2.5rem] font-bold">
                        Order <span className="italic">#</span>{params.orderNumber}
                    </p>
                    <div className="inline-flex items-center justify-start gap-[0.75rem]">
                        <IconBasketCog className="h-[2.75rem] w-[2.75rem] text-[goldenrod]" />
                        <p className="text-[1.8rem] text-[goldenrod] font-bold">{orderInfo.orderStatus}</p>
                    </div>
                </div>
                <div className="grow inline-flex items-center justify-end">
                    <ConfirmButtonWithSelect orderNumber={Number(params.orderNumber)} currentStatus={orderInfo.orderStatus} />
                </div>
            </div>
            <div className="w-[100%] inline-flex items-center">
                <p className="grow text-[1.4rem] text-left">Стваральнік <span className="underline">{"Алесь Хмарачёс"}</span>, {orderInfo.phone}</p>
                <p className="grow text-[1.4rem] text-right">Замова створана {time.getFullYear()}-{time.getMonth().toString().padStart(2, "0")}-{time.getDate().toString().padStart(2, "0")}, {time.getHours().toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}</p>
            </div>

            <HorizontalLine cssProps={{ marginTop: "3rem", marginBottom: "3rem", backgroundColor: "lightgray" }} />

            <div className="h-[61dvh] w-[100%] flex flex-row">
                <div className="grow flex flex-col">
                    <p className="shrink-0 text-[1.8rem] text-left font-bold m-0 p-0">
                        <span>Стравы </span>
                        <span className="text-[1.8rem] text-left text-gray-400 font-medium m-0 p-0">
                            ({orderInfo.dishes.length})
                        </span>
                    </p>
                    <div className="flex-1 overflow-y-auto">
                        {orderInfo.dishes.map((dish, index) =>
                            <DishBlank key={`dish-in-order-${index}`}
                                image={dish.dishes.imagePath}
                                dishName={dish.dishes.food_name}
                                dishCost={dish.dishes.cost}
                            />
                        )}
                    </div>
                    <div className="
                        shrink-0 px-[1rem] py-[0.75rem] mt-auto
                        outline-1 outline-[lightgray] rounded-[1.25rem]
                    ">
                        <p className="
                            text-[1.6rem] text-justify font-normal m-0 p-0
                            text-wrap h-[7.5dvh] overflow-y-auto
                        ">
                            <span className="text-[1.8rem] text-left font-bold">Каментар: </span>{orderInfo.comment}.
                        </p>
                    </div>
                </div>
                <div className="grow flex items-start justify-center">
                    <div>
                        <p className="text-[1.8rem] text-left font-bold m-0 p-0">
                            <span>Стравы Страўні </span>
                            <span className="text-[1.8rem] text-left text-gray-400 font-medium m-0 p-0">
                                ({cafeDishes.length})
                            </span>
                        </p>
                        <div className="w-[36dvw] flex flex-row items-center overflow-x-auto">
                            {cafeDishes.map(dish =>
                                <CafeDishBlank key={`dish-in-cafe-${dish.dishes.id}`}
                                    dishImage={dish.dishes.imagePath}
                                    dishName={dish.dishes.food_name}
                                    dishPortion={dish.dishes.food_portion}
                                    dishCost={dish.dishes.cost}
                                    dishType={dish.dishes.dishTypeId as number}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
