import { FoodDatumWithAmountTypes } from "./BuyingContext";
import CardImage from "@/components/CardParts/CardImage";
import CardTitle from "@/components/CardParts/CardTitle";


export default function BuyingPreviewCard({ food_name, imagePath, cost, food_portion, dishTypeId, amount }: Omit<FoodDatumWithAmountTypes, "id">) {
    return (
        <div className="
            w-[100%] px-[1.5rem] py-[2rem]
            flex flex-row items-center justify-between
            border-t-[0.25px] border-b-[0.25px]
            first:border-t-0 first:border-b-[0.25px] first:py-0 first:pb-[2rem]
            last:border-t-[0.25px] last:border-b-0 last:py-0 last:pt-[2rem]
        ">
            <div className="w-[20rem] h-[12.5rem]">
                <CardImage imagePath={imagePath} imageAlt={imagePath.substring(imagePath.lastIndexOf("/") + 1)}
                    fill
                    style={{ borderRadius: "1.75rem" }}
                />
            </div>
            <CardTitle title={food_name} style={{}} className="text-[1.8rem] font-semibold text-balance" />
            <span className="text-[1.8rem] font-semibold">X {amount} ({food_portion * amount} {dishTypeId === 6 ? "ml" : "g"})</span>
            <span className="text-[1.8rem] font-semibold">{cost} BYN</span>
        </div>
    );
}
