import prisma from "../../../../../../lib/utils/prismaClient";
import orderPreview from "@/app/actions/orderPreview";
import { use } from "react";
import { IconBasketCheck, IconBasketCog } from "@tabler/icons-react";
// import orderOnPreparing from "@/app/actions/orderStatusChanging";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";
import ConfirmButtonWithSelect from "@/app/components/CafeManager/OrdersManagement/OrderProcessing/ConfirmBtnWithSelect";
import ChooseDishProvider from "@/app/components/CafeManager/OrdersManagement/OrderProcessing/ChooseDishContext";
import DishesInOrder from "@/app/components/CafeManager/OrdersManagement/OrderProcessing/DishesInOrder";
import DishesInCafe from "@/app/components/CafeManager/OrdersManagement/OrderProcessing/DishesInCafe";
import ProcessingTime from "@/app/components/CafeManager/OrdersManagement/OrderProcessing/ProcessingTime";
import ProcessContextProvider from "@/app/components/CafeManager/OrdersManagement/OrderProcessing/ProcessContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


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
        <ChooseDishProvider>
            <ProcessContextProvider>
                <div className="w-[100dvw] h-[85dvh] bg-[whitesmoke] px-[3rem] py-[1.75rem] outline-1 outline-[orange]">
                    <div className="w-[100%] flex flex-row items-center pb-[1.25rem]">
                        <div className="grow inline-flex justify-start gap-[3rem]">
                            <p className="text-[2.5rem] font-bold">
                                Order <span className="italic"># </span>{params.orderNumber}
                            </p>
                            <div className="inline-flex items-center justify-start gap-[0.75rem]">
                                {
                                    orderInfo.orderStatus === "PREPARING"
                                    ? (
                                        <>
                                            <IconBasketCog className="h-[2.75rem] w-[2.75rem] text-[goldenrod]" />
                                            <p className="text-[1.8rem] text-[goldenrod] font-bold">{orderInfo.orderStatus}</p>
                                        </>
                                    ) : (
                                        <>
                                            <IconBasketCheck className="h-[2.75rem] w-[2.75rem] text-green-600" />
                                            <p className="text-[1.8rem] text-green-600 font-bold">{orderInfo.orderStatus}</p>
                                        </>
                                    )
                                }
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

                    <div className="h-[61dvh] w-[100%] flex flex-row justify-between">
                        <DishesInOrder orderNumber={params.orderNumber} orderInfo={orderInfo} />
                        <ProcessingTime />
                        <DishesInCafe cafeDishes={cafeDishes} />
                    </div>
                </div>
                <ToastContainer />
            </ProcessContextProvider>
        </ChooseDishProvider>
    );
}
