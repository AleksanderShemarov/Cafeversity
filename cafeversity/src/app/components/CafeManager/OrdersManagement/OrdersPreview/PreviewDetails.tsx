import ClosePreviewButton from "./ClosePreview";
import { IconArrowRight, IconBinocularsFilled } from "@tabler/icons-react";
import { OrderXTypes } from "./NewOrderPreview";
import DishBlank from "../DishBlanks/DishBlank";
import TimeSinceSending from "./TimeSinceSending";
import orderOnPreparing from "@/app/actions/orderStatusChanging";


export default function PreviewDetails({ orderNumber, data }: { orderNumber: string, data: OrderXTypes }) {
    return (
        <div className="h-[100%]">
            <div className="px-[1.25rem] py-[1rem] border-b-1 border-[lightgray]">
                <p className="text-[1.8rem] text-left font-bold m-0 p-0">Order&apos;s Summary</p>
                <p className="text-[1.6rem] text-left text-gray-400 font-medium italic m-0 p-0">
                    #
                    <span className="not-italic">{orderNumber}</span>
                </p>
            </div>
            <div className="h-[67%] px-[1.25rem] py-[1rem] border-b-1 border-[lightgray]">
                <p className="text-[1.8rem] text-left font-bold m-0 p-0">
                    <span>Total Items </span>
                    <span className="text-[1.8rem] text-left text-gray-400 font-medium m-0 p-0">
                        ({data.dishes.length})
                    </span>
                </p>
                <div className="h-[96%] overflow-y-auto">
                    {data.dishes.map((dish, index) =>
                        <DishBlank key={`dish-in-order-${index}`}
                            image={dish.dishes.imagePath}
                            dishName={dish.dishes.food_name}
                            dishCost={dish.dishes.cost}
                            dishReady={dish.dishReady}
                        />
                    )}
                </div>
            </div>

            <div className="
                flex flex-row items-center
                py-[1rem] px-[1.25rem]
            ">
                <p className="grow text-[1.6rem] text-left font-bold m-0 p-0">Total Price</p>
                <p className="grow text-[1.6rem] text-right text-gray-400 font-medium m-0 p-0">
                    {data.dishes.reduce((sum, dish) => sum + dish.dishes.cost, 0).toFixed(2)} BYN
                </p>
            </div>
            <TimeSinceSending sentTime={data.sentTime} />
            <div className="
                flex flex-row items-center
                py-[1rem] px-[1.25rem]
            ">
                <p className="grow text-[1.6rem] text-left font-bold m-0 p-0">Status</p>
                <p className="grow text-[1.6rem] text-right text-gray-400 font-medium m-0 p-0">
                    {data.orderStatus}
                </p>
            </div>

            <div className="
                flex flex-row items-center justify-between
                px-[1.25rem] py-[1rem]
            ">
                <form action={orderOnPreparing.bind(null, Number(orderNumber))}>
                    <button type="submit"
                        disabled={data.orderStatus === "TAKEN" || data.orderStatus === "CANCELLED"}
                        className="
                            flex flex-row items-center gap-[0.75rem]
                            text-[1.6rem] font-semibold no-underline rounded-[0.5rem] px-[0.75rem] py-[0.5rem]
                            bg-blue-500 text-[white]
                            hover:cursor-pointer hover:bg-[white] hover:text-blue-500 hover:outline-2 hover:outline-blue-500
                            disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[white] disabled:outline-0
                        "
                    >
                        {
                            data.orderStatus === "READY" || data.orderStatus === "TAKEN"
                            ?
                            <>
                                Прагляд <IconBinocularsFilled className="h-[1.8rem] w-[1.8rem]" />
                            </>
                            :
                            <>
                                Апрацоўка <IconArrowRight className="h-[1.8rem] w-[1.8rem]" />
                            </>
                        }
                    </button>
                </form>
                <ClosePreviewButton />
            </div>
        </div>
    );
}
