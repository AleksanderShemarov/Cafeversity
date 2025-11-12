import { FoodDatumWithAmountTypes } from "./BuyingContext";
import CardImage from "@/components/CardParts/CardImage";
import CardTitle from "@/components/CardParts/CardTitle";
import CardVerticalLine from "./CardVerticalLine";


export default function BuyingLaneCard({ id, food_name, imagePath, cost, food_portion, dishTypeId, amount }: FoodDatumWithAmountTypes) {
    return (
        <div className="
            w-[20rem] rounded-[1.75rem]
            relative
            border-2 p-1.5
        ">
            <div className="w-[79%] h-[10rem] overflow-x-hidden">
                <CardImage imagePath={imagePath} imageAlt={imagePath.substring(imagePath.lastIndexOf("/") + 1)}
                    height={100}
                    width={200}
                    style={{ borderRadius: "1.75rem" }}
                />
            </div>
            <CardTitle title={food_name} style={{}} className="pt-[0.5rem] text-[1.6rem] font-bold text-left text-balance" />
            <CardVerticalLine foodID={id} />
            <div className="flex flex-row">
                <p className="grow text-[1.4rem] text-left font-normal m-0 p-0">{food_portion * amount}{dishTypeId === 6 ? "ml" : "g"}</p>
                <p className="grow text-[1.4rem] text-right font-normal m-0 p-0">{cost * amount} BYN</p>
            </div>
        </div>
    );
}
